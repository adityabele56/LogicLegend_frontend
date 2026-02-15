import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Trash2, Edit, X, Filter, BookOpen, ChevronRight } from "lucide-react";

const Courses = () => {
  /* ================= STATE ================= */
  const [courses, setCourses] = useState([
    { id: 1, title: "React Mastery Pro", category: "Development", price: 4999, status: "Active" },
    { id: 2, title: "UI/UX Design Masterclass", category: "Design", price: 3999, status: "Active" },
    { id: 3, title: "Digital Marketing 2024", category: "Marketing", price: 2499, status: "Inactive" },
  ]);

  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editCourse, setEditCourse] = useState(null);

  const [form, setForm] = useState({ title: "", category: "Development", price: "", status: "Active" });

  /* ================= LOGIC ================= */
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.price) return;

    if (editCourse) {
      setCourses(courses.map((c) => (c.id === editCourse.id ? { ...form, id: editCourse.id } : c)));
    } else {
      setCourses([...courses, { ...form, id: Date.now() }]);
    }
    closeModal();
  };

  const closeModal = () => {
    setShowModal(false);
    setEditCourse(null);
    setForm({ title: "", category: "Development", price: "", status: "Active" });
  };

  const handleEdit = (course) => {
    setEditCourse(course);
    setForm(course);
    setShowModal(true);
  };

  const filteredCourses = courses.filter((c) => {
    return c.title.toLowerCase().includes(search.toLowerCase()) && 
           (filterCategory === "All" || c.category === filterCategory);
  });

  return (
    <div className="p-6 bg-[#F8FAFC] min-h-screen font-sans text-slate-900">
      
      {/* ================= HEADER SECTION ================= */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-[1000] text-[#0F2F57] tracking-tighter">
              Course <span className="text-[#F4B400]">Manager</span>
            </h1>
            <p className="text-slate-400 font-bold uppercase text-[11px] tracking-[0.2em] mt-2">
              Edurion Admin Control Panel
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05, shadow: "0 20px 25px -5px rgb(244 180 0 / 0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowModal(true)}
            className="bg-[#F4B400] text-white px-8 py-4 rounded-2xl flex items-center justify-center gap-3 font-black shadow-xl shadow-yellow-100 transition-all"
          >
            <Plus size={20} strokeWidth={4} /> ADD NEW COURSE
          </motion.button>
        </div>

        {/* ================= FILTER & SEARCH BAR ================= */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="md:col-span-3 relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#F4B400] transition-colors" size={20} />
            <input
              type="text"
              placeholder="Search by title, category or price..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border-2 border-slate-100 rounded-[22px] py-4 pl-14 pr-6 font-bold text-slate-700 outline-none focus:border-[#F4B400] transition-all shadow-sm"
            />
          </div>

          <div className="relative">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full bg-white border-2 border-slate-100 rounded-[22px] py-4 px-6 font-black text-slate-500 outline-none cursor-pointer appearance-none focus:border-[#F4B400] transition-all shadow-sm"
            >
              <option value="All">All Categories</option>
              <option value="Development">Development</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
            </select>
            <Filter size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
          </div>
        </div>

        {/* ================= DATA TABLE ================= */}
        <div className="bg-white rounded-[40px] shadow-sm border border-slate-50 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Course Details</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Category</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Pricing</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <AnimatePresence>
                {filteredCourses.map((course) => (
                  <motion.tr
                    key={course.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="group hover:bg-[#F4B400]/5 transition-colors"
                  >
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#F4B400]/10 rounded-2xl flex items-center justify-center text-[#F4B400]">
                          <BookOpen size={22} strokeWidth={2.5} />
                        </div>
                        <span className="font-black text-slate-700 tracking-tight text-lg">{course.title}</span>
                      </div>
                    </td>
                    <td className="p-6 font-bold text-slate-400 italic">#{course.category}</td>
                    <td className="p-6 font-black text-[#0F2F57] text-lg">₹{course.price}</td>
                    <td className="p-6">
                      <button 
                        onClick={() => {
                          setCourses(courses.map(c => c.id === course.id ? {...c, status: c.status === "Active" ? "Inactive" : "Active"} : c))
                        }}
                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm ${
                        course.status === "Active" ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-500"
                      }`}>
                        {course.status}
                      </button>
                    </td>
                    <td className="p-6">
                      <div className="flex justify-center gap-3">
                        <button onClick={() => handleEdit(course)} className="p-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-[#0F2F57] hover:text-white transition-all shadow-sm">
                          <Edit size={18} />
                        </button>
                        <button onClick={() => setCourses(courses.filter(c => c.id !== course.id))} className="p-3 bg-slate-100 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all shadow-sm">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= ADD/EDIT MODAL ================= */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-[#0F2F57]/20">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-[40px] w-full max-w-md p-10 shadow-2xl relative border-4 border-[#F4B400]"
            >
              <button onClick={closeModal} className="absolute right-6 top-6 p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
                <X size={24} strokeWidth={3} />
              </button>

              <h2 className="text-3xl font-[1000] text-[#0F2F57] mb-8 tracking-tighter">
                {editCourse ? "Edit Course" : "Add Course"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2 mb-2 block">Course Title</label>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border-2 border-transparent rounded-[20px] py-4 px-6 font-bold outline-none focus:border-[#F4B400] transition-all text-slate-700"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2 mb-2 block">Category</label>
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border-2 border-transparent rounded-[20px] py-4 px-4 font-black outline-none focus:border-[#F4B400] text-slate-600"
                    >
                      <option value="Development">Development</option>
                      <option value="Design">Design</option>
                      <option value="Marketing">Marketing</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2 mb-2 block">Price (₹)</label>
                    <input
                      type="number"
                      name="price"
                      value={form.price}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border-2 border-transparent rounded-[20px] py-4 px-6 font-black outline-none focus:border-[#F4B400] text-slate-700"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0F2F57] text-white py-5 rounded-[22px] font-black text-sm uppercase tracking-[0.2em] shadow-xl hover:bg-black transition-all mt-4"
                >
                  {editCourse ? "Update Details" : "Publish Course"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Courses;