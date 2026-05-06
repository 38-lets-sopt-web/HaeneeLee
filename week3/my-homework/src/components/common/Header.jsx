import Button from "./Button";
import * as styles from "./Header.css";

export default function Header({ activeTab, onTabChange, tabs }) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>두더지 게임</h1>
      <nav className={styles.nav}>
        <Button
          variant={activeTab === tabs.GAME ? "tab-active" : "tab"}
          onClick={() => onTabChange(tabs.GAME)}
        >
          게임
        </Button>
        <Button
          variant={activeTab === tabs.RANKING ? "tab-active" : "tab"}
          onClick={() => onTabChange(tabs.RANKING)}
        >
          랭킹
        </Button>
      </nav>
    </header>
  );
}
