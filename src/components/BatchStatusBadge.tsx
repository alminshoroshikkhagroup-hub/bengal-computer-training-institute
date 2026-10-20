import React from 'react';
import { BatchEnrollmentData } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { Users, Clock, Calendar, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

interface BatchStatusBadgeProps {
  batchInfo?: BatchEnrollmentData;
  variant?: 'badge-sm' | 'badge-md' | 'card-footer-progress' | 'detail-box';
  className?: string;
}

export const BatchStatusBadge: React.FC<BatchStatusBadgeProps> = ({
  batchInfo,
  variant = 'badge-md',
  className = '',
}) => {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  if (!batchInfo) return null;

  const { status, enrolledStudents, totalSeats, startDateBn, startDateEn, batchCodeBn, batchCodeEn } = batchInfo;
  const seatsLeft = Math.max(0, totalSeats - enrolledStudents);
  const percentage = Math.min(100, Math.round((enrolledStudents / totalSeats) * 100));

  // Small Top Badge for Cards
  if (variant === 'badge-sm' || variant === 'badge-md') {
    if (status === 'enrolling') {
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-black tracking-wide border shadow-sm transition-all ${
            variant === 'badge-md' ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
          } ${className}`}
        >
          {/* Pulsing Live Dot */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>{isBn ? 'ভর্তি চলছে' : 'Enrolling Now'}</span>
          {seatsLeft > 0 && (
            <span className="text-emerald-400/90 font-medium pl-0.5 border-l border-emerald-500/30">
              {isBn ? `${seatsLeft}টি আসন বাকি` : `${seatsLeft} seats left`}
            </span>
          )}
        </span>
      );
    }

    if (status === 'full') {
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-black tracking-wide bg-rose-500/15 border border-rose-500/40 text-rose-300 shadow-sm ${className}`}
        >
          <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0"></span>
          <span>{isBn ? 'ব্যাচ পূর্ণ (Housefull)' : 'Batch Full'}</span>
          <span className="text-rose-400/90 font-medium pl-0.5 border-l border-rose-500/30">
            {isBn ? 'অপেক্ষমাণ তালিকা' : 'Waitlist'}
          </span>
        </span>
      );
    }

    // Coming Soon
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-black tracking-wide bg-amber-500/15 border border-amber-500/40 text-amber-300 shadow-sm ${className}`}
      >
        <Sparkles className="w-3 h-3 text-amber-400 animate-pulse shrink-0" />
        <span>{isBn ? 'শীঘ্রই শুরু' : 'Coming Soon'}</span>
        {startDateBn && (
          <span className="text-amber-400/90 font-medium pl-0.5 border-l border-amber-500/30">
            {isBn ? 'প্রি-বুকিং' : 'Pre-Booking'}
          </span>
        )}
      </span>
    );
  }

  // Progress Bar for Course Card Body
  if (variant === 'card-footer-progress') {
    if (status === 'enrolling') {
      return (
        <div className={`space-y-1.5 pt-2 ${className}`}>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400 flex items-center gap-1 font-medium">
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isBn ? batchCodeBn : batchCodeEn}</span>
            </span>
            <span className="font-bold text-emerald-400">
              {isBn
                ? `${enrolledStudents}/${totalSeats} সিট বুকড (${percentage}%)`
                : `${enrolledStudents}/${totalSeats} Seats (${percentage}%)`}
            </span>
          </div>

          {/* Progress track */}
          <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      );
    }

    if (status === 'full') {
      return (
        <div className={`space-y-1.5 pt-2 ${className}`}>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400 flex items-center gap-1 font-medium">
              <Users className="w-3.5 h-3.5 text-rose-400" />
              <span>{isBn ? batchCodeBn : batchCodeEn}</span>
            </span>
            <span className="font-black text-rose-400">
              {isBn ? '১০০% আসন পূর্ণ' : '100% Full'}
            </span>
          </div>

          <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <div className="h-full rounded-full bg-rose-500 w-full" />
          </div>

          <p className="text-[10px] text-slate-400">
            {isBn
              ? `* ${startDateBn || 'পরবর্তী ব্যাচ নিবন্ধন চলছে'}`
              : `* ${startDateEn || 'Waitlist open for next batch'}`}
          </p>
        </div>
      );
    }

    // Coming soon progress container
    return (
      <div className={`space-y-1.5 pt-2 ${className}`}>
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-slate-400 flex items-center gap-1 font-medium">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>{isBn ? batchCodeBn : batchCodeEn}</span>
          </span>
          <span className="font-bold text-amber-400">
            {isBn ? 'আসন সংখ্যা: ' + totalSeats : 'Capacity: ' + totalSeats}
          </span>
        </div>

        <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 w-1/4" />
        </div>

        <p className="text-[10px] text-slate-400">
          {isBn
            ? `* ক্লাস শুরু: ${startDateBn || 'শীঘ্রই'}`
            : `* Starts: ${startDateEn || 'Soon'}`}
        </p>
      </div>
    );
  }

  // Full Detail Box for Detail Modal
  return (
    <div
      className={`p-3.5 rounded-xl border ${
        status === 'enrolling'
          ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
          : status === 'full'
          ? 'bg-rose-950/30 border-rose-500/40 text-rose-200'
          : 'bg-amber-950/30 border-amber-500/40 text-amber-200'
      } ${className}`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {status === 'enrolling' && (
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
          )}
          {status === 'full' && <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />}
          {status === 'coming_soon' && <Sparkles className="w-3.5 h-3.5 text-amber-400" />}
          <span className="font-black text-sm">
            {status === 'enrolling' && (isBn ? 'ব্যাচে সরাসরি ভর্তি চলছে' : 'Enrolling Now')}
            {status === 'full' && (isBn ? 'বর্তমান ব্যাচ সম্পন্ন / পূর্ণ' : 'Batch Full - Waitlist')}
            {status === 'coming_soon' && (isBn ? 'আসন্ন নতুন ব্যাচ' : 'Coming Soon')}
          </span>
        </div>

        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-900/80 border border-slate-700/80">
          {isBn ? batchCodeBn : batchCodeEn}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-800/80">
        <div>
          <span className="text-slate-400 block text-[10px]">
            {isBn ? 'আসন অবস্থা:' : 'Seat Status:'}
          </span>
          <span className="font-semibold text-white">
            {status === 'enrolling' && (isBn ? `${seatsLeft}টি আসন বাকি (মোট ${totalSeats})` : `${seatsLeft} seats left of ${totalSeats}`)}
            {status === 'full' && (isBn ? `${totalSeats}/${totalSeats} পূর্ণ (১০০%)` : `${totalSeats}/${totalSeats} Full (100%)`)}
            {status === 'coming_soon' && (isBn ? `মোট আসন: ${totalSeats}টি` : `Total Capacity: ${totalSeats}`)}
          </span>
        </div>

        <div>
          <span className="text-slate-400 block text-[10px]">
            {isBn ? 'শুরুর সময় / শিডিউল:' : 'Schedule / Start:'}
          </span>
          <span className="font-semibold text-white">
            {isBn ? (startDateBn || 'চলমান') : (startDateEn || 'Ongoing')}
          </span>
        </div>
      </div>
    </div>
  );
};
