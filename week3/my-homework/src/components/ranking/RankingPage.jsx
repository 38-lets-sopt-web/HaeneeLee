import RankingTable from "./RankingTable";
import Button from "../common/Button";
import * as styles from "./RankingPage.css";

export default function RankingPage({ records, resetRanking }) {
  const handleReset = () => {
    if (window.confirm("랭킹을 초기화할까요?")) {
      resetRanking();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>랭킹</h2>
        <Button variant="danger" onClick={handleReset}>
          초기화
        </Button>
      </div>
      <RankingTable records={records} />
    </div>
  );
}
