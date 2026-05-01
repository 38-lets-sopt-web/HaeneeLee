import { useState } from "react";
import useGame from "../../hooks/useGame";
import GameStatus from "./GameStatus";
import GameControls from "./GameControls";
import GameBoard from "./GameBoard";
import Modal from "../common/Modal";
import * as styles from "./GamePage.css";

export default function GamePage({ addRecord }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  //  게임이 종료된 후
  const handleGameEnd = (level, score) => {
    addRecord(level, score); // 기록 추가
    setFinalScore(score); // 최종 점수
    setIsModalOpen(true); //  모달 열기
  };

  const {
    level,
    status,
    score,
    timeLeft,
    successCount,
    failCount,
    message,
    holes,
    startGame,
    stopGame,
    changeLevel,
    handleHoleClick,
  } = useGame(handleGameEnd);

  return (
    <div className={styles.container}>
      {/* 좌측 패널 */}
      <GameStatus
        timeLeft={timeLeft}
        score={score}
        successCount={successCount}
        failCount={failCount}
        message={message}
      />

      {/* 우측: 컨트롤 + 보드 */}
      <div className={styles.rightPanel}>
        <div className={styles.controlsRow}>
          <GameControls
            level={level}
            status={status}
            onLevelChange={changeLevel}
            onStart={startGame}
            onStop={stopGame}
          />
        </div>
        <GameBoard holes={holes} level={level} onHoleClick={handleHoleClick} />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        score={finalScore}
      />
    </div>
  );
}
