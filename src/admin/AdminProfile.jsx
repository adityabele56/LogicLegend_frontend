import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit, Save, X, Camera, Lock, Mail, Phone, ShieldCheck, BadgeCheck } from "lucide-react";

const AdminProfile = () => {
  /* ================= STATE ================= */
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@edurion.pro",
    phone: "+91 98765 43210",
    role: "Super Admin",
    status: "Active",
    image: "https://i.pravatar.cc/150?img=3",
  });

  const [tempProfile, setTempProfile] = useState(profile);
  const [passwordForm, setPasswordForm] = useState({ current: "", newPass: "", confirm: "" });

  /* ================= HANDLERS ================= */
  const handleSave = () => {
    setProfile(tempProfile);
    setEditMode(false);
    // Add a professional toast notification logic here if needed
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setTempProfile({ ...tempProfile, image: imageUrl });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10 font-sans text-slate-900">
      <div className="max-w-5xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="mb-10 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-[1000] text-[#0F2F57] tracking-tighter uppercase">
              Account <span className="text-[#F4B400]">Settings</span>
            </h1>
            <p className="text-slate-400 font-bold text-[11px] tracking-[0.2em] mt-2">Manage your administrative identity</p>
          </div>
          <div className="hidden md:block">
             <span className="bg-emerald-100 text-emerald-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                <BadgeCheck size={14} /> Identity Verified
             </span>
          </div>
        </div>

        {/* --- PROFILE MAIN CARD --- */}
        <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden mb-8">
          <div className="h-32 bg-[#0F2F57] relative">
             <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
          </div>
          
          <div className="px-8 pb-10">
            <div className="flex flex-col md:flex-row gap-8 items-start -mt-12 relative z-10">
              
              {/* IMAGE SECTION */}
              <div className="relative group">
                <div className="w-40 h-40 rounded-[35px] overflow-hidden border-[6px] border-white shadow-xl relative">
                   <img
                    src={editMode ? tempProfile.image : profile.image}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                  <AnimatePresence>
                    {editMode && (
                      <motion.label 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer backdrop-blur-sm transition-all"
                      >
                        <Camera size={32} className="text-white" />
                        <input type="file" hidden onChange={handleImageUpload} />
                      </motion.label>
                    )}
                  </AnimatePresence>
                </div>
                {!editMode && (
                   <div className="absolute -bottom-2 -right-2 bg-[#F4B400] text-white p-2 rounded-xl shadow-lg border-4 border-white">
                      <ShieldCheck size={18} strokeWidth={3} />
                   </div>
                )}
              </div>

              {/* INFO SECTION */}
              <div className="flex-1 pt-14">
                <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
                  <div>
                    <h2 className="text-3xl font-[1000] text-[#0F2F57] tracking-tight">
                      {profile.name}
                    </h2>
                    <p className="text-[#F4B400] font-black uppercase text-xs tracking-widest italic">{profile.role}</p>
                  </div>

                  <div className="flex gap-3">
                    {!editMode ? (
                      <button
                        onClick={() => setEditMode(true)}
                        className="bg-slate-100 text-[#0F2F57] px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#F4B400] hover:text-white transition-all flex items-center gap-2"
                      >
                        <Edit size={16} /> Edit Profile
                      </button>
                    ) : (
                      <>
                        <button onClick={handleSave} className="bg-[#F4B400] text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-yellow-200 flex items-center gap-2 transition-all hover:scale-105">
                          <Save size={16} /> Save Changes
                        </button>
                        <button onClick={() => { setTempProfile(profile); setEditMode(false); }} className="bg-slate-100 text-slate-400 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all">
                          <X size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        disabled={!editMode}
                        value={editMode ? tempProfile.name : profile.name}
                        onChange={(e) => setTempProfile({...tempProfile, name: e.target.value})}
                        className={`w-full p-4 rounded-2xl font-bold border-2 transition-all outline-none ${editMode ? 'bg-slate-50 border-[#F4B400]' : 'bg-white border-transparent text-slate-500'}`}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Official Email</label>
                    <div className="relative">
                      <input
                        type="email"
                        disabled={!editMode}
                        value={editMode ? tempProfile.email : profile.email}
                        onChange={(e) => setTempProfile({...tempProfile, email: e.target.value})}
                        className={`w-full p-4 rounded-2xl font-bold border-2 transition-all outline-none ${editMode ? 'bg-slate-50 border-[#F4B400]' : 'bg-white border-transparent text-slate-500'}`}
                      />
                      <Mail size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Phone Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        disabled={!editMode}
                        value={editMode ? tempProfile.phone : profile.phone}
                        onChange={(e) => setTempProfile({...tempProfile, phone: e.target.value})}
                        className={`w-full p-4 rounded-2xl font-bold border-2 transition-all outline-none ${editMode ? 'bg-slate-50 border-[#F4B400]' : 'bg-white border-transparent text-slate-500'}`}
                      />
                      <Phone size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Account Status</label>
                    <div className="pt-3">
                      <span className="bg-emerald-500 text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-tighter">
                         ● {profile.status} Account
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- PASSWORD SECURITY SECTION --- */}
        <div className="bg-[#0F2F57] rounded-[40px] p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-[#F4B400] opacity-5 rounded-full -mr-20 -mt-20" />
          
          <h2 className="text-xl font-black text-white mb-8 flex items-center gap-3 relative z-10">
            <Lock className="text-[#F4B400]" /> Security Access
          </h2>

          <div className="grid md:grid-cols-3 gap-6 relative z-10">
             {['current', 'newPass', 'confirm'].map((field) => (
               <div key={field}>
                 <input
                    type="password"
                    placeholder={field === 'current' ? "Current Password" : field === 'newPass' ? "New Password" : "Confirm New Password"}
                    value={passwordForm[field]}
                    onChange={(e) => setPasswordForm({...passwordForm, [field]: e.target.value})}
                    className="w-full bg-white/10 border-2 border-white/5 rounded-2xl p-4 text-white font-bold placeholder:text-white/30 outline-none focus:border-[#F4B400] transition-all"
                 />
               </div>
             ))}
          </div>

          <button className="mt-8 bg-white text-[#0F2F57] px-8 py-4 rounded-2xl font-[1000] text-xs uppercase tracking-[0.2em] hover:bg-[#F4B400] hover:text-white transition-all shadow-xl">
             Update Access Keys
          </button>
        </div>

      </div>
    </div>
  );
};

export default AdminProfile;