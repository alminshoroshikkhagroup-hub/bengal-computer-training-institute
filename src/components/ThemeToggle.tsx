import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Sun, Moon, Sparkles } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
  variant?: 'compact' | 'header-key' | 'pill' | 'segmented';
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  variant = 'compact',
  showLabel = true,
}) => {
  const { theme, toggleTheme, setTheme, isDark } = useTheme();
  const { language } = useLanguage();
  const isBn = language === 'bn';

  if (variant === 'header-key') {
    return (
      <div 
        className={`flex items-center p-1 rounded-xl bg-slate-900/90 border-2 ${
          isDark ? 'border-amber-500/60 shadow-amber-950/40' : 'border-amber-500 shadow-amber-500/20'
        } shadow-lg transition-all ${className}`}
        role="group"
        aria-label="Theme Mode Selector"
      >
        {/* Dark Mode Button */}
        <button
          type="button"
          onClick={() => setTheme('dark')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-black transition-all cursor-pointer ${
            isDark
              ? 'bg-gradient-to-r from-slate-800 to-slate-900 text-amber-300 shadow-md ring-2 ring-amber-400/50 scale-[1.02] border border-amber-500/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
          title={isBn ? 'ডার্ক মোড সক্রিয় করুন' : 'Switch to Dark Mode'}
        >
          <Moon className="w-3.5 h-3.5 text-amber-400 fill-amber-400/30" />
          <span>{isBn ? 'ডার্ক' : 'Dark'}</span>
        </button>

        {/* Light Mode Button */}
        <button
          type="button"
          onClick={() => setTheme('light')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-black transition-all cursor-pointer ${
            !isDark
              ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 shadow-md ring-2 ring-amber-500/60 scale-[1.02]'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
          title={isBn ? 'লাইট মোড সক্রিয় করুন' : 'Switch to Light Mode'}
        >
          <Sun className="w-3.5 h-3.5 text-slate-950" />
          <span>{isBn ? 'লাইট' : 'Light'}</span>
        </button>
      </div>
    );
  }

  if (variant === 'segmented') {
    return (
      <div 
        className={`inline-flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 shadow-inner ${className}`}
        role="group"
        aria-label="Theme Selector"
      >
        <button
          type="button"
          onClick={() => setTheme('dark')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            isDark
              ? 'bg-slate-800 text-amber-400 shadow-sm ring-1 ring-amber-400/40'
              : 'text-slate-400 hover:text-white'
          }`}
          title={isBn ? 'ডার্ক মোড সক্রিয় করুন' : 'Enable Dark Mode'}
        >
          <Moon className="w-3.5 h-3.5 text-amber-400" />
          {showLabel && <span>{isBn ? 'ডার্ক' : 'Dark'}</span>}
        </button>

        <button
          type="button"
          onClick={() => setTheme('light')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            !isDark
              ? 'bg-amber-400 text-slate-950 font-black shadow-sm ring-1 ring-amber-500'
              : 'text-slate-400 hover:text-white'
          }`}
          title={isBn ? 'লাইট মোড সক্রিয় করুন' : 'Enable Light Mode'}
        >
          <Sun className="w-3.5 h-3.5" />
          {showLabel && <span>{isBn ? 'লাইট' : 'Light'}</span>}
        </button>
      </div>
    );
  }

  if (variant === 'pill') {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={`inline-flex items-center gap-1.5 p-1 rounded-full border transition-all cursor-pointer shadow-sm ${
          isDark
            ? 'bg-slate-900/95 border-amber-500/40 text-amber-300 hover:border-amber-400 hover:shadow-amber-500/10'
            : 'bg-amber-100 border-amber-400 text-amber-900 hover:border-amber-500 shadow-amber-200/50'
        } ${className}`}
        title={
          isBn
            ? isDark
              ? 'লাইট মোডে পরিবর্তন করুন (বর্তমানে ডার্ক)'
              : 'ডার্ক মোডে পরিবর্তন করুন (বর্তমানে লাইট)'
            : isDark
              ? 'Switch to Light Mode (Currently Dark)'
              : 'Switch to Dark Mode (Currently Light)'
        }
        aria-label="Theme toggle switch"
      >
        <div className="flex items-center gap-1 px-1">
          <span
            className={`flex items-center justify-center w-5 h-5 rounded-full transition-all ${
              isDark
                ? 'bg-amber-400/20 text-amber-300 ring-1 ring-amber-400/50 shadow-sm'
                : 'text-slate-400 opacity-60'
            }`}
          >
            <Moon className="w-3 h-3" />
          </span>
          <span
            className={`flex items-center justify-center w-5 h-5 rounded-full transition-all ${
              !isDark
                ? 'bg-amber-400 text-slate-950 font-black shadow-sm ring-1 ring-amber-500'
                : 'text-slate-400 opacity-60'
            }`}
          >
            <Sun className="w-3 h-3" />
          </span>
          {showLabel && (
            <span className="text-[10px] sm:text-[11px] font-bold px-1 tracking-tight">
              {isDark ? (isBn ? 'ডার্ক' : 'Dark') : (isBn ? 'লাইট' : 'Light')}
            </span>
          )}
        </div>
      </button>
    );
  }

  // Default compact toggle button
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`group relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer shadow-sm ${
        isDark
          ? 'bg-slate-900/90 hover:bg-slate-800 text-amber-300 border-amber-500/40 hover:border-amber-400 hover:shadow-amber-500/10'
          : 'bg-amber-100 hover:bg-amber-200 text-amber-900 border-amber-400 hover:border-amber-500 shadow-amber-200/50'
      } ${className}`}
      title={
        isBn
          ? isDark
            ? 'লাইট মোডে সুইচ করুন (বর্তমানে ডার্ক মোড সক্রিয়)'
            : 'ডার্ক মোডে সুইচ করুন (বর্তমানে লাইট মোড সক্রিয়)'
          : isDark
            ? 'Switch to Light Mode (Dark mode active)'
            : 'Switch to Dark Mode (Light mode active)'
      }
      aria-label="Toggle theme between dark and light modes"
      data-theme-current={theme}
    >
      <div className="relative w-4 h-4 flex items-center justify-center shrink-0">
        {isDark ? (
          <Moon className="w-4 h-4 text-amber-400 fill-amber-400/30 transition-transform duration-300 group-hover:-rotate-12" />
        ) : (
          <Sun className="w-4 h-4 text-amber-700 fill-amber-500/30 transition-transform duration-500 group-hover:rotate-90" />
        )}
      </div>
      {showLabel && (
        <span className="font-bold text-xs tracking-tight whitespace-nowrap">
          {isDark ? (isBn ? 'ডার্ক মোড' : 'Dark Mode') : (isBn ? 'লাইট মোড' : 'Light Mode')}
        </span>
      )}
    </button>
  );
};
