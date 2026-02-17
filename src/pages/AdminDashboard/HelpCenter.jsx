import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, HelpCircle, MessageSquare, Mail, 
  ChevronDown, BookOpen, ShieldQuestion, LifeBuoy,
  ExternalLink, ArrowRight
} from "lucide-react";

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    {
      q: "How do I reset my admin password?",
      a: "Go to Security Settings > Login & Security. Click on 'Change Password', enter your current secret key and set a new one. Remember to use at least 8 characters with symbols."
    },
    {
      q: "Can I manage multiple student roles?",
      a: "Yes! In the User Management section, you can assign roles like 'Student', 'Moderator', or 'Editor' to any registered account."
    },
    {
      q: "Where can I download revenue reports?",
      a: "Navigate to the Sales Analytics dashboard. There is a 'Download CSV' button at the bottom of the Revenue Widget."
    },
    {
      q: "Is my data backed up daily?",
      a: "Absolutely. Eduvion systems perform automated cloud backups every 24 hours at 02:00 AM IST to ensure zero data loss."
    }
  ];

  const supportChannels = [
    { 
      title: "Direct Chat", 
      desc: "Instant help from our team", 
      icon: <MessageSquare size={24}/>, 
      color: "bg-emerald-500",
      action: "Start Chat"
    },
    { 
      title: "Email Support", 
      desc: "Response within 24 hours", 
      icon: <Mail size={24}/>, 
      color: "bg-[#0F2F57]",
      action: "Open Ticket"
    },
    { 
      title: "Knowledge Base", 
      desc: "Read our documentation", 
      icon: <BookOpen size={24}/>, 
      color: "bg-[#F4B400]",
      action: "Read Docs"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
      
      {/* --- HERO SECTION --- */}
      <div className="bg-[#0F2F57] pt-20 pb-32 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F4B400] opacity-10 rounded-full -mr-20 -mt-20 blur-3xl" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-6xl font-[1000] text-white tracking-tighter mb-6"
          >
            How can we <span className="text-[#F4B400]">help you?</span>
          </motion.h1>
          
          {/* SEARCH BAR */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text"
              placeholder="Search for articles, guides, or tutorials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-5 pl-14 pr-6 rounded-[25px] bg-white shadow-2xl shadow-black/20 outline-none text-lg font-medium focus:ring-4 focus:ring-[#F4B400]/30 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-16 relative z-20 pb-20">
        
        {/* --- SUPPORT CARDS --- */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {supportChannels.map((channel, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-[35px] shadow-sm border border-slate-100 flex flex-col items-center text-center group"
            >
              <div className={`w-16 h-16 ${channel.color} text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-gray-200`}>
                {channel.icon}
              </div>
              <h3 className="text-xl font-black text-[#0F2F57] mb-2">{channel.title}</h3>
              <p className="text-slate-400 font-medium text-sm mb-6">{channel.desc}</p>
              <button className="flex items-center gap-2 text-[#F4B400] font-black text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                {channel.action} <ArrowRight size={16}/>
              </button>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* --- FAQ SECTION --- */}
          <div className="lg:col-span-8">
            <h2 className="text-2xl font-[1000] text-[#0F2F57] mb-8 flex items-center gap-3">
              <ShieldQuestion className="text-[#F4B400]" size={28}/> Popular Questions
            </h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-[25px] border border-slate-100 overflow-hidden shadow-sm">
                  <button 
                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                    className="w-full p-6 flex items-center justify-between text-left transition-all"
                  >
                    <span className="font-black text-[#0F2F57] tracking-tight">{faq.q}</span>
                    <motion.div animate={{ rotate: activeFaq === index ? 180 : 0 }}>
                       <ChevronDown className="text-[#F4B400]" />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence>
                    {activeFaq === index && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-6 pb-6"
                      >
                        <div className="pt-2 text-slate-500 font-medium leading-relaxed border-t border-slate-50">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* --- SIDEBAR LINKS --- */}
          <div className="lg:col-span-4">
            <div className="bg-[#0F2F57] rounded-[40px] p-8 text-white relative overflow-hidden">
              <div className="relative z-10">
                <LifeBuoy className="text-[#F4B400] mb-4" size={32}/>
                <h3 className="text-xl font-black mb-2">Need a Developer?</h3>
                <p className="text-white/60 text-sm font-medium mb-8">If you're facing technical bugs in the dashboard, contact our API experts.</p>
                
                <div className="space-y-4">
                  <a href="#" className="flex items-center justify-between p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-all text-xs font-black tracking-widest uppercase">
                    API Documentation <ExternalLink size={14}/>
                  </a>
                  <a href="#" className="flex items-center justify-between p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-all text-xs font-black tracking-widest uppercase">
                    System Status <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"/>
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 p-8 border-2 border-dashed border-slate-200 rounded-[40px] text-center">
               <p className="text-slate-400 font-bold text-sm mb-4">Didn't find what you need?</p>
               <button className="bg-[#F4B400] text-white w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-yellow-100">
                  Talk to a Human
               </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HelpCenter;