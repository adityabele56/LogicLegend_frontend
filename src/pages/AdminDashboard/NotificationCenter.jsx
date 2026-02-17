import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bell, 
  CheckCheck, 
  Trash2, 
  UserPlus, 
  CreditCard, 
  AlertCircle, 
  Clock, 
  MoreVertical,
  BellOff
} from "lucide-react";

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "user",
      title: "New Student Enrolled",
      desc: "Rahul Sharma just joined the 'React Mastery' course.",
      time: "2 mins ago",
      isRead: false,
      icon: <UserPlus size={18} />,
      color: "bg-blue-100 text-blue-600"
    },
    {
      id: 2,
      type: "payment",
      title: "Payment Received",
      desc: "Transaction #EDV-9921 for ₹4,999 was successful.",
      time: "45 mins ago",
      isRead: false,
      icon: <CreditCard size={18} />,
      color: "bg-emerald-100 text-emerald-600"
    },
    {
      id: 3,
      type: "alert",
      title: "Server Maintenance",
      desc: "System will be down for 15 mins at midnight.",
      time: "2 hours ago",
      isRead: true,
      icon: <AlertCircle size={18} />,
      color: "bg-amber-100 text-amber-600"
    }
  ]);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const clearAll = () => setNotifications([]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10">
      <div className="max-w-2xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-[1000] text-[#0F2F57] tracking-tighter uppercase">
              Alerts <span className="text-[#F4B400]">&</span> Updates
            </h1>
            <p className="text-slate-400 font-bold text-[10px] tracking-[0.2em] mt-1">
              You have {notifications.filter(n => !n.isRead).length} unread notifications
            </p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={markAllRead}
              className="p-3 bg-white rounded-2xl text-slate-400 hover:text-[#F4B400] transition-all shadow-sm border border-slate-100"
              title="Mark all as read"
            >
              <CheckCheck size={20} />
            </button>
            <button 
              onClick={clearAll}
              className="p-3 bg-white rounded-2xl text-slate-400 hover:text-rose-500 transition-all shadow-sm border border-slate-100"
              title="Clear all"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>

        {/* --- NOTIFICATIONS LIST --- */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {notifications.length > 0 ? (
              notifications.map((n) => (
                <motion.div
                  key={n.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className={`relative p-5 rounded-[30px] border transition-all flex gap-5 group ${
                    n.isRead ? "bg-white border-slate-100" : "bg-white border-[#F4B400]/30 shadow-xl shadow-[#F4B400]/5"
                  }`}
                >
                  {/* UNREAD DOT */}
                  {!n.isRead && (
                    <div className="absolute top-6 right-6 w-2.5 h-2.5 bg-[#F4B400] rounded-full animate-pulse" />
                  )}

                  {/* ICON */}
                  <div className={`w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center ${n.color}`}>
                    {n.icon}
                  </div>

                  {/* CONTENT */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className={`font-black text-sm ${n.isRead ? "text-slate-600" : "text-[#0F2F57]"}`}>
                        {n.title}
                      </h3>
                    </div>
                    <p className="text-slate-400 text-xs font-medium leading-relaxed mb-3">
                      {n.desc}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                      <Clock size={12} />
                      {n.time}
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex flex-col justify-between items-end">
                    <button 
                      onClick={() => deleteNotification(n.id)}
                      className="opacity-0 group-hover:opacity-100 p-2 text-slate-300 hover:text-rose-500 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                    {!n.isRead && (
                      <button className="text-[10px] font-black text-[#F4B400] uppercase tracking-tighter hover:underline">
                        View
                      </button>
                    )}
                  </div>
                </motion.div>
              ))
            ) : (
              /* EMPTY STATE */
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="py-20 flex flex-col items-center text-center"
              >
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 mb-6">
                  <BellOff size={40} />
                </div>
                <h3 className="text-xl font-black text-[#0F2F57]">All caught up!</h3>
                <p className="text-slate-400 text-sm font-medium mt-1">No new notifications at the moment.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* --- SETTINGS LINK --- */}
        <div className="mt-10 p-6 bg-[#0F2F57] rounded-[35px] flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="p-2 bg-white/10 rounded-xl">
                 <Bell className="text-[#F4B400]" size={18} />
              </div>
              <p className="text-white text-xs font-bold uppercase tracking-widest">Notification Preferences</p>
           </div>
           <button className="bg-[#F4B400] text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">
              Configure
           </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;