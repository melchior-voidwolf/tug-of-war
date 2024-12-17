import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

interface GameScreenProps {
  username: string;
  team: "left" | "right";
}

const socket = io("http://localhost:4000", { path: "/socket" });

const GameScreen: React.FC<GameScreenProps> = ({ username, team }) => {
  const [ropePosition, setRopePosition] = useState<number>(0);
  const [winner, setWinner] = useState<string | null>(null);

  // 调用 /api/reset 重置游戏状态
  const resetGame = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/reset", {
        method: "POST",
      });
      if (response.ok) {
        console.log("Game reset successfully");
        setRopePosition(0);
        setWinner(null);
      } else {
        console.error("Failed to reset game");
      }
    } catch (error) {
      console.error("Error resetting game:", error);
    }
  };

  // 监听 WebSocket 事件
  useEffect(() => {
    socket.on("update_game", (data) => {
      setRopePosition(data.ropePosition);

      // 判断胜负
      if (data.ropePosition >= 10) {
        setWinner("右侧队伍胜利！");
      } else if (data.ropePosition <= -10) {
        setWinner("左侧队伍胜利！");
      }
    });

    return () => {
      socket.off("update_game");
    };
  }, []);

  // 拉动绳子
  const handlePull = () => {
    if (!winner) { // 只有比赛未结束时才能拉动
      socket.emit("pull_rope", { username, team });
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <h2 className="text-xl">队伍: {team === "left" ? "左侧" : "右侧"}</h2>

      {/* 绳子进度条 */}
      <div className="relative w-full max-w-md h-10 bg-gray-300 rounded-full overflow-hidden">
        <div
          className="absolute h-full bg-blue-500 transition-all"
          style={{
            left: `${50 + ropePosition}%`,
            width: "10px",
          }}
        ></div>
      </div>

      {/* 按钮与胜利消息 */}
      {winner ? (
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-2xl font-bold text-green-500">{winner}</h2>
          <button
            onClick={resetGame}
            className="px-6 py-3 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            重新开始游戏
          </button>
        </div>
      ) : (
        <button
          onClick={handlePull}
          className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          拉动绳子
        </button>
      )}

      <p className="text-lg text-gray-700">
        按按钮或按 <b>空格键</b> 拉动绳子！
      </p>
    </div>
  );
};

export default GameScreen;
