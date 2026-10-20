import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TEN_DAY_ROADMAP } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import { 
  Monitor, 
  Keyboard, 
  FileText, 
  Table, 
  Presentation, 
  Cloud, 
  Cpu, 
  Image as ImageIcon, 
  ShieldCheck, 
  Award,
  ChevronRight,
  Sparkles,
  CheckCircle,
  Play
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Monitor: <Monitor className="w-5 h-5" />,
  Keyboard: <Keyboard className="w-5 h-5" />,
  FileText: <FileText className="w-5 h-5" />,
  Table: <Table className="w-5 h-5" />,
  Presentation: <Presentation className="w-5 h-5" />,
  Cloud: <Cloud className="w-5 h-5" />,
  Cpu: <Cpu className="w-5 h-5" />,
  Image: <ImageIcon className="w-5 h-5" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5" />,
  Award: <Award className="w-5 h-5" />
};

export const TenDayRoadmap: React.FC = () => {
  const { language } = useLanguage();
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const activeDay = TEN_DAY_ROADMAP[selectedDayIndex];

  return (
    <section id="roadmap" className="py-16 sm:py-20 bg-slate-950 relative overflow-hidden">
      {/* Background Cybernetic Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-emerald-500/10 via-sky-500/10 to-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              {language === 'bn' ? 'আধুনিক কম্পিউটার ও এআই স্বাক্ষরতা মডেল' : 'Modern Computer & AI Literacy Framework'}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            {language === 'bn' ? (
              <>১০ দিনের বিশেষ <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400">কম্পিউটার ও এআই রোডম্যাপ</span></>
            ) : (
              <>10-Day Accelerated <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400">Computer & AI Roadmap</span></>
            )}
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {language === 'bn' 
              ? 'কম্পিউটার শিক্ষা বা কম্পিউটার স্বাক্ষরতা হলো কম্পিউটারের মৌলিক জ্ঞান, ব্যবহারিক দক্ষতা এবং প্রযুক্তিগত বিষয়াদির কার্যকর প্রয়োগ। দৈনন্দিন কাজ, শিক্ষা এবং পেশাগত জীবনে উন্নতির জন্য এটি একটি অত্যন্ত গুরুত্বপূর্ণ দক্ষতা।'
              : 'Computer literacy and AI competencies empower students with foundational knowledge, hands-on productivity, and modern automation tools essential for career growth.'}
          </p>
        </div>

        {/* The Futuristic Interactive Dual-Monitor Layout mirroring the uploaded screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: The Virtual Cyber PC Station Mockup */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg rounded-2xl bg-gradient-to-b from-slate-800 to-slate-950 p-2 sm:p-4 border border-slate-700/80 shadow-2xl glow-emerald">
              {/* Top Monitor Bezel */}
              <div className="flex items-center justify-between px-3 py-2 bg-slate-900/90 rounded-t-xl border-b border-slate-800 text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="ml-2 font-mono text-slate-300">Bengal OS v2.6 · Lab PC #14</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">{activeDay.day} of 10</span>
                </div>
              </div>

              {/* Screen Content Window */}
              <div className="p-4 sm:p-6 bg-slate-950/95 rounded-b-xl border border-slate-900 min-h-[340px] flex flex-col justify-between overflow-hidden">
                {/* Visual Header */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedDayIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-md bg-emerald-500/20 text-emerald-400 font-bold text-xs font-mono">
                        {language === 'bn' ? (activeDay.highlightBn || activeDay.highlight) : (activeDay.highlightEn || activeDay.highlight)}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Play className="w-3 h-3 text-emerald-400" /> {language === 'bn' ? 'লাইভ ল্যাব প্র্যাকটিস' : 'Live Lab Practice'}
                      </span>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
                        {iconMap[activeDay.icon] || <Monitor className="w-6 h-6" />}
                      </div>
                      <div>
                        <span className="text-emerald-400 font-mono text-xs font-bold">
                          {activeDay.day} {language === 'bn' ? 'সিলেবাস' : 'Syllabus'}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5 leading-snug">
                          {language === 'bn' ? (activeDay.titleBn || activeDay.title) : (activeDay.titleEn || activeDay.title)}
                        </h3>
                      </div>
                    </div>

                    <p className="mt-4 text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80">
                      {language === 'bn' ? (activeDay.descBn || activeDay.desc) : (activeDay.descEn || activeDay.desc)}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Practical Takeaway & Progress Bar */}
                <div className="mt-6 pt-4 border-t border-slate-800">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-slate-400">
                      {language === 'bn' ? 'রোডম্যাপ সম্পন্নতা:' : 'Roadmap Progress:'}
                    </span>
                    <span className="text-emerald-400 font-bold font-mono">
                      {((selectedDayIndex + 1) * 10)}%
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-sky-400 transition-all duration-500 rounded-full"
                      style={{ width: `${(selectedDayIndex + 1) * 10}%` }}
                    />
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedDayIndex(Math.max(0, selectedDayIndex - 1))}
                      disabled={selectedDayIndex === 0}
                      className="text-xs px-3 py-1.5 rounded-md bg-slate-800 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-700 transition-colors"
                    >
                      {language === 'bn' ? '← পূর্ববর্তী দিন' : '← Previous Day'}
                    </button>
                    <span className="text-[11px] text-slate-400">
                      {language === 'bn' ? `দিন ${selectedDayIndex + 1} / ১০` : `Day ${selectedDayIndex + 1} / 10`}
                    </span>
                    <button
                      onClick={() => setSelectedDayIndex(Math.min(9, selectedDayIndex + 1))}
                      disabled={selectedDayIndex === 9}
                      className="text-xs px-3 py-1.5 rounded-md bg-emerald-600 text-white font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-emerald-500 transition-colors"
                    >
                      {language === 'bn' ? 'পরবর্তী দিন →' : 'Next Day →'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Monitor Stand Base */}
              <div className="w-20 h-4 bg-slate-700 mx-auto rounded-t-sm" />
              <div className="w-40 h-2.5 bg-slate-800 mx-auto rounded-full shadow-lg" />
            </div>
          </div>

          {/* Right: Scrollable Interactive Day-by-Day Selector */}
          <div className="lg:col-span-6 space-y-2.5 max-h-[520px] overflow-y-auto pr-1">
            {TEN_DAY_ROADMAP.map((item, idx) => {
              const isSelected = selectedDayIndex === idx;
              return (
                <div
                  key={`day-${idx}`}
                  onClick={() => setSelectedDayIndex(idx)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-slate-900 border-emerald-500/80 shadow-lg shadow-emerald-500/10 translate-x-1'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg shrink-0 transition-colors ${
                      isSelected 
                        ? 'bg-emerald-500 text-slate-950 font-bold' 
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {iconMap[item.icon] || <Monitor className="w-4 h-4" />}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-mono font-bold ${
                          isSelected ? 'text-emerald-400' : 'text-slate-400'
                        }`}>
                          {item.day}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium">
                          {language === 'bn' ? (item.highlightBn || item.highlight) : (item.highlightEn || item.highlight)}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-200 mt-0.5 line-clamp-1">
                        {language === 'bn' ? (item.titleBn || item.title) : (item.titleEn || item.title)}
                      </h4>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center">
                    {isSelected ? (
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-600" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

