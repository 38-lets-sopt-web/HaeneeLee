import { useState } from "react";
import useRanking from "./hooks/useRanking";
import Header from "./components/common/Header";
import GamePage from "./components/game/GamePage";
import RankingPage from "./components/ranking/RankingPage";

const TABS = {
  GAME: "game",
  RANKING: "ranking",
};

export default function App() {
  const [activeTab, setActiveTab] = useState(TABS.GAME);
  const { records, addRecord, resetRanking } = useRanking();

  return (
    <>
      <Header activeTab={activeTab} onTabChange={setActiveTab} tabs={TABS} />
      <main>
        {activeTab === TABS.GAME && <GamePage addRecord={addRecord} />}
        {activeTab === TABS.RANKING && (
          <RankingPage records={records} resetRanking={resetRanking} />
        )}
      </main>
    </>
  );
}
