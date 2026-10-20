import React from 'react';
import { motion } from 'framer-motion';
import { ModernizedHeroBanner } from './ModernizedHeroBanner';
import { NOTICES_DATA } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import { 
  Building2, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Award,
  Bell,
  GraduationCap
} from 'lucide-react';

interface JanataBankBuildingHeroProps {
  onOpenAdmission?: (courseId?: string, coupon?: string) => void;
  onOpenVerify?: () => void;
  onOpenStudentPortal?: () => void;
}

export const JanataBankBuildingHero: React.FC<JanataBankBuildingHeroProps> = ({
  onOpenAdmission,
  onOpenVerify,
  onOpenStudentPortal,
}) => {
  const { language, t } = useLanguage();

  const notices = [
    {
      bn: NOTICES_DATA[0].titleBn,
      en: 'Special HSC Discount: 50% waiver on all computer and AI courses.'
    },
    {
      bn: NOTICES_DATA[1].titleBn,
      en: 'BTEB 2026 Registration: Last date for admission is ongoing.'
    },
    {
      bn: NOTICES_DATA[2].titleBn,
      en: 'Free AI Masterclass & Freelancing Seminar every Friday.'
    },
    {
      bn: NOTICES_DATA[3].titleBn,
      en: 'New Campus: Singer Mor, 1st Floor (Janata Bank Building), Kushtia.'
    }
  ];

  return (
    <section id="hero" className="relative pt-6 pb-16 sm:pb-24 overflow-hidden bg-slate-950">
      {/* Background radial lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-radial-gradient opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8 sm:space-y-12">
        {/* Notice Board Marquee */}
        <motion.div 
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 p-2.5 sm:p-3 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md shadow-lg"
        >
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500 text-slate-950 text-xs font-black shrink-0">
            <Bell className="w-3.5 h-3.5 animate-bounce" />
            <span>{t('notice_badge')}</span>
          </div>

          <div className="overflow-hidden whitespace-nowrap text-xs text-slate-300 w-full flex items-center">
            <div className="animate-marquee font-medium">
              <span className="inline-flex items-center gap-8 pr-8">
                <span>📢 {language === 'bn' ? notices[0].bn : notices[0].en}</span>
                <span className="text-emerald-400">❖</span>
                <span>🎓 {language === 'bn' ? notices[1].bn : notices[1].en}</span>
                <span className="text-emerald-400">❖</span>
                <span>📋 {language === 'bn' ? notices[2].bn : notices[2].en}</span>
                <span className="text-emerald-400">❖</span>
                <span>🏢 {language === 'bn' ? notices[3].bn : notices[3].en}</span>
                <span className="text-emerald-400">❖</span>
              </span>
              <span className="inline-flex items-center gap-8 pr-8" aria-hidden="true">
                <span>📢 {language === 'bn' ? notices[0].bn : notices[0].en}</span>
                <span className="text-emerald-400">❖</span>
                <span>🎓 {language === 'bn' ? notices[1].bn : notices[1].en}</span>
                <span className="text-emerald-400">❖</span>
                <span>📋 {language === 'bn' ? notices[2].bn : notices[2].en}</span>
                <span className="text-emerald-400">❖</span>
                <span>🏢 {language === 'bn' ? notices[3].bn : notices[3].en}</span>
                <span className="text-emerald-400">❖</span>
              </span>
            </div>
          </div>
        </motion.div>

        {/* Hero Title & Value Proposition */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-4xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-emerald-500/40 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs sm:text-sm font-bold text-emerald-400">
              {t('hero_badge')}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.15]">
            {t('hero_title_part1')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400">
              {t('hero_title_highlight')}
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {t('hero_subtitle')}
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onOpenAdmission?.()}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/30 transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t('hero_cta_admission')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#courses"
              className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm border border-slate-700 transition-all"
            >
              {t('hero_cta_courses')}
            </a>

            <button
              onClick={onOpenStudentPortal}
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-blue-500/20 transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <GraduationCap className="w-4 h-4 text-blue-200" />
              <span>{language === 'bn' ? 'ছাত্র-ছাত্রী সাইন-ইন (Google)' : 'Student Sign-In (Google)'}</span>
            </button>

            <button
              onClick={onOpenVerify}
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-sky-400 border border-sky-500/30 font-bold text-sm transition-all cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{t('hero_cta_verify')}</span>
            </button>
          </div>
        </motion.div>

        {/* Centerpiece: Real Lab & Student Photos Hero */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative space-y-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 px-2">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <Building2 className="w-4 h-4" />
              {t('hero_centerpiece_title')}
            </span>
            <span className="text-[11px] text-slate-400 font-medium">
              {t('hero_centerpiece_sub')}
            </span>
          </div>

          <ModernizedHeroBanner 
            onOpenAdmission={(cId) => onOpenAdmission?.(cId)}
            onOpenVerify={onOpenVerify}
          />
        </motion.div>

        {/* 4 Pillars Quality Guarantee Ribbon */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800/80 shadow-xl"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="flex items-center gap-3 p-2">
              <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">
                  {language === 'bn' ? 'অভিজ্ঞ প্রশিক্ষক' : 'Expert Instructors'}
                </h4>
                <p className="text-[11px] text-slate-400">
                  {language === 'bn' ? 'দক্ষ ও ইন্ডাস্ট্রি প্রফেশনাল ইন্সট্রাক্টর' : 'Skilled industry professional trainers'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2">
              <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400 shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">
                  {language === 'bn' ? 'আধুনিক ক্লাসরুম' : 'Modern Classrooms'}
                </h4>
                <p className="text-[11px] text-slate-400">
                  {language === 'bn' ? 'এসি ল্যাব, দ্রুত ইন্টারনেট ও প্রজেক্টর' : 'AC labs, high-speed internet & projectors'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">
                  {language === 'bn' ? 'প্র্যাকটিক্যাল প্রশিক্ষণ' : '100% Practical Training'}
                </h4>
                <p className="text-[11px] text-slate-400">
                  {language === 'bn' ? '১ জন ১টি কম্পিউটার নিশ্চিতকরণ' : '1 computer per student guaranteed'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2">
              <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">
                  {language === 'bn' ? 'দক্ষতা উন্নয়নের নিশ্চয়তা' : 'Guaranteed Skill Growth'}
                </h4>
                <p className="text-[11px] text-slate-400">
                  {language === 'bn' ? 'BTEB সরকারি সনদ ও ক্যারিয়ার সাপোর্ট' : 'Govt BTEB certificates & career guidance'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
