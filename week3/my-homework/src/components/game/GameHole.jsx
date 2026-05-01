// hole.content: 'empty' | 'mole' | 'bomb'
// hole.isHit: 두더지 맞은 상태 여부

import * as styles from "./GameHole.css";

export default function GameHole({ hole, onClick }) {
  const { content, isHit } = hole;
  const isActive = content !== "empty";

  const getEmoji = () => {
    if (content === "empty") return null;
    if (content === "bomb") return "💣";
    if (isHit) return "😵";
    return "🐹";
  };

  const emoji = getEmoji();

  return (
    <div className={styles.holeWrapper}>
      <div
        className={`${styles.hole} ${isActive ? styles.holeActive : ""}`}
        onClick={isActive ? onClick : undefined}
      >
        {emoji && <span className={styles.emoji}>{emoji}</span>}
      </div>
    </div>
  );
}
