import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Users, Award, BookOpen, MessageSquare, 
  MoreVertical, ArrowUpRight, PlayCircle, X 
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from 'recharts';

const data = [
  { name: 'Jan', progress: 20 },
  { name: 'Feb', progress: 45 },
  { name: 'Mar', progress: 30 },
  { name: 'Apr', progress: 65 },
  { name: 'May', progress: 85 },
  { name: 'Jun', progress: 75 },
];

const AdminDashboard = () => {
  const [openModal, setOpenModal] = useState(false);
  const primaryYellow = "#FFD902";

  const [courseData, setCourseData] = useState({ title: "", instructor: "", price: "" });

  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Course Created Successfully ✅");
    setOpenModal(false);
  };

  return (
    <div className="space-y-10 pb-10">
      
      {/* ---------------- TOP BANNER (Elevated) ---------------- */}
      <div className="bg-[#1E293B] rounded-[40px] p-10 flex flex-col md:flex-row items-center justify-between relative overflow-hidden shadow-2xl">
        <div className="z-10 text-white max-w-lg">
          <h1 className="text-4xl font-[900] mb-4 leading-tight tracking-tighter">
            Learn Effectively <span style={{ color: primaryYellow }}>With Us!</span>
          </h1>
          <p className="text-gray-400 text-lg mb-8 font-medium">
            Get 30% off every course this January. Expand your knowledge base with Eduvion's expert-led sessions.
          </p>
          <div className="flex gap-10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
                <Users size={24} className="text-[#FFD902]"/>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Students</p>
                <p className="text-2xl font-black">75,000+</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
                <Award size={24} className="text-[#FFD902]"/>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Mentors</p>
                <p className="text-2xl font-black">200+</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 md:mt-0 z-10">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpenModal(true)}
            className="px-8 py-4 rounded-[20px] font-black text-sm shadow-xl flex items-center gap-3 transition-all"
            style={{ backgroundColor: primaryYellow, color: '#000' }}
          >
            <Plus size={20} strokeWidth={3}/> CREATE NEW COURSE
          </motion.button>
        </div>

        {/* Decorative Circles */}
        <div className="absolute right-[-50px] top-[-50px] w-80 h-80 bg-[#FFD902]/10 rounded-full blur-[80px]"></div>
      </div>

      {/* ---------------- GRID SECTION ---------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* -------- Popular Courses (Card Style) -------- */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Popular Courses</h2>
            <button className="text-xs font-bold text-slate-400 hover:text-black">VIEW ALL</button>
          </div>

          {[
            { name: 'UI/UX Design', count: '30+ Courses', color: '#6366F1' },
            { name: 'Marketing', count: '25+ Courses', color: '#F43F5E' },
            { name: 'Web Dev.', count: '30+ Courses', color: '#10B981' },
            { name: 'Mathematics', count: '50+ Courses', color: '#3B82F6' },
          ].map((course, i) => (
            <motion.div 
              key={i} 
              whileHover={{ x: 10 }}
              className="bg-white p-5 rounded-[24px] flex items-center justify-between border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-white" style={{ backgroundColor: course.color }}>
                  {course.name[0]}
                </div>
                <div>
                  <p className="font-black text-slate-800">{course.name}</p>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">{course.count}</p>
                </div>
              </div>
              <button className="p-2 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-[#FFD902] group-hover:text-black transition-colors">
                <ArrowUpRight size={20}/>
              </button>
            </motion.div>
          ))}
        </div>

        {/* -------- Monthly Progress (Glassy Chart) -------- */}
        <div className="lg:col-span-5 bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-2xl font-[900] text-slate-800 tracking-tight">Monthly Progress</h2>
              <p className="text-xs text-slate-400 font-bold uppercase mt-1 tracking-widest">Efficiency Analytics</p>
            </div>
            <div className="p-3 bg-blue-50 text-blue-500 rounded-2xl">
              <PlayCircle size={24}/>
            </div>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorProg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={primaryYellow} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={primaryYellow} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700, fill: '#94A3B8'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="progress" stroke={primaryYellow} strokeWidth={4} fill="url(#colorProg)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-10">
            <div className="p-6 rounded-[24px] bg-[#FFD902] shadow-lg shadow-yellow-200/50">
              <p className="text-3xl font-[900]">450K+</p>
              <p className="text-[10px] font-black uppercase tracking-tighter text-black/60">Completed Courses</p>
            </div>
            <div className="p-6 rounded-[24px] bg-slate-900 text-white shadow-lg shadow-slate-200">
              <p className="text-3xl font-[900]">200K+</p>
              <p className="text-[10px] font-black uppercase tracking-tighter text-white/50">Video Content</p>
            </div>
          </div>
        </div>

        {/* -------- Instructors (Clean List) -------- */}
        <div className="lg:col-span-3 space-y-6">
          <h2 className="text-2xl font-black text-slate-800 tracking-tight px-2">Top Mentors</h2>
          {['Nil Yeager', 'Theron Trump', 'Tyler Mark', 'Johen Mark'].map((name, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-50 hover:border-[#FFD902] transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 border border-gray-100"></div>
                <p className="text-sm font-black text-slate-700">{name}</p>
              </div>
              <button className="text-[10px] font-black uppercase bg-slate-50 px-3 py-2 rounded-lg group-hover:bg-[#FFD902] transition-colors">
                Profile
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ---------------- CREATE COURSE MODAL (Pro) ---------------- */}
      <AnimatePresence>
        {openModal && (
          <div className="fixed inset-0 flex items-center justify-center z-[100] p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpenModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="bg-white p-10 rounded-[40px] w-full max-w-[500px] shadow-2xl relative z-10 overflow-hidden"
            >
              <button onClick={() => setOpenModal(false)} className="absolute top-6 right-6 p-2 hover:bg-slate-50 rounded-full">
                <X size={20}/>
              </button>
              
              <h2 className="text-3xl font-[900] mb-2 tracking-tighter">New Course</h2>
              <p className="text-slate-400 text-sm font-bold mb-8 uppercase tracking-widest">Fill in the details below</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase ml-1">Title</label>
                  <input type="text" name="title" placeholder="e.g. Master React in 30 Days" required onChange={handleChange}
                    className="w-full bg-slate-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-[#FFD902] outline-none font-bold text-slate-700 transition-all" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase ml-1">Price ($)</label>
                    <input type="number" name="price" placeholder="49.99" required onChange={handleChange}
                      className="w-full bg-slate-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-[#FFD902] outline-none font-bold text-slate-700 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase ml-1">Instructor</label>
                    <input type="text" name="instructor" placeholder="Name" required onChange={handleChange}
                      className="w-full bg-slate-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-[#FFD902] outline-none font-bold text-slate-700 transition-all" />
                  </div>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-5 rounded-[20px] font-black text-sm shadow-xl mt-4"
                  style={{ backgroundColor: primaryYellow }}
                >
                  PUBLISH COURSE
                </motion.button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;