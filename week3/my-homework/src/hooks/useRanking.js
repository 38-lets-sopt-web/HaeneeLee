import { useState } from "react";
import { RANKING_STORAGE_KEY } from "../constants/game";

// localStorage에서 랭킹 불러오기
const loadRanking = () => {
  try {
    const data = localStorage.getItem(RANKING_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

// 랭킹 정렬: 레벨 내림차순 → 점수 내림차순
const sortRecords = (records) =>
  [...records].sort((a, b) => {
    if (b.level !== a.level) return b.level - a.level;
    return b.score - a.score;
  });

export default function useRanking() {
  const [records, setRecords] = useState(() => sortRecords(loadRanking()));

  // 기록 추가
  const addRecord = (level, score) => {
    const newRecord = {
      id: crypto.randomUUID(),
      level,
      score,
      playedAt: new Date().toISOString(),
    };

    // 기록 추가 된 Record 정렬
    const updated = sortRecords([...records, newRecord]);
    setRecords(updated);
    localStorage.setItem(RANKING_STORAGE_KEY, JSON.stringify(updated));
  };

  // 랭킹 초기화
  const resetRanking = () => {
    setRecords([]);
    localStorage.removeItem(RANKING_STORAGE_KEY);
  };

  return { records, addRecord, resetRanking };
}
