import { useState, useRef, useEffect } from "react";
import { Send, Search } from "lucide-react";

export default function GroupChat() {
  /* ---------------- GROUP STATE ---------------- */
  const [groups] = useState([
    { name: "UI/UX Team", members: 24 },
    { name: "Web Dev Batch", members: 36 },
    { name: "Marketing Team", members: 18 },
    { name: "Admin Panel Team", members: 12 },
  ]);

  const [selectedGroup, setSelectedGroup] = useState("UI/UX Team");
  const [search, setSearch] = useState("");

  /* ---------------- MESSAGE STATE ---------------- */
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "admin",
      name: "Admin",
      text: "Welcome to the group!",
      time: "10:30 AM",
    },
    {
      id: 2,
      sender: "user",
      name: "Aditya",
      text: "Hello everyone 👋",
      time: "10:32 AM",
    },
  ]);

  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  /* ---------------- SEND MESSAGE ---------------- */
  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: "user",
      name: "Aditya",
      text: input,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, newMessage]);
    setInput("");
  };

  /* ---------------- AUTO SCROLL ---------------- */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ---------------- FILTER GROUPS ---------------- */
  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-[#eef2f7]">

      {/* ================= LEFT SIDEBAR ================= */}
      <div className="w-80 bg-white shadow-xl p-6 flex flex-col">

        <h2 className="text-2xl font-bold text-[#0f2f57] mb-6">
          Group Chats
        </h2>

        {/* Search */}
        <div className="flex items-center border rounded-lg px-3 py-2 mb-6">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search group..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="outline-none ml-2 w-full text-sm"
          />
        </div>

        {/* Group List */}
        <div className="space-y-3 overflow-y-auto">
          {filteredGroups.map((group, index) => (
            <div
              key={index}
              onClick={() => setSelectedGroup(group.name)}
              className={`p-4 rounded-xl cursor-pointer transition ${
                selectedGroup === group.name
                  ? "bg-[#f4b400] text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              <h3 className="font-semibold">{group.name}</h3>
              <p className="text-sm opacity-80">
                {group.members} Members
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= RIGHT CHAT AREA ================= */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <div className="bg-white p-4 shadow flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-[#0f2f57]">
              {selectedGroup}
            </h3>
            <p className="text-sm text-green-500">● Online</p>
          </div>

          <div className="flex -space-x-2">
            <img
              src="https://i.pravatar.cc/40?img=1"
              className="rounded-full border-2 border-white"
              alt=""
            />
            <img
              src="https://i.pravatar.cc/40?img=2"
              className="rounded-full border-2 border-white"
              alt=""
            />
            <img
              src="https://i.pravatar.cc/40?img=3"
              className="rounded-full border-2 border-white"
              alt=""
            />
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#f5f6f8]">
          {messages.map((msg) => {
            const isUser = msg.sender === "user";

            return (
              <div
                key={msg.id}
                className={`flex ${
                  isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-md px-4 py-3 rounded-2xl shadow text-sm ${
                    isUser
                      ? "bg-[#f4b400] text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  {!isUser && (
                    <p className="text-xs font-semibold mb-1 text-[#0f2f57]">
                      {msg.name}
                    </p>
                  )}

                  <p>{msg.text}</p>

                  <p className="text-xs mt-2 opacity-70 text-right">
                    {msg.time}
                  </p>
                </div>
              </div>
            );
          })}

          <div ref={bottomRef}></div>
        </div>

        {/* Input */}
        <div className="bg-white p-4 flex items-center gap-3 shadow">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 border rounded-lg px-4 py-2 outline-none"
          />

          <button
            onClick={sendMessage}
            className="bg-[#0f2f57] text-white p-3 rounded-lg hover:bg-blue-900 transition"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
