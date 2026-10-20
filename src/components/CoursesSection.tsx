import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { COURSES_DATA } from '../data/mockData';
import { Course } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { 
  FileSpreadsheet, 
  Sparkles, 
  GraduationCap, 
  ShieldAlert, 
  Palette, 
  Code, 
  MessageSquare, 
  Smile,
  CheckCircle2, 
  Clock, 
  Award, 
  ArrowRight,
  BookOpen,
  Filter,
  Users
} from 'lucide-react';
import { BengalOneShowcaseBanner } from './BengalOneShowcaseBanner';
import { BatchStatusBadge } from './BatchStatusBadge';

interface CoursesSectionProps {
  onOpenAdmission?: (courseId?: string) => void;
  onOpenFeeCalculator?: () => void;
}

const courseIconMap: Record<string, React.ReactNode> = {
  FileSpreadsheet: <FileSpreadsheet className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  GraduationCap: <GraduationCap className="w-5 h-5" />,
  ShieldAlert: <ShieldAlert className="w-5 h-5" />,
  Palette: <Palette className="w-5 h-5" />,
  Code: <Code className="w-5 h-5" />,
  MessageSquare: <MessageSquare className="w-5 h-5" />,
  Smile: <Smile className="w-5 h-5" />
};

export const CoursesSection: React.FC<CoursesSectionProps> = ({ 
  onOpenAdmission,
  onOpenFeeCalculator
}) => {
  const { language, t } = useLanguage();
  const isBn = language === 'bn';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBatchStatus, setSelectedBatchStatus] = useState<string>('all');
  const [activeCourseModal, setActiveCourseModal] = useState<Course | null>(null);

  const filteredCourses = COURSES_DATA.filter((course) => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesStatus = selectedBatchStatus === 'all' || course.batchInfo?.status === selectedBatchStatus;
    return matchesCategory && matchesStatus;
  });

  const categories = [
    { id: 'all', label: language === 'bn' ? 'সকল কোর্সসমূহ' : 'All Courses' },
    { id: 'office', label: language === 'bn' ? 'কম্পিউটার অফিস' : 'Office Application' },
    { id: 'ai', label: language === 'bn' ? 'এআই ও ফ্রিল্যান্সিং' : 'AI & Freelancing' },
    { id: 'coding', label: language === 'bn' ? 'আইসিটি ও সাইবার সিকিউরিটি' : 'ICT & Coding' },
    { id: 'freelancing', label: language === 'bn' ? 'গ্রাফিক ও ওয়েব ডিজাইন' : 'Graphic & Web' },
    { id: 'language', label: language === 'bn' ? 'স্পোকেন ইংলিশ' : 'Spoken English' },
    { id: 'kids', label: language === 'bn' ? 'কিডস প্রোগ্রাম' : 'Kids Program' }
  ];

  const batchStatusFilters = [
    { id: 'all', labelBn: 'সকল ব্যাচ', labelEn: 'All Batches', count: COURSES_DATA.length },
    { id: 'enrolling', labelBn: 'ভর্তি চলছে', labelEn: 'Enrolling Now', count: COURSES_DATA.filter(c => c.batchInfo?.status === 'enrolling').length, dotColor: 'bg-emerald-400' },
    { id: 'full', labelBn: 'ব্যাচ পূর্ণ', labelEn: 'Full', count: COURSES_DATA.filter(c => c.batchInfo?.status === 'full').length, dotColor: 'bg-rose-500' },
    { id: 'coming_soon', labelBn: 'শীঘ্রই শুরু', labelEn: 'Coming Soon', count: COURSES_DATA.filter(c => c.batchInfo?.status === 'coming_soon').length, dotColor: 'bg-amber-400' },
  ];

  return (
    <section id="courses" className="py-16 sm:py-24 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8 mb-10 sm:mb-12">
          <div className="space-y-2.5 max-w-xl flex-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{t('courses_badge')}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {t('courses_heading_part1')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">
                {t('courses_heading_part2')}
              </span>
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {t('courses_subheading')}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                ✓ {language === 'bn' ? '১৬ বছরের সাফল্য' : '16 Years of Excellence'}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-sky-400 bg-sky-950/40 border border-sky-500/30 px-2 py-0.5 rounded-md">
                ✓ {language === 'bn' ? 'আধুনিক কম্পিউটার ও এআই ল্যাব' : 'Modern Computer & AI Lab'}
              </span>
            </div>
          </div>

          {/* BENGAL ONE 3-Panel Composite Showcase Image matching uploaded IMG_0759_edited.png */}
          <div className="shrink-0 self-center lg:self-auto w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl">
            <BengalOneShowcaseBanner className="w-full" />
          </div>
        </div>

        {/* Dual Filter Controls: Categories & Batch Enrollment Status */}
        <div className="space-y-3 mb-8">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25 font-bold'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Batch Status Quick Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs">
            <div className="flex items-center gap-2 text-slate-300 font-bold">
              <Filter className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isBn ? 'ব্যাচ স্ট্যাটাস অনুযায়ী ফিল্টার:' : 'Filter by Batch Status:'}</span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {batchStatusFilters.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedBatchStatus(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    selectedBatchStatus === tab.id
                      ? 'bg-slate-800 text-white border-emerald-500 shadow-sm'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200 border-slate-800/80 hover:bg-slate-900'
                  }`}
                >
                  {tab.dotColor && <span className={`w-2 h-2 rounded-full ${tab.dotColor}`} />}
                  <span>{isBn ? tab.labelBn : tab.labelEn}</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-slate-900 text-[10px] text-slate-400 font-mono">
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Empty State when filters yield no courses */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12 p-6 rounded-2xl bg-slate-900/40 border border-slate-800 my-6">
            <Users className="w-10 h-10 text-slate-500 mx-auto mb-3" />
            <h4 className="text-base font-bold text-white mb-1">
              {isBn ? 'কোনো কোর্স পাওয়া যায়নি' : 'No Courses Found'}
            </h4>
            <p className="text-xs text-slate-400 mb-4">
              {isBn ? 'অন্য কোনো ক্যাটাগরি বা ব্যাচ স্ট্যাটাস নির্বাচন করুন।' : 'Try changing your category or batch status filter.'}
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedBatchStatus('all');
              }}
              className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs"
            >
              {isBn ? 'সব কোর্স রিসেট করুন' : 'Reset All Filters'}
            </button>
          </div>
        )}

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, idx) => {
            const hasDiscount = course.discountFee && course.discountFee < course.fee;
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ 
                  duration: 0.5, 
                  delay: (idx % 3) * 0.08,
                  ease: [0.22, 1, 0.36, 1] 
                }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group flex flex-col justify-between rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900 transition-colors duration-300 shadow-xl overflow-hidden"
              >
                <div>
                  {/* Card Top Banner / Badges */}
                  <div className="p-5 pb-0 flex items-start justify-between gap-2.5">
                    <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 group-hover:scale-105 transition-transform shrink-0">
                      {courseIconMap[course.iconName] || <BookOpen className="w-5 h-5" />}
                    </div>

                    <div className="flex flex-col items-end gap-1.5">
                      {/* Visual Batch Status Indicator (Enrolling Now / Full / Coming Soon) */}
                      <BatchStatusBadge batchInfo={course.batchInfo} variant="badge-md" />

                      <div className="flex flex-wrap items-center justify-end gap-1">
                        {course.btebApproved && (
                          <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-300 border border-sky-500/30">
                            <Award className="w-3 h-3" /> BTEB সনদ
                          </span>
                        )}
                        {course.tagBn && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            {course.tagBn}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Course Titles & Info */}
                  <div className="p-5">
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                      {language === 'bn' ? course.titleBn : course.titleEn}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium mt-1">
                      {language === 'bn' ? course.titleEn : course.titleBn}
                    </p>

                    <div className="flex items-center gap-3 text-xs text-slate-400 mt-3 pt-3 border-t border-slate-800/80">
                      <span className="flex items-center gap-1 text-emerald-400 font-medium">
                        <Clock className="w-3.5 h-3.5" /> 
                        {language === 'bn' ? course.durationBn : course.durationEn}
                      </span>
                      <span>·</span>
                      <span>{course.level}</span>
                    </div>

                    <p className="mt-3 text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {language === 'bn' ? course.descriptionBn : course.descriptionEn}
                    </p>

                    {/* Key Modules List Preview */}
                    <div className="mt-4 space-y-1.5 bg-slate-950/60 p-3 rounded-xl border border-slate-800/70">
                      <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                        {language === 'bn' ? 'প্রধান বিষয়বস্তু:' : 'Core Modules:'}
                      </span>
                      {course.modules.slice(0, 3).map((mod, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{mod}</span>
                        </div>
                      ))}
                      {course.modules.length > 3 && (
                        <span className="text-[10px] text-emerald-400 font-medium block pt-0.5">
                          + {language === 'bn' ? `আরও ${course.modules.length - 3}টি মডিউল` : `${course.modules.length - 3} more modules`}
                        </span>
                      )}
                    </div>

                    {/* Live Batch Capacity Progress Bar */}
                    <BatchStatusBadge batchInfo={course.batchInfo} variant="card-footer-progress" />
                  </div>
                </div>

                {/* Card Footer: Pricing & Action Buttons */}
                <div className="p-5 pt-3 border-t border-slate-800 bg-slate-950/40">
                  <div className="flex items-baseline justify-between mb-3">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block font-medium">
                        {t('fee_label')}
                      </span>
                      <div className="flex items-baseline gap-2">
                        {hasDiscount ? (
                          <>
                            <span className="text-xl font-black text-emerald-400">
                              ৳{course.discountFee?.toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')}
                            </span>
                            <span className="text-xs text-slate-500 line-through">
                              ৳{course.fee.toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')}
                            </span>
                          </>
                        ) : (
                          <span className="text-xl font-black text-white">
                            ৳{course.fee.toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveCourseModal(course)}
                      className="text-xs text-slate-300 hover:text-emerald-400 font-semibold underline underline-offset-4 cursor-pointer"
                    >
                      {t('btn_view_syllabus')}
                    </button>
                  </div>

                  {/* Dynamic CTA Button adapting to Batch Status */}
                  <button
                    onClick={() => onOpenAdmission?.(course.id)}
                    className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-xs transition-all shadow-md cursor-pointer ${
                      course.batchInfo?.status === 'full'
                        ? 'bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white border border-rose-500/40'
                        : course.batchInfo?.status === 'coming_soon'
                        ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                        : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                    }`}
                  >
                    <span>
                      {course.batchInfo?.status === 'full'
                        ? (isBn ? 'ব্যাচ পূর্ণ · অপেক্ষমাণ তালিকা' : 'Batch Full · Join Waitlist')
                        : course.batchInfo?.status === 'coming_soon'
                        ? (isBn ? 'অগ্রিম আসন প্রি-বুকিং করুন' : 'Pre-Book Seat Now')
                        : (t('btn_enroll') || (isBn ? 'ভর্তি হতে আবেদন করুন' : 'Enroll Now'))}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Syllabus Detail Modal */}
      {activeCourseModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveCourseModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                <Clock className="w-4 h-4" />
                <span>{activeCourseModal.durationBn} · {activeCourseModal.level}</span>
                {activeCourseModal.btebApproved && (
                  <span className="ml-auto px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-300 text-[10px]">
                    BTEB সরকার অনুমোদিত
                  </span>
                )}
              </div>

              <h3 className="text-2xl font-black text-white">
                {activeCourseModal.titleBn}
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                {activeCourseModal.titleEn}
              </p>

              <p className="text-sm text-slate-300 leading-relaxed">
                {activeCourseModal.descriptionBn}
              </p>

              {/* Visual Batch Status & Seat Availability Box */}
              <BatchStatusBadge batchInfo={activeCourseModal.batchInfo} variant="detail-box" />

              {/* Complete Modules Breakdown */}
              <div className="pt-2">
                <h4 className="text-sm font-bold text-emerald-400 mb-2">
                  সম্পূর্ণ পাঠ্যক্রম ও প্র্যাকটিক্যাল ল্যাব মডিউল:
                </h4>
                <div className="space-y-2">
                  {activeCourseModal.modules.map((m, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-200 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools & Career Outcomes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-xs font-bold text-slate-300 block mb-1.5">ব্যবহৃত সফটওয়্যার ও টুলস:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeCourseModal.software.map((s, i) => (
                      <span key={i} className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-xs font-bold text-slate-300 block mb-1.5">ক্যারিয়ার সুযোগ:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeCourseModal.careerPaths.map((c, i) => (
                      <span key={i} className="text-[11px] px-2 py-0.5 rounded-md bg-emerald-950 text-emerald-300 border border-emerald-800/60">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pricing & Modal Action */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">কোর্স ফি:</span>
                  <span className="text-2xl font-black text-emerald-400">
                    ৳{(activeCourseModal.discountFee || activeCourseModal.fee).toLocaleString('bn-BD')}
                  </span>
                </div>

                <button
                  onClick={() => {
                    const cId = activeCourseModal.id;
                    setActiveCourseModal(null);
                    onOpenAdmission?.(cId);
                  }}
                  className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all shadow-md cursor-pointer ${
                    activeCourseModal.batchInfo?.status === 'full'
                      ? 'bg-rose-500 hover:bg-rose-400 text-white'
                      : activeCourseModal.batchInfo?.status === 'coming_soon'
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                  }`}
                >
                  {activeCourseModal.batchInfo?.status === 'full'
                    ? (isBn ? 'পরবর্তী ব্যাচে ওয়েটলিস্ট আবেদন করুন' : 'Join Waitlist for Next Batch')
                    : activeCourseModal.batchInfo?.status === 'coming_soon'
                    ? (isBn ? 'অগ্রিম আসন প্রি-বুকিং করুন' : 'Pre-Book Seat Now')
                    : (isBn ? 'এই কোর্সে ভর্তি হতে আবেদন করুন' : 'Apply for Admission')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
