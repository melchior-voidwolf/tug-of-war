import React, { useState } from "react";
import UsernameForm from "./components/UsernameForm";
import GameScreen from "./components/GameScreen";
import HistoryDisplay from "./components/HistoryDisplay";

const App: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [team, setTeam] = useState<"left" | "right" | "">("");
  const [showHistory, setShowHistory] = useState<boolean>(false);

  return (
    <div style={{ width: "100vw"}} className="w-full h-screen flex flex-col items-center bg-gray-100">
      <h1 className="text-4xl font-bold py-6">拉绳子</h1>
      {username && team ? (
        <>
          <GameScreen username={username} team={team} />
          <button
            onClick={() => {
              setShowHistory(false)
              setTimeout(() => {
                setShowHistory(true)
              }, 100);
            }}
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            查看历史成绩
          </button>
          {showHistory && <HistoryDisplay username={username} />}
        </>
      ) : (
        <UsernameForm
          onSubmit={(name, chosenTeam) => {
            setUsername(name);
            setTeam(chosenTeam);
          }}
        />
      )}
    </div>
  );
};

export default App;
