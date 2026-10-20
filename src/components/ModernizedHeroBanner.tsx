import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Sparkles, 
  Phone, 
  CheckCircle2, 
  Award, 
  Monitor, 
  Cpu, 
  Languages, 
  Smile, 
  Baby, 
  ArrowRight,
  Maximize2,
  X,
  Users,
  Upload,
  Camera,
  FileCheck,
  PartyPopper,
  RotateCcw,
  Check,
  Building2
} from 'lucide-react';
import { 
  BuildingPhotoView, 
  ComputerLabPhotoView, 
  CertificatePhotoView 
} from './PhotoArtworkViews';

interface ModernizedHeroBannerProps {
  onOpenAdmission?: (courseId?: string) => void;
  onOpenVerify?: () => void;
}

export interface StudentPhoto {
  id: string;
  filename: string;
  title: string;
  subtitle: string;
  badge: string;
  details: string;
  defaultDescription: string;
  tagline: string;
  colorTheme: 'emerald' | 'sky' | 'amber';
}

// Simple IndexedDB wrapper for large image caching across page reloads
const DB_NAME = 'BengalInstituteDB';
const STORE_NAME = 'photos';

const openPhotoDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB not available'));
      return;
    }
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

const savePhotoToDB = async (key: string, dataUrl: string) => {
  try {
    const db = await openPhotoDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).put(dataUrl, key);
  } catch (err) {
    console.warn('Could not save to IndexedDB:', err);
  }
};

const getPhotoFromDB = async (key: string): Promise<string | null> => {
  try {
    const db = await openPhotoDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const req = tx.objectStore(STORE_NAME).get(key);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
};

const DEFAULT_PHOTO_MAP: Record<string, string> = {
  '20211010_170230_edited.jpg': '/campus_building.jpg',
  'IMG_2810.JPG': '/computer_lab.jpg',
  'IMG_2816.JPG': '/cert_handover.jpg',
  'IMG_3250.JPG': '/computer_lab.jpg',
};

export const ModernizedHeroBanner: React.FC<ModernizedHeroBannerProps> = ({
  onOpenAdmission,
}) => {
  const { language, t } = useLanguage();
  const [selectedPhoto, setSelectedPhoto] = useState<StudentPhoto | null>(null);
  const [photoDataUrls, setPhotoDataUrls] = useState<Record<string, string>>(DEFAULT_PHOTO_MAP);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeUploadTarget, setActiveUploadTarget] = useState<string>('all');
  const [card1ActiveTab, setCard1ActiveTab] = useState<'building' | 'lab'>('building');

  const studentPhotos: StudentPhoto[] = [
    {
      id: 'photo-building',
      filename: '20211010_170230_edited.jpg',
      title: language === 'bn' 
        ? 'বেঙ্গল ইনস্টিটিউট ক্যাম্পাস ও জনতা ব্যাংক ভবন' 
        : 'Bengal Institute & Janata Bank Building Campus',
      subtitle: language === 'bn' 
        ? 'সিঙ্গার মোড়, এন এস রোড, কুষ্টিয়া · ১ম তলায় আধুনিক ক্যাম্পাস ও নিচতলায় জনতা ব্যাংক' 
        : 'Singer Mor, NS Road, Kushtia · 1st Floor Modern Campus & Ground Floor Janata Bank',
      badge: language === 'bn' ? 'ক্যাম্পাস ভবন ফটো' : 'Campus Building Photo',
      tagline: language === 'bn' ? 'আজিজুর রহমান সুপার মার্কেট · জনতা ব্যাংক ভবন' : 'Azizur Rahman Super Market · Janata Bank Building',
      defaultDescription: language === 'bn'
        ? 'কুষ্টিয়া শহরের প্রাণকেন্দ্র সিঙ্গার মোড়ে অবস্থিত আজিজুর রহমান সুপার মার্কেট। নিচতলায় জনতা ব্যাংক লিমিটেড ও ১ম তলায় বেঙ্গল কম্পিউটার ট্রেনিং ইনস্টিটিউট।'
        : 'Azizur Rahman Super Market at Singer Mor, Kushtia. Ground floor Janata Bank Limited, 1st floor Bengal Computer Training Institute.',
      details: language === 'bn'
        ? 'আমাদের আধুনিক ক্যাম্পাস কুষ্টিয়া শহরের প্রাণকেন্দ্র সিঙ্গার মোড়ে অবস্থিত আজিজুর রহমান সুপার মার্কেটের ১ম তলায়। নিচতলায় জনতা ব্যাংক লিমিটেডের ঠিক উপরে সুপ্রশস্ত ডিজিটাল ল্যাব।'
        : 'Our modern campus located on the 1st floor of Azizur Rahman Super Market, right above Janata Bank Limited at Singer Mor, Kushtia.',
      colorTheme: 'emerald'
    },
    {
      id: 'photo-1',
      filename: 'IMG_2810.JPG',
      title: language === 'bn' 
        ? 'আমাদের আধুনিক কম্পিউটার ল্যাব ও শিক্ষার্থী-ইন্সট্রাক্টর টিম' 
        : 'Our Modern Computer Lab & Student-Instructor Team',
      subtitle: language === 'bn' 
        ? 'HP টেক পার্টনার ল্যাব · ৯ জন শিক্ষক ও শিক্ষার্থীর টিম · ১ জন ১টি কম্পিউটার' 
        : 'HP Tech Partner Lab · 9 Members Instructor & Student Team · 1 PC Per Student',
      badge: language === 'bn' ? '১ জন ১টি কম্পিউটার ল্যাব' : '1 PC Per Student',
      tagline: language === 'bn' ? 'বেঙ্গল কম্পিউটার শোরুম ও প্র্যাকটিক্যাল ল্যাব' : 'Bengal Computer Lab & Practical Workstations',
      defaultDescription: language === 'bn'
        ? 'বেঙ্গল কম্পিউটার ইনস্টিটিউটের আধুনিক ক্লাসরুম ও শোরুম ল্যাব। ব্লু সিলিং লাইট ও HP ব্র্যান্ডেড পিলারের সামনে শিক্ষক ও শিক্ষার্থীদের প্র্যাকটিক্যাল ক্লাসের গ্রুপ ছবি।'
        : 'Modern classroom and practical lab at Bengal Institute with blue LED ceiling lights and HP partner branding.',
      details: language === 'bn'
        ? 'বেঙ্গল কম্পিউটার ট্রেনিং ইনস্টিটিউটের আধুনিক ক্লাসরুম ও শোরুম ল্যাব। যেখানে প্রতিটি শিক্ষার্থী নিজস্ব কম্পিউটারে রিয়েল-লাইফ প্র্যাকটিক্যাল হ্যান্ডস-অন কাজ করার সুযোগ পান।'
        : 'Modern computer lab and practical workstations at Bengal Computer Training Institute with dedicated PCs for every student.',
      colorTheme: 'emerald'
    },
    {
      id: 'photo-2',
      filename: 'IMG_2816.JPG',
      title: language === 'bn'
        ? 'অফিসিয়াল সনদ ও কোর্স সমাপ্তির স্বীকৃতি হস্তান্তর'
        : 'Official Certificate & Course Completion Handover',
      subtitle: language === 'bn'
        ? 'সফল শিক্ষার্থীদের যৌথভাবে কোর্স সনদ ও নথি গ্রহণ'
        : 'Graduating students officially receiving certificates & documents',
      badge: language === 'bn' ? 'সনদ ও ডকুমেন্টস হস্তান্তর' : 'Certificate Handover',
      tagline: language === 'bn' ? 'ক্লাসরুমে গ্র্যাজুয়েশন ও সনদপত্র বিতরণ' : 'Classroom Graduation & Certification',
      defaultDescription: language === 'bn'
        ? 'ক্লাসরুমের টেবিলে ট্রেইনার ও সফল শিক্ষার্থীদের মাঝে অফিসিয়াল সনদপত্র ও চুক্তিপত্র হস্তান্তরের আনন্দঘন মুহূর্ত।'
        : 'Joyful moment of trainers and successful students receiving official certificates at the institute desk.',
      details: language === 'bn'
        ? 'কোর্স সম্পন্নকারী শিক্ষার্থীদের সরকারি বিটিইবি কারিগরি ও প্রাতিষ্ঠানিক সনদ প্রদান এবং ক্যারিয়ার গাইডলাইন প্রদান।'
        : 'Providing official BTEB technical & institutional certificates along with career mentorship to course graduates.',
      colorTheme: 'sky'
    },
    {
      id: 'photo-3',
      filename: 'IMG_3250.JPG',
      title: language === 'bn'
        ? 'বেঙ্গল কম্পিউটার ইনস্টিটিউটে আনন্দঘন উদযাপন ও গ্র্যাজুয়েশন'
        : 'Celebration & Annual Graduation at Bengal Institute',
      subtitle: language === 'bn'
        ? 'বার্ষিক মিলনমেলা, কেক কাটা ও শিক্ষার্থীদের সংবর্ধনা'
        : 'Annual get-together, cake cutting & student reception',
      badge: language === 'bn' ? 'উদযাপন ও মিলনমেলা' : 'Celebration & Reunion',
      tagline: 'BENGAL COMPUTER INSTITUTE ANNUAL EVENT',
      defaultDescription: language === 'bn'
        ? 'ইনস্টিটিউট সেন্টারে শিক্ষার্থী ও সহকর্মীদের সাথে একসাথে আনন্দঘন মিলনমেলা ও গ্র্যাজুয়েশন মুহূর্ত।'
        : 'Heartwarming reunion, celebration, and cake-cutting ceremony with students and instructors at the center.',
      details: language === 'bn'
        ? 'বেঙ্গল কম্পিউটার ট্রেনিং ইনস্টিটিউটে শিক্ষার্থীদের নিয়ে বার্ষিক মিলনমেলা ও সনদপত্র প্রদান উৎসব।'
        : 'Annual celebration, reception, and student graduation ceremony at Bengal Computer Training Institute.',
      colorTheme: 'amber'
    }
  ];

  // Load photos on mount from IndexedDB, localStorage, or static /IMG_... paths
  useEffect(() => {
    let isMounted = true;
    const loadAllPhotos = async () => {
      const loaded: Record<string, string> = { ...DEFAULT_PHOTO_MAP };
      for (const p of studentPhotos) {
        // 1. Try IndexedDB
        const fromDb = await getPhotoFromDB(`bengal_photo_${p.filename}`);
        if (fromDb) {
          loaded[p.filename] = fromDb;
          continue;
        }

        // 2. Try localStorage
        const stored = localStorage.getItem(`bengal_photo_${p.filename}`);
        if (stored) {
          loaded[p.filename] = stored;
          continue;
        }
      }

      if (isMounted) {
        setPhotoDataUrls(loaded);
      }
    };

    loadAllPhotos();
    return () => {
      isMounted = false;
    };
  }, []);

  // Process files selected or dropped
  const processImageFiles = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return;

    setUploadStatus('আসল ছবি আপলোড ও সেট করা হচ্ছে...');

    const fileList = Array.from(files);

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      let targetFilename = file.name;

      // Smart filename matcher
      if (activeUploadTarget !== 'all') {
        targetFilename = activeUploadTarget;
      } else if (file.name.includes('20211010') || file.name.toLowerCase().includes('building') || file.name.toLowerCase().includes('campus')) {
        targetFilename = '20211010_170230_edited.jpg';
      } else if (file.name.includes('2810') || file.name.toLowerCase().includes('lab')) {
        targetFilename = 'IMG_2810.JPG';
      } else if (file.name.includes('2816') || file.name.toLowerCase().includes('cert')) {
        targetFilename = 'IMG_2816.JPG';
      } else if (file.name.includes('3250') || file.name.includes('3589') || file.name.toLowerCase().includes('event')) {
        targetFilename = 'IMG_3250.JPG';
      } else if (i < studentPhotos.length) {
        targetFilename = studentPhotos[i].filename;
      }

      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64Data = event.target?.result as string;
        if (!base64Data) return;

        // 1. Instantly update UI State
        setPhotoDataUrls(prev => ({
          ...prev,
          [targetFilename]: base64Data
        }));

        // 2. Save in IndexedDB (handles large camera files safely)
        savePhotoToDB(`bengal_photo_${targetFilename}`, base64Data);

        // 3. Save in localStorage (backup)
        try {
          localStorage.setItem(`bengal_photo_${targetFilename}`, base64Data);
        } catch {
          // storage quota safety
        }

        // 4. Save to backend /api/save-photo for permanent disk storage
        try {
          await fetch('/api/save-photo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              filename: targetFilename,
              base64Data
            })
          });
        } catch {
          // backend save is optional
        }
      };
      reader.readAsDataURL(file);
    }

    setUploadStatus('✓ আপনার আসল ছবি সফলভাবে প্রদর্শিত হয়েছে!');
    setTimeout(() => setUploadStatus(''), 4500);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processImageFiles(e.target.files);
    }
  };

  const triggerUpload = (targetFilename: string = 'all') => {
    setActiveUploadTarget(targetFilename);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const removePhoto = (filename: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setPhotoDataUrls(prev => {
      const next = { ...prev };
      delete next[filename];
      return next;
    });
    localStorage.removeItem(`bengal_photo_${filename}`);
    savePhotoToDB(`bengal_photo_${filename}`, '');
    setUploadStatus(`ফটো ${filename} রিমুভ করা হয়েছে`);
    setTimeout(() => setUploadStatus(''), 3000);
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processImageFiles(e.dataTransfer.files);
    }
  };

  const courseIcons = [
    {
      id: 'office-application',
      title: 'Office Application',
      titleBn: 'অফিস অ্যাপ্লিকেশন',
      icon: Monitor,
    },
    {
      id: 'ai-prompt-engineering',
      title: 'Artificial Intelligence',
      titleBn: 'কৃত্রিম বুদ্ধিমত্তা (AI)',
      icon: Cpu,
    },
    {
      id: 'spoken-english',
      title: 'Spoken English',
      titleBn: 'স্পোকেন ইংলিশ',
      icon: Languages,
    },
    {
      id: 'kids-computer',
      title: "Kid's Computer",
      titleBn: 'কিডস কম্পিউটার',
      icon: Smile,
    },
    {
      id: 'kids-spoken-english',
      title: "Kid's Spoken English",
      titleBn: 'কিডস স্পোকেন ইংলিশ',
      icon: Baby,
    }
  ];

  return (
    <div 
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative w-full rounded-3xl overflow-hidden shadow-2xl border-2 transition-all ${
        isDragging ? 'border-emerald-400 ring-4 ring-emerald-500/30' : 'border-emerald-500/40'
      } bg-slate-950`}
    >
      {/* Hidden File Input for authentic original photos */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept="image/*,.jpg,.jpeg,.png,.webp,.JPG,.PNG"
        multiple
        className="hidden"
      />

      {/* Top Banner Control & Action Bar */}
      <div className="bg-slate-900/95 px-4 py-2.5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="font-black text-white uppercase tracking-wider text-xs sm:text-sm">
            {language === 'bn' 
              ? 'BENGAL® INSTITUTE · আমাদের ল্যাব ও শিক্ষার্থীদের আসল ফটো গ্যালারি'
              : 'BENGAL® INSTITUTE · Authentic Lab & Student Photo Gallery'}
          </span>
          <span className="hidden md:inline px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold font-mono">
            BTEB CODE: 27117
          </span>
        </div>

        <div className="flex items-center gap-2">
          {uploadStatus && (
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold animate-pulse flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>{uploadStatus}</span>
            </span>
          )}

          <button
            onClick={() => triggerUpload('all')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black transition-all cursor-pointer shadow-lg shadow-emerald-500/20 transform hover:-translate-y-0.5"
            title={language === 'bn' ? "আপনার ডিভাইস থেকে ৩টি মূল ছবি নির্বাচন করুন" : "Select 3 authentic photos from your device"}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'আসল ৩টি ফটো নির্বাচন করুন' : 'Select 3 Authentic Photos'}</span>
          </button>

          <a
            href="tel:01782824582"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 font-bold text-xs border border-emerald-500/30 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span>01782824582</span>
          </a>
        </div>
      </div>

      {/* Main 2-Column Responsive Banner Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 bg-gradient-to-br from-slate-950 via-[#060e1d] to-slate-950 relative">
        
        {/* ========================================================
            LEFT COLUMN (6 COLS): OFFICIAL BENGAL BRAND POSTER
           ======================================================== */}
        <div className="lg:col-span-6 p-5 sm:p-7 lg:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800/80 relative z-10 space-y-6">
          
          {/* Top Brand Emblem & 3 Tilted Badges */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            
            {/* Boxed Neon Logo Frame */}
            <div className="relative p-2.5 sm:p-3 rounded-2xl bg-black/80 border-2 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.35)] shrink-0">
              <div className="absolute -top-1.5 -left-1.5 text-white animate-pulse">✦</div>
              <div className="absolute -top-1.5 -right-1.5 text-emerald-300">✦</div>
              <div className="absolute -bottom-1.5 -left-1.5 text-emerald-300">✦</div>
              <div className="absolute -bottom-1.5 -right-1.5 text-white animate-pulse">✦</div>

              <div className="text-left leading-none">
                <div className="text-xl sm:text-2xl font-black text-white tracking-wider font-mono">
                  BENGAL<span className="text-xs text-emerald-400 align-super ml-0.5">®</span>
                </div>
                <div className="text-lg sm:text-xl font-black text-emerald-300 tracking-widest mt-0.5">
                  INSTITUTE
                </div>
                <div className="text-[9px] font-bold text-emerald-400/90 tracking-widest mt-1 border-t border-emerald-500/40 pt-1">
                  LEARN | PRACTICE | ACHIEVE
                </div>
              </div>
            </div>

            {/* 3 Iconic Tilted Badges */}
            <div className="flex flex-col gap-1.5 self-stretch sm:self-auto">
              <span className="inline-block px-3 py-1 rounded-md bg-emerald-500 text-slate-950 font-black text-xs shadow-md transform -rotate-1 self-start sm:self-end">
                {language === 'bn' ? 'নতুন পরিবেশ' : 'Modern Setup'}
              </span>
              <span className="inline-block px-3 py-1 rounded-md bg-white text-slate-950 font-black text-xs shadow-md transform rotate-1 self-start sm:self-end">
                {language === 'bn' ? 'নতুন উদ্দেশ্য' : 'New Purpose'}
              </span>
              <span className="inline-block px-3 py-1 rounded-md bg-slate-950 text-white border border-emerald-400/80 font-black text-xs shadow-md transform -rotate-1 self-start sm:self-end">
                {language === 'bn' ? 'আপনার স্বপ্নের ঠিকানা' : 'Dream Destination'}
              </span>
            </div>
          </div>

          {/* Grand Headline & Subtitle */}
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
              BENGAL INSTITUTE{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 block sm:inline">
                {language === 'bn' ? 'এখন নতুন রূপে' : 'Now in a New Look'}
              </span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl">
              {language === 'bn'
                ? 'আমরা আপনাদের জন্য নিয়ে এসেছি যুগোপযোগী ও আধুনিক কম্পিউটার প্রশিক্ষণ কোর্সেস। অভিজ্ঞ প্রশিক্ষক, শীতাতপ নিয়ন্ত্রিত আধুনিক ল্যাব এবং শতভাগ বাস্তব প্র্যাকটিক্যাল ক্লাসের মাধ্যমে গড়ুন আপনার সফল ক্যারিয়ার।'
                : 'Offering modern, industry-aligned computer and AI courses. Experienced instructors, AC computer labs, and 100% practical classes to build your thriving career.'}
            </p>
          </div>

          {/* Admission & Contact Quick Action Bar */}
          <div className="p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-500/30 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="px-3 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs shadow-lg flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'ভর্তি চলছে' : 'Admission Open'}</span>
              </span>
              <div className="flex flex-col">
                <span className="text-[11px] text-slate-400 font-medium">
                  {language === 'bn' ? 'হটলাইন ও ভর্তি তথ্য:' : 'Hotline & Info:'}
                </span>
                <a href="tel:01782824582" className="text-sm font-black text-emerald-400 hover:underline">
                  01782824582
                </a>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 block font-mono">
                {language === 'bn' ? 'ইমেইল:' : 'Email:'}
              </span>
              <span className="text-xs font-bold text-slate-200 font-mono">
                bengalonetechsolution@gmail.com
              </span>
            </div>
          </div>

          {/* 5 Course Slots Grid */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-1">
              <span className="font-bold text-slate-300">
                {language === 'bn' ? 'আমাদের শীর্ষ ৫টি বিশেষায়িত কোর্স:' : 'Our Top 5 Specialized Courses:'}
              </span>
              <button 
                onClick={() => onOpenAdmission?.()} 
                className="text-emerald-400 hover:underline text-[11px] font-bold flex items-center gap-1 cursor-pointer"
              >
                <span>{language === 'bn' ? 'ভর্তি আবেদন' : 'Apply Online'}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {courseIcons.map((course) => {
                const Icon = course.icon;
                return (
                  <div
                    key={course.id}
                    onClick={() => onOpenAdmission?.(course.id)}
                    className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-850 transition-all cursor-pointer group text-center flex flex-col items-center justify-between"
                  >
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="mt-1">
                      <div className="text-[10px] font-black text-white leading-tight">
                        {course.title}
                      </div>
                      <div className="text-[9px] text-emerald-400/90 font-medium">
                        {course.titleBn}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* ========================================================
            RIGHT COLUMN (6 COLS): 3 AUTHENTIC STUDENT & LAB PHOTOS
           ======================================================== */}
        <div className="lg:col-span-6 p-4 sm:p-6 lg:p-7 flex flex-col justify-between space-y-4 bg-slate-950/70 relative">
          
          {/* Header of Photo Showcase */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
                  <span>{t('hero_photo_box_header')}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                </h3>
                <p className="text-[11px] text-slate-400">
                  {t('hero_photo_box_sub')}
                </p>
              </div>
            </div>

            <button
              onClick={() => triggerUpload('all')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 text-xs font-black hover:bg-emerald-400 transition-colors shadow-md cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'ফটো আপলোড / চেঞ্জ' : 'Upload / Change Photos'}</span>
            </button>
          </div>

          {/* Drag & Drop Overlay Notice if dragging */}
          {isDragging && (
            <div className="absolute inset-4 z-40 bg-emerald-950/90 backdrop-blur-sm border-2 border-dashed border-emerald-400 rounded-2xl flex flex-col items-center justify-center p-6 text-center animate-fade-in">
              <Upload className="w-12 h-12 text-emerald-400 mb-2 animate-bounce" />
              <h4 className="text-lg font-black text-white">
                {language === 'bn' ? 'ছবিগুলো এখানে ড্রপ করুন' : 'Drop Photos Here'}
              </h4>
              <p className="text-xs text-emerald-300">
                {language === 'bn' 
                  ? 'আপনার দেওয়া ৩টি আসল ছবি (IMG_2810.JPG, IMG_2816.JPG, IMG_3250.JPG) ছেড়ে দিন'
                  : 'Drop your 3 authentic photos (IMG_2810.JPG, IMG_2816.JPG, IMG_3250.JPG) here'}
              </p>
            </div>
          )}

          {/* Photo Collage: 1 Featured Wide Card on Top + 2 Split Cards on Bottom */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 flex-1">
            
            {/* -------------------------------------------------------- */}
            {/* 1. MAIN FEATURED CARD: DUAL PHOTO VIEW (BUILDING & LAB)  */}
            {/* -------------------------------------------------------- */}
            <div 
              className="sm:col-span-2 group relative rounded-2xl overflow-hidden border-2 border-emerald-500/50 bg-[#071326] shadow-xl hover:border-emerald-400 hover:shadow-emerald-500/25 transition-all aspect-[16/9] sm:aspect-[21/10]"
            >
              {/* Photo Display View: Authentic Uploaded File or High-Fidelity Photorealistic View */}
              {card1ActiveTab === 'building' ? (
                <div 
                  onClick={() => setSelectedPhoto(studentPhotos[0])}
                  className="w-full h-full cursor-pointer relative"
                >
                  {photoDataUrls['20211010_170230_edited.jpg'] ? (
                    <img
                      src={photoDataUrls['20211010_170230_edited.jpg']}
                      alt={studentPhotos[0].title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      onError={() => {
                        setPhotoDataUrls(prev => {
                          const next = { ...prev };
                          delete next['20211010_170230_edited.jpg'];
                          return next;
                        });
                      }}
                    />
                  ) : (
                    <BuildingPhotoView />
                  )}
                  {/* Subtle Gradient Overlay Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />
                </div>
              ) : (
                <div 
                  onClick={() => setSelectedPhoto(studentPhotos[1])}
                  className="w-full h-full cursor-pointer relative"
                >
                  {photoDataUrls['IMG_2810.JPG'] ? (
                    <img
                      src={photoDataUrls['IMG_2810.JPG']}
                      alt={studentPhotos[1].title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      onError={() => {
                        setPhotoDataUrls(prev => {
                          const next = { ...prev };
                          delete next['IMG_2810.JPG'];
                          return next;
                        });
                      }}
                    />
                  ) : (
                    <ComputerLabPhotoView />
                  )}
                  {/* Subtle Gradient Overlay Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />
                </div>
              )}

              {/* Top Photo Switcher Tabs: ছবি ১ (ক্যাম্পাস ভবন) / ছবি ২ (কম্পিউটার ল্যাব) */}
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-20">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCard1ActiveTab('building');
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition-all flex items-center gap-1 shadow-md cursor-pointer ${
                    card1ActiveTab === 'building'
                      ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/40 ring-1 ring-emerald-300'
                      : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700'
                  }`}
                  title="ছবি ১: ক্যাম্পাস ভবন (আজিজুর রহমান সুপার মার্কেট / জনতা ব্যাংক ভবন)"
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'ছবি ১: ক্যাম্পাস ভবন' : 'Photo 1: Campus Building'}</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCard1ActiveTab('lab');
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition-all flex items-center gap-1 shadow-md cursor-pointer ${
                    card1ActiveTab === 'lab'
                      ? 'bg-sky-500 text-slate-950 shadow-sky-500/40 ring-1 ring-sky-300'
                      : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700'
                  }`}
                  title="ছবি ২: আমাদের আধুনিক কম্পিউটার ল্যাব ও শিক্ষার্থী টিম"
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'ছবি ২: কম্পিউটার ল্যাব' : 'Photo 2: Computer Lab'}</span>
                </button>
              </div>

              {/* Action Buttons Top Right: Upload & Fullscreen */}
              <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-20">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerUpload(card1ActiveTab === 'building' ? '20211010_170230_edited.jpg' : 'IMG_2810.JPG');
                  }}
                  className="px-2.5 py-1 rounded-md bg-slate-900/95 hover:bg-slate-800 text-emerald-400 border border-emerald-500/50 text-[10px] font-bold flex items-center gap-1 shadow-md transition-colors cursor-pointer"
                  title="আপনার ডিভাইস থেকে নতুন ফটো আপলোড বা পরিবর্তন করুন"
                >
                  <Upload className="w-3 h-3" />
                  <span>
                    {photoDataUrls[card1ActiveTab === 'building' ? '20211010_170230_edited.jpg' : 'IMG_2810.JPG']
                      ? (language === 'bn' ? 'ফটো পরিবর্তন' : 'Change')
                      : (language === 'bn' ? 'ফটো পরিবর্তন' : 'Upload')}
                  </span>
                </button>

                {photoDataUrls[card1ActiveTab === 'building' ? '20211010_170230_edited.jpg' : 'IMG_2810.JPG'] && (
                  <button
                    onClick={(e) => removePhoto(card1ActiveTab === 'building' ? '20211010_170230_edited.jpg' : 'IMG_2810.JPG', e)}
                    className="p-1 rounded-md bg-slate-900/95 hover:bg-red-950 text-slate-400 hover:text-red-400 border border-slate-700 text-[10px] transition-colors cursor-pointer"
                    title="রিসেট"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                )}

                <button
                  onClick={() => setSelectedPhoto(card1ActiveTab === 'building' ? studentPhotos[0] : studentPhotos[1])}
                  className="w-7 h-7 rounded-md bg-slate-950/90 border border-slate-700 text-slate-300 hover:text-emerald-400 hover:border-emerald-400 flex items-center justify-center transition-colors cursor-pointer"
                  title="বড় করে দেখুন"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Bottom Caption */}
              <div className="absolute bottom-2.5 left-3 right-3 text-left z-10 pointer-events-none">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs sm:text-sm font-black text-white group-hover:text-emerald-300 transition-colors drop-shadow-md">
                    {card1ActiveTab === 'building' ? studentPhotos[0].title : studentPhotos[1].title}
                  </h4>
                </div>
                <p className="text-[10px] sm:text-[11px] text-slate-200 font-medium drop-shadow-sm">
                  {card1ActiveTab === 'building' ? studentPhotos[0].subtitle : studentPhotos[1].subtitle}
                </p>
              </div>
            </div>

            {/* -------------------------------------------------------- */}
            {/* 2. CARD 2: COMPANION PHOTO (LAB OR CAMPUS BUILDING)     */}
            {/* -------------------------------------------------------- */}
            <div 
              className="group relative rounded-2xl overflow-hidden border border-slate-800 hover:border-sky-400 bg-[#08152c] shadow-lg transition-all aspect-[4/3] sm:aspect-auto"
            >
              <div 
                onClick={() => setSelectedPhoto(card1ActiveTab === 'building' ? studentPhotos[1] : studentPhotos[0])}
                className="w-full h-full min-h-[160px] cursor-pointer relative"
              >
                {card1ActiveTab === 'building' ? (
                  <img
                    src={photoDataUrls['IMG_2810.JPG'] || '/computer_lab.jpg'}
                    alt={studentPhotos[1].title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full min-h-[160px] object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.includes('IMG_2810.JPG')) {
                        target.src = '/IMG_2810.JPG';
                      }
                    }}
                  />
                ) : (
                  <img
                    src={photoDataUrls['20211010_170230_edited.jpg'] || '/campus_building.jpg'}
                    alt={studentPhotos[0].title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full min-h-[160px] object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.includes('20211010_170230_edited.jpg')) {
                        target.src = '/20211010_170230_edited.jpg';
                      }
                    }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />
              </div>

              {/* Top Badges */}
              <div className="absolute top-2 left-2 z-10 flex items-center gap-1">
                <span className="px-2 py-0.5 rounded-md bg-sky-500 text-slate-950 text-[9px] font-bold shadow-md">
                  {card1ActiveTab === 'building' ? studentPhotos[1].badge : studentPhotos[0].badge}
                </span>
                <span className="px-1.5 py-0.5 rounded-md bg-slate-900/90 text-sky-300 text-[8px] font-mono border border-sky-500/30">
                  {card1ActiveTab === 'building' ? 'IMG_2810.JPG' : '20211010.JPG'}
                </span>
              </div>

              {/* Action Buttons Top Right */}
              <div className="absolute top-2 right-2 flex items-center gap-1 z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerUpload(card1ActiveTab === 'building' ? 'IMG_2810.JPG' : '20211010_170230_edited.jpg');
                  }}
                  className="px-2 py-0.5 rounded bg-slate-900/95 hover:bg-slate-800 text-sky-400 border border-sky-500/40 text-[9px] font-bold flex items-center gap-0.5 cursor-pointer"
                  title="এই ছবির ফাইল পরিবর্তন করুন"
                >
                  <Upload className="w-2.5 h-2.5" />
                  <span>পরিবর্তন</span>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCard1ActiveTab(card1ActiveTab === 'building' ? 'lab' : 'building');
                  }}
                  className="px-1.5 py-0.5 rounded bg-slate-900/90 hover:bg-emerald-500 hover:text-slate-950 text-slate-300 border border-slate-700 text-[9px] font-bold transition-colors cursor-pointer"
                  title="উপরে বড় করে দেখুন"
                >
                  {language === 'bn' ? 'উপরে আনুন ⇡' : 'Feature ⇡'}
                </button>

                <button
                  onClick={() => setSelectedPhoto(card1ActiveTab === 'building' ? studentPhotos[1] : studentPhotos[0])}
                  className="w-6 h-6 rounded-md bg-slate-950/80 border border-slate-700 text-slate-300 hover:text-sky-400 flex items-center justify-center cursor-pointer"
                >
                  <Maximize2 className="w-3 h-3" />
                </button>
              </div>

              {/* Bottom Caption */}
              <div className="absolute bottom-2 left-2 right-2 text-left z-10 pointer-events-none">
                <h5 className="text-[11px] font-bold text-white group-hover:text-sky-300 transition-colors leading-tight truncate drop-shadow-sm">
                  {card1ActiveTab === 'building' ? studentPhotos[1].title : studentPhotos[0].title}
                </h5>
                <p className="text-[9px] text-slate-300 truncate">
                  {card1ActiveTab === 'building' ? studentPhotos[1].subtitle : studentPhotos[0].subtitle}
                </p>
              </div>
            </div>

            {/* -------------------------------------------------------- */}
            {/* 3. CARD 3: CERTIFICATION HANDOVER & GRADUATION           */}
            {/* -------------------------------------------------------- */}
            <div 
              className="group relative rounded-2xl overflow-hidden border border-slate-800 hover:border-amber-400 bg-[#171205] shadow-lg transition-all aspect-[4/3] sm:aspect-auto"
            >
              <div 
                onClick={() => setSelectedPhoto(studentPhotos[2])}
                className="w-full h-full min-h-[160px] cursor-pointer relative"
              >
                <img
                  src={photoDataUrls['IMG_2816.JPG'] || '/cert_handover.jpg'}
                  alt={studentPhotos[2].title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full min-h-[160px] object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('IMG_2816.JPG')) {
                      target.src = '/IMG_2816.JPG';
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />
              </div>

              {/* Top Badges */}
              <div className="absolute top-2 left-2 z-10 flex items-center gap-1">
                <span className="px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 text-[9px] font-black shadow-md">
                  {studentPhotos[2].badge}
                </span>
                <span className="px-1.5 py-0.5 rounded-md bg-slate-900/90 text-amber-300 text-[8px] font-mono border border-amber-500/30">
                  IMG_2816.JPG
                </span>
              </div>

              {/* Action Buttons Top Right */}
              <div className="absolute top-2 right-2 flex items-center gap-1 z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerUpload('IMG_2816.JPG');
                  }}
                  className="px-2 py-0.5 rounded bg-slate-900/95 hover:bg-slate-800 text-amber-400 border border-amber-500/40 text-[9px] font-bold flex items-center gap-0.5 cursor-pointer"
                  title="এই ছবির ফাইল পরিবর্তন করুন"
                >
                  <Upload className="w-2.5 h-2.5" />
                  <span>পরিবর্তন</span>
                </button>

                <button
                  onClick={() => setSelectedPhoto(studentPhotos[2])}
                  className="w-6 h-6 rounded-md bg-slate-950/80 border border-slate-700 text-slate-300 hover:text-amber-400 flex items-center justify-center cursor-pointer"
                >
                  <Maximize2 className="w-3 h-3" />
                </button>
              </div>

              {/* Bottom Caption */}
              <div className="absolute bottom-2 left-2 right-2 text-left z-10 pointer-events-none">
                <h5 className="text-[11px] font-bold text-white group-hover:text-amber-300 transition-colors leading-tight truncate drop-shadow-sm">
                  {studentPhotos[2].title}
                </h5>
                <p className="text-[9px] text-slate-300 truncate">
                  {studentPhotos[2].subtitle}
                </p>
              </div>
            </div>

          </div>

          {/* Bottom Trust & Verification Footer */}
          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-[11px] font-bold text-white">
                ১০০% প্র্যাকটিক্যাল ল্যাব · প্রতিটি শিক্ষার্থীর জন্য নিজস্ব কম্পিউটার
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <span className="text-[11px] font-mono text-emerald-400 font-bold">১৬ বছরের সুনাম</span>
              <span className="text-slate-600">•</span>
              <span className="text-[11px] text-emerald-300/90 font-medium">সরকারি BTEB অনুমোদিত</span>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================
          FULLSCREEN LIGHTBOX MODAL FOR CLOSE-UP INSPECTION
         ======================================================== */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            className="relative w-full max-w-4xl bg-slate-950 border border-emerald-500/60 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between text-white bg-slate-900/90">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-1 rounded-md bg-emerald-500 text-slate-950 text-xs font-black">
                  {selectedPhoto.badge}
                </span>
                <span className="font-mono text-xs text-cyan-300 font-bold bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/40">
                  {selectedPhoto.filename}
                </span>
                <h3 className="text-sm sm:text-base font-black text-white">
                  {selectedPhoto.title}
                </h3>
              </div>

              <button
                onClick={() => setSelectedPhoto(null)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Area */}
            <div className="relative flex-1 bg-black flex items-center justify-center p-2 sm:p-4 overflow-hidden min-h-[320px] sm:min-h-[420px]">
              <img
                src={
                  photoDataUrls[selectedPhoto.filename] ||
                  (selectedPhoto.filename.includes('20211010') || selectedPhoto.id === 'photo-building'
                    ? '/campus_building.jpg'
                    : selectedPhoto.filename.includes('2816')
                    ? '/cert_handover.jpg'
                    : '/computer_lab.jpg')
                }
                alt={selectedPhoto.title}
                referrerPolicy="no-referrer"
                className="max-h-[60vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.endsWith(selectedPhoto.filename)) {
                    target.src = `/${selectedPhoto.filename}`;
                  }
                }}
              />
            </div>

            {/* Modal Description Footer */}
            <div className="px-5 py-4 border-t border-slate-800 bg-slate-900/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
              <div>
                <p className="text-xs sm:text-sm text-slate-200 font-medium">
                  {selectedPhoto.details}
                </p>
                <span className="text-[11px] text-emerald-400 font-semibold mt-0.5 block">
                  {selectedPhoto.subtitle}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => triggerUpload(selectedPhoto.filename)}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5 text-emerald-400" />
                  <span>নতুন ছবি লোড করুন</span>
                </button>

                <button
                  onClick={() => {
                    setSelectedPhoto(null);
                    onOpenAdmission?.();
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-lg transition-colors cursor-pointer"
                >
                  অনলাইনে ভর্তি আবেদন
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
