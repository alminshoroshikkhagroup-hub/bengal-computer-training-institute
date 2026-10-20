import React from 'react';
import { BtebLogo } from './BtebLogo';
import { GovRegLogo } from './GovRegLogo';
import { BengalInstituteLogo } from './BengalInstituteLogo';
import { NewsletterSubscription } from './NewsletterSubscription';
import { INSTITUTE_INFO } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  MessageCircle, 
  Heart,
  ChevronRight,
  Building2,
  ExternalLink
} from 'lucide-react';

interface FooterProps {
  onOpenAdmission?: () => void;
  onOpenVerify?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmission, onOpenVerify }) => {
  const { language, t } = useLanguage();

  return (
    <footer id="contact" className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        {/* Newsletter Subscription Section for Students */}
        <NewsletterSubscription />
      </div>

      {/* Upper Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 border-t border-slate-900">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Col 1: Institute Identity & BTEB Seal */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <BengalInstituteLogo size="md" className="h-12 w-auto" />
              <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
                <BtebLogo className="h-10 w-10" />
                <GovRegLogo className="h-10 w-10" />
              </div>
            </div>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mt-2">
              {t('footer_about_desc')}
            </p>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>{language === 'bn' ? `BTEB কোড: ${INSTITUTE_INFO.btebCode}` : `BTEB Code: ${INSTITUTE_INFO.btebCode}`}</span>
              </div>
              <p className="text-[11px] text-slate-400">
                {language === 'bn' ? INSTITUTE_INFO.btebName : 'Approved by Bangladesh Technical Education Board'}
              </p>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {t('footer_quick_links')}
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#hero" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-emerald-500" /> {t('nav_home')}
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-emerald-500" /> {t('nav_courses')}
                </a>
              </li>
              <li>
                <a href="#course-analytics" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-emerald-500" /> {language === 'bn' ? 'কোর্স অ্যানালিটিক্স ও প্লেসমেন্ট' : 'Course Analytics & Placement'}
                </a>
              </li>
              <li>
                <a href="#roadmap" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-emerald-500" /> {language === 'bn' ? '১০ দিনের এআই রোডম্যাপ' : '10-Day AI Roadmap'}
                </a>
              </li>
              <li>
                <a href="#campus" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-emerald-500" /> {t('nav_campus')}
                </a>
              </li>
              <li>
                <a href="#google-drive" className="hover:text-amber-400 text-amber-300 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-amber-500" /> {t('nav_drive')}
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenVerify}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1 text-left cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-500" /> {t('nav_verify')}
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAdmission}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1 text-left text-emerald-400 font-semibold cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-500" /> {t('btn_admission')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Programs */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {language === 'bn' ? 'শীর্ষ কোর্সসমূহ' : 'Top Programs'}
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#courses" className="hover:text-emerald-400 transition-colors">
                  {language === 'bn' ? 'কম্পিউটার অফিস অ্যাপ্লিকেশন (BTEB)' : 'Computer Office Application (BTEB)'}
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-emerald-400 transition-colors">
                  {language === 'bn' ? 'এআই ও ফ্রিল্যান্সিং মাস্টারক্লাস' : 'AI & Freelancing Masterclass'}
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-emerald-400 transition-colors">
                  {language === 'bn' ? 'এইচএসসি আইসিটি স্পেশাল ব্যাচ (৫০% ছাড়)' : 'HSC ICT Special Batch (50% Off)'}
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-emerald-400 transition-colors">
                  {language === 'bn' ? 'সাইবার সিকিউরিটি ও এথিক্যাল হ্যাকিং' : 'Cyber Security & Ethical Hacking'}
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-emerald-400 transition-colors">
                  {language === 'bn' ? 'প্রফেশনাল গ্রাফিক ডিজাইন' : 'Professional Graphic Design'}
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-emerald-400 transition-colors">
                  {language === 'bn' ? 'কিডস কম্পিউটার ও স্ক্র্যাচ কোডিং' : 'Kids Computer & Scratch Coding'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Campus Address & Hotlines */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-emerald-400" />
              {t('footer_contact_info')}
            </h4>

            <div className="space-y-2.5 text-xs text-slate-300">
              <a 
                href={INSTITUTE_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 hover:text-emerald-300 transition-colors group cursor-pointer"
                title={language === 'bn' ? 'গুগল ম্যাপসে ঠিকানা খুলুন' : 'Open in Google Maps'}
              >
                <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="leading-relaxed">
                  {language === 'bn' ? INSTITUTE_INFO.addressBn : INSTITUTE_INFO.addressEn} <ExternalLink className="inline w-3 h-3 text-emerald-400 ml-1 opacity-70 group-hover:opacity-100" />
                </span>
              </a>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-[11px] text-slate-400">
                  {language === 'bn' ? INSTITUTE_INFO.workingHoursBn : 'Open Everyday: 8:00 AM - 9:00 PM (Friday Special Sessions)'}
                </span>
              </div>

              <div className="flex flex-col gap-1 pt-1">
                <a
                  href={`tel:${INSTITUTE_INFO.phone1}`}
                  className="flex items-center gap-2 text-white hover:text-emerald-400 font-bold"
                >
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{INSTITUTE_INFO.phone1}</span>
                </a>
                <a
                  href={`tel:${INSTITUTE_INFO.phone2}`}
                  className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 font-mono ml-6 text-[11px]"
                >
                  <span>{INSTITUTE_INFO.phone2}</span>
                </a>
                <a
                  href={`tel:${INSTITUTE_INFO.phone3}`}
                  className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 font-mono ml-6 text-[11px]"
                >
                  <span>{INSTITUTE_INFO.phone3}</span>
                </a>
              </div>

              <div className="flex items-center gap-2 text-xs pt-1">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <a href={`mailto:${INSTITUTE_INFO.email}`} className="text-slate-300 hover:text-white">
                  {INSTITUTE_INFO.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-slate-900 bg-slate-950 py-4 px-4 text-center text-[11px] text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            {language === 'bn' 
              ? `© ${new Date().getFullYear()} ${INSTITUTE_INFO.nameBn} (BENGAL® INSTITUTE)। সর্বস্বত্ব সংরক্ষিত।`
              : `© ${new Date().getFullYear()} ${INSTITUTE_INFO.nameEn} (BENGAL® INSTITUTE). All Rights Reserved.`}
          </span>
          <span className="flex items-center gap-1 text-slate-400">
            {language === 'bn' 
              ? <>কারিগরি শিক্ষা বোর্ড অনুমোদিত কোড: <strong className="text-emerald-400 font-mono">27117</strong> · কুষ্টিয়া-৭০০০</>
              : <>BTEB Approved Institution Code: <strong className="text-emerald-400 font-mono">27117</strong> · Kushtia-7000</>}
          </span>
        </div>
      </div>
    </footer>
  );
};
