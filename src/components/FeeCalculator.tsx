import React, { useState } from 'react';
import { COURSES_DATA } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import { 
  Calculator, 
  ArrowRight,
} from 'lucide-react';

interface FeeCalculatorProps {
  onOpenAdmission?: (courseId?: string, discountCode?: string) => void;
}

export const FeeCalculator: React.FC<FeeCalculatorProps> = ({ onOpenAdmission }) => {
  const { language, t } = useLanguage();
  const [selectedCourseId, setSelectedCourseId] = useState(COURSES_DATA[0].id);
  const [studentCategory, setStudentCategory] = useState<'regular' | 'hsc' | 'female' | 'meritorious'>('hsc');
  const [couponCode, setCouponCode] = useState('HSC50');
  const [couponApplied, setCouponApplied] = useState(true);
  const [installmentMonths, setInstallmentMonths] = useState<1 | 2 | 3>(2);

  const selectedCourse = COURSES_DATA.find(c => c.id === selectedCourseId) || COURSES_DATA[0];

  // Base fee
  const baseFee = selectedCourse.fee;

  // Calculate discount percentage based on category & coupon
  let discountPercentage = 0;
  if (couponApplied && couponCode.toUpperCase() === 'HSC50') {
    discountPercentage = 50;
  } else if (studentCategory === 'hsc') {
    discountPercentage = 50;
  } else if (studentCategory === 'female') {
    discountPercentage = 25;
  } else if (studentCategory === 'meritorious') {
    discountPercentage = 30;
  } else if (selectedCourse.discountFee) {
    discountPercentage = Math.round(((selectedCourse.fee - selectedCourse.discountFee) / selectedCourse.fee) * 100);
  }

  const discountAmount = Math.round((baseFee * discountPercentage) / 100);
  const finalFee = Math.max(0, baseFee - discountAmount);
  const monthlyInstallment = Math.round(finalFee / installmentMonths);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'HSC50' || couponCode.trim().toUpperCase() === 'BENGAL2026') {
      setCouponApplied(true);
    } else {
      setCouponApplied(false);
      alert(language === 'bn' ? 'দুঃখিত, কুপনটি সঠিক নয়। HSC50 ব্যবহার করে ৫০% ছাড় নিন।' : 'Sorry, invalid coupon. Use HSC50 for 50% discount.');
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl max-w-4xl mx-auto my-10">
      <div className="flex items-center gap-2.5 mb-6 text-emerald-400">
        <div className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-500/30">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            {t('calc_title')}
          </h3>
          <p className="text-xs text-slate-400">
            {t('calc_sub')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Inputs */}
        <div className="md:col-span-7 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              {t('calc_select_course')}:
            </label>
            <select
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-500"
            >
              {COURSES_DATA.map((c) => (
                <option key={c.id} value={c.id}>
                  {language === 'bn' ? c.titleBn : c.titleEn} ({language === 'bn' ? 'ফি' : 'Fee'}: ৳{c.fee.toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              {language === 'bn' ? 'আপনার ক্যাটাগরি / স্কলারশিপ:' : 'Your Category / Scholarship:'}
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => {
                  setStudentCategory('hsc');
                  setCouponCode('HSC50');
                  setCouponApplied(true);
                }}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  studentCategory === 'hsc'
                    ? 'bg-emerald-500/20 border-emerald-500 text-white font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{language === 'bn' ? 'HSC পরীক্ষার্থী' : 'HSC Student'}</span>
                  <span className="text-[10px] text-emerald-400 font-bold">50% OFF</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setStudentCategory('female')}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  studentCategory === 'female'
                    ? 'bg-emerald-500/20 border-emerald-500 text-white font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{language === 'bn' ? 'নারী শিক্ষার্থী' : 'Female Student'}</span>
                  <span className="text-[10px] text-emerald-400 font-bold">25% OFF</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setStudentCategory('meritorious')}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  studentCategory === 'meritorious'
                    ? 'bg-emerald-500/20 border-emerald-500 text-white font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{language === 'bn' ? 'মেধাবী ও দরিদ্র' : 'Merit / Need-based'}</span>
                  <span className="text-[10px] text-emerald-400 font-bold">30% OFF</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setStudentCategory('regular');
                  setCouponApplied(false);
                }}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  studentCategory === 'regular'
                    ? 'bg-emerald-500/20 border-emerald-500 text-white font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{language === 'bn' ? 'সাধারণ শিক্ষার্থী' : 'Regular Student'}</span>
                  <span className="text-[10px] text-slate-500 font-medium">Standard</span>
                </div>
              </button>
            </div>
          </div>

          {/* Coupon Input */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              {language === 'bn' ? 'ডিসকাউন্ট প্রমো কোড:' : 'Discount Promo Code:'}
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="e.g. HSC50"
                className="flex-1 px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs uppercase font-mono focus:outline-none focus:border-emerald-500"
              />
              <button
                type="button"
                onClick={handleApplyCoupon}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                {language === 'bn' ? 'প্রয়োগ' : 'Apply'}
              </button>
            </div>
            {couponApplied && (
              <span className="text-[11px] text-emerald-400 font-semibold mt-1 block">
                ✓ {language === 'bn' ? 'কুপন সক্রিয়! ৫০% ছাড় প্রযোজ্য হয়েছে।' : 'Coupon active! 50% discount applied.'}
              </span>
            )}
          </div>

          {/* Installment Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              {t('calc_installments')}:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setInstallmentMonths(m as 1 | 2 | 3)}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                    installmentMonths === m
                      ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-500'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {m === 1 
                    ? (language === 'bn' ? 'এককালীন' : '1 Time') 
                    : (language === 'bn' ? `${m} কিস্তিতে` : `${m} Installments`)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Summary Card */}
        <div className="md:col-span-5 bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {language === 'bn' ? 'ফি সংক্ষেপ' : 'Fee Summary'}
            </h4>

            <div className="flex justify-between text-xs text-slate-300">
              <span>{language === 'bn' ? 'মূল কোর্স ফি:' : 'Base Course Fee:'}</span>
              <span className="font-mono text-slate-400 line-through">
                ৳{baseFee.toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')}
              </span>
            </div>

            <div className="flex justify-between text-xs text-emerald-400 font-semibold">
              <span>{language === 'bn' ? `মোট ছাড় (${discountPercentage}%):` : `Total Discount (${discountPercentage}%):`}</span>
              <span className="font-mono">- ৳{discountAmount.toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')}</span>
            </div>

            <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline">
              <span className="text-xs font-bold text-white">
                {language === 'bn' ? 'সর্বমোট প্রদেয় ফি:' : 'Total Payable Fee:'}
              </span>
              <span className="text-2xl font-black text-emerald-400 font-mono">
                ৳{finalFee.toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')}
              </span>
            </div>

            {installmentMonths > 1 && (
              <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300">
                <span className="block font-bold">
                  {language === 'bn' ? `প্রতি কিস্তিতে প্রদেয়: ৳${monthlyInstallment.toLocaleString('bn-BD')}` : `Per Installment: ৳${monthlyInstallment.toLocaleString('en-US')}`}
                </span>
                <span className="text-[10px] text-slate-400">
                  {language === 'bn' ? '(ভর্তির সময় ১ম কিস্তি ও আগামী মাসে ২য় কিস্তি)' : '(1st payment on admission, 2nd next month)'}
                </span>
              </div>
            )}

            <div className="text-[11px] text-slate-400 space-y-1 pt-1">
              <p>✓ {language === 'bn' ? 'কোর্স ম্যাটেরিয়ালস ও শিট সম্পূর্ণ ফ্রি' : 'Course materials & lecture notes free'}</p>
              <p>✓ {language === 'bn' ? '১ জন ১টি কম্পিউটার ল্যাব ও সার্বক্ষণিক সাপোর্ট' : '1 computer per student & 24/7 lab support'}</p>
              <p>✓ {language === 'bn' ? 'বাংলাদেশ কারিগরি শিক্ষা বোর্ড (BTEB) সনদ সুবিধা' : 'Govt. BTEB certification opportunity'}</p>
            </div>
          </div>

          <button
            onClick={() => onOpenAdmission?.(selectedCourse.id, couponApplied ? 'HSC50' : '')}
            className="mt-6 w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-all shadow-md cursor-pointer"
          >
            <span>{language === 'bn' ? 'এই কোর্সে এখনই আবেদন করুন' : 'Apply for this Course Now'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
