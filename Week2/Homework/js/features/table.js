import { formatAmount } from "../utils/format.js";
import { getData, setData } from "../store/storage.js";

// 테이블 전체 렌더링
export function renderTable(data) {
  renderBody(data);
  renderFoot(data);
}

// tbody 렌더링
// 필터링 된 데이터를 행으로 변환해서 보여주기
function renderBody(data) {
  const tbody = document.getElementById("tableBody");
  // data-id로 어떤 항목인지 식별한다
  tbody.innerHTML = data
    .map(
      (item) => `
    <tr>
      <td><input type="checkbox" class="row-check" data-id="${item.id}" /></td>
      <td><span class="table__title-link" data-id="${item.id}">${item.title}</span></td>
      <td class="${item.amount >= 0 ? "amount--positive" : "amount--negative"}">
        ${formatAmount(item.amount)}
      </td>
      <td>${item.date}</td>
      <td>${item.category}</td>
      <td>${item.payment}</td>
    </tr>
  `,
    )
    .join("");
}

// tfoot 렌더링
// 구조는 HTML에 고정, 숫자와 클래스만 업데이트 (불필요한 DOM 재생성 방지)
function renderFoot(data) {
  const total = data.reduce((sum, item) => sum + item.amount, 0);

  document.getElementById("totalAmountText").textContent = formatAmount(total);
  document.getElementById("totalAmountCell").className =
    total >= 0 ? "amount--positive" : "amount--negative";
}

// 테이블 이벤트 등록
// onTitleClick: 제목 클릭 시 호출됨 => 세부 모달 열기
// onRender: 삭제/정렬 변경 후 테이블 다시 렌더링
export function initTable(onTitleClick, onRender) {
  // 전체 체크박스 → 개별 체크박스 전체 동기화
  document.getElementById("checkAll").addEventListener("change", (e) => {
    document
      .querySelectorAll(".row-check")
      .forEach((cb) => (cb.checked = e.target.checked));
  });

  // 개별 체크박스 → 전체 체크박스 동기화
  // 모두 체크되면 전체 체크박스도 체크, 하나라도 해제되면 전체 체크박스 해제
  document.getElementById("tableBody").addEventListener("change", (e) => {
    if (e.target.classList.contains("row-check")) {
      const checkboxes = document.querySelectorAll(".row-check");
      const allCount = checkboxes.length;
      const checkedCount =
        document.querySelectorAll(".row-check:checked").length;
      document.getElementById("checkAll").checked =
        allCount > 0 && allCount === checkedCount;
    }
  });

  // 선택 삭제
  // 체크된 항목의 id를 찾고 localStorage에서 제거
  document.getElementById("deleteSelectedBtn").addEventListener("click", () => {
    const ids = [...document.querySelectorAll(".row-check:checked")].map((cb) =>
      Number(cb.dataset.id),
    );
    if (ids.length === 0) return alert("삭제할 항목을 선택해주세요.");
    const data = getData().filter((item) => !ids.includes(item.id));
    setData(data);
    // 삭제한 후 테이블을 다시 그려달라고 요청함(이때, 삭제만 진행했기 때문에 정렬은 없음 => 현재 정렬 유지)
    onRender();
  });

  // 정렬 변경
  document.getElementById("sortSelect").addEventListener("change", (e) => {
    // 새 정렬 값으로 다시 테이블 그리는 것을 요청
    onRender(e.target.value);
  });

  // 제목 클릭
  // tbody에 이벤트 하나만 등록하고 클릭된 요소가 title-link인지 확인
  document.getElementById("tableBody").addEventListener("click", (e) => {
    // closest: 클릭된 요소 or 가장 가까운 상위 요소 중 해당 선택자를 찾음
    const link = e.target.closest(".table__title-link");
    // title-link가 아닌 곳 클릭했으면 무시하기
    if (!link) return;
    // title-link를 클릭했으면 data-id 꺼내서 모달 열기
    onTitleClick(Number(link.dataset.id));
  });
}
