import React, { useEffect, useState } from "react";

interface HistoryDisplayProps {
  username: string;
}

const HistoryDisplay: React.FC<HistoryDisplayProps> = ({ username }) => {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    fetch(`http://localhost:4000/api/history/${username}`)
      .then((res) => res.json())
      .then((data) => setHistory(data))
      .catch((err) => console.error(err));
  }, [username]);

  return (
    <div className="mt-6 p-4 bg-white shadow-lg rounded-lg w-full max-w-md">
      <h3 className="text-lg font-bold mb-4">历史成绩</h3>
      <ul>
        {history.length > 0 ? (
          history.map((item, index) => (
            <li key={index} className="border-b py-2">
            {item.team === 'left' ? "左队" : "右队"}  {item.username} {item.won ? "赢了" : "输了"} | 差距: {item.scoreDiff}
            </li>
          ))
        ) : (
          <li>暂无成绩</li>
        )}
      </ul>
    </div>
  );
};

export default HistoryDisplay;
