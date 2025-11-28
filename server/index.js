import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const players = {};
const messages = [];

io.on("connection", (socket) => {
  console.log(`✅ ${socket.id} connected`);

  socket.on("join", (name) => {
    players[socket.id] = { x: 100, y: 100, name };
    io.emit("players", players);
  });

  socket.on("move", (data) => {
    if (players[socket.id]) {
      players[socket.id].x = data.x;
      players[socket.id].y = data.y;
      io.emit("players", players);
    }
  });

  socket.on("chat", (msg) => {
    const message = { name: players[socket.id]?.name || "익명", text: msg };
    messages.push(message);
    io.emit("chat", message);
  });

  socket.on("disconnect", () => {
    delete players[socket.id];
    io.emit("players", players);
    console.log(`❌ ${socket.id} disconnected`);
  });
});

server.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));