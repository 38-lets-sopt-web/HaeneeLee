import { getData, setData } from "../store/storage.js";
import { formatAmount } from "../utils/format.js";

// ============ 추가 모달 ============
export function initAddModal(onAdd) {
  const backdrop = document.getElementById("addModalBackdrop");

  // 닫기 버튼 클릭 시 모달 닫기
  document.getElementById("addModalClose").addEventListener("click", () => {
    closeAddModal();
  });

  // 백드롭 클릭 시 모달 닫기
  // e.target이 backdrop 일 때만 닫힘 (모달 내부 클릭 시 아무 변화 없음)
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) closeAddModal();
  });

  // 추가 버튼
  document.getElementById("addConfirmBtn").addEventListener("click", () => {
    const title = document.getElementById("addTitle").value.trim();
    const type = document.getElementById("addType").value;
    const amount = document.getElementById("addAmount").value;
    const date = document.getElementById("addDate").value;
    const category = document.getElementById("addCategory").value;
    const payment = document.getElementById("addPayment").value;

    // 모든 필드에 값이 존재하는지 유효성 검사를 진행
    if (!title || !amount || !date || !category || !payment) {
      return alert("모든 항목을 입력해주세요.");
    }

    // 지출이면 음수, 수입이면 양수로 저장한다.
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

    // 모달 닫고 다시 렌더링
    closeAddModal();
    onAdd();
  });
}

// 모달 열기
// className 추가로 모달 보이기
export function openAddModal() {
  document.getElementById("addModalBackdrop").classList.add("is-open");
}

// 모달 닫기
// className 제거로 모달 닫기
export function closeAddModal() {
  document.getElementById("addModalBackdrop").classList.remove("is-open");
  // 입력값 초기화
  document.getElementById("addTitle").value = "";
  document.getElementById("addAmount").value = "";
  document.getElementById("addDate").value = "";
  document.getElementById("addCategory").value = "";
  document.getElementById("addPayment").value = "";
  document.getElementById("addType").value = "지출";
}

// ============ 세부 정보 모달 ============
export function initDetailModal() {
  const backdrop = document.getElementById("detailModalBackdrop");

  // 닫기 버튼 클릭 시 모달 닫기
  document.getElementById("detailModalClose").addEventListener("click", () => {
    closeDetailModal();
  });

  // 백드롭 클릭 시 모달 닫기
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) closeDetailModal();
  });
}

// 세부 정보 모달 열기
// id로 해당 항목을 찾아서 내용 렌더링 후 모달 표시
export function openDetailModal(id) {
  const item = getData().find((d) => d.id === id);
  if (!item) return;

  const amountClass =
    item.amount >= 0 ? "amount--positive" : "amount--negative";

  // 세부 내용 innerHTML로 추가
  document.getElementById("detailModalBody").innerHTML = `
    <div class="detail__row">
      <span class="detail__label">제목</span>
      <span>${item.title}</span>
    </div>
    <div class="detail__row">
      <span class="detail__label">금액</span>
      <span class="${amountClass}">${formatAmount(item.amount)}원</span>
    </div>
    <div class="detail__row">
      <span class="detail__label">날짜</span>
      <span>${item.date}</span>
    </div>
    <div class="detail__row">
      <span class="detail__label">카테고리</span>
      <span>${item.category}</span>
    </div>
    <div class="detail__row">
      <span class="detail__label">결제수단</span>
      <span>${item.payment}</span>
    </div>
  `;

  document.getElementById("detailModalBackdrop").classList.add("is-open");
}

// 모달 닫기
export function closeDetailModal() {
  document.getElementById("detailModalBackdrop").classList.remove("is-open");
}
