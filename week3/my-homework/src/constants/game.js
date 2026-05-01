// 레벨별 게임 설정
export const LEVEL_CONFIG = {
  1: {
    grid: 2,
    time: 15,
    interval: 1200, // 두더지 등장 주기
    showDuration: 1000, // 두더지 노출 시간
  },
  2: {
    grid: 3,
    time: 20,
    interval: 1000,
    showDuration: 900,
  },
  3: {
    grid: 4,
    time: 30,
    interval: 800,
    showDuration: 800,
  },
};

// 레벨 선택 옵션
export const LEVEL_OPTIONS = [
  { label: "Level 1", value: 1 },
  { label: "Level 2", value: 2 },
  { label: "Level 3", value: 3 },
];

// 두더지 클릭 후 맞은 이미지 유지 시간
export const HIT_DURATION = 3000;

// 폭탄 확률
export const BOMB_RATIO = 0.3;

// localStorage key
export const RANKING_STORAGE_KEY = "whack-a-mole-ranking";

// 게임 종료 후 초기화까지 딜레이
export const RESET_DELAY = 3000;
