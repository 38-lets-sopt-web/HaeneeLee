import { initStorage, getData } from "./store/storage.js";
import { initHeader } from "./features/header.js";
import { initFilter, applyFilter } from "./features/filter.js";
import { renderTable, initTable } from "./features/table.js";
import {
  initAddModal,
  openAddModal,
  initDetailModal,
  openDetailModal,
} from "./features/modal.js";

// localStorage가 비어있으면 초기 데이터 세팅
initStorage();

// 헤더 아이콘 클릭 시 새로고침 이벤트 등록
initHeader();

// 적용된 필터 상태
let currentFilters = {
  title: "",
  type: "전체",
  category: "전체",
  payment: "전체",
};

// 적용된 정렬 상태
let currentSort = "desc";

// 필터 적용 및 초기화 버튼 이벤트 등록
// 필터값이 바뀔 때 마다 currentFilters 갱신한 다음 render
initFilter((filters) => {
  currentFilters = filters;
  render();
});

// 테이블 이벤트 등록
// 첫 번째 콜백: 제목 클릭 시 세부 모달 열기
// 두 번째 콜백: 삭제 또는 정렬 변경 시 render
initTable(
  (id) => openDetailModal(id),
  (sort) => {
    if (sort) currentSort = sort;
    render();
  },
);

// 추가 모달 이벤트 등록
// 추가 완료 시 render() 호출하여 테이블 갱신
initAddModal(() => render());
// 세부 정보 모달 이벤트 등록
initDetailModal();

// 추가 버튼 클릭 시 모달 열기
document.getElementById("addBtn").addEventListener("click", () => {
  openAddModal();
});

// ================ 최초 렌더링 ================
render();

function render() {
  let data = getData();

  // 정렬하기
  data.sort((a, b) =>
    currentSort === "desc"
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date),
  );

  // 필터 적용
  const filtered = applyFilter(data, currentFilters);
  // 테이블 렌더링
  renderTable(filtered);
}
