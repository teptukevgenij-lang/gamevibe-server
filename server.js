const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let queue = [];

// Проверка сервера
app.get("/", (req, res) => {
  res.send("GameVibe server is running 🚀");
});

// Поиск тиммейта
app.post("/find", (req, res) => {
  const userId = req.body.userId;

  console.log("User searching:", userId);

  if (queue.length > 0) {
    const opponent = queue.shift();
    const channelId = "room_" + Math.floor(Math.random() * 100000);

    console.log("MATCH:", userId, "vs", opponent);

    return res.json({
      found: true,
      channelId,
      opponent,
    });
  } else {
    queue.push(userId);

    return res.json({
      found: false,
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("SERVER STARTED 🚀");
});