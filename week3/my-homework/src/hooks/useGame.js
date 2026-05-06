import { useState, useEffect, useRef, useCallback } from "react";
import { LEVEL_CONFIG, RESET_DELAY } from "../constants/game";
import useBoard from "./useBoard";

/**
 * useGame
 * 게임 전체 로직을 담당하는 커스텀 훅
 * @param {Function} onGameEnd - 게임 종료 시 호출할 콜백 (랭킹 저장은 GamePage에서 담당)
 */

export default function useGame(onGameEnd) {
  // ─────────────────────────────────────────
  // 상태 (State)
  // 화면에 보여야 하는 값들 → useState로 관리
  // ─────────────────────────────────────────

  const [level, setLevel] = useState(1);
  // 'idle'    : 게임 시작 전 (레벨 변경 가능)
  // 'playing' : 게임 진행 중 (레벨 변경 불가)
  // 'finished': 게임 종료 (모달 표시)
  const [status, setStatus] = useState("idle");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(LEVEL_CONFIG[1].time);
  const [successCount, setSuccessCount] = useState(0);
  const [failCount, setFailCount] = useState(0);
  const [message, setMessage] = useState("시작 버튼을 눌러주세용~");

  // 현재 레벨에 맞는 설정값 가져오기 (grid, time, interval, showDuration)
  const config = LEVEL_CONFIG[level];

  // ─────────────────────────────────────────
  // Ref
  // 화면에 안 보여도 되는 값들 → useRef로 관리
  // 값이 바뀌어도 리렌더를 일으키지 않음
  // ─────────────────────────────────────────

  // setInterval ID를 저장 → clearInterval할 때 필요
  const timerRef = useRef(null); // 카운트다운 interval
  const intervalRef = useRef(null); // 두더지 등장 interval

  // setInterval 클로저는 생성 시점의 score를 캡처해서 고정됨 (stale 클로저)
  // score state를 직접 읽으면 항상 초기값(0)만 참조하게 됨
  // → ref로 감싸서 클로저 안에서도 항상 최신 score를 참조할 수 있게 함
  const scoreRef = useRef(0);

  // score가 바뀔 때마다 ref도 최신값으로 동기화
  // 렌더 중에 ref를 직접 업데이트하면 eslint 에러 → useEffect로 처리
  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  // ─────────────────────────────────────────
  // useBoard
  // 구멍 상태 관리를 담당하는 커스텀 훅
  // 점수 계산은 모르고, 구멍 열기/닫기/클릭만 담당
  // ─────────────────────────────────────────
  const { holes, openRandomHole, resetBoard, hitHole } = useBoard(config);

  // ─────────────────────────────────────────
  // 유틸 함수
  // ─────────────────────────────────────────

  // 카운트다운 interval과 두더지 등장 interval을 한 번에 정리
  // resetGame, finishGame, useEffect cleanup 등 여러 곳에서 재사용
  const clearTimers = useCallback(() => {
    clearInterval(timerRef.current);
    clearInterval(intervalRef.current);
  }, []); // ref는 항상 같은 객체 → deps 불필요

  // ─────────────────────────────────────────
  // 게임에 사용되는 함수들
  // ─────────────────────────────────────────

  // 게임 초기화 - 모든 상태를 시작 전으로 되돌림
  // 외부에 노출하지 않고 finishGame, stopGame 내부에서만 사용
  const resetGame = useCallback(() => {
    clearTimers();
    setStatus("idle");
    setScore(0);
    setTimeLeft(LEVEL_CONFIG[level].time); // 현재 레벨의 제한 시간으로 초기화
    setSuccessCount(0);
    setFailCount(0);
    setMessage("시작 버튼을 눌러주세요!");
    resetBoard(LEVEL_CONFIG[level]); // 구멍 배열도 초기화
  }, [level, clearTimers, resetBoard]);

  // 게임 시작 - GamePage의 시작 버튼과 연결
  // status를 'playing'으로 바꾸면 아래 useEffect가 감지해서 interval 시작
  const startGame = useCallback(() => {
    setStatus("playing"); // ← 이 값이 바뀌면 타이머 useEffect 실행됨
    setScore(0);
    setSuccessCount(0);
    setFailCount(0);
    setTimeLeft(LEVEL_CONFIG[level].time);
    setMessage("두더지를 잡아라!");
    resetBoard(LEVEL_CONFIG[level]); // 구멍 배열 초기화
  }, [level, resetBoard]);

  // 게임 종료 - 시간이 다 됐을 때 호출 (타이머 내부에서 자동 호출)
  // stopGame과 다르게 랭킹 저장 + 모달 표시 + 일정 시간 후 자동 초기화
  const finishGame = useCallback(
    (finalScore) => {
      // setInterval 클로저 안에서 score를 직접 읽으면 stale해서 scoreRef.current로 최신값을 읽어서 여기로 넘겨줌
      clearTimers();
      setStatus("finished");
      setMessage(`게임 종료! 최종 점수: ${finalScore}점`);
      onGameEnd(level, finalScore); // 랭킹 저장은 GamePage(→ App)에 위임
      setTimeout(() => {
        resetGame();
      }, RESET_DELAY); // 3초 후 자동 초기화
    },
    [clearTimers, onGameEnd, level, resetGame],
  );

  // 게임 중단 - GamePage의 중단 버튼과 연결
  // finishGame과 달리 랭킹 저장 없이 바로 초기화
  const stopGame = useCallback(() => {
    resetGame();
  }, [resetGame]);

  // 레벨 변경 - GamePage의 드롭다운과 연결
  // 게임 진행 중(status === 'playing')에는 변경 불가
  const changeLevel = useCallback(
    (nextLevel) => {
      if (status !== "idle") return; // 게임 중에는 레벨 변경 차단
      setLevel(nextLevel);
      setTimeLeft(LEVEL_CONFIG[nextLevel].time);
      resetBoard(LEVEL_CONFIG[nextLevel]);
    },
    [status, resetBoard],
  );

  // 구멍 클릭 - GameBoard → GameHole에서 클릭 시 호출
  // useBoard의 hitHole로 구멍 상태를 바꾸고, 콜백으로 결과를 받아 점수 처리
  const handleHoleClick = useCallback(
    (id) => {
      if (status !== "playing") return; // 게임 중에만 클릭 허용

      // hitHole: 구멍 상태 변경만 담당 (구멍 열기/닫기)
      // onResult 콜백: 결과(mole/bomb)를 받아 점수 처리 → 관심사 분리
      hitHole(id, (content) => {
        if (content === "mole") {
          setScore((prev) => prev + 1); // prev 패턴: 항상 최신 state 보장
          setSuccessCount((prev) => prev + 1);
          setMessage("잡았다! +1점 🐹");
        } else if (content === "bomb") {
          setScore((prev) => prev - 1);
          setFailCount((prev) => prev + 1);
          setMessage("폭탄! -1점 💣");
        }
      });
    },
    [status, hitHole],
  );
  // hitHole → useBoard에서 온 함수라서 포함

  // ─────────────────────────────────────────
  // finishGameRef
  // ref로 감싸서 항상 최신 finishGame을 참조하면서 deps에서 제거
  // ─────────────────────────────────────────
  const finishGameRef = useRef(finishGame);
  useEffect(() => {
    finishGameRef.current = finishGame;
  }, [finishGame]);

  // ─────────────────────────────────────────
  // 타이머 & 두더지 등장 인터벌
  // status가 'playing'이 될 때만 실행
  // ─────────────────────────────────────────
  useEffect(() => {
    if (status !== "playing") return;

    // 두더지/폭탄 등장: config.interval(ms)마다 랜덤 구멍 하나 오픈
    intervalRef.current = setInterval(() => {
      openRandomHole();
    }, config.interval);

    // 카운트다운: 1초마다 timeLeft를 1씩 줄임
    // setInterval을 쓰는 이유: 1초마다 반복 실행이 필요하기 때문
    // setTimeout(fn, timeLeft * 1000)으로 하면 화면 업데이트가 안 되고 interval이 2개가 되어서 복잡해짐
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        // prev 패턴으로 항상 최신 timeLeft 참조 (stale 클로저 방지)
        if (prev <= 1) {
          // finishGameRef: deps 없이 항상 최신 finishGame 참조
          // scoreRef: setInterval 클로저에서 최신 score 참조
          finishGameRef.current(scoreRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // cleanup: status가 바뀌거나 컴포넌트 언마운트 시 interval 정리
    // 안 하면 게임 종료 후에도 interval이 계속 실행됨
    return clearTimers;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  // ─────────────────────────────────────────
  // 외부로 노출하는 값과 함수
  // resetGame은 내부에서만 사용하므로 노출하지 않음
  // ─────────────────────────────────────────
  return {
    // 상태값 (GameStatus, GameControls에서 화면 렌더링에 사용)
    level,
    status,
    score,
    timeLeft,
    successCount,
    failCount,
    message,
    holes, // useBoard에서 온 구멍 배열 (GameBoard에서 사용)

    // 함수 (GamePage에서 각 컴포넌트에 props로 전달)
    startGame, // 시작 버튼
    stopGame, // 중단 버튼
    changeLevel, // 레벨 드롭다운
    handleHoleClick, // 구멍 클릭
  };
}
