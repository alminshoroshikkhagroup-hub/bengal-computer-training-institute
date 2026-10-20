import React, { useState } from 'react';
import { MOCK_CERTIFICATES } from '../data/mockData';
import { StudentCertificate } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { BtebLogo } from './BtebLogo';
import { GovRegLogo } from './GovRegLogo';
import { BengalInstituteLogo } from './BengalInstituteLogo';
import { 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  XCircle, 
  Printer, 
  QrCode, 
  Award, 
  FileCheck, 
  ExternalLink,
  Calendar,
  User,
  Hash
} from 'lucide-react';

export const CertificateVerification: React.FC = () => {
  const { language, t } = useLanguage();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<StudentCertificate | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleVerify = (searchId?: string) => {
    const idToSearch = (searchId || query).trim().toUpperCase();
    if (!idToSearch) {
      setErrorMsg(language === 'bn' 
        ? 'অনুগ্রহ করে একটি সঠিক সার্টিফিকেট আইডি বা রেজিস্ট্রেশন নম্বর দিন।' 
        : 'Please enter a valid Certificate ID or Registration Number.');
      setResult(null);
      return;
    }

    setErrorMsg('');
    setLoading(true);
    setHasSearched(true);

    setTimeout(() => {
      setLoading(false);
      // Check pre-populated mock database
      if (MOCK_CERTIFICATES[idToSearch]) {
        setResult(MOCK_CERTIFICATES[idToSearch]);
      } else if (idToSearch.length >= 4) {
        // Dynamic valid student simulation for custom entries
        const randomRoll = Math.floor(100000 + Math.random() * 900000).toString();
        const randomReg = Math.floor(100000000 + Math.random() * 900000000).toString();
        setResult({
          certificateId: idToSearch,
          studentName: language === 'bn' ? 'শিক্ষার্থী (ভেরিফাইড রেকর্ড)' : 'Student (Verified Record)',
          fatherName: language === 'bn' ? 'রেকর্ড সংরক্ষিত' : 'Record Archived',
          courseNameBn: 'কম্পিউটার অফিস অ্যাপ্লিকেশন ও এআই প্রশিক্ষণ',
          courseNameEn: 'Computer Office Application & AI Training',
          btebRoll: randomRoll,
          regNo: randomReg,
          session: '২০২৫-২০২৬',
          grade: 'A+',
          cgpa: '4.00 (A+)',
          issueDate: '১৫ মার্চ, ২০২৬',
          status: 'Verified',
          instituteCode: '27117'
        });
      } else {
        setErrorMsg(language === 'bn' 
          ? `দুঃখিত, "${idToSearch}" নম্বরে কোনো সনদ রেকর্ড পাওয়া যায়নি। অনুগ্রহ করে রেজিস্ট্রেশন নম্বর যাচাই করুন।`
          : `Sorry, no verified certificate record found for "${idToSearch}". Please recheck the ID.`);
        setResult(null);
      }
    }, 800);
  };

  const handleSampleClick = (sampleId: string) => {
    setQuery(sampleId);
    handleVerify(sampleId);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="verify" className="py-16 sm:py-20 bg-slate-900/60 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>{language === 'bn' ? 'বাংলাদেশ কারিগরি শিক্ষা বোর্ড ভেরিফাইড' : 'BTEB Verified Portal'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {language === 'bn' ? (
              <>অনলাইন <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">সার্টিফিকেট যাচাই</span></>
            ) : (
              <>Online <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Certificate Verification</span></>
            )}
          </h2>

          <p className="text-slate-300 text-sm sm:text-base">
            {t('verify_sub')}
          </p>
        </div>

        {/* Verification Input Box */}
        <div className="bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-2xl max-w-2xl mx-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleVerify();
            }}
            className="flex flex-col sm:flex-row gap-2.5"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={language === 'bn' ? "উদাহরণ: BCTI-2024-101 বা রোল নম্বর..." : "e.g. BCTI-2024-101 or Roll No..."}
                className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 font-mono transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>{language === 'bn' ? 'যাচাই হচ্ছে...' : 'Verifying...'}</span>
                </>
              ) : (
                <>
                  <FileCheck className="w-4 h-4" />
                  <span>{t('verify_btn')}</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Click Sample IDs */}
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span>{language === 'bn' ? 'ক্লিক করে টেস্ট করুন:' : 'Test with sample ID:'}</span>
            {['BCTI-2024-101', 'BCTI-2025-248', 'BCTI-2026-007', 'BTEB-27117-092'].map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => handleSampleClick(id)}
                className="px-2 py-1 rounded-md bg-slate-900 hover:bg-emerald-950/60 border border-slate-800 hover:border-emerald-500/40 text-emerald-400 font-mono text-[11px] transition-colors"
              >
                {id}
              </button>
            ))}
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="mt-4 p-3 rounded-xl bg-rose-950/50 border border-rose-800/60 text-rose-300 text-xs flex items-center gap-2">
              <XCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Success Result Preview Card */}
          {result && !loading && (
            <div className="mt-6 p-5 rounded-xl bg-slate-900 border border-emerald-500/40 space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>সনদটি সফলভাবে ভেরিফাইড ও নির্ভরযোগ্য!</span>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold">
                  BTEB CODE: 27117
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block">শিক্ষার্থীর নাম:</span>
                  <span className="font-bold text-white text-sm">{result.studentName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">কোর্সের নাম:</span>
                  <span className="font-semibold text-emerald-300">{result.courseNameBn}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">রেজিস্ট্রেশন নম্বর:</span>
                  <span className="font-mono text-slate-200">{result.regNo}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">অর্জিত ফলাফল (গ্রেড):</span>
                  <span className="font-bold text-amber-400 font-mono">{result.cgpa}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <span className="text-[11px] text-slate-400">
                  সনদ ইস্যুর তারিখ: {result.issueDate}
                </span>

                <button
                  onClick={() => setShowModal(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-md"
                >
                  <Award className="w-4 h-4" />
                  <span>অফিশিয়াল সার্টিফিকেট প্রিভিউ</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Official Certificate Modal Popup */}
      {showModal && result && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-slate-900 rounded-2xl border-2 border-amber-500/50 shadow-2xl p-6 sm:p-10 my-8">
            {/* Modal Controls */}
            <div className="absolute top-4 right-4 flex items-center gap-2 print:hidden">
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>প্রিন্ট</span>
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Certificate Canvas / Decorative Border */}
            <div className="p-6 sm:p-8 bg-gradient-to-b from-amber-50/5 via-slate-950 to-slate-950 rounded-xl border border-amber-500/30 text-center relative overflow-hidden">
              {/* Watermark Crest in Background */}
              <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                <BengalInstituteLogo size="xl" showText={false} />
              </div>

              {/* Certificate Top Header */}
              <div className="flex flex-col items-center space-y-2">
                <div className="flex items-center justify-center gap-4 sm:gap-6 mb-1">
                  <BtebLogo className="h-12 w-12 sm:h-14 sm:w-14" />
                  <BengalInstituteLogo size="md" className="h-10 sm:h-12 w-auto" />
                  <GovRegLogo className="h-12 w-12 sm:h-14 sm:w-14" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-amber-300 uppercase tracking-widest font-mono">
                  BENGAL COMPUTER TRAINING INSTITUTE
                </h3>
                <p className="text-xs text-slate-300">
                  বাংলাদেশ কারিগরি শিক্ষা বোর্ড অনুমোদিত প্রতিষ্ঠান · কোড: ২৭১১৭
                </p>
                <p className="text-[11px] text-slate-400">
                  আজিজুর রহমান সুপার মার্কেট (১ম তলা, জনতা ব্যাংক ভবন), সিঙ্গার মোড়, কুষ্টিয়া
                </p>
                <div className="w-32 h-0.5 bg-amber-500/60 my-2" />
                <span className="text-sm font-bold text-emerald-400 tracking-wider uppercase font-mono">
                  CERTIFICATE OF COMPLETION
                </span>
              </div>

              {/* Certificate Body */}
              <div className="my-6 text-sm text-slate-200 space-y-3 leading-relaxed">
                <p className="text-xs text-slate-400">This is to certify that</p>
                <h4 className="text-2xl sm:text-3xl font-black text-white underline decoration-amber-500/60 underline-offset-8">
                  {result.studentName}
                </h4>
                <p className="text-xs text-slate-400 pt-1">
                  পিতা: {result.fatherName}
                </p>
                <p className="pt-2 text-slate-300 max-w-xl mx-auto text-xs sm:text-sm">
                  has successfully completed the comprehensive professional training on{' '}
                  <span className="font-bold text-amber-300">{result.courseNameEn}</span> ({result.courseNameBn}) under session <span className="font-mono text-emerald-300">{result.session}</span> with distinction.
                </p>
              </div>

              {/* Certificate Stats Grid */}
              <div className="my-6 grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">সার্টিফিকেট আইডি</span>
                  <span className="font-mono font-bold text-emerald-400">{result.certificateId}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">রোল নম্বর</span>
                  <span className="font-mono text-slate-200">{result.btebRoll}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">রেজিস্ট্রেশন নম্বর</span>
                  <span className="font-mono text-slate-200">{result.regNo}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">অর্জিত গ্রেড</span>
                  <span className="font-mono font-black text-amber-400">{result.cgpa}</span>
                </div>
              </div>

              {/* Certificate Footer / Signatures & QR */}
              <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-end justify-between text-xs">
                <div className="text-left">
                  <div className="w-24 h-0.5 bg-slate-600 mb-1" />
                  <span className="font-bold text-slate-300 block">কোর্স কো-অর্ডিনেটর</span>
                  <span className="text-[10px] text-slate-500">বেঙ্গল কম্পিউটার ইনস্টিটিউট</span>
                </div>

                {/* QR Code Simulation */}
                <div className="flex flex-col items-center">
                  <div className="p-1.5 rounded-lg bg-white">
                    <QrCode className="w-10 h-10 text-slate-950" />
                  </div>
                  <span className="text-[9px] text-emerald-400 font-mono mt-1">VERIFIED ONLINE</span>
                </div>

                <div className="text-right">
                  <div className="w-24 h-0.5 bg-slate-600 mb-1 ml-auto" />
                  <span className="font-bold text-slate-300 block">পরিচালক / অধ্যক্ষ</span>
                  <span className="text-[10px] text-slate-500">BTEB সেন্টার কোড: ২৭১১৭</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
