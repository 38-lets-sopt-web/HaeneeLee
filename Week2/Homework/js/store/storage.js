import { expenses } from "../data/mock.js";

const STORAGE_KEY = "expenseData";

// 데이터 초기화
export function initStorage() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  }
}

// 데이터 가져오기
export function getData() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

// 데이터 저장
export function setData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
