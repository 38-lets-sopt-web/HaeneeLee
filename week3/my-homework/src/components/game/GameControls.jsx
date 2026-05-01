import Button from "../common/Button";
import { LEVEL_OPTIONS } from "../../constants/game";
import * as styles from "./GameControls.css";

export default function GameControls({
  level,
  status,
  onLevelChange,
  onStart,
  onStop,
}) {
  const isPlaying = status === "playing";

  return (
    <div className={styles.container}>
      <select
        className={styles.select}
        value={level}
        onChange={(e) => onLevelChange(Number(e.target.value))}
        disabled={isPlaying}
      >
        {LEVEL_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <div className={styles.buttonGroup}>
        <Button variant="primary" onClick={onStart} disabled={isPlaying}>
          시작
        </Button>
        <Button variant="danger" onClick={onStop} disabled={!isPlaying}>
          중단
        </Button>
      </div>
    </div>
  );
}
