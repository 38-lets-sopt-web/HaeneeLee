import * as styles from "./GameStatus.css";

export default function GameStatus({
  timeLeft,
  score,
  successCount,
  failCount,
  message,
}) {
  return (
    <aside className={styles.panel}>
      {/* 남은 시간 */}
      <div className={styles.card}>
        <span className={styles.label}>남은 시간</span>
        <strong className={styles.value}>{timeLeft}</strong>
      </div>

      {/* 총 점수 */}
      <div className={styles.card}>
        <span className={styles.label}>총 점수</span>
        <strong className={styles.value}>{score}</strong>
      </div>

      {/* 성공 / 실패 */}
      <div className={styles.statRow}>
        <div className={styles.statCard}>
          <span className={styles.successLabel}>성공</span>
          <strong className={styles.statValue}>{successCount}</strong>
        </div>
        <div className={styles.statCard}>
          <span className={styles.failLabel}>실패</span>
          <strong className={styles.statValue}>{failCount}</strong>
        </div>
      </div>

      {/* 안내 메시지 */}
      <div className={styles.messageCard}>
        <p className={styles.messageText}>{message}</p>
      </div>
    </aside>
  );
}
