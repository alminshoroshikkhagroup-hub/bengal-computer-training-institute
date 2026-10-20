import React, { useState } from 'react';
import { COURSES_DATA } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import { saveAdmissionApplication } from '../services/firebaseDb';
import { CrestLogo } from './CrestLogo';
import { 
  CheckCircle2, 
  X, 
  User, 
  Phone, 
  BookOpen, 
  Clock, 
  Calendar, 
  Printer, 
  Sparkles,
  QrCode,
  ShieldCheck,
  Send
} from 'lucide-react';

interface AdmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCourseId?: string;
  defaultCoupon?: string;
}

export const AdmissionModal: React.FC<AdmissionModalProps> = ({
  isOpen,
  onClose,
  defaultCourseId,
  defaultCoupon = '',
}) => {
  const { language, t } = useLanguage();
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    guardianPhone: '',
    email: '',
    education: 'HSC Candidate',
    courseId: defaultCourseId || COURSES_DATA[0].id,
    shift: 'morning',
    couponCode: defaultCoupon,
    address: 'কুষ্টিয়া',
  });

  const [appliedCoupon, setAppliedCoupon] = useState(defaultCoupon.toUpperCase() === 'HSC50');
  const [admissionToken, setAdmissionToken] = useState('');

  if (!isOpen) return null;

  const selectedCourse = COURSES_DATA.find(c => c.id === formData.courseId) || COURSES_DATA[0];
  const discountPercent = appliedCoupon ? 50 : (selectedCourse.discountFee ? 30 : 0);
  const payableFee = appliedCoupon ? Math.round(selectedCourse.fee * 0.5) : (selectedCourse.discountFee || selectedCourse.fee);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      alert('অনুগ্রহ করে নাম এবং মোবাইল নম্বর দিন।');
      return;
    }
    const token = 'BCTI-ADM-' + Math.floor(10000 + Math.random() * 90000);
    setAdmissionToken(token);

    // Save to Firebase Firestore database
    await saveAdmissionApplication({
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      courseId: formData.courseId,
      courseName: selectedCourse.titleBn,
      address: formData.address,
      couponCode: formData.couponCode,
      batch: '২০২৬ সেশন',
      status: 'pending',
      createdAt: new Date().toISOString()
    });

    setStep('success');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl p-6 sm:p-8 my-8 max-h-[95vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' ? (
          <div>
            {/* Header */}
            <div className="mb-6">
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest font-mono">
                {language === 'bn' ? 'BTEB অনুমোদিত ইনস্টিটিউট কোড: ২৭১১৭' : 'BTEB Approved Institute Code: 27117'}
              </span>
              <h3 className="text-2xl font-black text-white mt-1">
                {t('modal_title')}
              </h3>
              <p className="text-xs text-slate-300">
                {language === 'bn' 
                  ? 'বেঙ্গল কম্পিউটার ট্রেনিং ইনস্টিটিউট, সিঙ্গার মোড়, জনতা ব্যাংক ভবন, কুষ্টিয়া।' 
                  : 'Bengal Computer Training Institute, Singer Mor, Janata Bank Building, Kushtia.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    {language === 'bn' ? 'শিক্ষার্থীর পূর্ণ নাম *' : "Student's Full Name *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder={language === 'bn' ? 'যেমন: মোঃ সাকিব হাসান' : 'e.g. Md. Sakib Hasan'}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    {language === 'bn' ? 'মোবাইল নম্বর (সচল) *' : 'Mobile Number (Active) *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="017xxxxxxxx"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>

              {/* Course Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  {language === 'bn' ? 'যে কোর্সে ভর্তি হতে চান *' : 'Selected Course for Admission *'}
                </label>
                <select
                  value={formData.courseId}
                  onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-emerald-500"
                >
                  {COURSES_DATA.map((c) => (
                    <option key={c.id} value={c.id}>
                      {language === 'bn' ? `${c.titleBn} - ${c.durationBn}` : `${c.titleEn} - ${c.durationEn}`}
                    </option>
                  ))}
                </select>
              </div>

              {/* Preferred Shift & Education */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    সুবিধাজনক শিফট / সময় *
                  </label>
                  <select
                    value={formData.shift}
                    onChange={(e) => setFormData({ ...formData, shift: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-emerald-500"
                  >
                    <option value="morning">সকাল (৯:০০টা - ১১:০০টা)</option>
                    <option value="noon">দুপুর (১১:০০টা - ১:০০টা)</option>
                    <option value="afternoon">বিকাল (৩:০০টা - ৫:০০টা)</option>
                    <option value="evening">সান্ধ্যকালীন (৬:০০টা - ৮:০০টা)</option>
                    <option value="weekend">শুক্র-শনিবার বিশেষ ব্যাচ</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    শিক্ষাগত যোগ্যতা
                  </label>
                  <select
                    value={formData.education}
                    onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-emerald-500"
                  >
                    <option value="HSC Candidate">এইচএসসি পরীক্ষার্থী / শিক্ষার্থী</option>
                    <option value="SSC">এসএসসি পাস</option>
                    <option value="Honours/Degree">অনার্স / ডিগ্রি শিক্ষার্থী</option>
                    <option value="Job Holder">চাকরিজীবী / প্রফেশনাল</option>
                    <option value="Kids">স্কুল শিক্ষার্থী (কিডস)</option>
                  </select>
                </div>
              </div>

              {/* Coupon / Promo Code */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  প্রমো বা স্কলারশিপ কোড
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.couponCode}
                    onChange={(e) => {
                      setFormData({ ...formData, couponCode: e.target.value });
                      if (e.target.value.toUpperCase() === 'HSC50') {
                        setAppliedCoupon(true);
                      }
                    }}
                    placeholder="যেমন: HSC50"
                    className="flex-1 px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs font-mono uppercase focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (formData.couponCode.toUpperCase() === 'HSC50') {
                        setAppliedCoupon(true);
                        alert('অভিনন্দন! HSC50 কোডে ৫০% ছাড় কার্যকর হয়েছে।');
                      } else {
                        alert('অনুগ্রহ করে সঠিক কোড দিন (যেমন: HSC50)');
                      }
                    }}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-bold rounded-xl transition-colors"
                  >
                    যাচাই
                  </button>
                </div>
                {appliedCoupon && (
                  <span className="text-[11px] text-emerald-400 font-semibold mt-1 block">
                    ✓ HSC50 কুপন কোডে ৫০% ছাড় কার্যকর হয়েছে!
                  </span>
                )}
              </div>

              {/* Fee Summary Banner */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400 block">প্রদেয় কোর্স ফি:</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-black text-emerald-400 font-mono">
                      ৳{payableFee.toLocaleString('bn-BD')}
                    </span>
                    {discountPercent > 0 && (
                      <span className="text-slate-500 line-through text-[11px]">
                        ৳{selectedCourse.fee.toLocaleString('bn-BD')}
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right text-[11px] text-slate-400">
                  <span className="text-emerald-400 font-bold block">
                    {discountPercent}% {language === 'bn' ? 'ছাড় প্রযোজ্য' : 'Discount Applied'}
                  </span>
                  <span>{language === 'bn' ? 'কিস্তিতেও পরিশোধযোগ্য' : 'Installment Payable'}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm transition-all shadow-lg shadow-emerald-500/30 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{t('modal_submit')}</span>
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation Success Voucher View */
          <div className="text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-black text-white">
                {language === 'bn' ? 'অভিনন্দন! ভর্তি আবেদন গৃহীত হয়েছে' : 'Congratulations! Admission Application Received'}
              </h3>
              <p className="text-xs text-slate-300">
                {language === 'bn' 
                  ? 'আপনার ভর্তি রেজিস্ট্রেশন সাময়িকভাবে সম্পন্ন হয়েছে। নিচে আপনার অ্যাডমিশন স্লিপ দেওয়া হলো।' 
                  : 'Your provisional admission registration is complete. Your admission slip is displayed below.'}
              </p>
            </div>

            {/* Printable Digital Admission Slip */}
            <div className="p-5 rounded-xl bg-slate-950 border border-emerald-500/40 text-left space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <CrestLogo size="sm" showText={false} />
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">{language === 'bn' ? 'রেজিস্ট্রেশন টোকেন' : 'Registration Token'}</span>
                  <span className="text-sm font-mono font-black text-emerald-400">{admissionToken}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">{language === 'bn' ? 'শিক্ষার্থীর নাম:' : 'Student Name:'}</span>
                  <span className="font-bold text-white">{formData.fullName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">{language === 'bn' ? 'মোবাইল নম্বর:' : 'Mobile Number:'}</span>
                  <span className="font-mono text-slate-200">{formData.phone}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">{language === 'bn' ? 'কোর্স:' : 'Course:'}</span>
                  <span className="font-semibold text-emerald-300">{language === 'bn' ? selectedCourse.titleBn : selectedCourse.titleEn}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">{language === 'bn' ? 'নির্ধারিত ফি:' : 'Payable Fee:'}</span>
                  <span className="font-bold text-amber-400 font-mono">৳{payableFee.toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
                <p className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {language === 'bn' ? 'ক্যাম্পাসে সরাসরি উপস্থিত হয়ে বা বিকাশে কনফার্ম করতে পারেন।' : 'You can confirm your admission at campus or via bKash.'}
                </p>
                <p>
                  {language === 'bn' ? 'ঠিকানা: আজিজুর রহমান সুপার মার্কেট (১ম তলা, জনতা ব্যাংক ভবন), সিঙ্গার মোড়, এন এস রোড, কুষ্টিয়া।' : 'Address: Azizur Rahman Super Market (1st Floor, Janata Bank Building), Singer Mor, Kushtia.'}
                </p>
                <p className="font-mono text-slate-300">
                  {language === 'bn' ? 'জরুরি যোগাযোগ: ০১৭৮২-৮২৪৫৮২ / ০১৮৭০-৭০৭৭১৫' : 'Hotline: 01782-824582 / 01870-707715'}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={handlePrint}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>{language === 'bn' ? 'স্লিপ প্রিন্ট করুন' : 'Print Slip'}</span>
              </button>
              <button
                onClick={() => {
                  setStep('form');
                  onClose();
                }}
                className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
              >
                {language === 'bn' ? 'সম্পন্ন হয়েছে' : 'Done'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
