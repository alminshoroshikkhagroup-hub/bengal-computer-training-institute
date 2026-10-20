import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Phone, 
  ShieldCheck, 
  Clock, 
  Check, 
  Sparkles,
  ExternalLink,
  ChevronRight,
  Headphones
} from 'lucide-react';
import { INSTITUTE_INFO } from '../data/mockData';

interface AdminContact {
  id: string;
  name: string;
  role: string;
  phone: string;
  rawPhone: string;
  badge: string;
  avatarBg: string;
}

const ADMIN_CONTACTS: AdminContact[] = [
  {
    id: 'main',
    name: 'অ্যাডমিশন ও হেল্পলাইন ডেস্ক',
    role: 'প্রধান প্রশাসনিক কর্মকর্তা',
    phone: INSTITUTE_INFO.phone1, // 01782-824582
    rawPhone: '8801782824582',
    badge: 'দ্রুত রেসপন্স',
    avatarBg: 'bg-emerald-600',
  },
  {
    id: 'career',
    name: 'আইটি ও ক্যারিয়ার কাউন্সিলর',
    role: 'ফ্রিল্যান্সিং ও কোর্স সমন্বয়ক',
    phone: INSTITUTE_INFO.phone2, // 01870-707715
    rawPhone: '8801870707715',
    badge: 'ক্যারিয়ার গাইড',
    avatarBg: 'bg-blue-600',
  },
  {
    id: 'bteb',
    name: 'BTEB পরীক্ষা ও সনদ শাখা',
    role: 'কারিগরি বোর্ড কার্যক্রম ডেস্ক',
    phone: INSTITUTE_INFO.phone3, // 01717-687036
    rawPhone: '8801717687036',
    badge: 'বোর্ড ডেস্ক',
    avatarBg: 'bg-amber-600',
  },
];

const PRESET_INQUIRIES = [
  {
    label: 'নতুন ব্যাচে ভর্তি ও ফি',
    text: 'আসসালামু আলাইকুম, বেঙ্গল কম্পিউটার ট্রেনিং ইনস্টিটিউটে নতুন ব্যাচে ভর্তি ফি এবং সময়সূচি সম্পর্কে জানতে চাচ্ছি।',
  },
  {
    label: 'HSC আইসিটি ৫০% ছাড়',
    text: 'আসসালামু আলাইকুম, এইচএসসি পরীক্ষার্থীদের জন্য ৫০% ছাড়ের আইসিটি স্পেশাল ব্যাচের বিস্তারিত তথ্য জানতে চাই।',
  },
  {
    label: 'BTEB সরকারি সার্টিফিকেট',
    text: 'আসসালামু আলাইকুম, বাংলাদেশ কারিগরি শিক্ষা বোর্ডের (BTEB কোড: ২৭১১৭) সরকারি সার্টিফিকেট কোর্স ও পরীক্ষার তথ্য জানতে চাচ্ছি।',
  },
  {
    label: 'সিঙ্গার মোড় ল্যাব পরিদর্শন',
    text: 'আসসালামু আলাইকুম, কুষ্টিয়া সিঙ্গার মোড় আজিজুর রহমান সুপার মার্কেটের ১ম তলায় অবস্থিত কম্পিউটার ল্যাবটি ভিজিট করে ট্রায়াল ক্লাস করতে চাই।',
  },
];

export const WhatsAppChatFAB: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAdminId, setSelectedAdminId] = useState<string>('main');
  const [customMessage, setCustomMessage] = useState<string>('');
  const [showTooltip, setShowTooltip] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  // Auto hide the introductory banner after 10 seconds if not clicked
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatWindowRef.current && !chatWindowRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const activeAdmin = ADMIN_CONTACTS.find((a) => a.id === selectedAdminId) || ADMIN_CONTACTS[0];

  const handleLaunchWhatsApp = (messageToSend?: string) => {
    const text = messageToSend || customMessage.trim() || 'আসসালামু আলাইকুম, বেঙ্গল কম্পিউটার ট্রেনিং ইনস্টিটিউট সম্পর্কে তথ্য জানতে চাই।';
    const whatsappUrl = `https://wa.me/${activeAdmin.rawPhone}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleSelectPreset = (presetText: string) => {
    setCustomMessage(presetText);
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    setShowTooltip(false);
    setHasInteracted(true);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none print:hidden">
      {/* Floating Prompt Bubble (when closed) */}
      {!isOpen && showTooltip && (
        <div 
          onClick={toggleOpen}
          className="absolute bottom-16 right-0 mb-3 w-64 p-3 rounded-2xl bg-slate-900/95 backdrop-blur-md border border-emerald-500/40 shadow-2xl shadow-emerald-950/60 text-left transition-all animate-bounce duration-1000 cursor-pointer group"
          role="alert"
        >
          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="absolute top-2 right-2 text-slate-400 hover:text-white p-0.5 rounded-full"
            aria-label="বার্তা বন্ধ করুন"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-start gap-2.5">
            <div className="relative mt-0.5">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 font-bold text-xs">
                BC
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900 animate-pulse" />
            </div>
            <div>
              <p className="text-xs font-bold text-white flex items-center gap-1">
                <span>হোয়াটসঅ্যাপ হেল্পডেস্ক</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </p>
              <p className="text-[11px] text-slate-300 leading-tight mt-0.5">
                ভর্তি বা কোর্স সংক্রান্ত যে কোনো প্রশ্নে অ্যাডমিনের সাথে সরাসরি চ্যাট করুন!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Chat Popup Box */}
      {isOpen && (
        <div
          ref={chatWindowRef}
          className="absolute bottom-16 right-0 mb-3 w-[92vw] sm:w-[380px] max-h-[85vh] flex flex-col rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl shadow-black/80 overflow-hidden transform transition-all duration-300 ease-out z-50 text-slate-100"
          style={{ maxHeight: 'calc(100vh - 120px)' }}
          role="dialog"
          aria-labelledby="whatsapp-chat-title"
        >
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 p-4 text-white relative shadow-md">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center font-black text-white text-sm shadow-inner">
                    BCTI
                  </div>
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-300 border-2 border-emerald-800 animate-pulse" />
                </div>
                <div>
                  <h3 id="whatsapp-chat-title" className="text-sm font-bold leading-tight flex items-center gap-1.5">
                    বেঙ্গল ইনস্টিটিউট অ্যাডমিন
                    <ShieldCheck className="w-4 h-4 text-emerald-200 inline" />
                  </h3>
                  <p className="text-[11px] text-emerald-100/90 flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 inline-block" />
                    <span>অনলাইন · সাধারণত ২-৫ মিনিটে উত্তর দেয়</span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none"
                aria-label="চ্যাট উইন্ডো বন্ধ করুন"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-2.5 pt-2 border-t border-white/15 flex items-center justify-between text-[11px] text-emerald-100">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-emerald-200" />
                সকাল ৮:০০ - রাত ৯:০০ (সাপ্তাহিক ৭ দিন)
              </span>
              <span className="font-mono text-[10px] bg-white/15 px-1.5 py-0.5 rounded">
                BTEB: 27117
              </span>
            </div>
          </div>

          {/* Body Section with Scroll */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs bg-slate-950/70">
            {/* Department Selection Pills */}
            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                যোগাযোগের শাখা নির্বাচন করুন:
              </label>
              <div className="grid grid-cols-1 gap-1.5">
                {ADMIN_CONTACTS.map((admin) => {
                  const isSelected = admin.id === selectedAdminId;
                  return (
                    <button
                      key={admin.id}
                      type="button"
                      onClick={() => setSelectedAdminId(admin.id)}
                      className={`flex items-center justify-between p-2.5 rounded-xl border transition-all text-left ${
                        isSelected
                          ? 'bg-emerald-500/15 border-emerald-500 text-white shadow-sm'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-850'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className={`w-7 h-7 rounded-lg ${admin.avatarBg} text-white flex items-center justify-center text-[11px] font-bold shrink-0`}>
                          <Phone className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-xs truncate leading-tight">{admin.name}</p>
                          <p className="text-[10px] text-slate-400 font-mono">{admin.phone} · {admin.role}</p>
                        </div>
                      </div>
                      <div className="shrink-0 flex items-center gap-1">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                          isSelected ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {admin.badge}
                        </span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400 ml-1" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Inquiry Suggested Questions */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  দ্রুত প্রশ্ন নির্বাচন করুন (ক্লিক করুন):
                </span>
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                {PRESET_INQUIRIES.map((preset, index) => {
                  const isCurrent = customMessage === preset.text;
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSelectPreset(preset.text)}
                      className={`text-left p-2 rounded-lg text-[11px] border transition-all ${
                        isCurrent
                          ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200'
                          : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-semibold text-emerald-400">❖ {preset.label}</span>
                        <ChevronRight className="w-3 h-3 text-slate-500 shrink-0" />
                      </div>
                      <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5 font-normal">
                        {preset.text}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Message Field */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="wa-custom-msg" className="text-[11px] font-semibold text-slate-400">
                  আপনার মেসেজ লিখুন (ঐচ্ছিক):
                </label>
                {customMessage && (
                  <button 
                    type="button" 
                    onClick={() => setCustomMessage('')}
                    className="text-[10px] text-rose-400 hover:underline"
                  >
                    মুছে ফেলুন
                  </button>
                )}
              </div>
              <textarea
                id="wa-custom-msg"
                rows={2}
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="যেমন: আসসালামু আলাইকুম, আমি আগামী সপ্তাহে কম্পিউটার অফিস অ্যাপ্লিকেশন কোর্সে ভর্তি হতে চাই..."
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-white text-xs placeholder:text-slate-500 resize-none outline-none leading-relaxed"
              />
            </div>

            {/* Direct Call & Location Footer Note */}
            <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] space-y-1">
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Headphones className="w-3.5 h-3.5 text-emerald-400" />
                  সরাসরি ফোনে কথা বলতে চান?
                </span>
                <a
                  href={`tel:${activeAdmin.phone}`}
                  className="text-emerald-400 hover:text-emerald-300 font-bold underline font-mono flex items-center gap-1"
                >
                  কল করুন
                </a>
              </div>
              <p className="text-[10px] text-slate-400 leading-tight">
                📍 {INSTITUTE_INFO.addressBn} (সিঙ্গার মোড়, ১ম তলা)
              </p>
            </div>
          </div>

          {/* Action Footer Button */}
          <div className="p-3 bg-slate-900 border-t border-slate-800">
            <button
              type="button"
              onClick={() => handleLaunchWhatsApp()}
              className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-[0.99] text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all cursor-pointer group"
            >
              <div className="w-5 h-5 rounded-full bg-slate-950/10 flex items-center justify-center text-slate-950">
                <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <span>হোয়াটসঅ্যাপে চ্যাট শুরু করুন</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
            </button>
            <p className="text-[10px] text-center text-slate-400 mt-1.5">
              ক্লিক করলে অফিসিয়াল WhatsApp অ্যাপ্লিকেশন অথবা ওয়েব চ্যাট ওপেন হবে
            </p>
          </div>
        </div>
      )}

      {/* Main Floating Action Button (FAB) */}
      <div className="relative group">
        {/* Pulsing Backlight Ring */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500/40 blur-sm animate-pulse-slow group-hover:bg-emerald-400/60 transition-colors pointer-events-none" />

        <button
          type="button"
          onClick={toggleOpen}
          className={`relative z-10 flex items-center gap-2.5 px-4 py-3.5 rounded-full shadow-2xl transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
            isOpen 
              ? 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 rotate-0' 
              : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 hover:scale-105 active:scale-95 shadow-emerald-500/50'
          }`}
          aria-expanded={isOpen}
          aria-label="ইনস্টিটিউট অ্যাডমিনিস্ট্রেশনের সাথে হোয়াটসঅ্যাপে চ্যাট শুরু করুন"
          title="হোয়াটসঅ্যাপে দ্রুত অনুসন্ধান"
        >
          {isOpen ? (
            <>
              <X className="w-5 h-5 text-rose-400" />
              <span className="text-xs font-bold text-slate-200">বন্ধ করুন</span>
            </>
          ) : (
            <>
              {/* WhatsApp Icon */}
              <div className="relative flex items-center justify-center">
                <MessageCircle className="w-6 h-6 fill-slate-950 stroke-emerald-500 stroke-1" />
                {/* Active Green Dot */}
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-950 border-2 border-emerald-400 animate-ping" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-300 border-2 border-emerald-900" />
              </div>

              {/* Label */}
              <div className="flex flex-col text-left">
                <span className="text-xs font-black tracking-tight leading-tight flex items-center gap-1">
                  WhatsApp চ্যাট
                </span>
                <span className="text-[10px] font-semibold text-slate-900/80 leading-tight">
                  অ্যাডমিন হেল্পডেস্ক
                </span>
              </div>
            </>
          )}
        </button>

        {/* Unread / Notification Badge (only when closed) */}
        {!isOpen && !hasInteracted && (
          <span className="absolute -top-1 -right-1 z-20 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-500 text-[9px] font-black text-white items-center justify-center">
              1
            </span>
          </span>
        )}
      </div>
    </div>
  );
};
