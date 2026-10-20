import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Teacher } from '../data/teachersData';
import { RecentlyUploadedPhotosModal } from './RecentlyUploadedPhotosModal';
import { 
  getStoredTeachers, 
  saveTeachersToStorage, 
  resetTeachersToDefault,
  uploadTeacherPhotoToServer,
  hydrateTeachersFromIndexedDB
} from '../services/teachersStorage';
import {
  GraduationCap,
  Award,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Briefcase,
  Users,
  Sparkles,
  BookOpen,
  Calendar,
  CheckCircle2,
  ExternalLink,
  MessageCircle,
  Clock,
  LayoutGrid,
  Maximize2,
  Edit3,
  Plus,
  Trash2,
  Upload,
  RotateCcw,
  Check,
  AlertCircle,
  Camera,
  Images,
  Eye,
  EyeOff
} from 'lucide-react';

interface TeachersSliderSectionProps {
  onOpenAdmission?: (courseId?: string) => void;
}

export const TeachersSliderSection: React.FC<TeachersSliderSectionProps> = ({
  onOpenAdmission,
}) => {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  // Persistent teachers state
  const [teachers, setTeachers] = useState<Teacher[]>(() => getStoredTeachers());
  
  // Category filter state
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Slider state - default to paused so photo never automatically changes or vanishes
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeDoorId, setActiveDoorId] = useState<string>('t-1');
  
  // Modals state
  const [selectedTeacherModal, setSelectedTeacherModal] = useState<Teacher | null>(null);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [saveToast, setSaveToast] = useState<string | null>(null);
  const [isPhotosGalleryOpen, setIsPhotosGalleryOpen] = useState(false);
  const [isTextHidden, setIsTextHidden] = useState(false);

  // View mode
  const [viewMode, setViewMode] = useState<'slide-door' | 'carousel' | 'grid'>('slide-door');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const directFileInputRef = useRef<HTMLInputElement>(null);
  const [directUploadTeacherId, setDirectUploadTeacherId] = useState<string | null>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Hydrate high-resolution photos from IndexedDB on startup
  useEffect(() => {
    hydrateTeachersFromIndexedDB(teachers).then((hydrated) => {
      setTeachers(hydrated);
    });
  }, []);

  // Category filters
  const categories = [
    { id: 'all', labelBn: `সকল শিক্ষক (${teachers.length})`, labelEn: `All Faculty (${teachers.length})` },
    { id: 'freelancing', labelBn: 'এআই ও ফ্রিল্যান্সিং', labelEn: 'AI & Freelancing' },
    { id: 'coding', labelBn: 'সফটওয়্যার ও ওয়েব কোডিং', labelEn: 'Software & Web' },
    { id: 'office', labelBn: 'BTEB অফিস অ্যাপ্লিকেশন', labelEn: 'BTEB Office App' },
    { id: 'design', labelBn: 'গ্রাফিক ও মাল্টিমিডিয়া', labelEn: 'Graphic & Design' },
    { id: 'cyber', labelBn: 'সাইবার সিকিউরিটি ও লিনাক্স', labelEn: 'Cyber & Networking' },
    { id: 'ict', labelBn: 'এইচএসসি আইসিটি একাডেমি', labelEn: 'HSC ICT Academy' },
    { id: 'spoken', labelBn: 'স্পোকেন ইংলিশ', labelEn: 'Spoken English' },
  ];

  // Filtered teachers list
  const filteredTeachers = selectedCategory === 'all' 
    ? teachers 
    : teachers.filter(t => t.category === selectedCategory);

  // Ensure activeDoorId is always valid
  useEffect(() => {
    if (filteredTeachers.length > 0 && !filteredTeachers.find(t => t.id === activeDoorId)) {
      setActiveDoorId(filteredTeachers[0].id);
    }
  }, [filteredTeachers, activeDoorId]);

  // Auto slide functionality (only when explicitly turned on by user)
  useEffect(() => {
    if (isPlaying && filteredTeachers.length > 1) {
      autoPlayRef.current = setInterval(() => {
        const curIdx = filteredTeachers.findIndex((t) => t.id === activeDoorId);
        const nextIdx = (curIdx + 1) % filteredTeachers.length;
        setCurrentIndex(nextIdx);
        setActiveDoorId(filteredTeachers[nextIdx].id);
      }, 4500);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isPlaying, filteredTeachers, activeDoorId]);

  // Calculate visible doors dynamically so the active teacher is ALWAYS included
  // This guarantees that the expanded card div NEVER collapses or vanishes
  const visibleDoors = React.useMemo(() => {
    if (filteredTeachers.length <= 6) return filteredTeachers;
    const activeIdx = filteredTeachers.findIndex((t) => t.id === activeDoorId);
    if (activeIdx === -1 || activeIdx < 6) {
      return filteredTeachers.slice(0, 6);
    }
    const start = Math.min(activeIdx - 2, filteredTeachers.length - 6);
    return filteredTeachers.slice(Math.max(0, start), Math.max(0, start) + 6);
  }, [filteredTeachers, activeDoorId]);

  const handlePrev = () => {
    const curIdx = filteredTeachers.findIndex((t) => t.id === activeDoorId);
    const prevIdx = (curIdx - 1 + filteredTeachers.length) % filteredTeachers.length;
    setCurrentIndex(prevIdx);
    setActiveDoorId(filteredTeachers[prevIdx].id);
  };

  const handleNext = () => {
    const curIdx = filteredTeachers.findIndex((t) => t.id === activeDoorId);
    const nextIdx = (curIdx + 1) % filteredTeachers.length;
    setCurrentIndex(nextIdx);
    setActiveDoorId(filteredTeachers[nextIdx].id);
  };

  // Open Edit modal for a teacher
  const handleOpenEdit = (teacher: Teacher) => {
    setEditingTeacher({ ...teacher });
    setIsCreatingNew(false);
  };

  // Open Create New Teacher modal
  const handleOpenCreateNew = () => {
    const newId = `t-${Date.now()}`;
    setEditingTeacher({
      id: newId,
      nameBn: '',
      nameEn: '',
      designationBn: 'প্রশিক্ষক ও মেন্টর',
      designationEn: 'Instructor & Mentor',
      departmentBn: 'কম্পিউটার ও আইটি বিভাগ',
      departmentEn: 'Computer & IT Department',
      category: 'coding',
      experienceBn: '৫+ বছর',
      experienceEn: '5+ Years',
      educationBn: 'বিএসসি ইন সিএসই',
      educationEn: 'B.Sc in CSE',
      studentsTrained: 500,
      skills: ['Computer Training', 'Practical Lab', 'Mentoring'],
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      badgeBn: 'সার্টিফাইড ট্রেইনার',
      badgeEn: 'Certified Trainer',
      bioBn: 'বেঙ্গল কম্পিউটার ট্রেনিং ইনস্টিটিউটে শিক্ষার্থীদের আন্তরিকভাবে ব্যবহারিক প্রশিক্ষণ প্রদান করেন।',
      bioEn: 'Dedicated instructor at Bengal Computer Training Institute providing hands-on practical education.',
      availableDaysBn: 'শনি - বৃহস্পতি (সকাল ১০টা - বিকাল ৫টা)',
      availableDaysEn: 'Sat - Thu (10 AM - 5 PM)'
    });
    setIsCreatingNew(true);
  };

  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  // Handle saving edited/new teacher
  const handleSaveTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTeacher) return;

    if (!editingTeacher.nameBn.trim()) {
      alert(isBn ? 'অনুগ্রহ করে শিক্ষকের নাম লিখুন।' : 'Please enter teacher name.');
      return;
    }

    let updatedList: Teacher[];
    if (isCreatingNew) {
      updatedList = [editingTeacher, ...teachers];
    } else {
      updatedList = teachers.map((t) => (t.id === editingTeacher.id ? editingTeacher : t));
    }

    setTeachers(updatedList);
    const savedSuccessfully = saveTeachersToStorage(updatedList);
    setActiveDoorId(editingTeacher.id);
    setEditingTeacher(null);
    setIsCreatingNew(false);

    setSaveToast(
      savedSuccessfully
        ? (isBn ? '✓ শিক্ষকের ছবি ও তথ্য স্থায়ীভাবে সংরক্ষণ করা হয়েছে!' : '✓ Teacher photo & info permanently saved!')
        : (isBn ? '✓ শিক্ষক তথ্য আপডেট হয়েছে!' : '✓ Teacher updated!')
    );
    setTimeout(() => setSaveToast(null), 3500);
  };

  // Handle deleting a teacher
  const handleDeleteTeacher = (id: string) => {
    if (window.confirm(isBn ? 'আপনি কি নিশ্চিতভাবে এই শিক্ষকের তথ্য মুছে ফেলতে চান?' : 'Are you sure you want to delete this teacher?')) {
      const updatedList = teachers.filter((t) => t.id !== id);
      setTeachers(updatedList);
      saveTeachersToStorage(updatedList);
      setEditingTeacher(null);
      setSaveToast(isBn ? '✓ শিক্ষকের তথ্য মুছে ফেলা হয়েছে।' : '✓ Teacher deleted.');
      setTimeout(() => setSaveToast(null), 3000);
    }
  };

  // Reset to initial default list
  const handleResetDefaults = () => {
    if (window.confirm(isBn ? 'সকল শিক্ষকের তথ্য প্রাথমিক ডিফল্ট তালিকায় ফিরিয়ে নেবেন?' : 'Reset all teachers to original default list?')) {
      const defaults = resetTeachersToDefault();
      setTeachers(defaults);
      setActiveDoorId(defaults[0]?.id || 't-1');
      setSaveToast(isBn ? '✓ সকল তথ্য প্রাথমিক তালিকায় ফিরিয়ে নেওয়া হয়েছে।' : '✓ Restored to defaults.');
      setTimeout(() => setSaveToast(null), 3000);
    }
  };

  // Handle photo file upload using intelligent compression & multi-tier permanent storage
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingTeacher) {
      try {
        setIsUploadingPhoto(true);
        const savedUrl = await uploadTeacherPhotoToServer(file, editingTeacher.id);
        
        // 1. Update modal edit state
        const updatedTeacher = { ...editingTeacher, photoUrl: savedUrl };
        setEditingTeacher(updatedTeacher);

        // 2. CRITICAL: Automatically save immediately to teachers list & persistent storage
        // This guarantees the photo stays permanently even if user closes the modal without submitting!
        const updatedList = teachers.map((t) => (t.id === editingTeacher.id ? updatedTeacher : t));
        setTeachers(updatedList);
        saveTeachersToStorage(updatedList);

        setSaveToast(isBn ? '✓ নতুন ছবি তাৎক্ষণিকভাবে স্থায়ীভাবে সেভ হয়েছে!' : '✓ Photo uploaded and permanently saved!');
        setTimeout(() => setSaveToast(null), 3500);
      } catch (err) {
        console.error('Failed to upload photo:', err);
      } finally {
        setIsUploadingPhoto(false);
      }
    }
  };

  // Direct 1-Click quick photo upload for any teacher without needing to open the full form
  const handleDirectPhotoClick = (teacherId: string) => {
    setDirectUploadTeacherId(teacherId);
    if (directFileInputRef.current) {
      directFileInputRef.current.value = '';
      directFileInputRef.current.click();
    }
  };

  const handleDirectPhotoFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && directUploadTeacherId) {
      try {
        setSaveToast(isBn ? 'ছবি প্রসেস ও স্থায়ীভাবে সেভ হচ্ছে...' : 'Processing and saving photo...');
        const savedUrl = await uploadTeacherPhotoToServer(file, directUploadTeacherId);
        
        const updatedList = teachers.map((t) => 
          t.id === directUploadTeacherId ? { ...t, photoUrl: savedUrl } : t
        );
        setTeachers(updatedList);
        saveTeachersToStorage(updatedList);
        
        setSaveToast(isBn ? '✓ নতুন ছবি সফলভাবে যুক্ত ও স্থায়ীভাবে সংরক্ষিত হয়েছে!' : '✓ Photo uploaded and permanently saved!');
        setTimeout(() => setSaveToast(null), 3500);
      } catch (err) {
        console.error('Direct photo upload error:', err);
      } finally {
        setDirectUploadTeacherId(null);
      }
    }
  };

  // Current active teacher in door view
  const currentActiveTeacher = filteredTeachers.find(t => t.id === activeDoorId) || filteredTeachers[0] || teachers[0];

  return (
    <section 
      id="course-analytics" 
      className="py-16 sm:py-24 bg-slate-950 border-t border-slate-800/80 relative overflow-hidden"
    >
      {/* Background glow effects */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-48 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8 sm:space-y-10">
        
        {/* Section Header with Edit & Add Actions */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-inner">
            <GraduationCap className="w-4 h-4 text-emerald-400" />
            <span>
              {isBn 
                ? `শিক্ষক ও ট্রেইনার প্যানেল (${teachers.length} জন সক্রিয়)` 
                : `Faculty & Mentors (${teachers.length} Active)`}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-snug">
            {isBn ? (
              <>
                কারিগরি ও ফ্রিল্যান্সিং জগতের{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400">
                  সেরা শিক্ষক ও প্রশিক্ষকবৃন্দ
                </span>
              </>
            ) : (
              <>
                Learn from the{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400">
                  Best Industry Experts & Trainers
                </span>
              </>
            )}
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            {isBn
              ? 'বেঙ্গল কম্পিউটার ট্রেনিং ইনস্টিটিউটে ক্লাস নেন বিটিইবি সার্টিফাইড মাস্টার ট্রেইনার, আপওয়ার্ক/ফাইভ্যার টপ-রেটেড ফ্রিল্যান্সার এবং সফটওয়্যার ইঞ্জিনিয়ারগণ। যেকোনো শিক্ষকের ছবি, নাম বা পদবী আপনি সরাসরি "এডিট" বাটন দিয়ে যেকোনো সময় আপডেট করতে পারবেন।'
              : 'Our faculty comprises certified master trainers, top-rated freelancers, and software engineers. You can edit any teacher’s name, photo, or designation anytime.'}
          </p>

          {/* Quick Management Buttons: Add Teacher & Reset */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5">
            <button
              onClick={handleOpenCreateNew}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{isBn ? 'নতুন শিক্ষক যোগ করুন' : 'Add New Teacher'}</span>
            </button>

            <button
              onClick={() => setIsPhotosGalleryOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 hover:text-emerald-300 border border-emerald-500/30 text-xs font-bold transition-all shadow-md cursor-pointer"
              title="সম্প্রতি আপলোড করা ছবি দেখুন ও মুছুন"
            >
              <Images className="w-4 h-4 text-emerald-400" />
              <span>{isBn ? 'আপলোডকৃত ছবির গ্যালারি' : 'Recent Photos'}</span>
            </button>

            <button
              onClick={handleResetDefaults}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 text-xs font-semibold transition-colors cursor-pointer"
              title="Reset to default teacher list"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isBn ? 'ডিফল্ট রিসেট' : 'Reset Defaults'}</span>
            </button>
          </div>
        </div>

        {/* Toast feedback */}
        {saveToast && (
          <div className="max-w-md mx-auto p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold text-center animate-in fade-in flex items-center justify-center gap-2 shadow-lg">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{saveToast}</span>
          </div>
        )}

        {/* View Mode & Category Controls Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2 sm:p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
          {/* Category Filter Scrollable */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setCurrentIndex(0);
                }}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800/80 hover:bg-slate-800'
                }`}
              >
                {isBn ? cat.labelBn : cat.labelEn}
              </button>
            ))}
          </div>

          {/* View Mode Toggles & Slider Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setViewMode('slide-door')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'slide-door' 
                    ? 'bg-emerald-500 text-slate-950' 
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Sliding Door View"
              >
                <span>🚪 {isBn ? 'স্লাইড ডোর' : 'Slide Door'}</span>
              </button>

              <button
                onClick={() => setViewMode('carousel')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'carousel' 
                    ? 'bg-emerald-500 text-slate-950' 
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Carousel View"
              >
                <span>🎠 {isBn ? 'ক্যারোসেল' : 'Carousel'}</span>
              </button>

              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'grid' 
                    ? 'bg-emerald-500 text-slate-950' 
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>{isBn ? 'সকল গ্রিড' : 'Grid'}</span>
              </button>
            </div>

            {/* Slider Navigation Buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={handlePrev}
                className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors cursor-pointer"
                title="Previous Teacher"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-emerald-400 border border-slate-800 transition-colors cursor-pointer"
                title={isPlaying ? "Pause Slideshow" : "Auto-Play Slideshow"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              <button
                onClick={handleNext}
                className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors cursor-pointer"
                title="Next Teacher"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 1. SLIDE DOOR MODE (Horizontal Non-Rotated Text with Real-time Expandable Doors) */}
        {viewMode === 'slide-door' && (
          <div className="space-y-4">
            <div className="relative w-full overflow-hidden rounded-3xl bg-slate-900/90 border border-slate-800 p-2 sm:p-4 shadow-2xl">
              {/* Slide Doors Track */}
              <div className="flex flex-col md:flex-row gap-2.5 sm:gap-3 min-h-[580px] md:h-[620px]">
                {visibleDoors.map((teacher, idx) => {
                  const isActive = activeDoorId === teacher.id || (idx === 0 && !visibleDoors.some(t => t.id === activeDoorId));
                  return (
                    <div
                      key={teacher.id}
                      onClick={() => setActiveDoorId(teacher.id)}
                      className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-out border ${
                        isActive
                          ? 'md:flex-[3.5] border-emerald-500/80 shadow-2xl shadow-emerald-500/10 ring-2 ring-emerald-500/30 bg-slate-950'
                          : 'md:flex-[1.1] border-slate-800/80 bg-slate-900/60 opacity-90 hover:opacity-100 hover:border-emerald-500/40'
                      }`}
                    >
                      {/* Background Teacher Photo: object-top keeps face and head crystal clear at the top with ZERO overlap */}
                      <img
                        src={teacher.photoUrl}
                        alt={teacher.nameEn}
                        className={`absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ${
                          isActive ? 'scale-102 filter brightness-95' : 'filter brightness-90 hover:scale-102'
                        }`}
                        loading="lazy"
                      />

                      {/* Subtle Gradient Overlay strictly at the bottom 25% (Face top 75% remains 100% clean & clear) */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 via-10% to-transparent to-25% pointer-events-none" />

                      {/* Top Action Bar on Door (Always visible, sleek in corner) */}
                      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5 z-20">
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black shadow-md truncate">
                          {isBn ? teacher.badgeBn : teacher.badgeEn}
                        </span>

                        <div className="flex items-center gap-1.5">
                          {/* Quick Toggle: Hide Text Off Face */}
                          {isActive && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsTextHidden(!isTextHidden);
                              }}
                              className={`p-1.5 rounded-lg border transition-all shadow-lg cursor-pointer flex items-center gap-1 ${
                                isTextHidden
                                  ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400'
                                  : 'bg-slate-900/90 hover:bg-slate-800 text-slate-200 border-slate-700'
                              }`}
                              title={isTextHidden ? (isBn ? 'লেখা দেখান' : 'Show Text') : (isBn ? 'মুখের উপর থেকে লেখা লুকান' : 'Hide Text Off Face')}
                            >
                              {isTextHidden ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                              <span className="text-[10px] hidden sm:inline">
                                {isTextHidden ? (isBn ? 'লেখা দেখুন' : 'Show Text') : (isBn ? 'লেখা লুকান' : 'Hide Text')}
                              </span>
                            </button>
                          )}

                          {/* 1-Click Direct Photo Upload */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDirectPhotoClick(teacher.id);
                            }}
                            className="p-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all shadow-lg cursor-pointer flex items-center gap-1"
                            title={isBn ? 'এই শিক্ষকের ছবি পরিবর্তন করুন (১-ক্লিকেই সেভ)' : 'Change Photo (1-Click Upload)'}
                          >
                            <Camera className="w-3.5 h-3.5" />
                            <span className="text-[10px] hidden sm:inline">{isBn ? 'ছবি' : 'Photo'}</span>
                          </button>

                          {/* Quick Edit Button */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenEdit(teacher);
                            }}
                            className="p-1.5 rounded-lg bg-slate-900/90 hover:bg-emerald-500 text-slate-300 hover:text-slate-950 border border-slate-700 transition-colors shadow-lg cursor-pointer"
                            title={isBn ? 'এই শিক্ষকের তথ্য ও ছবি এডিট করুন' : 'Edit Teacher Info'}
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* FOLDED DOOR LABEL: 100% Horizontal, Crystal Clear, firmly at bottom */}
                      {!isActive && (
                        <div className="hidden md:flex absolute inset-x-0 bottom-0 p-2.5 pb-2 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent to-30% z-10 flex-col space-y-0.5">
                          <span className="text-[9px] text-emerald-400 font-mono font-bold">
                            #{idx + 1}
                          </span>
                          <h4 className="text-xs font-bold text-white truncate leading-tight">
                            {isBn ? teacher.nameBn : teacher.nameEn}
                          </h4>
                          <p className="text-[10px] text-emerald-400 truncate font-medium">
                            {isBn ? teacher.designationBn : teacher.designationEn}
                          </p>
                        </div>
                      )}

                      {/* EXPANDED DOOR CONTENT: Firmly anchored at bottom, OFF THE FACE */}
                      <div className={`absolute inset-0 p-3 sm:p-4 flex flex-col justify-end z-10 transition-opacity duration-300 ${
                        isActive ? 'opacity-100' : 'opacity-0 md:hidden'
                      }`}>
                        {isTextHidden ? (
                          /* When text is hidden: Only a compact reveal pill at the bottom so 100% of the face and photo are unobstructed */
                          <div className="mt-auto flex justify-center pb-1">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsTextHidden(false);
                              }}
                              className="px-3.5 py-1.5 rounded-full bg-slate-950/90 hover:bg-slate-900 border border-emerald-500/50 text-emerald-400 text-xs font-bold shadow-2xl flex items-center gap-1.5 backdrop-blur-md cursor-pointer transition-all hover:scale-105"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>{isBn ? `${teacher.nameBn} - তথ্য ও লেখা দেখুন` : `Show ${teacher.nameEn} Info`}</span>
                            </button>
                          </div>
                        ) : (
                          /* Bottom Compact Info Box with Crisp Horizontal Text (FIRMLY OFF THE FACE) */
                          <div className="mt-auto space-y-2 bg-slate-950/95 backdrop-blur-md p-3 sm:p-3.5 rounded-2xl border border-slate-800/90 shadow-2xl">
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <h3 className="text-sm sm:text-base font-black text-white truncate">
                                  {isBn ? teacher.nameBn : teacher.nameEn}
                                </h3>
                                <p className="text-[11px] sm:text-xs text-emerald-400 font-bold truncate mt-0.5">
                                  {isBn ? teacher.designationBn : teacher.designationEn}
                                </p>
                                <p className="text-[10px] text-slate-400 truncate">
                                  {isBn ? teacher.departmentBn : teacher.departmentEn}
                                </p>
                              </div>

                              <span className="text-[10px] sm:text-xs text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 whitespace-nowrap shrink-0">
                                {teacher.studentsTrained}+ {isBn ? 'শিক্ষার্থী' : 'Trained'}
                              </span>
                            </div>

                            {/* Action Buttons: View Profile, Photo, Edit, and Hide Text */}
                            <div className="pt-1 flex flex-wrap items-center gap-1.5">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedTeacherModal(teacher);
                                }}
                                className="flex-1 py-1.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer text-center"
                              >
                                {isBn ? 'বিস্তারিত প্রোফাইল' : 'View Profile'}
                              </button>

                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDirectPhotoClick(teacher.id);
                                }}
                                className="py-1.5 px-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer"
                                title={isBn ? 'এই শিক্ষকের ছবি পরিবর্তন করুন' : 'Change Photo'}
                              >
                                <Camera className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">{isBn ? 'ছবি' : 'Photo'}</span>
                              </button>

                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenEdit(teacher);
                                }}
                                className="py-1.5 px-2.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 font-bold text-xs border border-sky-500/40 transition-colors flex items-center gap-1 cursor-pointer"
                                title="এই শিক্ষকের নাম ও ছবি এডিট করুন"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                                <span>{isBn ? 'এডিট' : 'Edit'}</span>
                              </button>

                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setIsTextHidden(true);
                                }}
                                className="py-1.5 px-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-medium text-xs border border-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
                                title={isBn ? 'মুখের উপর থেকে লেখা লুকান' : 'Hide text off face'}
                              >
                                <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                                <span className="hidden sm:inline">{isBn ? 'লেখা লুকান' : 'Hide'}</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Information Helper */}
              <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 px-2">
                <span>
                  {isBn ? '💡 যেকোনো দরজার কার্ডে মাউস রাখলে তাঁর নাম ও ডেজিগনেশন স্পষ্ট বড় হয়ে দেখা যাবে।' : '💡 Hover over any door card to view name and designation horizontally.'}
                </span>
                <span className="font-mono text-emerald-400 font-bold">
                  {filteredTeachers.length} {isBn ? 'জন শিক্ষক তালিকাভুক্ত' : 'Faculty listed'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 2. CAROUSEL SLIDER MODE */}
        {viewMode === 'carousel' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {filteredTeachers.slice(currentIndex, currentIndex + 4).concat(
                currentIndex + 4 > filteredTeachers.length 
                  ? filteredTeachers.slice(0, (currentIndex + 4) % filteredTeachers.length)
                  : []
              ).slice(0, 4).map((teacher) => (
                <div
                  key={teacher.id}
                  className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-emerald-500/60 transition-all duration-300 shadow-xl flex flex-col justify-between hover:-translate-y-1.5"
                >
                  {/* Photo Container */}
                  <div className="relative h-60 w-full overflow-hidden bg-slate-950">
                    <img
                      src={teacher.photoUrl}
                      alt={teacher.nameEn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/30" />

                    {/* Top Badges & Edit Button */}
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-emerald-500 text-slate-950 text-[10px] font-black shadow-md">
                      {isBn ? teacher.badgeBn : teacher.badgeEn}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleOpenEdit(teacher)}
                      className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-900/90 hover:bg-emerald-500 text-slate-300 hover:text-slate-950 border border-slate-700 transition-colors shadow-lg cursor-pointer"
                      title="এডিট করুন"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Card Content (Always Horizontal & Crisp) */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-2.5">
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {isBn ? teacher.nameBn : teacher.nameEn}
                      </h3>
                      <p className="text-xs text-emerald-400 font-semibold mt-0.5">
                        {isBn ? teacher.designationBn : teacher.designationEn}
                      </p>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                        {isBn ? teacher.departmentBn : teacher.departmentEn}
                      </p>
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {isBn ? teacher.bioBn : teacher.bioEn}
                    </p>

                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                      <button
                        onClick={() => handleOpenEdit(teacher)}
                        className="text-xs text-sky-400 hover:text-sky-300 font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>{isBn ? 'এডিট' : 'Edit'}</span>
                      </button>

                      <button
                        onClick={() => setSelectedTeacherModal(teacher)}
                        className="text-xs text-emerald-400 hover:text-emerald-300 font-bold underline underline-offset-4 cursor-pointer"
                      >
                        {isBn ? 'প্রোফাইল' : 'Details'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Navigation Indicators */}
            <div className="flex items-center justify-between text-xs text-slate-400 px-2">
              <div className="flex items-center gap-1.5">
                {Array.from({ length: Math.ceil(filteredTeachers.length / 4) }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i * 4)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      Math.floor(currentIndex / 4) === i 
                        ? 'w-6 bg-emerald-500' 
                        : 'w-2 bg-slate-800 hover:bg-slate-700'
                    }`}
                  />
                ))}
              </div>

              <span>
                {isBn ? `দেখাচ্ছে ${currentIndex + 1} - ${Math.min(currentIndex + 4, filteredTeachers.length)} / মোট ${filteredTeachers.length} জন` : `Showing ${currentIndex + 1} - ${Math.min(currentIndex + 4, filteredTeachers.length)} of ${filteredTeachers.length}`}
              </span>
            </div>
          </div>
        )}

        {/* 3. GRID VIEW (All Teachers with Edit Options) */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredTeachers.map((teacher) => (
              <div
                key={teacher.id}
                className="group relative rounded-2xl overflow-hidden bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 p-4 flex flex-col justify-between space-y-3 hover:-translate-y-1 shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={teacher.photoUrl}
                    alt={teacher.nameEn}
                    className="w-14 h-14 rounded-xl object-cover border border-slate-700 group-hover:border-emerald-500/50 shrink-0"
                    loading="lazy"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 truncate">
                      {isBn ? teacher.nameBn : teacher.nameEn}
                    </h4>
                    <p className="text-xs text-emerald-400 font-semibold truncate mt-0.5">
                      {isBn ? teacher.designationBn : teacher.designationEn}
                    </p>
                    <span className="inline-block text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 mt-1">
                      {isBn ? teacher.experienceBn : teacher.experienceEn}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {isBn ? teacher.bioBn : teacher.bioEn}
                </p>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <button
                    onClick={() => handleOpenEdit(teacher)}
                    className="text-xs text-sky-400 hover:text-sky-300 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>{isBn ? 'এডিট' : 'Edit'}</span>
                  </button>

                  <button
                    onClick={() => setSelectedTeacherModal(teacher)}
                    className="text-xs text-emerald-400 hover:text-emerald-300 font-bold underline cursor-pointer"
                  >
                    {isBn ? 'পূর্ণ প্রোফাইল' : 'View Bio'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* TEACHER EDIT / ADD MODAL */}
      {editingTeacher && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-slate-900 rounded-3xl border border-slate-700 shadow-2xl p-6 sm:p-8 my-8 max-h-[92vh] overflow-y-auto">
            <button
              onClick={() => setEditingTeacher(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              ✕
            </button>

            <form onSubmit={handleSaveTeacher} className="space-y-5">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">
                    {isCreatingNew 
                      ? (isBn ? 'নতুন শিক্ষক যোগ করুন' : 'Add New Teacher') 
                      : (isBn ? 'শিক্ষকের তথ্য ও ছবি এডিট করুন' : 'Edit Teacher Info & Photo')}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {isBn ? 'নাম, পদবী বা ছবি পরিবর্তন করলে সাথে সাথে সেভ হয়ে ওয়েবসাইটে প্রদর্শিত হবে।' : 'Updates will be immediately saved to browser storage and rendered.'}
                  </p>
                </div>
              </div>

              {/* Photo Upload & Preview Section */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <label className="text-xs font-bold text-slate-200 block">
                  {isBn ? 'শিক্ষকের ছবি (Photo Preview & Upload):' : 'Teacher Photo:'}
                </label>
                <div className="flex items-center gap-4">
                  <img
                    src={editingTeacher.photoUrl}
                    alt="Preview"
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-emerald-500 shadow-md shrink-0 bg-slate-900"
                  />
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        disabled={isUploadingPhoto}
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors disabled:opacity-50"
                      >
                        <Upload className="w-4 h-4 text-emerald-400" />
                        <span>
                          {isUploadingPhoto 
                            ? (isBn ? 'ছবি সার্ভারে সেভ হচ্ছে...' : 'Uploading Photo...') 
                            : (isBn ? 'ডিভাইস থেকে নতুন ছবি আপলোড' : 'Upload from Device')}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setIsPhotosGalleryOpen(true)}
                        className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 hover:text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors"
                        title="সম্প্রতি আপলোড করা ছবি থেকে নির্বাচন করুন বা অপ্রয়োজনীয় ছবি মুছে ফেলুন"
                      >
                        <Images className="w-4 h-4 text-emerald-400" />
                        <span>{isBn ? 'গ্যালারি থেকে বাছুন ও মুছুন' : 'Recent Uploads'}</span>
                      </button>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoUpload}
                    />

                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-300">
                          {isBn ? '🌐 ছবির সরাসরি পাবলিক ওয়েব URL (Direct Link):' : '🌐 Direct Image URL:'}
                        </span>
                        <span className="text-[10px] text-emerald-400 font-mono">
                          {editingTeacher.photoUrl.startsWith('/') ? 'Permanent Hosted' : 'External'}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={
                            editingTeacher.photoUrl.startsWith('/')
                              ? (typeof window !== 'undefined' ? `${window.location.origin}${editingTeacher.photoUrl}` : editingTeacher.photoUrl)
                              : editingTeacher.photoUrl
                          }
                          onChange={(e) => setEditingTeacher({ ...editingTeacher, photoUrl: e.target.value })}
                          placeholder="https://..."
                          className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-emerald-300 font-mono focus:outline-none focus:border-emerald-500"
                        />

                        <button
                          type="button"
                          onClick={() => {
                            const fullUrl = editingTeacher.photoUrl.startsWith('/')
                              ? `${window.location.origin}${editingTeacher.photoUrl}`
                              : editingTeacher.photoUrl;
                            navigator.clipboard.writeText(fullUrl);
                            setSaveToast(isBn ? '✓ ছবির সরাসরি URL ক্লিপবোর্ডে কপি হয়েছে!' : '✓ Direct Image URL copied!');
                            setTimeout(() => setSaveToast(null), 3000);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 border border-emerald-500/40 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap"
                          title="Copy direct URL"
                        >
                          <span>📋 {isBn ? 'কপি' : 'Copy'}</span>
                        </button>

                        <a
                          href={
                            editingTeacher.photoUrl.startsWith('/')
                              ? (typeof window !== 'undefined' ? `${window.location.origin}${editingTeacher.photoUrl}` : editingTeacher.photoUrl)
                              : editingTeacher.photoUrl
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs transition-colors"
                          title="Open image in new tab"
                        >
                          🔗
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Name Fields (Bangla & English) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    {isBn ? 'শিক্ষকের নাম (বাংলায়) *' : 'Name (Bangla) *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={editingTeacher.nameBn}
                    onChange={(e) => setEditingTeacher({ ...editingTeacher, nameBn: e.target.value })}
                    placeholder="যেমন: মো. আলামিন হোসেন"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    {isBn ? 'শিক্ষকের নাম (ইংরেজি)' : 'Name (English)'}
                  </label>
                  <input
                    type="text"
                    value={editingTeacher.nameEn}
                    onChange={(e) => setEditingTeacher({ ...editingTeacher, nameEn: e.target.value })}
                    placeholder="e.g. Md. Al-Amin Hossain"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Designation Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    {isBn ? 'পদবী (বাংলায়) *' : 'Designation (Bangla) *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={editingTeacher.designationBn}
                    onChange={(e) => setEditingTeacher({ ...editingTeacher, designationBn: e.target.value })}
                    placeholder="যেমন: প্রধান প্রশিক্ষক ও পরিচালক"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    {isBn ? 'পদবী (ইংরেজি)' : 'Designation (English)'}
                  </label>
                  <input
                    type="text"
                    value={editingTeacher.designationEn}
                    onChange={(e) => setEditingTeacher({ ...editingTeacher, designationEn: e.target.value })}
                    placeholder="e.g. Lead Instructor & Director"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Department & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    {isBn ? 'বিভাগ / বিষয় (বাংলায়)' : 'Department (Bangla)'}
                  </label>
                  <input
                    type="text"
                    value={editingTeacher.departmentBn}
                    onChange={(e) => setEditingTeacher({ ...editingTeacher, departmentBn: e.target.value })}
                    placeholder="যেমন: এআই, ডেটা সায়েন্স ও কারিগরি শিক্ষা"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    {isBn ? 'ক্যাটাগরি ফিল্টার' : 'Category'}
                  </label>
                  <select
                    value={editingTeacher.category}
                    onChange={(e) => setEditingTeacher({ ...editingTeacher, category: e.target.value as any })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500"
                  >
                    <option value="freelancing">এআই ও ফ্রিল্যান্সিং</option>
                    <option value="coding">সফটওয়্যার ও ওয়েব কোডিং</option>
                    <option value="office">BTEB অফিস অ্যাপ্লিকেশন</option>
                    <option value="design">গ্রাফিক ও মাল্টিমিডিয়া</option>
                    <option value="cyber">সাইবার সিকিউরিটি ও লিনাক্স</option>
                    <option value="ict">এইচএসসি আইসিটি একাডেমি</option>
                    <option value="spoken">স্পোকেন ইংলিশ</option>
                  </select>
                </div>
              </div>

              {/* Experience & Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    {isBn ? 'অভিজ্ঞতা (যেমন: ৮+ বছর)' : 'Experience'}
                  </label>
                  <input
                    type="text"
                    value={editingTeacher.experienceBn}
                    onChange={(e) => setEditingTeacher({ ...editingTeacher, experienceBn: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    {isBn ? 'হাইলাইট ব্যাজ' : 'Highlight Badge'}
                  </label>
                  <input
                    type="text"
                    value={editingTeacher.badgeBn}
                    onChange={(e) => setEditingTeacher({ ...editingTeacher, badgeBn: e.target.value })}
                    placeholder="যেমন: বিটিইবি মাস্টার ট্রেইনার"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    {isBn ? 'মোট শিক্ষার্থী ট্রেইন্ড' : 'Students Trained'}
                  </label>
                  <input
                    type="number"
                    value={editingTeacher.studentsTrained}
                    onChange={(e) => setEditingTeacher({ ...editingTeacher, studentsTrained: parseInt(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  {isBn ? 'শিক্ষক পরিচিতি ও বিবরণ (Bio):' : 'Faculty Biography:'}
                </label>
                <textarea
                  rows={3}
                  value={editingTeacher.bioBn}
                  onChange={(e) => setEditingTeacher({ ...editingTeacher, bioBn: e.target.value })}
                  placeholder="শিক্ষকের পরিচিতি ও অভিজ্ঞতা সম্পর্কে লিখুন..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              {/* Actions: Save & Delete */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
                {!isCreatingNew && (
                  <button
                    type="button"
                    onClick={() => handleDeleteTeacher(editingTeacher.id)}
                    className="px-4 py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>{isBn ? 'শিক্ষক মুছে ফেলুন' : 'Delete Teacher'}</span>
                  </button>
                )}

                <div className="flex items-center gap-2 ml-auto">
                  <button
                    type="button"
                    onClick={() => setEditingTeacher(null)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold cursor-pointer"
                  >
                    {isBn ? 'বাতিল' : 'Cancel'}
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-emerald-500/20 cursor-pointer flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    <span>{isBn ? 'সংরক্ষণ করুন' : 'Save Changes'}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Teacher Profile Detail Modal */}
      {selectedTeacherModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-xl bg-slate-900 rounded-3xl border border-slate-700 shadow-2xl p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedTeacherModal(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              ✕
            </button>

            <div className="space-y-5">
              {/* Header Profile with Image */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <img
                  src={selectedTeacherModal.photoUrl}
                  alt={selectedTeacherModal.nameEn}
                  className="w-24 h-24 rounded-2xl object-cover border-2 border-emerald-500 shadow-lg"
                />
                <div className="text-center sm:text-left space-y-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                    {isBn ? selectedTeacherModal.badgeBn : selectedTeacherModal.badgeEn}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    {isBn ? selectedTeacherModal.nameBn : selectedTeacherModal.nameEn}
                  </h3>
                  <p className="text-xs font-bold text-emerald-400">
                    {isBn ? selectedTeacherModal.designationBn : selectedTeacherModal.designationEn}
                  </p>
                  <p className="text-xs text-slate-300">
                    {isBn ? selectedTeacherModal.departmentBn : selectedTeacherModal.departmentEn}
                  </p>
                </div>
              </div>

              {/* Academic & Experience Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">{isBn ? 'শিক্ষাগত যোগ্যতা:' : 'Education:'}</span>
                  <span className="font-bold text-slate-200">
                    {isBn ? selectedTeacherModal.educationBn : selectedTeacherModal.educationEn}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">{isBn ? 'অভিজ্ঞতা ও শিক্ষার্থী:' : 'Experience & Mentored:'}</span>
                  <span className="font-bold text-emerald-400">
                    {isBn ? selectedTeacherModal.experienceBn : selectedTeacherModal.experienceEn} ({selectedTeacherModal.studentsTrained}+ {isBn ? 'শিক্ষার্থী' : 'students'})
                  </span>
                </div>
              </div>

              {/* Bio */}
              <div>
                <h4 className="text-xs font-bold text-slate-200 mb-1.5">
                  {isBn ? 'শিক্ষক পরিচিতি ও ভূমিকা:' : 'Faculty Biography:'}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                  {isBn ? selectedTeacherModal.bioBn : selectedTeacherModal.bioEn}
                </p>
              </div>

              {/* Key Teaching Skills */}
              <div>
                <h4 className="text-xs font-bold text-slate-200 mb-2">
                  {isBn ? 'বিশেষত্ব ও পড়ানোর বিষয়সমূহ:' : 'Areas of Expertise:'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedTeacherModal.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 text-xs font-medium"
                    >
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 border-t border-slate-800 flex items-center gap-3">
                <button
                  onClick={() => {
                    const toEdit = selectedTeacherModal;
                    setSelectedTeacherModal(null);
                    handleOpenEdit(toEdit);
                  }}
                  className="py-2.5 px-4 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/40 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>{isBn ? 'এই শিক্ষক এডিট করুন' : 'Edit This Teacher'}</span>
                </button>

                <button
                  onClick={() => {
                    setSelectedTeacherModal(null);
                    onOpenAdmission?.();
                  }}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer text-center shadow-lg"
                >
                  {isBn ? 'এই শিক্ষকের কোর্সে ভর্তি' : 'Apply for Course'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Hidden file input for 1-click direct photo changes from cards */}
      <input
        ref={directFileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleDirectPhotoFileChange}
      />

      {/* Recently Uploaded Photos Gallery Modal with 1-click Delete & Clear */}
      <RecentlyUploadedPhotosModal
        isOpen={isPhotosGalleryOpen}
        onClose={() => setIsPhotosGalleryOpen(false)}
        onSelectPhoto={(url) => {
          if (editingTeacher) {
            const updated = { ...editingTeacher, photoUrl: url };
            setEditingTeacher(updated);
            const updatedList = teachers.map((t) => (t.id === editingTeacher.id ? updated : t));
            setTeachers(updatedList);
            saveTeachersToStorage(updatedList);
            setSaveToast(isBn ? '✓ গ্যালারি থেকে নির্বাচিত ছবি সফলভাবে যুক্ত হয়েছে!' : '✓ Photo selected from gallery and saved!');
            setTimeout(() => setSaveToast(null), 3500);
          }
        }}
      />
    </section>
  );
};
