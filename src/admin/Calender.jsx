import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Bell } from "lucide-react";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const today = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
  const events = [5, 12, 18, 25];

  return (
    // Parent Div jo sab kuch center karega
    <div className="flex items-center justify-center min-h-[500px] w-full bg-gray-50/50 rounded-[40px] p-6">
      
      {/* Calendar Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[360px] bg-white p-8 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100"
      >
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-[1000] text-slate-800 tracking-tighter">
            {monthNames[month]} <span className="text-slate-300">{year}</span>
          </h3>

          <div className="flex gap-2 bg-slate-50 p-1.5 rounded-2xl">
            <button 
              onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
              className="p-2 hover:bg-white hover:shadow-sm rounded-xl transition-all text-slate-500"
            >
              <ChevronLeft size={16} strokeWidth={3} />
            </button>
            <button 
              onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
              className="p-2 hover:bg-white hover:shadow-sm rounded-xl transition-all text-slate-500"
            >
              <ChevronRight size={16} strokeWidth={3} />
            </button>
          </div>
        </div>

        {/* Weekdays */}
        <div className="grid grid-cols-7 mb-4">
          {weekDays.map((day, i) => (
            <div key={i} className="text-center text-[11px] font-[900] text-slate-300 uppercase tracking-widest">
              {day}
            </div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-1">
          {[...Array(firstDayOfMonth)].map((_, i) => (
            <div key={`empty-${i}`} className="h-11 w-11" />
          ))}

          {[...Array(daysInMonth)].map((_, index) => {
            const day = index + 1;
            const isToday = today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
            const isSelected = selectedDate?.getDate() === day && selectedDate?.getMonth() === month;
            const hasEvent = events.includes(day);

            return (
              <motion.div
                key={day}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedDate(new Date(year, month, day))}
                className={`relative h-11 w-11 flex items-center justify-center rounded-[14px] cursor-pointer transition-all text-sm font-black
                  ${isSelected ? "bg-slate-900 text-white shadow-xl scale-110 z-10" : "hover:bg-slate-50 text-slate-600"}
                  ${isToday && !isSelected ? "text-[#FFD902] bg-[#FFD902]/5" : ""}
                `}
              >
                {day}
                {hasEvent && (
                  <span className={`absolute bottom-2 w-1 h-1 rounded-full ${isSelected ? "bg-[#FFD902]" : "bg-slate-300"}`} />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#FFD902] flex items-center justify-center text-black shadow-lg shadow-yellow-100">
                    <Bell size={18} strokeWidth={2.5} />
                </div>
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Next Event</p>
                    <p className="text-xs font-black text-slate-800">UX Design Review</p>
                </div>
            </div>
            <div className="text-[10px] font-black bg-slate-50 px-3 py-1.5 rounded-lg text-slate-400">
                10:00 AM
            </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Calendar;