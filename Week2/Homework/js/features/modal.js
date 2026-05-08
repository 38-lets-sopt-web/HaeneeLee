import { getData, setData } from "../store/storage.js";
import { formatAmount } from "../utils/format.js";

// ============ 추가 모달 ============
export function initAddModal(onAdd) {
  const dialog = document.getElementById("addModal");
  const addModalForm = document.getElementById("addModalForm");

  // 이벤트 리스너 밖에서 DOM 요소 미리 캐싱
  const addTitleInput = document.getElementById("addTitle");
  const addTypeInput = document.getElementById("addType");
  const addAmountInput = document.getElementById("addAmount");
  const addDateInput = document.getElementById("addDate");
  const addCategoryInput = document.getElementById("addCategory");
  const addPaymentInput = document.getElementById("addPayment");

  // 닫기 버튼
  document.getElementById("addModalClose").addEventListener("click", () => {
    closeAddModal();
  });

  // 백드롭(::backdrop) 클릭 시 닫기
  // dialog 영역 밖을 클릭하면 e.target이 dialog 자신이 됨
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) closeAddModal();
  });

  // ESC 키로 닫힐 때 form도 초기화
  dialog.addEventListener("close", () => {
    addModalForm.reset();
  });

  // 추가 버튼
  document.getElementById("addConfirmBtn").addEventListener("click", () => {
    // form의 required 속성 기반으로 유효성 검사
    if (!addModalForm.checkValidity()) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    const title = addTitleInput.value.trim();
    const type = addTypeInput.value;
    const amount = addAmountInput.value;
    const date = addDateInput.value;
    const category = addCategoryInput.value;
    const payment = addPaymentInput.value;

    // 지출이면 음수, 수입이면 양수로 저장
    const newItem = {
      id: Date.now(),
      title,
      date,
      category,
      payment,
      amount:
        type === "지출" ? -Math.abs(Number(amount)) : Math.abs(Number(amount)),
    };

    // localStorage에 새 항목 추가
    const data = getData();
    data.push(newItem);
    setData(data);

    closeAddModal();
    onAdd();
  });
}

// 모달 열기 - showModal()로 최상단 레이어에 표시
export function openAddModal() {
  document.getElementById("addModal").showModal();
}

// 모달 닫기 - close()로 닫고 form.reset()으로 입력값 초기화
export function closeAddModal() {
  const dialog = document.getElementById("addModal");
  dialog.close();
  document.getElementById("addModalForm").reset();
}

// ============ 세부 정보 모달 ============
export function initDetailModal() {
  const dialog = document.getElementById("detailModal");

  // 닫기 버튼
  document.getElementById("detailModalClose").addEventListener("click", () => {
    closeDetailModal();
  });

  // 백드롭 클릭 시 닫기
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) closeDetailModal();
  });
}

// 세부 정보 모달 열기
// id로 항목을 찾아 textContent만 업데이트 후 showModal()로 표시
export function openDetailModal(id) {
  const item = getData().find((d) => d.id === id);
  if (!item) return;

  const amountClass =
    item.amount >= 0 ? "amount--positive" : "amount--negative";

  // innerHTML 대신 각 요소의 textContent만 업데이트 (불필요한 DOM 재생성 방지)
  document.getElementById("detailTitle").textContent = item.title;
  document.getElementById("detailDate").textContent = item.date;
  document.getElementById("detailCategory").textContent = item.category;
  document.getElementById("detailPayment").textContent = item.payment;

  const detailAmountEl = document.getElementById("detailAmount");
  detailAmountEl.textContent = `${formatAmount(item.amount)}원`;
  detailAmountEl.className = amountClass;

  document.getElementById("detailModal").showModal();
}

// 모달 닫기
export function closeDetailModal() {
  document.getElementById("detailModal").close();
}
