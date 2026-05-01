import { createPortal } from "react-dom";
import * as styles from "./Modal.css";

export default function Modal({ isOpen, onClose, score }) {
  if (!isOpen) return null;

  return createPortal(
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.content}
        onClick={(e) => e.stopPropagation()} // 백드롭 클릭과 분리
      >
        <h2 className={styles.title}>게임 종료! 🎉</h2>
        <p className={styles.scoreText}>최종 점수: {score}점</p>
        <button className={styles.closeButton} onClick={onClose}>
          확인
        </button>
      </div>
    </div>,
    document.body,
  );
}
