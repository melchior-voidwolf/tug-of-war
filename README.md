
# 拉绳子游戏 - Tug of War

这是一个基于 **React + TypeScript + Tailwind CSS** 前端和 **Express + Socket.IO** 后端的实时拉绳子游戏。用户可以选择左右两侧的队伍，通过点击按钮或按下空格键来拉动绳子，绳子超过阈值即判定胜负。

---

## **项目功能**

1. **队伍选择**：用户输入用户名并选择 "左侧队伍" 或 "右侧队伍"。
2. **实时拉绳子**：通过点击按钮或按空格键实时推动绳子。
3. **胜负判定**：当绳子位置达到 ±10 时，显示获胜队伍信息。
4. **游戏重置**：点击 "重新开始游戏" 按钮，重置游戏状态。
5. **历史记录查询**：通过后端接口查询用户的比赛历史。

---

## **技术栈**

### 前端：
- **React**：用于构建用户界面。
- **TypeScript**：提供静态类型检查。
- **Tailwind CSS**：实现简洁美观的样式。
- **Socket.IO Client**：与后端进行实时通信。

### 后端：
- **Express**：提供 HTTP API 和 Socket.IO 服务。
- **Socket.IO**：实现实时通信。
- **Prisma**：操作 PostgreSQL 数据库，记录用户历史成绩。
- **PostgreSQL**：存储游戏的比赛记录。

---

## **项目启动步骤**

### 1. 克隆仓库

```bash
git clone git@github.com:melchior-voidwolf/tug-of-war.git
cd tug-of-war
```

---

### 2. 安装依赖

**使用 Yarn 安装所有工作空间的依赖**：

```bash
yarn install
```

> Yarn 会自动在根目录和子目录（`frontend` 和 `backend`）中安装所有依赖。

---

### 3. 配置数据库连接

在 **`backend/.env`** 文件中设置 PostgreSQL 数据库连接：

```env
DATABASE_URL="postgresql://tug_client:tug1234@localhost:5432/tugofwar"
```

---

### 4. 初始化数据库

运行以下命令来同步数据库结构：

```bash
yarn workspace backend prisma db push
```

---

### 5. 启动项目

在根目录中使用以下命令，同时启动前后端服务：

```bash
yarn dev
```

- **前端** 将运行在：`http://localhost:3000`
- **后端** 将运行在：`http://localhost:4000`

---

### 6. 体验游戏

1. 在浏览器中访问前端地址：`http://localhost:3000`。
2. 输入用户名，选择队伍（左侧或右侧）。
3. 点击 **拉动绳子** 按钮或按下 **空格键** 推动绳子。
4. 当绳子位置超过 ±10 时，游戏结束并显示胜利信息。
5. 点击 **重新开始游戏** 按钮，重置游戏并重新开始。

---

## **API 接口说明**

| 方法   | 路径                    | 描述                        |
|--------|-------------------------|-----------------------------|
| GET    | `/api/history/:username`| 查询指定用户的比赛历史记录  |
| POST   | `/api/reset`            | 重置游戏状态                |

---

## **常见问题**

### 1. 安装依赖失败？

确保你在 **项目根目录** 执行以下命令：

```bash
yarn install
```

### 2. 前端和后端无法启动？

- 确保 PostgreSQL 数据库已运行，并且 `.env` 文件中数据库连接正确。
- 使用以下命令手动启动前端和后端：

```bash
yarn workspace backend dev
yarn workspace frontend start
```
