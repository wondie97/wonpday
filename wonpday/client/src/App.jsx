import { useState } from "react";
import GameScene from "./components/GameScene";
import Login from "./components/Login";

export default function App() {
  const [username, setUsername] = useState("");
  return username ? <GameScene username={username} /> : <Login setUsername={setUsername} />;
}