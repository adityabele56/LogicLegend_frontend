import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, Lock, LogOut, AlertTriangle, 
  Smartphone, Monitor, MapPin, Clock, CheckCircle2 
} from "lucide-react";

const Security = () => {
  /* ================= STATE ================= */
  const [twoFA, setTwoFA] = useState(true);
  const [accountLocked, setAccountLocked] = useState(false);
  const [securityAlerts, setSecurityAlerts] = useState(true);

  const [sessions, setSessions] = useState([
    { id: 1, device: "Chrome - Windows 11", location: "New Delhi, India", active: true, type: 'desktop' },
    { id: 2, device: "Safari - iPhone 15 Pro", location: "Mumbai, India", active: false, type: 'mobile' },
  ]);

  const [activityLogs] = useState([
    { id: 1, action: "Password Changed", time: "Today 10:30 AM", status: "success" },
    { id: 2, action: "New Login from Chrome", time: "Yesterday 08:12 PM", status: "warning" },
    { id: 3, action: "2FA Enabled", time: "2 Days Ago", status: "success" },
  ]);

  const [passwordForm, setPasswordForm] = useState({ current: "", newPass: "", confirm: "" });

  /* ================= HANDLERS ================= */
  const handlePasswordUpdate = () => {
    if (passwordForm.newPass !== passwordForm.confirm) {
      alert("Passwords do not match!");
      return;
    }
    alert("Security Key Updated! 🔑");
    setPasswordForm({ current: "", newPass: "", confirm: "" });
  };

  const toggleSession = (id) => {
    setSessions(sessions.map(s => s.id === id ? { ...s, active: !s.active } : s));
  };

  // Custom Toggle Component for reuse
  const Toggle = ({ enabled, onClick, color = "yellow" }) => (
    <div 
      onClick={onClick}
      className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-all duration-300 ${
        enabled ? (color === "yellow" ? "bg-[#F4B400]" : "bg-emerald-500") : "bg-slate-200"
      }`}
    >
      <motion.div 
        layout
        className="bg-white w-5 h-5 rounded-full shadow-md"
        animate={{ x: enabled ? 28 : 0 }}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="mb-10">
          <h1 className="text-4xl font-[1000] text-[#0F2F57] tracking-tighter uppercase">
            Security <span className="text-[#F4B400]">Vault</span>
          </h1>
          <p className="text-slate-400 font-bold text-[11px] tracking-[0.2em] mt-2">Manage your account protection and active sessions</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* --- LEFT COLUMN: PASSWORD & TOGGLES --- */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Password Section */}
            <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-2 h-full bg-[#F4B400]" />
               <h2 className="text-xl font-black text-[#0F2F57] mb-6 flex items-center gap-3">
                 <Lock className="text-[#F4B400]" /> Update Credentials
               </h2>
               <div className="grid md:grid-cols-1 gap-5">
                  <div className="space-y-4">
                    <input
                      type="password"
                      placeholder="Current Password"
                      className="w-full bg-slate-50 border-2 border-transparent rounded-2xl py-4 px-6 font-bold outline-none focus:border-[#F4B400] transition-all"
                      value={passwordForm.current}
                      onChange={(e) => setPasswordForm({...passwordForm, current: e.target.value})}
                    />
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="password"
                        placeholder="New Password"
                        className="bg-slate-50 border-2 border-transparent rounded-2xl py-4 px-6 font-bold outline-none focus:border-[#F4B400] transition-all"
                        value={passwordForm.newPass}
                        onChange={(e) => setPasswordForm({...passwordForm, newPass: e.target.value})}
                      />
                      <input
                        type="password"
                        placeholder="Confirm New Password"
                        className="bg-slate-50 border-2 border-transparent rounded-2xl py-4 px-6 font-bold outline-none focus:border-[#F4B400] transition-all"
                        value={passwordForm.confirm}
                        onChange={(e) => setPasswordForm({...passwordForm, confirm: e.target.value})}
                      />
                    </div>
                  </div>
                  <button 
                    onClick={handlePasswordUpdate}
                    className="bg-[#0F2F57] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-indigo-100"
                  >
                    Save New Password
                  </button>
               </div>
            </div>

            {/* Security Controls Grid */}
            <div className="grid md:grid-cols-3 gap-6">
               {[
                 { label: "Two-Factor Auth", state: twoFA, set: setTwoFA, icon: <ShieldCheck /> },
                 { label: "Account Privacy", state: !accountLocked, set: () => setAccountLocked(!accountLocked), icon: <AlertTriangle /> },
                 { label: "Security Alerts", state: securityAlerts, set: setSecurityAlerts, icon: <Clock /> }
               ].map((item, i) => (
                 <div key={i} className="bg-white p-6 rounded-[35px] shadow-sm border border-slate-100 flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-[#F4B400] mb-4">
                       {item.icon}
                    </div>
                    <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-4">{item.label}</p>
                    <Toggle enabled={item.state} onClick={() => item.set(!item.state)} />
                 </div>
               ))}
            </div>

            {/* Active Sessions */}
            <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
               <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-black text-[#0F2F57] flex items-center gap-3">
                    <Smartphone className="text-[#F4B400]" /> Device Sessions
                  </h2>
                  <button onClick={() => setSessions([])} className="text-[10px] font-black text-rose-500 uppercase tracking-widest hover:underline">
                    Terminate All
                  </button>
               </div>
               <div className="space-y-4">
                  {sessions.map((s) => (
                    <div key={s.id} className="flex items-center justify-between p-5 bg-slate-50 rounded-3xl border border-transparent hover:border-[#F4B400]/20 transition-all">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                             {s.type === 'desktop' ? <Monitor size={20}/> : <Smartphone size={20}/>}
                          </div>
                          <div>
                             <h4 className="font-black text-[#0F2F57] text-sm">{s.device}</h4>
                             <p className="text-xs text-slate-400 font-bold flex items-center gap-1">
                               <MapPin size={12} /> {s.location}
                             </p>
                          </div>
                       </div>
                       <button 
                        onClick={() => toggleSession(s.id)}
                        className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${
                         s.active ? "bg-emerald-100 text-emerald-600" : "bg-slate-200 text-slate-500"
                       }`}>
                         {s.active ? "Active Now" : "Logged Out"}
                       </button>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: ACTIVITY LOG --- */}
          <div className="space-y-8">
             <div className="bg-[#0F2F57] p-8 rounded-[40px] shadow-2xl shadow-indigo-200 text-white relative overflow-hidden">
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full" />
                <h2 className="text-xl font-black mb-6 relative z-10">Security Log</h2>
                <div className="space-y-6 relative z-10">
                   {activityLogs.map((log) => (
                     <div key={log.id} className="flex gap-4 group">
                        <div className="flex flex-col items-center">
                           <div className={`w-3 h-3 rounded-full mt-1 ${log.status === 'success' ? 'bg-[#F4B400]' : 'bg-rose-400'}`} />
                           <div className="w-[2px] h-12 bg-white/10 group-last:hidden" />
                        </div>
                        <div>
                           <p className="text-sm font-bold text-white/90">{log.action}</p>
                           <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider">{log.time}</p>
                        </div>
                     </div>
                   ))}
                </div>
                <button className="w-full mt-8 py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all">
                   Download Full History
                </button>
             </div>

             <div className="bg-emerald-500 p-8 rounded-[40px] text-white flex items-center gap-5">
                <CheckCircle2 size={40} strokeWidth={3} />
                <div>
                   <h4 className="font-black text-lg leading-tight">Your account is secure.</h4>
                   <p className="text-xs font-bold opacity-80 mt-1">Last check: 5 mins ago</p>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Security;