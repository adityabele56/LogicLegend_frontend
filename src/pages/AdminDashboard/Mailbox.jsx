import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Mail, Send, FileText, AlertTriangle, 
  Star, Trash2, Archive, MoreVertical, Reply 
} from "lucide-react";

const Mailbox = () => {
  // Brand Color
  const primaryYellow = "#FFD902";

  // Dummy Data Generator (Enhanced with Avatars)
  const [messages] = useState(Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    sender: ["Rahul Sharma", "Anita Verma", "John Mathew", "Priya Singh"][i % 4],
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`,
    subject: ["Course Enrollment Issue", "Payment Confirmation", "New Request"][i % 3],
    message: "Bhai, I am facing an issue with the new React course enrollment. Can you please check if the payment was successful? Also, need the invoice for the same.",
    time: "10:25 AM",
    unread: i < 3,
    starred: i % 5 === 0
  })));

  const [selected, setSelected] = useState(messages[0]);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("Inbox");

  const filteredMessages = useMemo(() => {
    return messages.filter(
      (msg) =>
        msg.sender.toLowerCase().includes(search.toLowerCase()) ||
        msg.subject.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, messages]);

  return (
    <div className="flex h-[82vh] bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
      
      {/* --- LEFT NAVIGATION --- */}
      <div className="w-64 bg-gray-50/50 border-r border-gray-100 p-6 flex flex-col">
        <h2 className="text-2xl font-black text-[#1E293B] mb-8 px-2">Messages</h2>
        
        <div className="space-y-2 flex-1">
          {[
            { name: 'Inbox', icon: <Mail size={18} />, count: 3 },
            { name: 'Sent', icon: <Send size={18} /> },
            { name: 'Drafts', icon: <FileText size={18} /> },
            { name: 'Spam', icon: <AlertTriangle size={18} /> },
            { name: 'Trash', icon: <Trash2 size={18} /> },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-200 ${
                activeTab === item.name 
                ? "bg-white shadow-sm text-black font-bold" 
                : "text-gray-500 hover:bg-gray-100/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={activeTab === item.name ? "text-[#FFD902]" : ""}>{item.icon}</span>
                <span className="text-sm">{item.name}</span>
              </div>
              {item.count && (
                <span className="bg-[#FFD902] text-[10px] font-black px-2 py-0.5 rounded-lg shadow-sm">
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Storage Info Card */}
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">Storage</p>
          <div className="w-full bg-gray-100 h-1.5 rounded-full mb-2">
            <div className="bg-[#FFD902] h-full rounded-full" style={{ width: '75%' }}></div>
          </div>
          <p className="text-[10px] font-bold text-gray-600">7.5 GB of 10 GB used</p>
        </div>
      </div>

      {/* --- MIDDLE: MESSAGE LIST --- */}
      <div className="w-[400px] border-r border-gray-100 flex flex-col bg-white">
        <div className="p-6 border-b border-gray-50">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FFD902] transition-colors" size={16} />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#FFD902] outline-none text-sm transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar">
          {filteredMessages.map((msg) => (
            <div
              key={msg.id}
              onClick={() => setSelected(msg)}
              className={`p-5 border-b border-gray-50 cursor-pointer transition-all relative ${
                selected?.id === msg.id ? "bg-[#FFFDF5]" : "hover:bg-gray-50/50"
              }`}
            >
              {selected?.id === msg.id && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#FFD902]" />
              )}
              
              <div className="flex gap-4">
                <img src={msg.avatar} alt="" className="w-10 h-10 rounded-xl bg-gray-100 border border-gray-50" />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <p className={`text-sm truncate ${msg.unread ? "font-black text-black" : "font-bold text-gray-500"}`}>
                      {msg.sender}
                    </p>
                    <span className="text-[10px] font-bold text-gray-400 whitespace-nowrap">{msg.time}</span>
                  </div>
                  <p className="text-xs font-bold text-gray-800 truncate mb-1">{msg.subject}</p>
                  <p className="text-xs text-gray-400 truncate leading-relaxed">{msg.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- RIGHT: MESSAGE PREVIEW --- */}
      <div className="flex-1 flex flex-col bg-white">
        {selected ? (
          <>
            {/* Toolbar */}
            <div className="p-4 border-b border-gray-50 flex justify-between items-center px-8">
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-400 transition-colors"><Archive size={18}/></button>
                <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-400 transition-colors"><Trash2 size={18}/></button>
                <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-400 transition-colors"><Star size={18}/></button>
              </div>
              <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-400 transition-colors"><MoreVertical size={18}/></button>
            </div>

            <div className="flex-1 overflow-y-auto p-10 no-scrollbar">
              <div className="max-w-3xl">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <img src={selected.avatar} alt="" className="w-14 h-14 rounded-2xl shadow-sm border border-gray-100" />
                    <div>
                      <h3 className="text-xl font-black text-[#1E293B]">{selected.sender}</h3>
                      <p className="text-xs font-bold text-gray-400">to me (admin@eduvion.com)</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-gray-400 bg-gray-50 px-3 py-1.5 rounded-lg">{selected.time}</span>
                </div>

                <h4 className="text-2xl font-black text-black mb-6 leading-tight">
                  {selected.subject}
                </h4>

                <div className="bg-gray-50/50 rounded-[32px] p-8 border border-gray-50">
                  <p className="text-md leading-[1.8] text-gray-600 font-medium">
                    {selected.message}
                  </p>
                </div>

                {/* Reply Section */}
                <div className="mt-8 flex gap-4">
                   <button 
                    className="px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-2 shadow-lg shadow-yellow-100 transition-transform active:scale-95"
                    style={{ backgroundColor: primaryYellow }}
                   >
                     <Reply size={18}/> Reply Now
                   </button>
                   <button className="px-6 py-3 rounded-2xl font-black text-sm text-gray-500 border border-gray-100 hover:bg-gray-50 transition-all">
                     Forward
                   </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-10">
            <div className="w-64 h-64 bg-gray-50 rounded-full flex items-center justify-center mb-6">
               <Mail size={80} className="text-gray-200" />
            </div>
            <h3 className="text-xl font-black text-gray-800">No message selected</h3>
            <p className="text-sm text-gray-400 mt-2">Pick a conversation from the list to start reading.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mailbox;