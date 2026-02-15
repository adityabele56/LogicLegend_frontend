import React, { useState } from "react";
import {
  Search,
  Bell,
  User,
  Settings,
  LogOut,
  HelpCircle,
  ChevronDown,
  Moon,
  Sun,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AdminTopbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const navigate = useNavigate();
  const primaryYellow = "#FFD902";

  const handleNavigate = (path) => {
    navigate(path);
    setIsProfileOpen(false);
  };

  const handleLogout = () => {
    // Clear token / session here
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  return (
    <header className="h-20 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-40">
      
      {/* LEFT SEARCH */}
      <div className="relative w-96 group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search
            size={18}
            className="text-gray-400 group-focus-within:text-[#FFD902] transition-colors"
          />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#FFD902]/30 focus:border-[#FFD902] transition-all text-sm"
          placeholder="Search for courses, students, or analytics..."
        />
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-6">

        {/* Theme Toggle */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2.5 rounded-xl hover:bg-gray-50 text-gray-500 transition-all"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Notifications */}
        <div className="relative cursor-pointer group">
           <button
                    onClick={() => handleNavigate("/admin/notification")}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-600 hover:bg-[#FFFDF5] hover:text-[#FFD902] rounded-xl transition-all"
            >
          <div className="p-2.5 rounded-xl hover:bg-gray-50 text-gray-500 transition-all">
            <Bell size={20} />
            
            <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 border-2 border-white"></span>
            </span>
          </div>
          </button>
        </div>

        {/* PROFILE SECTION */}
        <div className="relative">
          <motion.div
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 pl-4 border-l border-gray-100 cursor-pointer group"
          >
            <div className="text-right hidden md:block">
              <p className="text-sm font-black text-[#1E293B]">Rahul Kumar</p>
              <p className="text-[11px] font-bold text-gray-400 uppercase">
                Super Admin
              </p>
            </div>

            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-gray-100 border-2 border-white overflow-hidden shadow-sm group-hover:border-[#FFD902] transition-all duration-300">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                  alt="Admin"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
            </div>

            <ChevronDown
              size={16}
              className={`text-gray-400 transition-transform duration-300 ${
                isProfileOpen ? "rotate-180" : ""
              }`}
            />
          </motion.div>

          {/* DROPDOWN */}
          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="absolute right-0 mt-4 w-64 bg-white rounded-[24px] shadow-xl border border-gray-50 p-2"
              >
                <div className="px-4 py-4 border-b border-gray-50 mb-2">
                  <p className="text-xs font-bold text-gray-400 uppercase">
                    Welcome back!
                  </p>
                  <p className="text-sm font-black text-[#1E293B]">
                    rahul.admin@eduvion.com
                  </p>
                </div>

                <div className="space-y-1">
                  <button
                    onClick={() => handleNavigate("/admin/adminprofile")}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-600 hover:bg-[#FFFDF5] hover:text-[#FFD902] rounded-xl transition-all"
                  >
                    <User size={18} />
                    My Profile
                  </button>

                  <button
                    onClick={() => handleNavigate("/admin/adminsettings")}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-600 hover:bg-[#FFFDF5] hover:text-[#FFD902] rounded-xl transition-all"
                  >
                    <Settings size={18} />
                    Settings
                  </button>

                  <button
                    onClick={() => handleNavigate("/admin/help")}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-600 hover:bg-[#FFFDF5] hover:text-[#FFD902] rounded-xl transition-all"
                  >
                    <HelpCircle size={18} />
                    Help Center
                  </button>
                </div>

                <div className="mt-2 pt-2 border-t border-gray-50">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <LogOut size={18} />
                    Log Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;
