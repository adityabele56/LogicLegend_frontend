import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronUp, ChevronDown, Trash2, User, Mail, Book, Filter, ChevronLeft, ChevronRight } from "lucide-react";

const DataTable = () => {
  /* ================= DATA GENERATION ================= */
  const initialData = Array.from({ length: 120 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    course: ["React Mastery", "UI/UX Design", "Marketing Pro", "Business Dev"][i % 4],
    status: i % 3 === 0 ? "Inactive" : "Active",
  }));

  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 10;

  /* ================= SEARCH & SORT LOGIC ================= */
  const filteredAndSortedData = useMemo(() => {
    let result = data.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase()) ||
        item.course.toLowerCase().includes(search.toLowerCase())
    );

    if (sortField) {
      result.sort((a, b) => {
        if (a[sortField] < b[sortField]) return sortOrder === "asc" ? -1 : 1;
        if (a[sortField] > b[sortField]) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }
    return result;
  }, [data, search, sortField, sortOrder]);

  /* ================= PAGINATION LOGIC ================= */
  const totalPages = Math.ceil(filteredAndSortedData.length / rowsPerPage);
  const paginatedData = filteredAndSortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setData(data.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto">
        
        {/* ================= HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-[1000] text-[#0F2F57] tracking-tighter uppercase">
              Student <span className="text-[#F4B400]">Database</span>
            </h1>
            <p className="text-slate-400 font-bold text-[11px] tracking-[0.2em] mt-1">
              Total Records: {filteredAndSortedData.length}
            </p>
          </div>

          <div className="relative group w-full md:w-96">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#F4B400] transition-colors" size={20} />
            <input
              type="text"
              placeholder="Search by name, email or course..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-white border-2 border-slate-100 rounded-[22px] py-4 pl-14 pr-6 font-bold text-slate-700 outline-none focus:border-[#F4B400] transition-all shadow-sm"
            />
          </div>
        </div>

        {/* ================= TABLE CONTAINER ================= */}
        <div className="bg-white rounded-[40px] shadow-sm border border-slate-50 overflow-hidden relative">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                {[
                  { label: "Full Name", key: "name", icon: <User size={14}/> },
                  { label: "Email Address", key: "email", icon: <Mail size={14}/> },
                  { label: "Enrolled Course", key: "course", icon: <Book size={14}/> },
                  { label: "Status", key: null },
                  { label: "Action", key: null, center: true },
                ].map((head, i) => (
                  <th 
                    key={i} 
                    onClick={() => head.key && handleSort(head.key)}
                    className={`p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ${head.key ? 'cursor-pointer hover:text-[#F4B400]' : ''} ${head.center ? 'text-center' : ''}`}
                  >
                    <div className={`flex items-center gap-2 ${head.center ? 'justify-center' : ''}`}>
                      {head.icon} {head.label}
                      {sortField === head.key && (
                        sortOrder === "asc" ? <ChevronUp size={14} className="text-[#F4B400]"/> : <ChevronDown size={14} className="text-[#F4B400]"/>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            
            <tbody className="divide-y divide-slate-50">
              <AnimatePresence mode="wait">
                {paginatedData.length > 0 ? (
                  paginatedData.map((item, idx) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: idx * 0.03 }}
                      className="group hover:bg-[#F4B400]/5 transition-colors"
                    >
                      <td className="p-6">
                        <span className="font-black text-slate-700 tracking-tight text-md">{item.name}</span>
                      </td>
                      <td className="p-6 font-bold text-slate-400">{item.email}</td>
                      <td className="p-6">
                        <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-[11px] font-black uppercase tracking-tight italic">
                          #{item.course}
                        </span>
                      </td>
                      <td className="p-6">
                        <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm ${
                          item.status === "Active" ? "bg-emerald-500 text-white" : "bg-rose-100 text-rose-500"
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="p-6">
                        <div className="flex justify-center">
                          <button 
                            onClick={() => handleDelete(item.id)}
                            className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-20 text-center">
                       <div className="flex flex-col items-center opacity-20">
                          <Search size={48} className="mb-4" />
                          <p className="font-black uppercase tracking-widest">No Results Found</p>
                       </div>
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* ================= PAGINATION ================= */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-10 gap-6">
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-50">
            Showing <span className="text-[#0F2F57]">{paginatedData.length}</span> of <span className="text-[#0F2F57]">{filteredAndSortedData.length}</span> entries
          </p>

          <div className="flex items-center gap-2 bg-white p-2 rounded-[24px] shadow-sm border border-slate-50">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-[#F4B400] hover:text-white disabled:opacity-30 disabled:hover:bg-slate-50 transition-all"
            >
              <ChevronLeft size={20} strokeWidth={3} />
            </button>
            
            <div className="flex gap-1 px-4">
              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-10 h-10 rounded-xl font-black text-xs transition-all ${
                      currentPage === pageNum ? "bg-[#0F2F57] text-white shadow-lg" : "text-slate-400 hover:bg-slate-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-[#F4B400] hover:text-white disabled:opacity-30 disabled:hover:bg-slate-50 transition-all"
            >
              <ChevronRight size={20} strokeWidth={3} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;