export function initFilter(onApply) {
  // 적용
  document.getElementById("applyFilterBtn").addEventListener("click", () => {
    onApply(getFilterValues());
  });

  // 초기화
  document.getElementById("resetFilterBtn").addEventListener("click", () => {
    resetFilterFields();
    onApply(getFilterValues());
  });
}

// 필터링 값 가져오기
export function getFilterValues() {
  return {
    title: document.getElementById("filterTitle").value.trim(),
    type: document.getElementById("filterType").value,
    category: document.getElementById("filterCategory").value,
    payment: document.getElementById("filterPayment").value,
  };
}

// 필터링 초기화
export function resetFilterFields() {
  document.getElementById("filterTitle").value = "";
  document.getElementById("filterType").value = "전체";
  document.getElementById("filterCategory").value = "전체";
  document.getElementById("filterPayment").value = "전체";
}

// 필터 적용
// and 연산자로 모든 조건이 적용될 수 있도록 함
export function applyFilter(data, filters) {
  return data.filter((item) => {
    const matchTitle =
      filters.title === "" || item.title.includes(filters.title);
    const matchType =
      filters.type === "전체" ||
      (filters.type === "수입" && item.amount > 0) ||
      (filters.type === "지출" && item.amount < 0);
    const matchCategory =
      filters.category === "전체" || item.category === filters.category;
    const matchPayment =
      filters.payment === "전체" || item.payment === filters.payment;
    return matchTitle && matchType && matchCategory && matchPayment;
  });
}
