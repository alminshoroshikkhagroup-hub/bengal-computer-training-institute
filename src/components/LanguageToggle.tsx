import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  className?: string;
  variant?: 'pill' | 'compact' | 'bar';
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ 
  className = '',
  variant = 'pill'
}) => {
  const { language, setLanguage, toggleLanguage } = useLanguage();

  if (variant === 'compact') {
    return (
      <button
        onClick={toggleLanguage}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
          language === 'bn'
            ? 'bg-slate-900 hover:bg-slate-800 text-emerald-400 border-emerald-500/40'
            : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 border-emerald-400 shadow-md'
        } ${className}`}
        title={language === 'bn' ? 'Switch to English' : 'বাংলা ভাষায় পড়ুন'}
      >
        <Globe className="w-3.5 h-3.5" />
        <span>{language === 'bn' ? 'English' : 'বাংলা'}</span>
      </button>
    );
  }

  // Full segmented pill switch: [ বাংলা | EN ]
  return (
    <div 
      className={`inline-flex items-center p-0.5 rounded-full bg-slate-900 border border-slate-700/80 shadow-inner ${className}`}
      role="group"
      aria-label="Language Selector"
    >
      <button
        type="button"
        onClick={() => setLanguage('bn')}
        className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
          language === 'bn'
            ? 'bg-emerald-500 text-slate-950 shadow-md scale-100 font-black'
            : 'text-slate-400 hover:text-white'
        }`}
      >
        <span className="text-[11px]">বাংলা</span>
      </button>

      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
          language === 'en'
            ? 'bg-emerald-500 text-slate-950 shadow-md scale-100 font-black'
            : 'text-slate-400 hover:text-white'
        }`}
      >
        <span className="text-[11px]">English</span>
      </button>
    </div>
  );
};
