import React, { useState, useEffect } from 'react';
import { 
  initAuth, 
  googleSignIn, 
  logout, 
  type User 
} from '../services/googleDriveAuth';
import { useLanguage } from '../context/LanguageContext';
import { COURSES_DATA, INSTITUTE_INFO } from '../data/mockData';
import { Course } from '../types';
import { UserProfile } from './UserProfile';
import { 
  GraduationCap, 
  X, 
  HardDrive, 
  BookOpen, 
  Upload, 
  CheckCircle2, 
  Calendar, 
  FileText, 
  LogOut, 
  ShieldCheck, 
  Sparkles, 
  FolderOpen, 
  ExternalLink, 
  AlertCircle,
  Copy,
  Clock,
  Laptop
} from 'lucide-react';

interface StudentPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDrive?: () => void;
  onOpenVerify?: () => void;
}

export const StudentPortalModal: React.FC<StudentPortalModalProps> = ({
  isOpen,
  onClose,
  onOpenDrive,
  onOpenVerify
}) => {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'materials' | 'submit' | 'routine'>('overview');
  const [selectedCourseId, setSelectedCourseId] = useState<string>(COURSES_DATA[0].id);
  const [assignmentTitle, setAssignmentTitle] = useState('');
  const [assignmentNotes, setAssignmentNotes] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Sync auth state
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, accessToken) => {
        setUser(currentUser);
        setToken(accessToken || null);
      },
      () => {
        setUser(null);
        setToken(null);
      },
      (currentUser) => {
        setUser(currentUser);
      }
    );
    return () => unsubscribe();
  }, []);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const res = await googleSignIn();
      if (res) {
        setUser(res.user);
        setToken(res.accessToken);
      }
    } catch (err) {
      console.error('Student sign-in error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setToken(null);
  };

  const handleAssignmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignmentTitle.trim()) return;
    setSubmittedSuccess(true);
    setTimeout(() => {
      setAssignmentTitle('');
      setAssignmentNotes('');
      setSubmittedSuccess(false);
    }, 3500);
  };

  const selectedCourse = COURSES_DATA.find((c: Course) => c.id === selectedCourseId) || COURSES_DATA[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-emerald-400">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <span>{isBn ? 'ছাত্র-ছাত্রী গুগল ক্লাউড পোর্টাল' : 'Student Google Cloud Portal'}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  BTEB 27117
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                {isBn 
                  ? 'প্রতিটি শিক্ষার্থীর জন্য গুগল সাইন-ইন ও কেন্দ্রীয় শিক্ষা ব্যবস্থাপনা' 
                  : 'Centralized Google Authentication & Student Learning Dashboard'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {!user ? (
            /* ========================================================
               LOGGED OUT STATE: EXPLANATION & GOOGLE SIGN-IN BUTTON
               ======================================================== */
            <div className="space-y-6 text-center max-w-xl mx-auto py-4">
              <div className="relative mx-auto w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-500/20 via-sky-500/20 to-indigo-500/20 border border-emerald-500/30 flex items-center justify-center shadow-lg shadow-emerald-500/10">
                <Laptop className="w-10 h-10 text-emerald-400" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
                </span>
              </div>

              <div className="space-y-2">
                <h4 className="text-xl sm:text-2xl font-black text-white">
                  {isBn ? 'কেন সকল শিক্ষার্থীকে গুগল দিয়ে সাইন-ইন করতে হবে?' : 'Why Every Student Must Sign In with Google?'}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {isBn 
                    ? 'বেঙ্গল কম্পিউটার ট্রেনিং ইনস্টিটিউটে ক্লাস রুটিন, সফটওয়্যার ফাইল, গুগল ড্রাইভ লেকচার শিট, হোমওয়ার্ক সাবমিশন ও রেজাল্ট অ্যাক্সেসের জন্য প্রতিটি শিক্ষার্থীকে ব্যক্তিগত গুগল আইডি দিয়ে লগইন বাধ্যতামূলক করা হয়েছে।' 
                    : 'All enrolled students must sign in using their Google account to access official courseware, Google Drive materials, routine, homework submission, and verification.'}
                </p>
              </div>

              {/* 4 Core Pillars of Google Sign-in */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                    <HardDrive className="w-4 h-4 shrink-0" />
                    <span>{isBn ? '১. গুগল ড্রাইভ ক্লাউড ফাইল' : '1. Google Drive Cloud Files'}</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {isBn ? 'ক্লাস লেকচার শিট, প্রজেক্ট ফাইল ও ভিডিও টিউটোরিয়াল ড্রাইভে সংরক্ষিত থাকে।' : 'Full access to lab lecture sheets and downloadable software.'}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-sky-400 font-bold text-xs">
                    <Upload className="w-4 h-4 shrink-0" />
                    <span>{isBn ? '২. হোমওয়ার্ক ও প্রজেক্ট সাবমিট' : '2. Homework Submission'}</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {isBn ? 'শিক্ষার্থীরা ঘরে বা ল্যাবে বসে প্রজেক্ট সরাসরি শিক্ষকদের ড্রাইভে জমা দিতে পারে।' : 'Submit lab projects and assignments directly to instructors.'}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                    <Calendar className="w-4 h-4 shrink-0" />
                    <span>{isBn ? '৩. গুগল ক্যালেন্ডার ক্লাস রুটিন' : '3. Google Calendar Schedule'}</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {isBn ? 'ব্যাচের ক্লাস সময়সূচি, ল্যাব শিডিউল ও পরীক্ষার নোটিস সরাসরি মোবাইলে সিঙ্ক হয়।' : 'Live calendar alerts for batch timings and upcoming exams.'}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-purple-400 font-bold text-xs">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>{isBn ? '৪. ভেরিফাইড স্টুডেন্ট প্রোফাইল' : '4. Verified Student Identity'}</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {isBn ? 'বাংলাদেশ কারিগরি শিক্ষা বোর্ডের (BTEB) ডাটাবেজের সাথে সনদ ও উপস্থিতি যাচাই।' : 'Instant certificate verification and attendance registry.'}
                  </p>
                </div>
              </div>

              {/* Action Button: Sign in with Google */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 hover:opacity-95 text-slate-950 font-black text-sm inline-flex items-center justify-center gap-3 shadow-xl shadow-emerald-500/20 cursor-pointer transition-all disabled:opacity-50"
                >
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>{isLoading ? (isBn ? 'গুগল সাইন-ইন হচ্ছে...' : 'Signing in...') : (isBn ? 'গুগল দিয়ে ছাত্র-ছাত্রী সাইন-ইন করুন' : 'Sign in with Google as Student')}</span>
                </button>
                <p className="text-[11px] text-slate-500 mt-2">
                  {isBn ? 'আপনার জিমেইল অ্যাকাউন্ট নিরাপদ থাকবে এবং কোনো পাসওয়ার্ড শেয়ার করতে হবে না।' : 'Safe, authenticated through Google Identity Platform.'}
                </p>
              </div>
            </div>
          ) : (
            /* ========================================================
               LOGGED IN STATE: PERSONALIZED STUDENT DASHBOARD
               ======================================================== */
            <div className="space-y-6">
              {/* Authenticated Student Profile Card */}
              <UserProfile user={user} onLogout={handleLogout} variant="card" />

              {/* Dashboard Navigation Tabs */}
              <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('overview')}
                  className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'overview'
                      ? 'bg-emerald-500 text-slate-950 shadow-md'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isBn ? 'ড্যাশবোর্ড ওভারভিউ' : 'Overview'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('materials')}
                  className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'materials'
                      ? 'bg-emerald-500 text-slate-950 shadow-md'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{isBn ? 'কোর্স ফাইল ও লেকচার' : 'Materials & Drive'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('submit')}
                  className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'submit'
                      ? 'bg-emerald-500 text-slate-950 shadow-md'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{isBn ? 'হোমওয়ার্ক জমা দিন' : 'Submit Homework'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('routine')}
                  className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'routine'
                      ? 'bg-emerald-500 text-slate-950 shadow-md'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{isBn ? 'ক্লাস রুটিন' : 'Class Routine'}</span>
                </button>
              </div>

              {/* Tab 1: Overview */}
              {activeTab === 'overview' && (
                <div className="space-y-4">
                  {/* Quick Stats Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">{isBn ? 'ক্লাস উপস্থিতি' : 'Attendance'}</span>
                      <strong className="text-emerald-400 font-mono text-lg">৯৬%</strong>
                      <span className="text-[9px] text-emerald-500 block mt-0.5">নিয়মিত শিক্ষার্থী</span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">{isBn ? 'অ্যাসাইনমেন্ট স্কোর' : 'Score'}</span>
                      <strong className="text-sky-400 font-mono text-lg">A+ (GPA 4.0)</strong>
                      <span className="text-[9px] text-sky-500 block mt-0.5">লেটেস্ট প্রজেক্ট পাস</span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">{isBn ? 'ক্লাউড ফাইলস' : 'Drive Files'}</span>
                      <strong className="text-amber-400 font-mono text-lg">৪৮+ ফাইল</strong>
                      <span className="text-[9px] text-amber-500 block mt-0.5">গুগল ড্রাইভে সিঙ্ক</span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">{isBn ? 'সনদপত্রের অবস্থা' : 'Certificate'}</span>
                      <strong className="text-purple-400 font-mono text-sm block truncate">পরীক্ষা অপেক্ষমান</strong>
                      <span className="text-[9px] text-purple-400 block mt-0.5">BTEB সনদ প্রস্তুত</span>
                    </div>
                  </div>

                  {/* Course Action Box */}
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <h5 className="font-bold text-white text-sm">
                        {isBn ? 'গুগল ড্রাইভ স্টুডেন্ট ফোল্ডার সরাসরি খুলুন' : 'Open Google Drive Student Portal'}
                      </h5>
                      <p className="text-xs text-slate-400">
                        {isBn ? 'আপনার কোর্স সংক্রান্ত সকল ফাইল, সফটওয়্যার ও লেকচার দেখতে ড্রাইভ সেকশনে যান।' : 'Access full Drive suite including Sheets, Docs, and Presentation.'}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          if (onOpenDrive) onOpenDrive();
                        }}
                        className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                      >
                        <HardDrive className="w-3.5 h-3.5" />
                        <span>{isBn ? 'ড্রাইভে যান' : 'Go to Drive'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          if (onOpenVerify) onOpenVerify();
                        }}
                        className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-400 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>{isBn ? 'সনদ যাচাই' : 'Verify'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Materials & Drive */}
              {activeTab === 'materials' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h5 className="font-bold text-white text-xs">
                      {isBn ? 'কোর্স নির্বাচন করে স্টাডি মেটেরিয়ালস ডাউনলোড করুন:' : 'Select course for materials:'}
                    </h5>
                    <select
                      value={selectedCourseId}
                      onChange={(e) => setSelectedCourseId(e.target.value)}
                      className="bg-slate-950 border border-slate-800 text-white text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-emerald-500"
                    >
                      {COURSES_DATA.map((c: Course) => (
                        <option key={c.id} value={c.id}>
                          {isBn ? c.titleBn : c.titleEn}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    {[
                      { name: `${selectedCourse.titleBn} - ক্লাস ১ থেকে ১০ লেকচার শিট (PDF)`, size: '4.2 MB', type: 'PDF' },
                      { name: `${selectedCourse.titleBn} - প্র্যাকটিক্যাল প্রজেক্ট ফাইল ও সোর্স কোড (ZIP)`, size: '18.5 MB', type: 'ZIP' },
                      { name: 'BTEB অফিসিয়াল সিলেবাস ও বোর্ড পরীক্ষার প্রশ্ন ব্যাংক', size: '2.8 MB', type: 'PDF' },
                      { name: 'ল্যাব শর্টকাট কি ও কীবোর্ড প্র্যাকটিস গাইড', size: '1.1 MB', type: 'DOCX' }
                    ].map((item, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <FileText className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span className="text-slate-200 truncate font-medium">{item.name}</span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-slate-500 font-mono text-[11px]">{item.size}</span>
                          <button
                            type="button"
                            onClick={() => {
                              onClose();
                              if (onOpenDrive) onOpenDrive();
                            }}
                            className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 font-bold text-[11px] transition-colors cursor-pointer"
                          >
                            ডাউনলোড
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 3: Submit Homework */}
              {activeTab === 'submit' && (
                <form onSubmit={handleAssignmentSubmit} className="space-y-4">
                  <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>
                      {isBn 
                        ? 'আপনার জমা দেওয়া ফাইলটি সরাসরি আপনার ব্যাচের শিক্ষকের গুগল ড্রাইভ ইনবক্সে জমা হবে।' 
                        : 'Your files will sync directly with the instructor Google Drive folder.'}
                    </span>
                  </div>

                  {submittedSuccess && (
                    <div className="p-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg animate-in fade-in">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>হোমওয়ার্ক সফলভাবে গুগল ড্রাইভে জমা হয়েছে! শিক্ষক যাচাই করবেন।</span>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">অ্যাসাইনমেন্ট বা প্রজেক্টের নাম *</label>
                    <input
                      type="text"
                      required
                      value={assignmentTitle}
                      onChange={(e) => setAssignmentTitle(e.target.value)}
                      placeholder="যেমন: ক্লাস ৩ - ডাটাবেজ টেবিল তৈরি ও কোয়েরি প্র্যাকটিস"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">শিক্ষার্থীর মন্তব্য বা লিঙ্ক (ঐচ্ছিক)</label>
                    <textarea
                      rows={3}
                      value={assignmentNotes}
                      onChange={(e) => setAssignmentNotes(e.target.value)}
                      placeholder="কোনো প্রশ্ন বা ড্রাইভে আপলোড করা ফাইলের শেয়ার লিঙ্ক এখানে দিন..."
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="p-4 border-2 border-dashed border-slate-800 rounded-2xl text-center space-y-1 bg-slate-950/60">
                    <Upload className="w-6 h-6 text-slate-500 mx-auto" />
                    <p className="text-xs font-semibold text-slate-300">ফাইল আপলোড করুন (PDF, ZIP, DOCX, PNG)</p>
                    <p className="text-[10px] text-slate-500">সর্বোচ্চ ২৫ মেগাবাইট</p>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-md cursor-pointer"
                  >
                    হোমওয়ার্ক সাবমিট করুন
                  </button>
                </form>
              )}

              {/* Tab 4: Routine */}
              {activeTab === 'routine' && (
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-emerald-400" />
                      <span className="font-bold text-white">সাপ্তাহিক ক্লাস ডে: রবি, মঙ্গল, বৃহস্পতি</span>
                    </div>
                    <span className="text-emerald-400 font-mono text-[11px] font-bold">সকাল ১০:০০ - ১২:০০</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-sky-400" />
                      <span className="font-bold text-white">শুক্রবার স্পেশাল ল্যাব প্র্যাকটিস</span>
                    </div>
                    <span className="text-sky-400 font-mono text-[11px] font-bold">বিকাল ৩:০০ - ৫:০০</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-400" />
                      <span className="font-bold text-white">BTEB বোর্ড ফাইনাল মক টেস্ট</span>
                    </div>
                    <span className="text-amber-400 font-mono text-[11px] font-bold">মাসের শেষ শনিবার</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 sm:p-4 border-t border-slate-800 bg-slate-950 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>বাংলাদেশ কারিগরি শিক্ষা বোর্ড অনুমোদিত প্রতিষ্ঠান (কোড: ২৭১১৭)</span>
          </div>

          <div className="flex items-center gap-2 font-mono">
            <span>হেল্পলাইন: <strong>01712-944383</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};
