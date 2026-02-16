import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Filter, UserPlus, Mail, Phone, 
  Trash2, Edit2, Download, MoreHorizontal,
  CheckCircle, XCircle, ChevronLeft, ChevronRight,
  UserCheck, ShieldAlert
} from "lucide-react";

const AllUsers = () => {
  // 1. ================= STATE =================
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 4;

  const [users, setUsers] = useState([
    { id: 1, name: "Rahul Kumar", email: "rahul@eduvion.pro", role: "Student", status: "Active", img: "https://i.pravatar.cc/150?u=1" },
    { id: 2, name: "Sneha Kapoor", email: "sneha@eduvion.pro", role: "Instructor", status: "Active", img: "https://i.pravatar.cc/150?u=2" },
    { id: 3, name: "Amit Singh", email: "amit@eduvion.pro", role: "Student", status: "Pending", img: "https://i.pravatar.cc/150?u=3" },
    { id: 4, name: "Priya Das", email: "priya@eduvion.pro", role: "Moderator", status: "Suspended", img: "https://i.pravatar.cc/150?u=4" },
    { id: 5, name: "Vikram Rathore", email: "vikram@eduvion.pro", role: "Student", status: "Active", img: "https://i.pravatar.cc/150?u=5" },
    { id: 6, name: "Anjali Gupta", email: "anjali@eduvion.pro", role: "Instructor", status: "Active", img: "https://i.pravatar.cc/150?u=6" },
  ]);

  // 2. ================= LOGIC: SEARCH & FILTER =================
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = filterRole === "All" || user.role === filterRole;
      return matchesSearch && matchesRole;
    });
  }, [users, searchTerm, filterRole]);

  // 3. ================= LOGIC: PAGINATION =================
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // 4. ================= ACTIONS =================
  const handleDelete = (id) => {
    if(window.confirm("Bhai, are you sure? User delete ho jayega!")) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const toggleStatus = (id) => {
    setUsers(users.map(u => {
      if(u.id === id) {
        const nextStatus = u.status === "Active" ? "Suspended" : "Active";
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-[1000] text-[#0F2F57] tracking-tighter uppercase">
              User <span className="text-[#F4B400]">Database</span>
            </h1>
            <p className="text-slate-400 font-bold text-[11px] tracking-[0.2em] mt-2">Total {users.length} registered members</p>
          </div>
          <button className="bg-[#0F2F57] text-[#F4B400] px-8 py-4 rounded-[20px] font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-black transition-all flex items-center gap-3">
            <UserPlus size={18} /> Add New Member
          </button>
        </div>

        {/* --- CONTROLS: SEARCH & ROLE FILTER --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8">
          <div className="md:col-span-8 relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
            <input 
              type="text"
              placeholder="Search by name or email..."
              className="w-full bg-white border-2 border-slate-50 rounded-[25px] py-5 pl-16 pr-6 font-bold text-sm shadow-sm focus:border-[#F4B400] outline-none transition-all"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            />
          </div>
          <div className="md:col-span-4">
            <select 
              className="w-full bg-white border-2 border-slate-50 rounded-[25px] py-5 px-6 font-black text-[10px] uppercase tracking-widest text-[#0F2F57] shadow-sm outline-none focus:border-[#F4B400] cursor-pointer"
              value={filterRole}
              onChange={(e) => { setFilterRole(e.target.value); setCurrentPage(1); }}
            >
              <option value="All">All Roles</option>
              <option value="Student">Students</option>
              <option value="Instructor">Instructors</option>
              <option value="Moderator">Moderators</option>
            </select>
          </div>
        </div>

        {/* --- TABLE CONTAINER --- */}
        <div className="bg-white rounded-[45px] shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">User Details</th>
                  <th className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Access Level</th>
                  <th className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                  <th className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Operations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <AnimatePresence mode="wait">
                  {currentUsers.length > 0 ? currentUsers.map((user) => (
                    <motion.tr 
                      key={user.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="group hover:bg-slate-50/50 transition-all"
                    >
                      <td className="p-8">
                        <div className="flex items-center gap-5">
                          <img src={user.img} className="w-14 h-14 rounded-[20px] object-cover shadow-lg group-hover:scale-110 transition-transform" alt="" />
                          <div>
                            <p className="font-black text-[#0F2F57] text-md">{user.name}</p>
                            <p className="text-xs text-slate-400 font-bold mt-0.5 italic">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-8">
                        <span className="bg-slate-100 text-[#0F2F57] px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">
                          {user.role}
                        </span>
                      </td>
                      <td className="p-8">
                        <button 
                          onClick={() => toggleStatus(user.id)}
                          className={`flex items-center gap-2 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-tighter transition-all ${
                            user.status === 'Active' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
                          }`}
                        >
                          <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-600' : 'bg-rose-600 animate-pulse'}`} />
                          {user.status}
                        </button>
                      </td>
                      <td className="p-8">
                        <div className="flex justify-end gap-3">
                          <button className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-[#F4B400] hover:bg-white hover:shadow-md transition-all">
                            <Edit2 size={16} />
                          </button>
                          <button 
                            onClick={() => handleDelete(user.id)}
                            className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-rose-500 hover:bg-white hover:shadow-md transition-all"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  )) : (
                    <tr>
                      <td colSpan="4" className="p-20 text-center text-slate-400 font-bold uppercase tracking-widest text-xs">
                        No users found matching your search.
                      </td>
                    </tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* --- PAGINATION CONTROLS --- */}
          <div className="p-8 bg-slate-50/50 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
              Page <span className="text-[#0F2F57]">{currentPage}</span> of {totalPages || 1}
            </p>
            <div className="flex gap-3">
              <button 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                className={`p-4 rounded-2xl transition-all ${currentPage === 1 ? 'text-slate-200 cursor-not-allowed' : 'bg-white text-[#0F2F57] shadow-sm hover:bg-[#F4B400] hover:text-white'}`}
              >
                <ChevronLeft size={20} />
              </button>
              
              {[...Array(totalPages)].map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-12 h-12 rounded-2xl font-black text-xs transition-all ${currentPage === i + 1 ? 'bg-[#F4B400] text-white shadow-lg shadow-yellow-100' : 'bg-white text-slate-400 hover:bg-slate-100'}`}
                >
                  {i + 1}
                </button>
              ))}

              <button 
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage(prev => prev + 1)}
                className={`p-4 rounded-2xl transition-all ${currentPage === totalPages || totalPages === 0 ? 'text-slate-200 cursor-not-allowed' : 'bg-white text-[#0F2F57] shadow-sm hover:bg-[#F4B400] hover:text-white'}`}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AllUsers;