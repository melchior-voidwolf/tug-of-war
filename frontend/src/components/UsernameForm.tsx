import React, { useState } from "react";

interface UsernameFormProps {
  onSubmit: (username: string, team: "left" | "right") => void;
}

const UsernameForm: React.FC<UsernameFormProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState<string>("");
  const [team, setTeam] = useState<"left" | "right" | "">("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && team) {
      onSubmit(username, team);
    } else {
      alert("请输入用户名并选择队伍！");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-4 p-6 bg-white shadow-lg rounded-lg"
    >
      <input
        type="text"
        placeholder="输入你的用户名"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="p-3 border rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <div className="flex gap-4">
        <button
          type="button"
          className={`px-6 py-2 rounded-lg transition ${
            team === "left" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setTeam("left")}
        >
          左侧队伍
        </button>
        <button
          type="button"
          className={`px-6 py-2 rounded-lg transition ${
            team === "right" ? "bg-red-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setTeam("right")}
        >
          右侧队伍
        </button>
      </div>
      <button
        type="submit"
        className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
      >
        加入游戏
      </button>
    </form>
  );
};

export default UsernameForm;
