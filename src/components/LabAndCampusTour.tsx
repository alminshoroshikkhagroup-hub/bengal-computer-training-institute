import React, { useState } from 'react';
import { CAMPUS_FACILITIES, INSTITUTE_INFO } from '../data/mockData';
import { CampusGoogleMap } from './CampusGoogleMap';
import { useLanguage } from '../context/LanguageContext';
import { 
  Building2, 
  MapPin, 
  Navigation, 
  Phone, 
  Clock, 
  CheckCircle2, 
  Monitor, 
  Wifi, 
  Tv, 
  ShieldCheck, 
  Users, 
  Headphones,
  Compass,
  Bus,
  Car,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';

const facilityIconMap: Record<string, React.ReactNode> = {
  MonitorCheck: <Monitor className="w-5 h-5 text-emerald-400" />,
  Wifi: <Wifi className="w-5 h-5 text-emerald-400" />,
  Tv: <Tv className="w-5 h-5 text-emerald-400" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
  Users: <Users className="w-5 h-5 text-emerald-400" />,
  Headphones: <Headphones className="w-5 h-5 text-emerald-400" />
};

export const LabAndCampusTour: React.FC = () => {
  const { language } = useLanguage();
  const [activeDirectionTab, setActiveDirectionTab] = useState<'majampur' | 'court' | 'chowrhas'>('majampur');
  const [mapView, setMapView] = useState<'interactive' | 'landmark'>('interactive');
  const [copiedLink, setCopiedLink] = useState(false);

  const googleMapsUrl = INSTITUTE_INFO.googleMapsUrl || 'https://maps.app.goo.gl/VUxBM8qDHkSxwKUH7';

  const handleCopyMapLink = () => {
    navigator.clipboard.writeText(googleMapsUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <section id="campus" className="py-16 sm:py-24 bg-slate-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            <span>
              {language === 'bn' ? 'আধুনিক ক্যাম্পাস ও ডিজিটাল ল্যাব সুবিধা' : 'Modern Campus & Digital Lab Facilities'}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            {language === 'bn' ? (
              <>সিঙ্গার মোড় ক্যাম্পাস ও <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">অত্যাধুনিক সুবিধা</span></>
            ) : (
              <>Singer Mor Campus & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">Modern Facilities</span></>
            )}
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {language === 'bn'
              ? 'কুষ্টিয়ার প্রাণকেন্দ্র সিঙ্গার মোড়ে অবস্থিত আজিজুর রহমান সুপার মার্কেটের ১ম তলায় (জনতা ব্যাংকের উপরে) আমাদের সুপ্রশস্ত, শীতাতপ নিয়ন্ত্রিত আধুনিক কম্পিউটার ল্যাব।'
              : 'Located at Singer Mor, Azizur Rahman Super Market 1st Floor (above Janata Bank), Kushtia. Fully air-conditioned, dedicated computer workstations with modern amenities.'}
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {CAMPUS_FACILITIES.map((facility, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 shadow-xl flex items-start gap-4"
            >
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 shrink-0">
                {facilityIconMap[facility.icon] || <Monitor className="w-5 h-5 text-emerald-400" />}
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-base">
                  {language === 'bn' ? facility.titleBn : facility.titleEn}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {language === 'bn' ? facility.descBn : facility.descEn}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Campus Landmark & How to Reach Us Guide */}
        <div className="rounded-2xl bg-slate-950 border border-slate-800 p-6 sm:p-10 shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Interactive Directions */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-sky-400">
                  <Compass className="w-4 h-4" />
                  <span>কীভাবে আসবেন? (লোকেশন গাইড)</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  জনতা ব্যাংক ভবন, সিঙ্গার মোড়, কুষ্টিয়া
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  আজিজুর রহমান সুপার মার্কেট, ১ম তলা (জনতা ব্যাংক লিমিটেডের প্রধান শাখার উপরে), সিঙ্গার মোড়, এন এস রোড, কুষ্টিয়া-৭০০০।
                </p>
              </div>

              {/* Transit Tabs */}
              <div className="flex gap-2 border-b border-slate-800 pb-2">
                <button
                  onClick={() => setActiveDirectionTab('majampur')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeDirectionTab === 'majampur'
                      ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  মজমপুর গেট থেকে
                </button>
                <button
                  onClick={() => setActiveDirectionTab('court')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeDirectionTab === 'court'
                      ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  কোর্ট স্টেশন থেকে
                </button>
                <button
                  onClick={() => setActiveDirectionTab('chowrhas')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeDirectionTab === 'chowrhas'
                      ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  চৌড়হাস মোড় থেকে
                </button>
              </div>

              {/* Direction Content */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800/80 text-xs text-slate-300 space-y-2">
                {activeDirectionTab === 'majampur' && (
                  <>
                    <p className="flex items-center gap-2 font-bold text-white">
                      <Bus className="w-4 h-4 text-sky-400" />
                      মজমপুর বাসস্ট্যান্ড / গেট থেকে:
                    </p>
                    <p>
                      মজমপুর গেট থেকে এন এস রোড ধরে সোজা কোর্টের দিকে রিকশা বা ইজিবাইকে মাত্র ৫ মিনিটে সিঙ্গার মোড়ে আসুন। মোড়ের পশ্চিম পাশে জনতা ব্যাংকের সম্মুখ সিঁড়ি দিয়ে ১ম তলায় উঠলেই বেঙ্গল ইনস্টিটিউট।
                    </p>
                    <span className="text-[11px] text-sky-400 block font-mono">দূরত্ব: মাত্র ১ কিমি · রিকশা ভাড়া: ১০-১৫ টাকা</span>
                  </>
                )}

                {activeDirectionTab === 'court' && (
                  <>
                    <p className="flex items-center gap-2 font-bold text-white">
                      <Navigation className="w-4 h-4 text-sky-400" />
                      কুষ্টিয়া কোর্ট স্টেশন / ডিসি অফিস থেকে:
                    </p>
                    <p>
                      কোর্ট স্টেশন বা ডিসি অফিস মোড় থেকে এন এস রোড দিয়ে পূর্ব দিকে হেঁটে ৩ মিনিটেই সিঙ্গার মোড়। আজিজুর রহমান সুপার মার্কেটের ১ম তলা।
                    </p>
                    <span className="text-[11px] text-sky-400 block font-mono">দূরত্ব: ৩০০ মিটার · হেঁটেই আসা যায়</span>
                  </>
                )}

                {activeDirectionTab === 'chowrhas' && (
                  <>
                    <p className="flex items-center gap-2 font-bold text-white">
                      <Car className="w-4 h-4 text-sky-400" />
                      চৌড়হাস মোড় থেকে:
                    </p>
                    <p>
                      চৌড়হাস মোড় থেকে কোর্টপাড়া হয়ে এন এস রোডগামী যে কোনো ইজিবাইকে সিঙ্গার মোড় নামলেই হাতের কাছে জনতা ব্যাংক ভবন।
                    </p>
                    <span className="text-[11px] text-sky-400 block font-mono">দূরত্ব: ২.৫ কিমি · ইজিবাইক ভাড়া: ১৫-২০ টাকা</span>
                  </>
                )}
              </div>

              {/* Contact and Timing Box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="block text-[10px] text-slate-400">অফিস খোলা:</span>
                    <span className="text-xs font-semibold text-white">শনি - বৃহস্পতি: সকাল ৮টা - রাত ৯টা</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="block text-[10px] text-slate-400">হেল্পলাইন:</span>
                    <a href="tel:01782824582" className="text-xs font-bold text-emerald-400 hover:underline">
                      ০১৭৮২-৮২৪৫৮২ / ০১৮৭০-৭০৭৭১৫
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Interactive Landmark Visual Map Card */}
            <div className="lg:col-span-5 bg-slate-900 rounded-xl border border-slate-800 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-rose-500 animate-pulse" />
                  <span>গুগল ম্যাপে বেঙ্গল ইনস্টিটিউট</span>
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setMapView('interactive')}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                      mapView === 'interactive'
                        ? 'bg-emerald-500 text-slate-950 shadow-sm'
                        : 'bg-slate-950 text-slate-400 hover:text-white'
                    }`}
                  >
                    লাইভ ম্যাপ
                  </button>
                  <button
                    type="button"
                    onClick={() => setMapView('landmark')}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                      mapView === 'landmark'
                        ? 'bg-emerald-500 text-slate-950 shadow-sm'
                        : 'bg-slate-950 text-slate-400 hover:text-white'
                    }`}
                  >
                    ল্যান্ডমার্ক
                  </button>
                </div>
              </div>

              {/* Stylized Kushtia Town / Google Map View */}
              {mapView === 'interactive' ? (
                <CampusGoogleMap />
              ) : (
                <div className="relative aspect-[4/3] rounded-xl bg-slate-950 border border-slate-700/80 overflow-hidden shadow-2xl p-4 flex flex-col justify-between bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
                    <div className="text-[11px] text-slate-400 space-y-1">
                      <span className="font-mono text-emerald-400 block font-bold">NS ROAD, KUSHTIA (এন এস রোড)</span>
                      <p className="text-[10px] text-slate-300">
                        সিঙ্গার মোড় ইন্টারসেকশন · আজিজুর রহমান সুপার মার্কেট
                      </p>
                    </div>

                    {/* Animated Map Pin Pinpoint */}
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="self-center flex flex-col items-center group/pin cursor-pointer transition-transform hover:scale-105"
                    >
                      <div className="p-3 rounded-full bg-rose-500 text-white shadow-xl shadow-rose-500/50 animate-bounce">
                        <Building2 className="w-6 h-6" />
                      </div>
                      <span className="px-3 py-1 rounded-md bg-slate-900 border border-emerald-500/70 text-emerald-300 font-bold text-xs mt-2 shadow-lg">
                        বেঙ্গল ইনস্টিটিউট (১ম তলা)
                      </span>
                      <span className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                        <span>নিচে: জনতা ব্যাংক লিমিটেড</span>
                        <ExternalLink className="w-2.5 h-2.5 text-emerald-400" />
                      </span>
                    </a>

                    <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400 flex justify-between items-center">
                      <span>পোস্ট কোড: ৭০০০</span>
                      <span className="text-emerald-400 font-mono">BTEB Code: 27117</span>
                    </div>
                  </div>
                )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs transition-all shadow-md cursor-pointer"
                >
                  <Navigation className="w-4 h-4" />
                  <span>গুগল ম্যাপসে ডিরেকশন খুলুন</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>

                <button
                  type="button"
                  onClick={handleCopyMapLink}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-bold transition-all cursor-pointer"
                  title="গুগল ম্যাপ লিংক কপি করুন"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">কপি হয়েছে!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>লিংক</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
