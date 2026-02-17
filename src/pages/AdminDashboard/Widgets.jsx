import React from "react";
import { motion } from "framer-motion";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  Tooltip 
} from "recharts";
import { TrendingUp, TrendingDown, IndianRupee, Users, ShoppingBag, ArrowUpRight } from "lucide-react";

const Widgets = () => {
  /* ================= DATA ================= */
  const revenueData = [{ v: 4000 }, { v: 6000 }, { v: 8000 }, { v: 7500 }, { v: 9000 }, { v: 12000 }];
  const usersData = [{ v: 200 }, { v: 350 }, { v: 500 }, { v: 800 }, { v: 1200 }, { v: 1500 }];
  const ordersData = [{ v: 30 }, { v: 45 }, { v: 60 }, { v: 55 }, { v: 70 }, { v: 95 }];

  const WidgetCard = ({ title, amount, growth, data, icon: Icon, color }) => {
    const isPositive = growth >= 0;

    return (
      <motion.div
        whileHover={{ y: -10 }}
        className="bg-white p-6 rounded-[35px] shadow-sm border border-slate-100 relative overflow-hidden group transition-all"
      >
        {/* Background Decorative Circle */}
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-slate-50 rounded-full group-hover:bg-[#F4B400]/10 transition-colors duration-500" />

        <div className="relative z-10">
          {/* Top Row: Icon & Growth */}
          <div className="flex justify-between items-start mb-6">
            <div className={`p-4 rounded-2xl ${color === 'yellow' ? 'bg-[#F4B400] text-white' : 'bg-[#0F2F57] text-white'} shadow-lg shadow-indigo-100`}>
              <Icon size={24} strokeWidth={2.5} />
            </div>
            
            <div className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-[11px] font-black tracking-tight ${
              isPositive ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"
            }`}>
              {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {isPositive ? `+${growth}%` : `${growth}%`}
            </div>
          </div>

          {/* Amount & Title */}
          <div className="mb-6">
            <h3 className="text-slate-400 font-black uppercase text-[10px] tracking-[0.2em] mb-1">{title}</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-[1000] text-[#0F2F57] tracking-tighter">{amount}</span>
              <ArrowUpRight size={16} className="text-[#F4B400] opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Mini Area Chart */}
          <div className="h-20 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id={`colorGap-${title}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color === 'yellow' ? "#F4B400" : "#0F2F57"} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={color === 'yellow' ? "#F4B400" : "#0F2F57"} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke={color === 'yellow' ? "#F4B400" : "#0F2F57"}
                  strokeWidth={3}
                  fillOpacity={1}
                  fill={`url(#colorGap-${title})`}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-[1000] text-[#0F2F57] tracking-tighter">
            Business <span className="text-[#F4B400]">Insights</span>
          </h1>
          <div className="h-1.5 w-24 bg-[#F4B400] rounded-full mt-2" />
        </div>

        {/* Widgets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <WidgetCard
            title="Total Revenue"
            amount="₹4.52L"
            growth={18.5}
            data={revenueData}
            icon={IndianRupee}
            color="yellow"
          />

          <WidgetCard
            title="Active Students"
            amount="3,200"
            growth={25.2}
            data={usersData}
            icon={Users}
            color="navy"
          />

          <WidgetCard
            title="Course Sales"
            amount="1,240"
            growth={-5.4}
            data={ordersData}
            icon={ShoppingBag}
            color="yellow"
          />
        </div>

        {/* --- Enhancement: Bottom Quick Stats Bar --- */}
        <div className="mt-12 bg-[#0F2F57] rounded-[30px] p-8 flex flex-wrap justify-between items-center shadow-2xl shadow-indigo-200">
           <div className="flex flex-col">
              <span className="text-white/50 text-[10px] font-black uppercase tracking-widest">Live Updates</span>
              <span className="text-white font-bold">System Status: <span className="text-[#F4B400]">Operational</span></span>
           </div>
           <div className="flex gap-4">
              <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-2xl text-xs font-black transition-all">
                 VIEW DETAILED REPORTS
              </button>
              <button className="bg-[#F4B400] text-white px-6 py-3 rounded-2xl text-xs font-black transition-all shadow-lg shadow-yellow-500/20">
                 DOWNLOAD CSV
              </button>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Widgets;