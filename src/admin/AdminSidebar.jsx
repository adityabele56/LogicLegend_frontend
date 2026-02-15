import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Mail, Calendar, MessageSquare, 
  BookOpen, BarChart2, Table, Layout, Lock, 
  ChevronRight, ChevronLeft, LogOut, Search 
} from 'lucide-react';

const AdminSidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Tera naya Premium Yellow Color Code
  const primaryYellow = "#FFD902"; 

  const menuGroups = [
    {
      title: "Menu Overview",
      links: [
        { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={22} /> },
        { name: 'Mailbox', path: '/admin/mailbox', icon: <Mail size={22} /> },
        { name: 'Calendar', path: '/admin/calendar', icon: <Calendar size={22} /> },
        { name: 'Group chats', path: '/admin/chats', icon: <MessageSquare size={22} /> },
      ]
    },
    {
      title: "Organization",
      links: [
        { name: 'Courses', path: '/admin/courses', icon: <BookOpen size={22} /> },
        { name: 'Analytics', path: '/admin/charts', icon: <BarChart2 size={22} /> },
        { name: 'Data Tables', path: '/admin/tables', icon: <Table size={22} /> },
        { name: 'Widgets', path: '/admin/apps', icon: <Layout size={22} /> },
        { name: 'Security', path: '/admin/auth', icon: <Lock size={22} /> },
      ]
    }
  ];

  return (
    <motion.aside 
      animate={{ width: isCollapsed ? 90 : 300 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="h-screen bg-white flex flex-col border-r border-gray-100 shadow-[10px_0_30px_rgba(0,0,0,0.02)] z-50 relative"
    >
      {/* COLLAPSE BUTTON */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-10 bg-white border border-gray-100 shadow-md rounded-full p-1 text-gray-400 hover:text-black transition-colors z-[60]"
      >
        {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>

      {/* BRANDING */}
      <div className={`p-8 flex items-center ${isCollapsed ? 'justify-center' : 'gap-4'}`}>
        <div 
          className="min-w-[45px] h-11 rounded-xl flex items-center justify-center shadow-lg"
          style={{ backgroundColor: primaryYellow }}
        >
          <BookOpen className="text-black" size={22} strokeWidth={2.5} />
        </div>
        {!isCollapsed && (
          <motion.span 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-2xl font-black text-[#1E293B]"
          >
            Edu<span style={{ color: primaryYellow }}>vion</span>
          </motion.span>
        )}
      </div>

      {/* NAVIGATION - NO SCROLLBAR */}
      <div className="flex-1 overflow-y-auto px-4 no-scrollbar">
        {menuGroups.map((group, idx) => (
          <div key={idx} className="mb-6">
            {!isCollapsed && (
              <p className="px-4 text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-3">
                {group.title}
              </p>
            )}
            
            {group.links.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link key={link.name} to={link.path}>
                  <motion.div
                    className={`relative flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-4 py-3.5 my-1 rounded-2xl transition-all duration-200 group
                      ${isActive ? 'bg-gray-50' : 'hover:bg-gray-50/50'}`}
                  >
                    <div className="flex items-center gap-4 z-10">
                      <span className={`transition-colors ${isActive ? 'text-black' : 'text-gray-400 group-hover:text-gray-700'}`}
                            style={isActive ? { color: primaryYellow } : {}}>
                        {link.icon}
                      </span>
                      {!isCollapsed && (
                        <span className={`text-sm font-bold ${isActive ? 'text-[#1E293B]' : 'text-gray-500 group-hover:text-gray-800'}`}>
                          {link.name}
                        </span>
                      )}
                    </div>

                    {isActive && (
                      <motion.div 
                        layoutId="activeBar"
                        className="absolute left-[-16px] w-1.5 h-6 rounded-r-full"
                        style={{ backgroundColor: primaryYellow }}
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* LOGOUT BUTTON */}
      <div className="p-6 border-t border-gray-50">
        <button className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-4 px-4'} py-4 rounded-2xl text-red-500 hover:bg-red-50 transition-all group`}>
          <LogOut size={22} />
          {!isCollapsed && <span className="text-sm font-black">LOGOUT</span>}
        </button>
      </div>
    </motion.aside>
  );
};

export default AdminSidebar;