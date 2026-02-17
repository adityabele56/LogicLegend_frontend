import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Mail, Calendar, MessageSquare, 
  BookOpen, BarChart2, Table, Layout, Lock, 
  ChevronRight, ChevronLeft, LogOut, User
} from 'lucide-react';
import logo from '../assets/image.png'

const AdminSidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const primaryYellow = "#FFD902"; 

  const menuGroups = [
    {
      title: "Menu Overview",
      links: [
        { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={22} /> },
        { name: 'Mailbox', path: '/admin/mailbox', icon: <Mail size={22} /> },
        { name: 'Get All Users', path: '/admin/alluser', icon: <User size={22} /> },
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
      // CHANGE: Width values increased (100 for collapsed, 340 for expanded)
      animate={{ width: isCollapsed ? 100 : 340 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="h-screen sticky top-0 bg-white flex flex-col border-r border-gray-100 shadow-[10px_0_30px_rgba(0,0,0,0.02)] z-50 overflow-hidden"
    >
      {/* COLLAPSE BUTTON */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-2 top-10 bg-white border border-gray-100 shadow-md rounded-full p-1 text-gray-400 hover:text-black transition-colors z-[60]"
      >
        {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>

      {/* BRANDING */}
      <div className={`p-8 flex items-center flex-shrink-0 ${isCollapsed ? 'justify-center' : 'gap-5'}`}>
        <div 
          className="min-w-[35px]  h-12 rounded-xl flex items-center justify-center shadow-lg"
          
        >
          <img src={logo} alt="eduvion" className='bg-transparent h-15 w-auto' />
        </div>
        {!isCollapsed && (
          <motion.span 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-2xl font-black text-[#1E293B] tracking-tight"
          >
            <span className="text-2xl font-semibold text-slate-900">
              Edu<span className="text-yellow-500">vion</span>
            </span>
          </motion.span>
        )}
      </div>

      {/* NAVIGATION - SCROLLABLE AREA */}
      <div className="flex-1 overflow-y-auto px-6 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>
        {menuGroups.map((group, idx) => (
          <div key={idx} className="mb-8">
            {!isCollapsed && (
              <p className="px-4 text-[11px] font-bold text-gray-300 uppercase tracking-[0.2em] mb-4">
                {group.title}
              </p>
            )}
            
            {group.links.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link key={link.name} to={link.path}>
                  <motion.div
                    className={`relative flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-5 py-4 my-1.5 rounded-[20px] transition-all duration-200 group
                      ${isActive ? 'bg-gray-50' : 'hover:bg-gray-50/50'}`}
                  >
                    <div className="flex items-center gap-5 z-10">
                      <span className={`transition-colors ${isActive ? 'text-black' : 'text-gray-400 group-hover:text-gray-700'}`}
                            style={isActive ? { color: primaryYellow } : {}}>
                        {link.icon}
                      </span>
                      {!isCollapsed && (
                        <span className={`text-[15px] font-bold ${isActive ? 'text-[#1E293B]' : 'text-gray-500 group-hover:text-gray-800'}`}>
                          {link.name}
                        </span>
                      )}
                    </div>

                    {isActive && (
                      <motion.div 
                        layoutId="activeBar"
                        className="absolute left-[-24px] w-2 h-7 rounded-r-full"
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
      <div className="p-8 border-t border-gray-50 flex-shrink-0">
        <button className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-5 px-5'} py-4 rounded-[20px] text-red-500 hover:bg-red-50 transition-all group`}>
          <LogOut size={22} />
          {!isCollapsed && <span className="text-[15px] font-black tracking-wide">LOGOUT</span>}
        </button>
      </div>
    </motion.aside>
  );
};

export default AdminSidebar;