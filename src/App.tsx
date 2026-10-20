import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { JanataBankBuildingHero } from './components/JanataBankBuildingHero';
import { HscOfferBanner } from './components/HscOfferBanner';
import { CoursesSection } from './components/CoursesSection';
import { TeachersSliderSection } from './components/TeachersSliderSection';
import { TenDayRoadmap } from './components/TenDayRoadmap';
import { CertificateVerification } from './components/CertificateVerification';
import { FeeCalculator } from './components/FeeCalculator';
import { LabAndCampusTour } from './components/LabAndCampusTour';
import { StudentReviews } from './components/StudentReviews';
import { AiImageStudio } from './components/AiImageStudio';
import { GoogleDrivePortal } from './components/GoogleDrivePortal';
import { Footer } from './components/Footer';
import { AdmissionModal } from './components/AdmissionModal';
import { StudentPortalModal } from './components/StudentPortalModal';
import { WhatsAppChatFAB } from './components/WhatsAppChatFAB';
import { FirecrawlAgentModal } from './components/FirecrawlAgentModal';
import { ScrollReveal } from './components/ScrollReveal';
import { HardDrive } from 'lucide-react';

export const App: React.FC = () => {
  const [isAdmissionOpen, setIsAdmissionOpen] = useState(false);
  const [isStudentPortalOpen, setIsStudentPortalOpen] = useState(false);
  const [admissionCourseId, setAdmissionCourseId] = useState<string | undefined>(undefined);
  const [admissionCoupon, setAdmissionCoupon] = useState<string | undefined>(undefined);
  const [showFeeCalculatorModal, setShowFeeCalculatorModal] = useState(false);
  const [isFirecrawlOpen, setIsFirecrawlOpen] = useState(false);

  const handleOpenAdmission = (courseId?: string, coupon?: string) => {
    setAdmissionCourseId(courseId);
    setAdmissionCoupon(coupon || '');
    setIsAdmissionOpen(true);
  };

  const handleOpenVerify = () => {
    const el = document.getElementById('verify');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenDrive = () => {
    const el = document.getElementById('google-drive');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
          {/* Top Navbar */}
        <Navbar 
          onOpenAdmission={() => handleOpenAdmission()} 
          onOpenVerify={handleOpenVerify} 
          onOpenDrive={handleOpenDrive}
          onOpenFirecrawl={() => setIsFirecrawlOpen(true)}
          onOpenStudentPortal={() => setIsStudentPortalOpen(true)}
        />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* The Showcase Hero Section featuring the Janata Bank building */}
          <JanataBankBuildingHero 
            onOpenAdmission={handleOpenAdmission}
            onOpenVerify={handleOpenVerify}
            onOpenStudentPortal={() => setIsStudentPortalOpen(true)}
          />

          <ScrollReveal delay={0.05} direction="up">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* HSC 50% Special Offer Banner */}
              <HscOfferBanner 
                onOpenAdmission={(code) => handleOpenAdmission(undefined, code)} 
              />
            </div>
          </ScrollReveal>

          {/* Courses & Syllabus Catalog */}
          <ScrollReveal delay={0.08} direction="up">
            <CoursesSection 
              onOpenAdmission={(cId) => handleOpenAdmission(cId)}
              onOpenFeeCalculator={() => {
                const el = document.getElementById('calculator');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          </ScrollReveal>

          {/* 25 Expert Teachers & Instructors: Photo Slide Door & Carousel */}
          <ScrollReveal delay={0.08} direction="up">
            <TeachersSliderSection onOpenAdmission={handleOpenAdmission} />
          </ScrollReveal>

          {/* 10-Day Computer Literacy & AI Roadmap */}
          <ScrollReveal delay={0.08} direction="up">
            <TenDayRoadmap />
          </ScrollReveal>

          {/* Course Fee & Installments Interactive Calculator */}
          <section id="calculator" className="py-12 bg-slate-950 px-4 sm:px-6 lg:px-8">
            <ScrollReveal delay={0.08} direction="up">
              <FeeCalculator onOpenAdmission={handleOpenAdmission} />
            </ScrollReveal>
          </section>

          {/* Certificate Verification Portal */}
          <ScrollReveal delay={0.08} direction="up">
            <CertificateVerification />
          </ScrollReveal>

          {/* Lab Facilities & Campus Tour (Singer Mor Landmark) */}
          <ScrollReveal delay={0.08} direction="up">
            <LabAndCampusTour />
          </ScrollReveal>

          {/* AI Image & Banner Studio (Create & Edit Images with prompts) */}
          <ScrollReveal delay={0.08} direction="up">
            <AiImageStudio />
          </ScrollReveal>

          {/* Google Drive Student & Course Materials Cloud Portal */}
          <section id="google-drive" className="py-16 sm:py-20 bg-slate-900/40 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal delay={0.05} direction="up">
                <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                    <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Google Workspace™ (Drive · Sheets · Docs)</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">
                    শিক্ষার্থী ও প্রশিক্ষণার্থী ক্লাউড পোর্টাল (ড্রাইভ, স্প্রেডশিট ও ডকুমেন্টস)
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    আপনার গুগল অ্যাকাউন্ট দিয়ে সাইন-ইন করে ক্লাসের অ্যাসাইনমেন্ট, স্প্রেডশিট ভর্তি রেজিস্টার, কোর্স সনদপত্র ড্রাফট ও ড্রাইভ ফাইল সরাসরি অ্যাক্সেস, তৈরি ও পরিচালনা করুন।
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1} direction="up">
                <GoogleDrivePortal />
              </ScrollReveal>
            </div>
          </section>

          {/* Student Testimonials & Success Stories */}
          <ScrollReveal delay={0.08} direction="up">
            <StudentReviews />
          </ScrollReveal>
        </main>

        {/* Comprehensive Footer */}
        <ScrollReveal delay={0.05} direction="up">
          <Footer 
            onOpenAdmission={() => handleOpenAdmission()}
            onOpenVerify={handleOpenVerify}
          />
        </ScrollReveal>

        {/* Interactive Online Admission Modal */}
        <AdmissionModal
          isOpen={isAdmissionOpen}
          onClose={() => setIsAdmissionOpen(false)}
          defaultCourseId={admissionCourseId}
          defaultCoupon={admissionCoupon}
        />

        {/* Firecrawl Agent Autonomous Web Extraction Modal */}
        <FirecrawlAgentModal
          isOpen={isFirecrawlOpen}
          onClose={() => setIsFirecrawlOpen(false)}
        />

        {/* Student Portal & Google Cloud Learning Modal */}
        <StudentPortalModal
          isOpen={isStudentPortalOpen}
          onClose={() => setIsStudentPortalOpen(false)}
          onOpenDrive={handleOpenDrive}
          onOpenVerify={handleOpenVerify}
        />

        {/* Floating WhatsApp Action Button for Quick Inquiries */}
        <WhatsAppChatFAB />
      </div>
    </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
