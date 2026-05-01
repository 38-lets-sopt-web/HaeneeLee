import * as styles from "./RankingTable.css";

const RANK_EMOJI = { 1: "🥇", 2: "🥈", 3: "🥉" };

export default function RankingTable({ records }) {
  if (records.length === 0) {
    return (
      <div className={styles.tableWrapper}>
        <p className={styles.empty}>아직 저장된 기록이 없어요!</p>
      </div>
    );
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>순위</th>
            <th className={styles.th}>레벨</th>
            <th className={styles.th}>점수</th>
            <th className={styles.th}>플레이 시각</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => {
            const rank = index + 1;
            return (
              <tr key={record.id} className={styles.tr}>
                <td className={`${styles.td} ${styles.rankCell}`}>
                  <span className={rank <= 3 ? styles.rankTop : ""}>
                    {RANK_EMOJI[rank] ?? rank}
                  </span>
                </td>
                <td className={styles.td}>
                  <span className={styles.levelBadge}>
                    Level {record.level}
                  </span>
                </td>
                <td className={`${styles.td} ${styles.scoreCell}`}>
                  {record.score}점
                </td>
                <td className={styles.td}>
                  {new Date(record.playedAt).toLocaleString("ko-KR")}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
