import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe2, ArrowLeftRight, Check, Sparkles } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export const TopLanguageHeaderKey: React.FC = () => {
  const { language, setLanguage, toggleLanguage } = useLanguage();

  return (
    <div className="w-full bg-gradient-to-r from-slate-950 via-emerald-950/70 to-slate-950 border-b-2 border-emerald-500/50 shadow-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-1.5 sm:py-2 flex flex-wrap items-center justify-between gap-2 sm:gap-4">
        {/* Left Side: Descriptive Notice & Prompt */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs">
          <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 shrink-0 shadow-sm animate-pulse">
            <Globe2 className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-black text-white text-xs sm:text-sm tracking-tight">
              <span>{language === 'bn' ? 'বাংলা টু ইংরেজি সুইচ কি' : 'Bengali to English Switch Key'}</span>
              <span className="hidden md:inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <Sparkles className="w-2.5 h-2.5" />
                {language === 'bn' ? 'দ্বিভাষিক পোর্টাল' : 'Bilingual Portal'}
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-300 hidden xs:block">
              {language === 'bn' 
                ? 'ওয়েবসাইটের সকল তথ্য বাংলা ও ইংরেজি উভয় ভাষায় পড়ার সুবিধার্থে নিচের কি (Key) ব্যবহার করুন:' 
                : 'Use this key to read all website details in either Bengali or English:'}
            </p>
          </div>
        </div>

        {/* Right Side: The Language Switcher Key (একেবারে উপরে কি) */}
        <div className="flex items-center gap-1.5 sm:gap-2 ml-auto">
          {/* Status Label on medium+ screens */}
          <div className="hidden lg:flex items-center gap-1 text-[11px] text-slate-300 font-medium mr-1">
            <span className="text-slate-400">{language === 'bn' ? 'ভাষা নির্বাচন:' : 'Select Language:'}</span>
          </div>

          {/* Interactive Dual Switch Key Box */}
          <div 
            className="flex items-center p-1 rounded-xl bg-slate-900/90 border-2 border-emerald-500/60 shadow-lg shadow-emerald-950/50"
            role="group"
            aria-label="Language Selector Key"
          >
            {/* Bengali Key Button */}
            <button
              type="button"
              onClick={() => setLanguage('bn')}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-black transition-all cursor-pointer ${
                language === 'bn'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md ring-2 ring-emerald-400/50 scale-[1.02]'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
              title="বাংলা ভাষায় পড়ুন"
            >
              <span className="text-sm">🇧🇩</span>
              <span>বাংলা</span>
              {language === 'bn' && <Check className="w-3.5 h-3.5 ml-0.5 font-bold stroke-[3]" />}
            </button>

            {/* Quick Swap Arrow Key */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="p-1 sm:p-1.5 mx-0.5 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
              title={language === 'bn' ? 'ইংরেজি করুন / Switch to English' : 'বাংলা করুন / Switch to Bangla'}
              aria-label="Toggle language"
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
            </button>

            {/* English Key Button */}
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-black transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md ring-2 ring-emerald-400/50 scale-[1.02]'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
              title="Read in English"
            >
              <span className="text-sm">🇬🇧</span>
              <span>English</span>
              {language === 'en' && <Check className="w-3.5 h-3.5 ml-0.5 font-bold stroke-[3]" />}
            </button>
          </div>

          {/* Theme Mode Toggle Key (ডার্ক / লাইট মোড) */}
          <div className="flex items-center">
            <ThemeToggle variant="header-key" />
          </div>
        </div>
      </div>
    </div>
  );
};
