const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const httpServer = createServer(app);

// 配置 CORS
app.use(cors());
app.use(express.json());

// Socket.IO 服务器
const io = new Server(httpServer, {
  cors: {
    origin: "*", // 允许所有前端访问
  },
  path: "/socket",
});

// 游戏状态
let ropePosition = 0; // 绳子初始位置
let gameInProgress = true;

let userlist = new Set()

// WebSocket 逻辑
io.on("connection", (socket) => {
  console.log("A user connected");

  // 玩家拉动绳子
  socket.on("pull_rope", async ({ username, team }) => {
    userlist.add(username)
    if (!gameInProgress) return;

    // 更新绳子位置
    ropePosition += team === "left" ? -1 : 1;

    // 广播更新的绳子位置
    io.emit("update_game", { ropePosition });

    // 判断胜负
    if (ropePosition >= 10 || ropePosition <= -10) {
      const winner = ropePosition >= 10 ? "right" : "left";
      gameInProgress = false;

      // 记录比赛结果
      try {
        await prisma.userGameHistory.create({
          data: {
            username,
            team,
            won: team === winner,
            scoreDiff: Math.abs(ropePosition)
          },
        });
        const other = [...userlist].filter(item => item != username)[0]
        if (other) {
          await prisma.userGameHistory.create({
            data: {
              username: other,
              team: team === 'left' ? 'right' : 'left',
              won: team !== winner,
              scoreDiff: Math.abs(ropePosition)
            },
          });
        }
      } catch (error) {
        console.error("Error saving game result:", error);
      }

      // 广播胜利消息
      io.emit("game_over", { winner: winner });
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// 查询用户历史成绩 API
app.get("/api/history/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const history = await prisma.userGameHistory.findMany({
      where: { username },
      orderBy: { createdAt: "desc" },
    });
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch user history" });
  }
});

// 重置游戏状态 API
app.post("/api/reset", (req, res) => {
  ropePosition = 0;
  gameInProgress = true;
  io.emit("update_game", { ropePosition });
  res.json({ message: "Game has been reset" });
});

// 启动服务器
const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
