import GameHole from "./GameHole";
import { LEVEL_CONFIG } from "../../constants/game";
import { board } from "./GameBoard.css";

export default function GameBoard({ holes, level, onHoleClick }) {
  const { grid } = LEVEL_CONFIG[level];

  return (
    <div
      className={board}
      style={{ gridTemplateColumns: `repeat(${grid}, 1fr)` }}
    >
      {holes.map((hole) => (
        <GameHole
          key={hole.id}
          hole={hole}
          onClick={() => onHoleClick(hole.id)}
        />
      ))}
    </div>
  );
}
