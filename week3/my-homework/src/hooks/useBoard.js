import { useState, useCallback } from "react";
import { BOMB_RATIO, HIT_DURATION } from "../constants/game";

// count개의 빈 구멍 배열 생성
// 훅 밖에 선언해서 매 렌더마다 재생성되지 않게 함
// Array.from({ length: count }, (_, i) => ...) → length만큼 배열 만들면서 index(i)를 id로 사용
const createHoles = (count) =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    content: "empty", // 'empty' | 'mole' | 'bomb'
    isHit: false, // 두더지를 맞은 상태 여부 (맞으면 아이콘 변경)
  }));

/**
 * useBoard
 * 구멍 상태 관리만 담당하는 커스텀 훅
 * 점수 계산은 모르고, 구멍 열기/닫기/클릭 처리만 담당 → 관심사 분리
 * @param {number} level - 현재 레벨
 * @param {object} config - 레벨별 설정 (grid, time, interval, showDuration)
 */
export default function useBoard(config) {
  // ─────────────────────────────────────────
  // 상태 (State)
  // ─────────────────────────────────────────

  const totalHoles = config.grid * config.grid; // ex) Level2: 3x3 = 9개

  // 함수로 감싸면 첫 렌더 때만 실행 → 매 렌더마다 실행되는 낭비 방지
  const [holes, setHoles] = useState(() => createHoles(totalHoles));

  // ─────────────────────────────────────────
  // 구멍 상태 변경 함수들
  // ─────────────────────────────────────────

  // 보드 초기화 - 레벨 변경 또는 게임 중단 시 호출
  // nextConfig가 있으면 새 레벨 기준으로, 없으면 현재 totalHoles 기준으로 초기화
  const resetBoard = useCallback(
    (nextConfig) => {
      const count = nextConfig ? nextConfig.grid * nextConfig.grid : totalHoles;
      setHoles(createHoles(count));
    },
    [totalHoles], // totalHoles가 바뀔 때 즉, 레벨이 변경될 때만 재생성
  );

  // 구멍 닫기 - 특정 구멍을 empty 상태로 되돌림
  // openRandomHole의 setTimeout, hitHole의 setTimeout에서 호출
  const closeHole = useCallback((id) => {
    setHoles((prev) =>
      // prev 패턴: 항상 최신 holes 배열 참조 (stale 클로저 방지)
      prev.map((hole) =>
        // id가 일치하는 구멍만 empty로 초기화, 나머지는 그대로
        hole.id === id ? { ...hole, content: "empty", isHit: false } : hole,
      ),
    );
  }, []); // setHoles는 React가 안정성 보장 → deps 불필요

  // 랜덤 구멍 열기 - useGame의 setInterval에서 config.interval마다 호출
  // 위치와 종류(두더지/폭탄)가 랜덤
  const openRandomHole = useCallback(() => {
    setHoles((prev) => {
      // 현재 비어있는 구멍의 인덱스만 추출
      // map으로 빈 구멍은 i, 아닌 구멍은 null로 변환 후 filter로 null 제거
      const emptyIndexes = prev
        .map((hole, i) => (hole.content === "empty" ? i : null))
        .filter((i) => i !== null);

      // 모든 구멍이 열려있으면 prev 그대로 반환 (리렌더 방지)
      if (emptyIndexes.length === 0) return prev;

      // 비어있는 구멍 중 랜덤으로 하나 선택
      const randomIndex =
        emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];

      // BOMB_RATIO(0.3) 확률로 폭탄, 나머지는 두더지
      const content = Math.random() < BOMB_RATIO ? "bomb" : "mole";

      // setHoles 콜백 안에서 setTimeout 등록
      // → randomIndex가 이 시점에 확정되어 있어서 클로저로 안전하게 캡처됨
      // → 클릭 안 했으면 showDuration 후 자동으로 구멍 닫기
      setTimeout(() => {
        closeHole(randomIndex);
      }, config.showDuration);

      // 원본 배열 복사 후 선택된 구멍만 업데이트 (불변성 유지)
      const next = [...prev];
      next[randomIndex] = { ...next[randomIndex], content };
      return next;
    });
  }, [config.showDuration, closeHole]);

  // 구멍 클릭 처리 - GameHole 클릭 시 useGame의 handleHoleClick에서 호출
  // 구멍 상태 변경만 담당, 점수 처리는 onResult 콜백으로 useGame에 위임
  const hitHole = useCallback(
    (id, onResult) => {
      setHoles((prev) => {
        const hole = prev.find((h) => h.id === id);

        // early return: 아래 케이스는 클릭 무시 (prev 그대로 반환 → 리렌더 없음)
        // 1. 구멍을 못 찾은 경우
        // 2. 빈 구멍을 클릭한 경우
        // 3. 이미 맞은 두더지를 또 클릭한 경우
        if (!hole || hole.content === "empty" || hole.isHit) return prev;

        const { content } = hole;

        // 점수 처리를 useGame에 위임
        // hitHole은 뭐가 클릭됐는지만 알려주고 점수는 모름 → 관심사 분리
        onResult(content); // content: 'mole' | 'bomb'

        if (content === "mole") {
          // 두더지 클릭:
          // 1. isHit: true로 바꿔서 😵 이미지 표시
          // 2. HIT_DURATION 후 구멍 닫기
          // 3. 이중 클릭 방지 (isHit 체크로 위에서 early return)
          setTimeout(() => closeHole(id), HIT_DURATION); // HIT_DURATION 후 closeHole을 수행한다는 예약
          return prev.map((h) => (h.id === id ? { ...h, isHit: true } : h)); // 이 반환 값이 새로운 holes가 됨
        } else {
          // 폭탄 클릭:
          // 즉시 닫기 (setTimeout 0 → 현재 실행 컨텍스트 끝난 후 바로 실행)
          setTimeout(() => closeHole(id), 0);
          return prev; // 폭탄은 isHit 없이 바로 사라짐
        }
      });
    },
    [closeHole],
  );

  // ─────────────────────────────────────────
  // 외부로 노출하는 값과 함수
  // ─────────────────────────────────────────
  return { holes, openRandomHole, closeHole, resetBoard, hitHole };
}
