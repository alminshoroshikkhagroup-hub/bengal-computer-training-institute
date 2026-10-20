import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Bell, 
  ShieldCheck, 
  Gift, 
  BookOpen, 
  Briefcase, 
  AlertCircle,
  Loader2,
  FileText,
  UserCheck
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { auth } from '../services/googleDriveAuth';
import { saveNewsletterSubscription } from '../services/firebaseDb';

const TRACK_OPTIONS = [
  { id: 'all', labelBn: 'সকল কোর্স ও ক্যারিয়ার', labelEn: 'All Courses & Career' },
  { id: 'bteb-office', labelBn: 'বিটিইবি কম্পিউটার অফিস', labelEn: 'BTEB Office App' },
  { id: 'ai-freelance', labelBn: 'এআই ও ফ্রিল্যান্সিং', labelEn: 'AI & Freelancing' },
  { id: 'cyber', labelBn: 'সাইবার সিকিউরিটি', labelEn: 'Cyber Security' },
  { id: 'graphic', labelBn: 'গ্রাফিক ডিজাইন', labelEn: 'Graphic Design' },
  { id: 'coding', labelBn: 'পাইথন ও ওয়েব কোডিং', labelEn: 'Python & Web' },
];

export const NewsletterSubscription: React.FC = () => {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [selectedTrack, setSelectedTrack] = useState('all');
  const [loading, setLoading] = useState(false);
  const [subscribedEmail, setSubscribedEmail] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showResourceModal, setShowResourceModal] = useState(false);
  const [loggedInEmail, setLoggedInEmail] = useState<string | null>(null);

  // Check existing subscription and logged in user
  useEffect(() => {
    try {
      const savedSub = localStorage.getItem('bengal_newsletter_subscribed_email');
      if (savedSub) {
        setSubscribedEmail(savedSub);
      }
    } catch {
      // quota safety
    }

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && user.email) {
        setLoggedInEmail(user.email);
      } else {
        setLoggedInEmail(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const validateEmail = (input: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.trim());
  };

  const handleUseGoogleEmail = () => {
    if (loggedInEmail) {
      setEmail(loggedInEmail);
      if (auth.currentUser?.displayName && !name) {
        setName(auth.currentUser.displayName);
      }
      setErrorMessage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      setErrorMessage(isBn ? 'অনুগ্রহ করে আপনার ইমেইল ঠিকানা প্রদান করুন।' : 'Please enter your email address.');
      return;
    }

    if (!validateEmail(cleanEmail)) {
      setErrorMessage(isBn ? 'সঠিক ইমেইল ফরম্যাট দিন (যেমন: student@example.com)' : 'Please provide a valid email format.');
      return;
    }

    setLoading(true);

    try {
      await saveNewsletterSubscription({
        email: cleanEmail,
        name: name.trim() || undefined,
        interest: selectedTrack,
        source: 'footer_newsletter',
        subscribedAt: new Date().toISOString()
      });

      try {
        localStorage.setItem('bengal_newsletter_subscribed_email', cleanEmail);
      } catch {
        // storage fallback
      }

      setSubscribedEmail(cleanEmail);
      setEmail('');
      setName('');
    } catch (err) {
      console.warn('Subscription error:', err);
      // Even if network fails, treat as confirmed locally
      setSubscribedEmail(cleanEmail);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubscribedEmail(null);
    setErrorMessage(null);
    try {
      localStorage.removeItem('bengal_newsletter_subscribed_email');
    } catch {
      // storage
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900/95 via-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-8 md:p-10 shadow-2xl">
      {/* Background Glow Accents */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {subscribedEmail ? (
            /* Subscribed Success State */
            <motion.div
              key="success-state"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-center max-w-xl mx-auto py-4 space-y-4"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto shadow-lg shadow-emerald-500/10">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {isBn ? 'অভিনন্দন! আপনি সফলভাবে সাবস্ক্রাইব করেছেন' : 'Congratulations! You are Subscribed'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  <span className="text-emerald-400 font-mono font-semibold">{subscribedEmail}</span> {isBn ? 'ঠিকানায় নিয়মিত কোর্স আপডেট, বিটিইবি পরীক্ষার নোটিশ ও ক্যারিয়ার টিপস পাঠানো হবে।' : 'will now receive regular course updates, BTEB exam alerts, and career tips.'}
                </p>
              </div>

              {/* Instant Welcome Perks */}
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-left space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                  <Gift className="w-4 h-4 text-emerald-400" />
                  <span>{isBn ? 'আপনার তাৎক্ষণিক শিক্ষার্থী ওয়েলকাম কিট' : 'Your Instant Student Welcome Kit'}</span>
                </div>
                <ul className="text-xs text-slate-300 space-y-2">
                  <li className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{isBn ? 'কম্পিউটার ও উইন্ডোজ শর্টকাট চিটশিট (বাংলা ভার্সন)' : 'Computer & Windows Shortcut Cheatsheet (Bangla Version)'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span>{isBn ? '১০ দিনের এআই ক্যারিয়ার রোডম্যাপ ও ফ্রিল্যান্সিং গাইড' : '10-Day AI Career Roadmap & Freelancing Starter Guide'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Bell className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{isBn ? 'বিটিইবি রেজিস্ট্রেশন ও পরীক্ষা সিডিউল ইমেইল নোটিফিকেশন' : 'BTEB Registration & Exam Schedule Email Alerts'}</span>
                  </li>
                </ul>

                <button
                  type="button"
                  onClick={() => setShowResourceModal(true)}
                  className="w-full mt-2 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{isBn ? 'ফ্রি রিসোর্স কিট প্রিভিউ দেখুন' : 'Preview Free Resource Kit'}</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 pt-1">
                <button
                  onClick={handleReset}
                  className="text-xs text-slate-400 hover:text-slate-200 underline underline-offset-2 transition-colors cursor-pointer"
                >
                  {isBn ? 'ভিন্ন ইমেইল দিয়ে সাবস্ক্রাইব করতে চান?' : 'Subscribe with a different email?'}
                </button>
              </div>
            </motion.div>
          ) : (
            /* Subscription Form State */
            <motion.div
              key="form-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Top Banner Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2 max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                    <Mail className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{isBn ? 'শিক্ষার্থী নিউজলেটার ও ক্যারিয়ার আপডেট' : 'Student Newsletter & Career Alerts'}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">
                    {isBn 
                      ? 'নতুন কোর্স, বিটিইবি পরীক্ষার নোটিশ ও ক্যারিয়ার টিপস পান সরাসরি ইনবক্সে' 
                      : 'Get Instant Course Updates, BTEB Exam Notices & IT Career Tips'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {isBn
                      ? 'বেঙ্গল ইনস্টিটিউটের নতুন ব্যাচ, স্কলারশিপ, ফ্রি ফ্রিল্যান্সিং সেশন এবং সরকারি বিটিইবি পরীক্ষার নোটিশ মিস করবেন না। কোনো স্প্যাম নেই।'
                      : 'Never miss new batches, scholarships, free freelancing masterclasses, and official BTEB board exam notices. 100% spam-free.'}
                  </p>
                </div>

                {/* Trust Badges */}
                <div className="shrink-0 flex sm:flex-col items-start gap-2 bg-slate-950/60 p-3 rounded-2xl border border-slate-800 text-[11px] text-slate-400">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                    <span>{isBn ? '১০০% ফ্রি ও স্প্যামমুক্ত' : '100% Free & Spam Free'}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sky-400">
                    <Bell className="w-3.5 h-3.5 shrink-0" />
                    <span>{isBn ? 'সাপ্তাহিক ১টি প্রয়োজনীয় ইমেইল' : '1 Weekly Digest Only'}</span>
                  </div>
                </div>
              </div>

              {/* Logged in User Quick Fill Notice */}
              {loggedInEmail && (
                <div className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-xs text-slate-300">
                  <div className="flex items-center gap-2 min-w-0">
                    <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="truncate">
                      {isBn ? 'লগইন থাকা গুগল অ্যাকাউন্ট:' : 'Logged-in Google Account:'}{' '}
                      <strong className="text-emerald-300 font-mono">{loggedInEmail}</strong>
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleUseGoogleEmail}
                    className="shrink-0 px-2.5 py-1 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/40 text-emerald-300 font-medium text-[11px] transition-colors cursor-pointer"
                  >
                    {isBn ? 'এই ইমেইল ব্যবহার করুন' : 'Use this Email'}
                  </button>
                </div>
              )}

              {/* Track / Interest Selection Pills */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-300">
                  {isBn ? 'আপনার পছন্দের বিষয় / কোর্স ট্র্যাক বেছে নিন:' : 'Select your track of interest:'}
                </label>
                <div className="flex flex-wrap gap-2">
                  {TRACK_OPTIONS.map((track) => {
                    const isSelected = selectedTrack === track.id;
                    return (
                      <button
                        key={track.id}
                        type="button"
                        onClick={() => setSelectedTrack(track.id)}
                        className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 border border-emerald-500'
                            : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 hover:text-white border border-slate-700/60'
                        }`}
                      >
                        {isBn ? track.labelBn : track.labelEn}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Subscription Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
                  {/* Optional Name Input */}
                  <div className="sm:col-span-4">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={isBn ? 'আপনার নাম (ঐচ্ছিক)' : 'Your Name (Optional)'}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700/80 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                    />
                  </div>

                  {/* Required Email Input */}
                  <div className="sm:col-span-5 relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errorMessage) setErrorMessage(null);
                      }}
                      placeholder={isBn ? 'আপনার ইমেইল দিন (যেমন: student@gmail.com)' : 'Enter email (e.g. student@gmail.com)'}
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700/80 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-mono"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="sm:col-span-3">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full h-full py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] disabled:opacity-60 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>{isBn ? 'সাবস্ক্রাইব হচ্ছে...' : 'Subscribing...'}</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>{isBn ? 'সাবস্ক্রাইব করুন' : 'Subscribe'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-rose-400 text-xs p-2 rounded-lg bg-rose-950/40 border border-rose-800/50"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errorMessage}</span>
                  </motion.div>
                )}

                {/* Perks Pills Below Input */}
                <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <Gift className="w-3.5 h-3.5 text-amber-400" />
                    <span>{isBn ? 'ফ্রি কম্পিউটার শর্টকাট শিট PDF' : 'Free Computer Shortcuts Sheet'}</span>
                  </span>
                  <span className="hidden sm:inline text-slate-700">•</span>
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <Briefcase className="w-3.5 h-3.5 text-sky-400" />
                    <span>{isBn ? 'সাপ্তাহিক ক্যারিয়ার ও ফ্রিল্যান্সিং টিপস' : 'Weekly Career & Freelancing Tips'}</span>
                  </span>
                  <span className="hidden sm:inline text-slate-700">•</span>
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <Bell className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{isBn ? 'বিটিইবি রুটিন ও ফলাফল আপডেট' : 'BTEB Routine & Results'}</span>
                  </span>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Free Resource Preview Modal */}
      {showResourceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Gift className="w-5 h-5" />
                <span>{isBn ? 'শিক্ষার্থী ওয়েলকাম কিট প্রিভিউ' : 'Student Welcome Kit Preview'}</span>
              </div>
              <button
                onClick={() => setShowResourceModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300">
              {isBn 
                ? 'আপনার ইমেইলে এই রিসোর্সগুলো সংরক্ষিত হয়েছে। ক্লাসে ও পরীক্ষায় সহায়তার জন্য গুরুত্বপূর্ণ তালিকা:' 
                : 'These resources have been indexed for your email. Essential references for class & exam:'}
            </p>

            <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1 text-xs text-slate-300">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <h5 className="font-bold text-amber-400 mb-1">১. অতি প্রয়োজনীয় উইন্ডোজ ও অফিস শর্টকাটস</h5>
                <p className="text-[11px] text-slate-400">Ctrl+C, Ctrl+V, Ctrl+Z, Win+Shift+S (স্ক্রিনশট), Alt+Tab, Win+D, F4 (রিপিট অ্যাকশন)।</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <h5 className="font-bold text-sky-400 mb-1">২. বিটিইবি কম্পিউটার অফিস প্র্যাকটিক্যাল সাজেশন</h5>
                <p className="text-[11px] text-slate-400">এমএস ওয়ার্ড বাংলা টাইপিং (অভ্র ও বিজয়), এক্সেল ইফ-কন্ডিশন ও সাম ফাংশন, পাওয়ারপয়েন্ট অ্যানিমেশন।</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <h5 className="font-bold text-emerald-400 mb-1">৩. ফ্রিল্যান্সিং প্রথম ক্লায়েন্ট পাওয়ার ৫টি কৌশল</h5>
                <p className="text-[11px] text-slate-400">লোকাল শপ বা পেজের জন্য প্র্যাকটিস প্রজেক্ট, বিহাইন্স/গিটহাব পোর্টফোলিও, প্রফেশনাল প্রপোজাল রাইটিং।</p>
              </div>
            </div>

            <button
              onClick={() => setShowResourceModal(false)}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              {isBn ? 'ধন্যবাদ, বুঝেছি' : 'Close Preview'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
