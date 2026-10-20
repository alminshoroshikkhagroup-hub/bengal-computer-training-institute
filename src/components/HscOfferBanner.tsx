import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Phone, 
  Calendar, 
  GraduationCap, 
  ArrowRight,
  Gift
} from 'lucide-react';

interface HscOfferBannerProps {
  onOpenAdmission?: (couponCode?: string) => void;
}

export const HscOfferBanner: React.FC<HscOfferBannerProps> = ({ onOpenAdmission }) => {
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 14,
    minutes: 32,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText('HSC50');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-black border-2 border-emerald-500/50 shadow-2xl p-6 sm:p-8 my-10">
      {/* Background Decorative Tech Hexagons and Glow */}
      <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Offer Details */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {language === 'bn' ? 'স্বপ্ন নয়, এখনই নিজেকে প্রস্তুত করো!' : 'Prepare Your Future Today!'}
              </span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold">
              <Calendar className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'এপ্রিল–জুন ২০২৬ সেশন' : 'April–June 2026 Session'}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-baseline gap-3">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              {language === 'bn' ? 'HSC পরীক্ষার্থীদের জন্য' : 'Special Offer for HSC Students'}
            </h2>
            <div className="inline-flex items-center px-4 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-black text-3xl sm:text-5xl shadow-lg shadow-emerald-500/30 transform -rotate-1">
              {language === 'bn' ? '৫০% ছাড়!' : '50% OFF!'}
            </div>
          </div>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            {language === 'bn'
              ? 'এইচএসসি পরীক্ষা পরবর্তী সোনালী সময়কে কাজে লাগিয়ে নিজেকে আইটি ও ফ্রিল্যান্সিংয়ে একধাপ এগিয়ে রাখো। বিশেষ ৫০% স্কলারশিপে ভর্তি চলছে!'
              : 'Make the most of your post-HSC free time by boosting your skills in IT, AI & Freelancing. Admission is open with a 50% scholarship!'}
          </p>

          {/* Key Course Tags included in 50% discount */}
          <div className="flex flex-wrap gap-2.5 pt-1">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/90 border border-emerald-500/30 text-xs font-semibold text-slate-200">
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              <span>{language === 'bn' ? 'এইচএসসি আইসিটি স্পেশাল' : 'HSC ICT Special'}</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/90 border border-emerald-500/30 text-xs font-semibold text-slate-200">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>{language === 'bn' ? 'বেসিক কম্পিউটার ও অফিস' : 'Office Applications'}</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/90 border border-emerald-500/30 text-xs font-semibold text-slate-200">
              <Gift className="w-4 h-4 text-emerald-400" />
              <span>{language === 'bn' ? 'আর্টিফিশিয়াল ইন্টেলিজেন্স (AI)' : 'Artificial Intelligence (AI)'}</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/90 border border-emerald-500/30 text-xs font-semibold text-slate-200">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>{language === 'bn' ? 'স্পোকেন ইংলিশ' : 'Spoken English'}</span>
            </span>
          </div>

          {/* Location & Hotlines */}
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400">
            <span className="text-emerald-400 font-semibold">
              {language === 'bn' 
                ? 'স্থান: আজিজুর রহমান সুপার মার্কেট, সিঙ্গার মোড়, এন এস রোড, কুষ্টিয়া'
                : 'Campus: Azizur Rahman Super Market, Singer Mor, NS Road, Kushtia'}
            </span>
            <span>·</span>
            <a href="tel:01782824582" className="flex items-center gap-1 text-slate-200 hover:text-emerald-400 font-bold">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              01782-824582
            </a>
          </div>
        </div>

        {/* Right Column: Countdown Box & Coupon Code */}
        <div className="lg:col-span-4 bg-slate-950/90 rounded-xl p-5 border border-emerald-500/30 text-center space-y-4">
          <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
            {language === 'bn' ? 'অফারের সময় বাকি' : 'Time Remaining'}
          </div>

          {/* Countdown Clock */}
          <div className="grid grid-cols-4 gap-2">
            <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
              <span className="block text-xl sm:text-2xl font-black text-white font-mono">{String(timeLeft.days).padStart(2, '0')}</span>
              <span className="text-[10px] text-slate-400">{language === 'bn' ? 'দিন' : 'Days'}</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
              <span className="block text-xl sm:text-2xl font-black text-white font-mono">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="text-[10px] text-slate-400">{language === 'bn' ? 'ঘণ্টা' : 'Hours'}</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
              <span className="block text-xl sm:text-2xl font-black text-white font-mono">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="text-[10px] text-slate-400">{language === 'bn' ? 'মিনিট' : 'Mins'}</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
              <span className="block text-xl sm:text-2xl font-black text-emerald-400 font-mono">{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="text-[10px] text-slate-400">{language === 'bn' ? 'সেকেন্ড' : 'Secs'}</span>
            </div>
          </div>

          {/* Coupon Code Box */}
          <div className="p-3 rounded-lg bg-slate-900/90 border border-dashed border-emerald-500/60 flex items-center justify-between">
            <div className="text-left">
              <span className="block text-[10px] text-slate-400 uppercase">
                {language === 'bn' ? 'কুপন কোড' : 'Coupon Code'}
              </span>
              <span className="text-base font-black text-emerald-400 tracking-wider font-mono">HSC50</span>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-bold transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{language === 'bn' ? 'কপি হয়েছে' : 'Copied'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'কোড কপি' : 'Copy Code'}</span>
                </>
              )}
            </button>
          </div>

          {/* Apply Button */}
          <button
            onClick={() => onOpenAdmission?.('HSC50')}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/30 transition-all cursor-pointer transform hover:-translate-y-0.5"
          >
            <span>{language === 'bn' ? '৫০% ছাড়ে এখনই আবেদন করুন' : 'Claim 50% Discount Now'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
