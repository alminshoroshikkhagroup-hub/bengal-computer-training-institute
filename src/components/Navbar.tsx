import React, { useState } from 'react';
import { BtebLogo } from './BtebLogo';
import { GovRegLogo } from './GovRegLogo';
import { BengalInstituteLogo } from './BengalInstituteLogo';
import { INSTITUTE_INFO } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import { LanguageToggle } from './LanguageToggle';
import { TopLanguageHeaderKey } from './TopLanguageHeaderKey';
import { ThemeToggle } from './ThemeToggle';
import { 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Menu, 
  X, 
  Sparkles, 
  GraduationCap,
  HardDrive,
  Flame,
  UserCircle2
} from 'lucide-react';
import { initAuth, type User } from '../services/googleDriveAuth';

interface NavbarProps {
  onOpenAdmission?: () => void;
  onOpenVerify?: () => void;
  onOpenDrive?: () => void;
  onOpenFirecrawl?: () => void;
  onOpenStudentPortal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAdmission,
  onOpenVerify,
  onOpenDrive,
  onOpenFirecrawl,
  onOpenStudentPortal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { language, t } = useLanguage();

  React.useEffect(() => {
    const unsubscribe = initAuth(
      (u) => setCurrentUser(u),
      () => setCurrentUser(null),
      (u) => setCurrentUser(u)
    );
    return () => unsubscribe();
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 shadow-xl transition-all">
      {/* 1. ABSOLUTE TOP: Bengali to English Switch Key (বাংলা টু ইংরেজি উপরে কি) */}
      <TopLanguageHeaderKey />

      {/* 2. Top Utility Bar */}
      <div className="bg-slate-900 border-b border-slate-800/80 px-3 sm:px-4 py-1.5 text-[11px] text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left: BTEB Approval & Location */}
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="flex items-center gap-1 text-emerald-400 font-bold">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span>{t('top_bteb_code')}</span>
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:flex items-center gap-1 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>{t('top_location')}</span>
            </span>
          </div>

          {/* Right: LANGUAGE SWITCHER, THEME TOGGLE & Contact Info */}
          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            {/* Dedicated Bengali-English Switcher */}
            <div className="flex items-center gap-1.5 bg-slate-950/90 py-0.5 px-2 rounded-full border border-emerald-500/40 shadow-sm">
              <span className="text-[10px] text-slate-400 hidden xs:inline font-medium">
                {language === 'bn' ? 'ভাষা:' : 'Language:'}
              </span>
              <LanguageToggle variant="pill" />
            </div>

            {/* Theme Toggle (Dark / Light) in Utility Bar */}
            <div className="hidden xs:flex items-center gap-1.5 bg-slate-950/90 py-0.5 px-2 rounded-full border border-amber-500/40 shadow-sm">
              <span className="text-[10px] text-slate-400 hidden sm:inline font-medium">
                {language === 'bn' ? 'থিম:' : 'Theme:'}
              </span>
              <ThemeToggle variant="pill" showLabel={true} />
            </div>

            {/* Phone Hotlines */}
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-slate-600">|</span>
              <a
                href={`tel:${INSTITUTE_INFO.phone1}`}
                className="flex items-center gap-1 text-white hover:text-emerald-400 font-bold transition-colors"
              >
                <Phone className="w-3 h-3 text-emerald-400" />
                <span>{INSTITUTE_INFO.phone1}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-[5.5rem] py-2.5 sm:min-h-[6.5rem] sm:py-3.5">
          {/* Left Brand Area: 2 Logos Side-by-Side (BTEB + Gov Reg Seal) */}
          <a href="#hero" className="flex items-center gap-3 sm:gap-4 group shrink-0">
            <div className="flex items-center gap-2 sm:gap-2.5">
              <BtebLogo className="h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20" />
              <GovRegLogo className="h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm sm:text-base md:text-lg font-black text-white group-hover:text-emerald-400 transition-colors tracking-tight leading-tight">
                {language === 'bn' ? INSTITUTE_INFO.nameBn : INSTITUTE_INFO.nameEn}
              </span>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs md:text-sm font-semibold tracking-wide mt-0.5">
                <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                  {language === 'bn' ? `BTEB কোড: ${INSTITUTE_INFO.btebCode}` : `BTEB Code: ${INSTITUTE_INFO.btebCode}`}
                </span>
                <span className="text-amber-300 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                  {language === 'bn' ? 'গভঃ রেজি: ১৬৫৪৪১' : 'Govt Reg: 165441'}
                </span>
                <span className="hidden xl:inline text-slate-300 font-medium">
                  {language === 'bn' ? 'কুষ্টিয়া' : 'Kushtia'}
                </span>
              </div>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-3.5 xl:gap-4 text-sm font-medium text-slate-300">
            <a href="#hero" className="hover:text-emerald-400 transition-colors">
              {t('nav_home')}
            </a>
            <a href="#courses" className="hover:text-emerald-400 transition-colors">
              {t('nav_courses')}
            </a>
            <a href="#course-analytics" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
              <span>{t('nav_analytics')}</span>
            </a>
            <a href="#roadmap" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
              <span>{t('nav_roadmap')}</span>
              <span className="px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                AI
              </span>
            </a>
            <a href="#ai-studio" className="hover:text-emerald-400 transition-colors flex items-center gap-1 text-emerald-300">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t('nav_studio')}</span>
            </a>
            <a href="#campus" className="hover:text-emerald-400 transition-colors">
              {t('nav_campus')}
            </a>
            <a href="#google-drive" className="hover:text-emerald-400 transition-colors flex items-center gap-1 text-amber-300">
              <HardDrive className="w-3.5 h-3.5 text-amber-400" />
              <span>{t('nav_drive')}</span>
            </a>
            <a href="#verify" className="hover:text-emerald-400 transition-colors">
              {t('nav_verify')}
            </a>
            <a href="#contact" className="hover:text-emerald-400 transition-colors">
              {t('nav_contact')}
            </a>
          </nav>

          {/* Desktop Right Action Buttons & Rightmost Brand Logo */}
          <div className="hidden sm:flex items-center gap-2 lg:gap-2.5 shrink-0">
            {/* Theme Toggle (Dark / Light Mode) */}
            <ThemeToggle variant="compact" />

            <button
              type="button"
              onClick={onOpenFirecrawl}
              className="px-2.5 py-2 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 hover:text-orange-300 border border-orange-500/30 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="Firecrawl Web Agent Endpoint"
            >
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span className="hidden xl:inline">Firecrawl Agent</span>
            </button>

            <a
              href="#google-drive"
              onClick={onOpenDrive}
              className="px-2.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 hover:text-amber-200 border border-amber-500/30 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="Google Drive Cloud Portal"
            >
              <HardDrive className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden 2xl:inline">{t('btn_drive')}</span>
            </a>

            <button
              onClick={onOpenVerify}
              className="px-2.5 lg:px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-sky-400 border border-sky-500/30 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t('btn_verify')}</span>
            </button>

            {/* Student Google Sign-In & Dashboard Button */}
            <button
              type="button"
              onClick={onOpenStudentPortal}
              className="px-2.5 lg:px-3 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs transition-all shadow-md flex items-center gap-1.5 cursor-pointer ring-1 ring-blue-400/40"
              title={language === 'bn' ? 'ছাত্র-ছাত্রী গুগল সাইন-ইন ও ক্লাউড ড্যাশবোর্ড' : 'Student Google Sign-In & Dashboard'}
            >
              {currentUser?.photoURL ? (
                <img src={currentUser.photoURL} alt="Student" className="w-4 h-4 rounded-full border border-white/60" />
              ) : (
                <UserCircle2 className="w-3.5 h-3.5 text-blue-200" />
              )}
              <span>
                {currentUser 
                  ? (currentUser.displayName?.split(' ')[0] || (language === 'bn' ? 'শিক্ষার্থী' : 'Student')) 
                  : (language === 'bn' ? 'ছাত্র লগইন (Google)' : 'Student Login')}
              </span>
            </button>

            <button
              onClick={onOpenAdmission}
              className="px-3 lg:px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-1.5 cursor-pointer"
            >
              <GraduationCap className="w-4 h-4" />
              <span>{t('btn_admission')}</span>
            </button>

            {/* Rightmost 3rd Logo: BENGAL INSTITUTE */}
            <div className="pl-3 lg:pl-4 border-l border-slate-800 flex items-center">
              <BengalInstituteLogo size="md" className="h-12 sm:h-14 lg:h-16 w-auto" />
            </div>
          </div>

          {/* Mobile Right Section */}
          <div className="flex sm:hidden items-center gap-1.5">
            {/* Mobile Student Google Login Button */}
            <button
              onClick={onOpenStudentPortal}
              className="p-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold flex items-center justify-center cursor-pointer shadow-sm"
              title={language === 'bn' ? 'ছাত্র-ছাত্রী গুগল সাইন-ইন' : 'Student Google Sign-In'}
            >
              {currentUser?.photoURL ? (
                <img src={currentUser.photoURL} alt="Student" className="w-5 h-5 rounded-full border border-white/60" />
              ) : (
                <UserCircle2 className="w-5 h-5" />
              )}
            </button>

            <ThemeToggle variant="compact" showLabel={false} />

            <button
              onClick={onOpenAdmission}
              className="px-2.5 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs"
            >
              {t('btn_admission')}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950 px-4 pt-3 pb-6 space-y-3 animate-in fade-in duration-200">
          {/* Mobile Student Google Portal Row */}
          <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-950/60 to-indigo-950/60 border border-blue-500/40 flex items-center justify-between gap-2 shadow-md">
            <div className="flex items-center gap-2.5 min-w-0">
              {currentUser?.photoURL ? (
                <img src={currentUser.photoURL} alt="Student" className="w-8 h-8 rounded-full border border-blue-400 shrink-0" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold shrink-0">
                  <UserCircle2 className="w-5 h-5" />
                </div>
              )}
              <div className="min-w-0">
                <span className="text-xs font-bold text-white block truncate">
                  {currentUser ? (currentUser.displayName || 'নথিভুক্ত শিক্ষার্থী') : (language === 'bn' ? 'ছাত্র-ছাত্রী গুগল ক্লাউড পোর্টাল' : 'Student Google Portal')}
                </span>
                <span className="text-[10px] text-slate-400 block truncate">
                  {currentUser ? currentUser.email : (language === 'bn' ? 'গুগল দিয়ে সাইন-ইন করে ড্রাইভ ও ফাইল অ্যাক্সেস' : 'Sign in to access student files')}
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenStudentPortal) onOpenStudentPortal();
              }}
              className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shrink-0 cursor-pointer shadow-sm"
            >
              {currentUser ? (language === 'bn' ? 'ড্যাশবোর্ড' : 'Dashboard') : (language === 'bn' ? 'লগইন' : 'Login')}
            </button>
          </div>

          {/* Mobile Language Switcher Inside Drawer */}
          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300">
              {language === 'bn' ? 'ওয়েবসাইটের ভাষা পরিবর্তন:' : 'Website Language:'}
            </span>
            <LanguageToggle variant="pill" />
          </div>

          {/* Mobile Theme Switcher Inside Drawer */}
          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300">
              {language === 'bn' ? 'থিম পরিবর্তন (ডার্ক / লাইট):' : 'Theme Mode (Dark / Light):'}
            </span>
            <ThemeToggle variant="segmented" />
          </div>

          <nav className="flex flex-col space-y-2 text-sm font-medium text-slate-300">
            <a
              href="#hero"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-900 hover:text-emerald-400"
            >
              {t('nav_home')}
            </a>
            <a
              href="#courses"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-900 hover:text-emerald-400"
            >
              {t('nav_courses')}
            </a>
            <a
              href="#course-analytics"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-900 hover:text-emerald-400"
            >
              {t('nav_analytics')}
            </a>
            <a
              href="#roadmap"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-900 hover:text-emerald-400"
            >
              {t('nav_roadmap')}
            </a>
            <a
              href="#campus"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-900 hover:text-emerald-400"
            >
              {t('nav_campus')}
            </a>
            <a
              href="#google-drive"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDrive?.();
              }}
              className="p-2 rounded-lg hover:bg-slate-900 text-amber-300 hover:text-amber-200 flex items-center gap-2"
            >
              <HardDrive className="w-4 h-4 text-amber-400" />
              <span>{t('nav_drive')}</span>
            </a>
            <a
              href="#verify"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenVerify?.();
              }}
              className="p-2 rounded-lg hover:bg-slate-900 hover:text-emerald-400"
            >
              {t('nav_verify')}
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-900 hover:text-emerald-400"
            >
              {t('nav_contact')}
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenFirecrawl?.();
              }}
              className="p-2 rounded-lg hover:bg-slate-900 text-orange-400 flex items-center gap-2 font-semibold text-left"
            >
              <Flame className="w-4 h-4 text-orange-400" />
              <span>Firecrawl Web Agent</span>
            </button>
          </nav>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmission?.();
              }}
              className="w-full py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-md text-center"
            >
              {t('hero_cta_admission')}
            </button>
            <a
              href={`tel:${INSTITUTE_INFO.phone1}`}
              className="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 font-bold text-xs flex items-center justify-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              {t('btn_call')}: {INSTITUTE_INFO.phone1}
            </a>

            {/* Mobile Accreditation & Brand Logos */}
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between px-2">
              <div className="flex items-center gap-3">
                <BtebLogo className="h-12 w-12" />
                <GovRegLogo className="h-12 w-12" />
              </div>
              <BengalInstituteLogo size="sm" className="h-10 w-auto" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
