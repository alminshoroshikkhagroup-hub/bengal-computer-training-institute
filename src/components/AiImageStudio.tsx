import React, { useState, useRef } from 'react';
import { 
  Sparkles, 
  Image as ImageIcon, 
  Download, 
  RefreshCw, 
  Palette, 
  Sliders, 
  Layers, 
  Type, 
  Eye, 
  Check, 
  Send,
  Zap,
  Building2,
  Wand2,
  HardDrive,
  Upload,
  Copy,
  Maximize2,
  AlertCircle,
  FileImage,
  ArrowRight,
  Monitor,
  Cpu,
  Laptop
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getAccessToken, googleSignIn } from '../services/googleDriveAuth';
import { uploadFileToDrive } from '../services/googleDriveService';
import { 
  requestGenerateImage, 
  STUDENT_IMAGE_PROMPTS,
  GenerateAiImageParams 
} from '../services/aiImageService';

type StudioMode = 'text-to-photo' | 'edit-photo';

export const AiImageStudio: React.FC = () => {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  const [activeMode, setActiveMode] = useState<StudioMode>('text-to-photo');
  
  // Text to Photo & Style State
  const [prompt, setPrompt] = useState<string>(
    'Students collaborating in a high-tech computer lab with modern PCs and programming monitors in Bengal Computer Training Institute Kushtia'
  );
  // Requested default styles: 'Modern Lab' and 'Computer Technology'
  const [selectedStyle, setSelectedStyle] = useState<string>('Modern Lab');
  const [customStyle, setCustomStyle] = useState<string>('');
  
  const [editInstruction, setEditInstruction] = useState('Add glowing neon cyber lighting and high-tech monitors');
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '16:9' | '9:16' | '4:3'>('16:9');
  
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string>(
    'https://image.pollinations.ai/prompt/Modern%20high-tech%20computer%20training%20laboratory%2C%20students%20coding%20on%20dual%20monitors%2C%20photorealistic%208k?width=1280&height=720&nologo=true'
  );
  const [engineUsed, setEngineUsed] = useState<string>('gemini-3.1-flash-image-preview');
  const [uploadedImageBase64, setUploadedImageBase64] = useState<string | null>(null);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [isSavingToDrive, setIsSavingToDrive] = useState(false);
  const [driveSaveSuccess, setDriveSaveSuccess] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Available style presets for student projects (explicitly featuring 'Modern Lab' & 'Computer Technology')
  const availableStyles = [
    {
      id: 'Modern Lab',
      labelBn: '🏢 মডার্ন ল্যাব (Modern Lab)',
      labelEn: '🏢 Modern Lab',
      descBn: 'আধুনিক কম্পিউটার ল্যাব ও শিক্ষার্থীবান্ধব পরিবেশ',
      descEn: 'Modern computer lab with workstations'
    },
    {
      id: 'Computer Technology',
      labelBn: '💻 কম্পিউটার টেকনোলজি (Computer Tech)',
      labelEn: '💻 Computer Technology',
      descBn: 'সার্কিট, কোডিং ইন্টারফেস ও আধুনিক হার্ডওয়্যার',
      descEn: 'Futuristic computing, chips & circuitry'
    },
    {
      id: 'AI & Coding',
      labelBn: '⚡ এআই ও কোডিং (AI & Coding)',
      labelEn: '⚡ AI & Coding',
      descBn: 'অ্যালগরিদম, ডিজিটাল ডাটা ও কোডিং টার্মিনাল',
      descEn: 'AI neural nets & coding terminals'
    },
    {
      id: 'Photorealistic Studio',
      labelBn: '📸 ফটোরিয়েলিস্টিক (Photorealistic)',
      labelEn: '📸 Photorealistic',
      descBn: '৮কে হাই-রেজ্যুলেশন বাস্তবসম্মত স্টুডিও আলো',
      descEn: 'Ultra-realistic 8K studio photography'
    },
    {
      id: 'Cyber Neon',
      labelBn: '🌟 সাইবার নিয়ন (Cyber Neon)',
      labelEn: '🌟 Cyber Neon',
      descBn: 'নিয়ন গ্রিন ও সায়ান রঙের ফিউচারিস্টিক লুক',
      descEn: 'Glowing neon cyberpunk aesthetics'
    },
    {
      id: '3D Digital Art',
      labelBn: '🧊 ৩ডি ডিজিটাল আর্ট (3D Digital Art)',
      labelEn: '🧊 3D Digital Art',
      descBn: 'ব্লেন্ডার ও থ্রি-ডি আইসোমেট্রিক রেন্ডার',
      descEn: 'Blender style 3D isometric render'
    }
  ];

  // Effective style passed to the generator
  const activeStyle = customStyle.trim() ? customStyle.trim() : selectedStyle;

  // Handle Text to Image Generation using the existing /api/gemini/generate-image endpoint
  const handleGeneratePhoto = async (actionType: 'generate' | 'edit' = 'generate') => {
    setIsGenerating(true);
    setErrorMsg(null);
    setDriveSaveSuccess(null);

    const activePrompt = actionType === 'edit' ? editInstruction : prompt;
    const base64Input = actionType === 'edit' ? (uploadedImageBase64 || generatedImageUrl) : undefined;

    try {
      const res = await requestGenerateImage({
        prompt: activePrompt,
        aspectRatio,
        style: activeStyle,
        action: actionType,
        editImageBase64: base64Input
      });

      if (res.success && res.imageUrl) {
        setGeneratedImageUrl(res.imageUrl);
        setEngineUsed(res.engineUsed || 'gemini-3.1-flash-image-preview');
      } else {
        setErrorMsg(res.error || 'ছবি তৈরি করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'ছবি প্রসেসিংয়ে সমস্যা হয়েছে।');
    } finally {
      setIsGenerating(false);
    }
  };

  // Image upload handler for Edit Mode
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImageBase64(reader.result as string);
        setActiveMode('edit-photo');
      };
      reader.readAsDataURL(file);
    }
  };

  // Save generated image to local device
  const handleSaveToDevice = async () => {
    if (!generatedImageUrl) return;
    try {
      setDownloadSuccess(true);
      
      // If it's already a base64 data URL
      if (generatedImageUrl.startsWith('data:')) {
        const a = document.createElement('a');
        a.href = generatedImageUrl;
        a.download = `bengal-project-${selectedStyle.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        // Fetch blob and trigger native save dialog
        const res = await fetch(generatedImageUrl);
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `bengal-project-${selectedStyle.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => window.URL.revokeObjectURL(url), 1000);
      }

      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      // Fallback: direct window open / link download
      const a = document.createElement('a');
      a.href = generatedImageUrl;
      a.target = '_blank';
      a.download = `bengal-project-image-${Date.now()}.png`;
      a.click();
      setTimeout(() => setDownloadSuccess(false), 3000);
    }
  };

  // Copy Image link
  const handleCopy = () => {
    navigator.clipboard.writeText(generatedImageUrl);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  // Save to Google Drive
  const handleSaveToDrive = async () => {
    try {
      setIsSavingToDrive(true);
      setDriveSaveSuccess(null);
      let token = await getAccessToken();
      if (!token) {
        const authRes = await googleSignIn();
        token = authRes?.accessToken || null;
      }
      if (!token) {
        alert(isBn ? 'গুগল ড্রাইভে সেভ করতে গুগল অ্যাকাউন্টে লগইন করুন।' : 'Please sign in with Google to save to Drive.');
        setIsSavingToDrive(false);
        return;
      }

      const res = await fetch(generatedImageUrl);
      const blob = await res.blob();
      const filename = `Bengal-Project-${selectedStyle.replace(/\s+/g, '-')}-${Date.now()}.png`;
      const driveFile = await uploadFileToDrive(token, blob, filename);

      setDriveSaveSuccess(
        isBn 
          ? `সফলভাবে গুগল ড্রাইভে সেভ হয়েছে! (ফাইল: ${driveFile.name})`
          : `Successfully saved to Google Drive! (${driveFile.name})`
      );
    } catch (err: any) {
      console.error(err);
      alert(isBn ? 'গুগল ড্রাইভে আপলোড ব্যর্থ হয়েছে।' : 'Failed to save to Google Drive.');
    } finally {
      setIsSavingToDrive(false);
    }
  };

  return (
    <section id="ai-studio" className="py-16 sm:py-24 bg-slate-950 relative overflow-hidden">
      {/* Background glow aesthetics */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-radial-gradient opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
            <span>{isBn ? 'ছাত্র-ছাত্রীদের জন্য ফ্রি টেক্সট-টু-ইমেজ জেনারেটর' : 'Free Text-to-Image Generator for Student Projects'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            {isBn ? 'প্রজেক্টের প্রম্পট ও স্টাইল দিন, নিমেষে ' : 'Enter Your Prompt & Style, Generate '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400">
              {isBn ? 'এআই ইমেজ তৈরি করুন' : 'Stunning Project Images'}
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
            {isBn 
              ? 'বেঙ্গল ইনস্টিটিউটের শিক্ষার্থীরা যেকোনো প্রম্পট ও পছন্দের স্টাইল (যেমন: Modern Lab বা Computer Technology) দিয়ে প্রজেক্টের জন্য ছবি তৈরি করতে পারবেন এবং সরাসরি নিজের ডিভাইসে সেভ করতে পারবেন।'
              : 'Students can input any project prompt, select styles like "Modern Lab" or "Computer Technology", generate images using Gemini AI, and save them directly to their local device.'}
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex items-center justify-center gap-2 max-w-md mx-auto p-1.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg">
          <button
            type="button"
            onClick={() => setActiveMode('text-to-photo')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeMode === 'text-to-photo'
                ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isBn ? 'টেক্সট টু ইমেজ (Text to Image)' : 'Text to Image'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMode('edit-photo')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeMode === 'edit-photo'
                ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span>{isBn ? 'ইমেজ এডিট (Edit Image)' : 'Edit Image'}</span>
          </button>
        </div>

        {/* Main Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Controls Column (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-5">
            {/* Mode 1: Text to Photo Input */}
            {activeMode === 'text-to-photo' && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-200 block mb-1.5 flex items-center justify-between">
                    <span>{isBn ? '১. প্রজেক্ট প্রম্পট লিখুন (Project Prompt):' : '1. Enter Project Prompt:'}</span>
                    <span className="text-[10px] text-emerald-400 font-normal">বাংলা বা ইংরেজি</span>
                  </label>
                  <textarea
                    rows={4}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder={isBn ? 'যেমন: কুষ্টিয়া সিঙ্গার মোড় কম্পিউটার ল্যাবে ছাত্রছাত্রীরা প্র্যাকটিক্যাল কোডিং ও এআই প্রজেক্ট করছে...' : 'e.g. Students in a modern computer laboratory designing an AI project with dual monitors...'}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-500 transition-colors resize-none leading-relaxed"
                  />
                </div>

                {/* Student Prompt Presets */}
                <div>
                  <span className="text-[11px] font-bold text-slate-400 block mb-2">
                    {isBn ? 'রেডিমেড প্রজেক্ট প্রম্পট (এক ক্লিকে ট্রাই করুন):' : 'Quick Project Presets:'}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {STUDENT_IMAGE_PROMPTS.map((p, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setPrompt(p.prompt);
                          setSelectedStyle(p.style === 'cyber-neon' ? 'Cyber Neon' : p.style === '3d-render' ? '3D Digital Art' : 'Modern Lab');
                          setAspectRatio(p.aspectRatio);
                        }}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-emerald-300 border border-slate-800 hover:border-emerald-500/40 transition-all cursor-pointer text-left"
                      >
                        ⚡ {isBn ? p.titleBn : p.titleEn}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Mode 2: Edit Photo Input */}
            {activeMode === 'edit-photo' && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-200 block mb-1.5">
                    {isBn ? '১. যে ছবিটি এডিট করতে চান:' : '1. Photo to Edit:'}
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-950 border border-dashed border-slate-700 hover:border-emerald-500 text-slate-300 hover:text-white text-xs font-semibold cursor-pointer transition-colors"
                    >
                      <Upload className="w-4 h-4 text-emerald-400" />
                      <span>{uploadedImageBase64 ? (isBn ? 'নতুন ছবি আপলোড' : 'Change Image') : (isBn ? 'ডিভাইস থেকে ছবি আপলোড' : 'Upload from Device')}</span>
                    </button>
                    <input 
                      ref={fileInputRef} 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleImageUpload} 
                    />

                    {generatedImageUrl && (
                      <button
                        type="button"
                        onClick={() => setUploadedImageBase64(generatedImageUrl)}
                        className="px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-emerald-400 font-bold border border-slate-700 cursor-pointer"
                        title="Use currently generated photo"
                      >
                        {isBn ? 'বর্তমান ছবি' : 'Use Current'}
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-200 block mb-1.5">
                    {isBn ? '২. কী এডিট করতে চান লিখুন (এডিট প্রম্পট):' : '2. Describe your edit:'}
                  </label>
                  <textarea
                    rows={3}
                    value={editInstruction}
                    onChange={(e) => setEditInstruction(e.target.value)}
                    placeholder={isBn ? 'যেমন: ব্যাকগ্রাউন্ডে নিয়ন সাইবার লাইট যুক্ত করো এবং স্ক্রিনে কোডিং টার্মিনাল দেখাও...' : 'e.g. Add glowing neon lights and high tech computer screens...'}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                  />
                </div>
              </div>
            )}

            {/* Style Selector (Prominently featuring Modern Lab and Computer Technology) */}
            <div className="pt-2 border-t border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-200 block">
                  {isBn ? '২. প্রজেক্টের স্টাইল নির্বাচন করুন (Style):' : '2. Select Project Style:'}
                </label>
                <span className="text-[10px] text-emerald-400 font-semibold">
                  {activeStyle}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {availableStyles.map((s) => {
                  const isSelected = selectedStyle === s.id && !customStyle.trim();
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        setSelectedStyle(s.id);
                        setCustomStyle('');
                      }}
                      className={`p-2.5 text-left rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-500/20 text-white border-emerald-500 ring-1 ring-emerald-500/50 shadow-sm'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <div className={`text-xs ${isSelected ? 'text-emerald-300 font-black' : 'text-slate-200'}`}>
                        {isBn ? s.labelBn : s.labelEn}
                      </div>
                      <div className="text-[10px] text-slate-400 font-normal line-clamp-1 mt-0.5">
                        {isBn ? s.descBn : s.descEn}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Custom Style Input */}
              <div className="pt-1">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={customStyle}
                    onChange={(e) => setCustomStyle(e.target.value)}
                    placeholder={isBn ? 'অথবা কাস্টম স্টাইল লিখুন (e.g. Modern Lab, Computer Technology...)' : 'Or type a custom style (e.g. Modern Lab, Computer Technology...)'}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-slate-500"
                  />
                  {customStyle && (
                    <button
                      type="button"
                      onClick={() => setCustomStyle('')}
                      className="text-xs text-slate-400 hover:text-white px-2 py-1 bg-slate-800 rounded-lg cursor-pointer"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Aspect Ratio Selector */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <label className="text-xs font-bold text-slate-300 block">
                {isBn ? '৩. ছবির অনুপাত (Aspect Ratio):' : '3. Aspect Ratio:'}
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: '16:9', label: '১৬:৯ (ব্যানার)' },
                  { id: '1:1', label: '১:১ (স্কয়ার)' },
                  { id: '4:3', label: '৪:৩ (প্রেজেন্টেশন)' },
                  { id: '9:16', label: '৯:১৬ (স্টোরি)' }
                ].map((ratio) => (
                  <button
                    key={ratio.id}
                    type="button"
                    onClick={() => setAspectRatio(ratio.id as any)}
                    className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                      aspectRatio === ratio.id
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md font-black'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {ratio.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Error Display */}
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Generate Action Button */}
            <button
              type="button"
              disabled={isGenerating}
              onClick={() => handleGeneratePhoto(activeMode === 'edit-photo' ? 'edit' : 'generate')}
              className={`w-full py-3.5 px-6 rounded-2xl font-black text-sm transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer ${
                isGenerating
                  ? 'bg-emerald-600/50 text-slate-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 text-slate-950 hover:shadow-emerald-500/25 hover:scale-[1.01]'
              }`}
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                  <span>{isBn ? 'এআই ছবি তৈরি হচ্ছে... (অপেক্ষা করুন)' : 'Generating with Gemini AI...'}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>
                    {activeMode === 'edit-photo'
                      ? (isBn ? 'ছবিটি এডিট করুন (১০০% ফ্রি)' : 'Edit Image with AI (Free)')
                      : (isBn ? `ছবি তৈরি করুন (${activeStyle})` : `Generate Image (${activeStyle})`)}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Right Preview & Export Column (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Image Preview Box */}
            <div className="relative rounded-3xl bg-slate-900 border border-slate-800 p-3 sm:p-4 shadow-2xl overflow-hidden group">
              {/* Header inside preview */}
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-800/80 px-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-bold text-white text-xs sm:text-sm">
                    {isBn ? 'তৈরিকৃত এআই প্রজেক্ট ইমেজ' : 'Generated Project Image Preview'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold">
                    {activeStyle}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-mono">
                    {aspectRatio}
                  </span>
                </div>
              </div>

              {/* The Photo Container */}
              <div className="relative w-full rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center min-h-[320px] max-h-[580px]">
                {isGenerating && (
                  <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center animate-spin">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-emerald-300 animate-pulse">
                      {isBn ? 'এআই আপনার প্রজেক্টের জন্য ছবি তৈরি করছে...' : 'AI is generating your project image...'}
                    </p>
                    <p className="text-[11px] text-slate-400 max-w-xs text-center">
                      {prompt.slice(0, 70)}...
                    </p>
                  </div>
                )}

                <img
                  src={generatedImageUrl}
                  alt="Bengal AI Studio Generated"
                  className={`w-full h-auto object-contain transition-all duration-300 ${
                    aspectRatio === '1:1' ? 'aspect-square' : aspectRatio === '16:9' ? 'aspect-video' : aspectRatio === '9:16' ? 'aspect-[9/16]' : 'aspect-[4/3]'
                  }`}
                  loading="lazy"
                />
              </div>

              {/* Feedback messages */}
              {downloadSuccess && (
                <div className="mt-3 p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold text-center animate-in fade-in">
                  ✓ {isBn ? 'ছবিটি সফলভাবে আপনার লোকাল ডিভাইসে সেভ হয়েছে!' : 'Image successfully saved to your local device!'}
                </div>
              )}

              {copySuccess && (
                <div className="mt-3 p-2.5 rounded-xl bg-sky-500/20 border border-sky-500/40 text-sky-300 text-xs font-bold text-center animate-in fade-in">
                  ✓ {isBn ? 'ছবির লিংক ক্লিপবোর্ডে কপি করা হয়েছে!' : 'Image link copied to clipboard!'}
                </div>
              )}

              {driveSaveSuccess && (
                <div className="mt-3 p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold text-center animate-in fade-in">
                  ✓ {driveSaveSuccess}
                </div>
              )}

              {/* Action Buttons Bar: Featuring dedicated "Save to Local Device" */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                {/* Primary Button: Save to Local Device */}
                <button
                  type="button"
                  onClick={handleSaveToDevice}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-emerald-500/20 hover:scale-[1.02] transition-all cursor-pointer"
                  title="Save the generated image directly to your computer or phone"
                >
                  <Download className="w-4 h-4 text-slate-950" />
                  <span>{isBn ? 'লোকাল ডিভাইসে সেভ করুন (Save to Device)' : 'Save to Local Device (Download)'}</span>
                </button>

                {/* Secondary Actions: Copy, Drive, Edit */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-xs transition-colors cursor-pointer"
                    title="Copy image link"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{isBn ? 'কপি লিংক' : 'Copy'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveToDrive}
                    disabled={isSavingToDrive}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 hover:text-amber-200 border border-amber-500/30 font-bold text-xs transition-colors cursor-pointer"
                  >
                    <HardDrive className="w-3.5 h-3.5 text-amber-400" />
                    <span>
                      {isSavingToDrive 
                        ? (isBn ? 'ড্রাইভে সেভ হচ্ছে...' : 'Saving...') 
                        : (isBn ? 'গুগল ড্রাইভে সেভ' : 'Save to Drive')}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setUploadedImageBase64(generatedImageUrl);
                      setActiveMode('edit-photo');
                    }}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-400 hover:text-sky-300 border border-sky-500/30 font-bold text-xs transition-colors cursor-pointer"
                    title="Send this image to editor"
                  >
                    <Wand2 className="w-3.5 h-3.5" />
                    <span>{isBn ? 'এডিটর এ পাঠান' : 'Edit This'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Tips for Students */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs space-y-2">
              <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isBn ? 'ছাত্র-ছাত্রীদের প্রজেক্টের জন্য সহায়ক নির্দেশিকা:' : 'Student Project Guidelines:'}</span>
              </span>
              <ul className="text-slate-400 space-y-1 pl-4 list-disc text-[11px] leading-relaxed">
                <li>
                  <strong className="text-slate-300">Modern Lab:</strong> {isBn ? 'কম্পিউটার ল্যাব, মাল্টিপল মনিটর ও প্র্যাকটিক্যাল ক্লাসরুম পরিবেশের জন্য পারফেক্ট।' : 'Perfect for computer training lab and classroom settings.'}
                </li>
                <li>
                  <strong className="text-slate-300">Computer Technology:</strong> {isBn ? 'ফিউচারিস্টিক টেকনোলজি, কোডিং, নেটওয়ার্কিং ও আইসিটি প্রজেক্ট ডিজাইনের জন্য উপযুক্ত।' : 'Ideal for futuristic computing, networking, and ICT projects.'}
                </li>
                <li>
                  <strong className="text-slate-300">Save to Local Device:</strong> {isBn ? 'এক ক্লিকেই আপনার পিসি বা মোবাইলের ডাউনলোড ফোল্ডারে হাই-রেজ্যুলেশন PNG আকারে সংরক্ষণ করতে পারবেন।' : 'One-click instant high-resolution PNG download to your device storage.'}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
