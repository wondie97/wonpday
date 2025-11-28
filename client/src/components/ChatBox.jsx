import { useEffect, useState } from "react";

export default function ChatBox({ socket }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    socket.on("chat", (msg) => setMessages((prev) => [...prev, msg]));
  }, []);

  const sendMessage = () => {
    if (text.trim()) {
      socket.emit("chat", text);
      setText("");
    }
  };

  return (
    <div className="absolute bottom-0 w-full bg-white/80 p-2">
      <div className="h-32 overflow-y-auto border mb-2 text-sm">
        {messages.map((m, i) => (
          <div key={i}><b>{m.name}</b>: {m.text}</div>
        ))}
      </div>
      <div className="flex">
        <input value={text} onChange={(e) => setText(e.target.value)} className="flex-grow border rounded px-2 py-1" placeholder="채팅 입력..." />
        <button onClick={sendMessage} className="ml-2 bg-green-500 text-white px-3 py-1 rounded">전송</button>
      </div>
    </div>
  );
}