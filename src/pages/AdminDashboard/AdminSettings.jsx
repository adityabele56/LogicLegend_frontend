import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Bell,
  Shield,
  Save,
  Eye,
  EyeOff,
  Mail,
  Smartphone,
  Moon,
  Lock,
  ChevronRight
} from "lucide-react";

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);

  const [settings, setSettings] = useState({
    fullName: "Rahul Kumar",
    email: "rahul.admin@eduvion.pro",
    phone: "+91 98765 43210",
    darkMode: false,
    emailNotifications: true,
    smsNotifications: false,
    twoFactorAuth: true,
    currentPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const tabs = [
    { id: "profile", label: "General Profile", icon: <User size={18} />, desc: "Public identity & info" },
    { id: "notifications", label: "Preferences", icon: <Bell size={18} />, desc: "System alerts & theme" },
    { id: "security", label: "Login & Security", icon: <Shield size={18} />, desc: "Passwords & 2FA" },
  ];

  // Custom Toggle Switch Component
  const ToggleSwitch = ({ name, checked, onChange }) => (
    <div 
      onClick={() => onChange({ target: { name, type: 'checkbox', checked: !checked }})}
      className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-all ${checked ? "bg-[#FFD902]" : "bg-gray-200"}`}
    >
      <motion.div 
        animate={{ x: checked ? 24 : 0 }}
        className="bg-white w-4 h-4 rounded-full shadow-sm"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="mb-10">
          <h1 className="text-4xl font-[1000] text-[#0F2F57] tracking-tighter uppercase">
            Admin <span className="text-[#FFD902]">Configuration</span>
          </h1>
          <p className="text-slate-400 font-bold text-[11px] tracking-[0.2em] mt-2 italic">Control your dashboard experience & security</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* --- SIDEBAR TABS --- */}
          <div className="lg:col-span-4 space-y-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between p-5 rounded-[25px] transition-all group ${
                  activeTab === tab.id
                    ? "bg-white shadow-xl shadow-gray-200/50 border-l-[6px] border-[#FFD902]"
                    : "hover:bg-white/50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl ${activeTab === tab.id ? "bg-[#FFD902] text-black" : "bg-white text-slate-400 shadow-sm"}`}>
                    {tab.icon}
                  </div>
                  <div className="text-left">
                    <p className={`font-black text-sm ${activeTab === tab.id ? "text-[#0F2F57]" : "text-slate-400"}`}>{tab.label}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{tab.desc}</p>
                  </div>
                </div>
                <ChevronRight size={16} className={`${activeTab === tab.id ? "text-[#FFD902]" : "text-transparent"}`} />
              </button>
            ))}
          </div>

          {/* --- CONTENT AREA --- */}
          <div className="lg:col-span-8">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-8 md:p-10 rounded-[40px] shadow-sm border border-slate-50 min-h-[500px] flex flex-col"
            >
              <div className="flex-1">
                {/* PROFILE CONTENT */}
                {activeTab === "profile" && (
                  <div className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Admin Name</label>
                        <input
                          type="text"
                          name="fullName"
                          value={settings.fullName}
                          onChange={handleChange}
                          className="w-full bg-slate-50 border-2 border-transparent rounded-2xl py-4 px-6 font-bold outline-none focus:border-[#FFD902] focus:bg-white transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                        <div className="relative">
                          <input
                            type="email"
                            name="email"
                            value={settings.email}
                            onChange={handleChange}
                            className="w-full bg-slate-50 border-2 border-transparent rounded-2xl py-4 px-6 font-bold outline-none focus:border-[#FFD902] focus:bg-white transition-all"
                          />
                          <Mail className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300" size={18}/>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Phone (International)</label>
                      <div className="relative">
                        <input
                          type="text"
                          name="phone"
                          value={settings.phone}
                          onChange={handleChange}
                          className="w-full bg-slate-50 border-2 border-transparent rounded-2xl py-4 px-6 font-bold outline-none focus:border-[#FFD902] focus:bg-white transition-all"
                        />
                        <Smartphone className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300" size={18}/>
                      </div>
                    </div>
                  </div>
                )}

                {/* NOTIFICATIONS CONTENT */}
                {activeTab === "notifications" && (
                  <div className="space-y-6">
                    {[
                      { id: 'emailNotifications', label: 'Email Alerts', desc: 'Get weekly performance reports via email', icon: <Mail size={18}/> },
                      { id: 'smsNotifications', label: 'SMS Security Logs', desc: 'Instant text alerts for unusual login activity', icon: <Smartphone size={18}/> },
                      { id: 'darkMode', label: 'System Dark Mode', desc: 'Reduce eye strain during night shifts', icon: <Moon size={18}/> }
                    ].map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-6 bg-slate-50 rounded-[25px] border border-transparent hover:border-[#FFD902]/30 transition-all">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-white rounded-xl shadow-sm text-[#0F2F57]">
                            {item.icon}
                          </div>
                          <div>
                            <p className="font-black text-sm text-[#0F2F57]">{item.label}</p>
                            <p className="text-xs text-slate-400 font-medium">{item.desc}</p>
                          </div>
                        </div>
                        <ToggleSwitch 
                          name={item.id} 
                          checked={settings[item.id]} 
                          onChange={handleChange} 
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* SECURITY CONTENT */}
                {activeTab === "security" && (
                  <div className="space-y-6">
                    <div className="p-6 bg-indigo-50 rounded-[25px] flex items-center justify-between mb-8">
                       <div className="flex gap-4 items-center">
                          <div className="bg-[#0F2F57] text-white p-3 rounded-xl shadow-lg">
                             <Lock size={18}/>
                          </div>
                          <div>
                             <p className="font-black text-sm text-[#0F2F57]">Two-Factor Authentication</p>
                             <p className="text-xs text-[#0F2F57]/60 font-medium">Highly recommended for Admin accounts</p>
                          </div>
                       </div>
                       <ToggleSwitch name="twoFactorAuth" checked={settings.twoFactorAuth} onChange={handleChange} />
                    </div>

                    <div className="space-y-5">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Current Secret Password</label>
                        <input
                          type="password"
                          name="currentPassword"
                          placeholder="••••••••••••"
                          value={settings.currentPassword}
                          onChange={handleChange}
                          className="w-full bg-slate-50 border-2 border-transparent rounded-2xl py-4 px-6 font-bold outline-none focus:border-[#FFD902] transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">New Password</label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            name="newPassword"
                            placeholder="Min. 8 characters"
                            value={settings.newPassword}
                            onChange={handleChange}
                            className="w-full bg-slate-50 border-2 border-transparent rounded-2xl py-4 px-6 font-bold outline-none focus:border-[#FFD902] transition-all"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-[#FFD902] transition-colors"
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* SAVE ACTION */}
              <div className="mt-12 pt-8 border-t border-slate-50">
                <button
                  onClick={() => alert("Vault Updated! 🔐")}
                  className="flex items-center gap-3 bg-[#0F2F57] hover:bg-black text-[#FFD902] px-10 py-5 rounded-[22px] font-[1000] text-xs uppercase tracking-[0.2em] shadow-2xl shadow-indigo-100 transition-all active:scale-95"
                >
                  <Save size={18} strokeWidth={3} />
                  Deploy Changes
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;