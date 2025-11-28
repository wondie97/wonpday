import { useEffect, useState } from "react";
import io from "socket.io-client";
import ChatBox from "./ChatBox";

const socket = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:4000");

export default function GameScene({ username }) {
  const [players, setPlayers] = useState({});
  const [x, setX] = useState(100);
  const [y, setY] = useState(100);

  useEffect(() => {
    socket.emit("join", username);
    socket.on("players", setPlayers);
    return () => socket.disconnect();
  }, []);

  const move = (dx, dy) => {
    setX((prev) => prev + dx);
    setY((prev) => prev + dy);
    socket.emit("move", { x: x + dx, y: y + dy });
  };

  return (
    <div className="relative h-screen w-screen bg-green-100 overflow-hidden">
      {Object.entries(players).map(([id, p]) => (
        <div key={id} className="absolute bg-blue-400 text-white text-xs text-center rounded-full" style={{ left: p.x, top: p.y, width: 40, height: 40, lineHeight: "40px" }}>{p.name}</div>
      ))}

      <div className="absolute bottom-4 left-4 flex gap-2">
        <button onClick={() => move(0, -10)}>⬆️</button>
        <button onClick={() => move(-10, 0)}>⬅️</button>
        <button onClick={() => move(10, 0)}>➡️</button>
        <button onClick={() => move(0, 10)}>⬇️</button>
      </div>

      <ChatBox socket={socket} />
    </div>
  );
}