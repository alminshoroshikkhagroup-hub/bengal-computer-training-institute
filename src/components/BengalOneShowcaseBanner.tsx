import React, { useState, useEffect, useRef } from 'react';
import { 
  Globe2, 
  Cpu, 
  ShieldCheck, 
  Wifi, 
  Monitor, 
  Sparkles,
  Maximize2,
  X,
  Upload,
  Camera
} from 'lucide-react';

interface BengalOneShowcaseBannerProps {
  className?: string;
}

export const BengalOneShowcaseBanner: React.FC<BengalOneShowcaseBannerProps> = ({
  className = '',
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Check if user uploaded IMG_0759_edited.png
    const stored = localStorage.getItem('bengal_photo_IMG_0759_edited.png');
    if (stored) {
      setCustomImage(stored);
    } else {
      fetch('/IMG_0759_edited.png', { method: 'HEAD' })
        .then(res => {
          if (res.ok) setCustomImage('/IMG_0759_edited.png');
        })
        .catch(() => {});
    }
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64Data = event.target?.result as string;
      if (!base64Data) return;
      setCustomImage(base64Data);
      try {
        localStorage.setItem('bengal_photo_IMG_0759_edited.png', base64Data);
      } catch {}

      try {
        await fetch('/api/save-photo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            filename: 'IMG_0759_edited.png',
            base64Data
          })
        });
      } catch {}
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />

      <div 
        onClick={() => setIsModalOpen(true)}
        className={`relative rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-950 shadow-2xl shadow-cyan-950/40 group cursor-pointer transition-all duration-300 hover:border-cyan-400 hover:shadow-cyan-500/20 ${className}`}
        title="BENGAL ONE - UNIFIED IT SOLUTIONS & TRAINING INSTITUTE (Click to view full size)"
      >
        {/* If user uploaded custom IMG_0759_edited.png, display that exact file */}
        {customImage ? (
          <div className="relative w-full aspect-[16/9] overflow-hidden bg-slate-950">
            <img 
              src={customImage} 
              alt="BENGAL ONE UNIFIED IT SOLUTIONS" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ) : (
          /* Full 3-Panel Composite Tech Artwork Container (16:9 Aspect Ratio) */
          <div className="relative w-full aspect-[16/9] grid grid-cols-12 bg-slate-950 select-none overflow-hidden text-white font-sans">
            
            {/* ========================================================= */}
            {/* PANEL 1 (LEFT 6 COLS): 3D Chrome Globe in Corporate Tech Atrium */}
            {/* ========================================================= */}
            <div className="col-span-6 relative border-r-2 border-white/90 overflow-hidden flex flex-col justify-between bg-gradient-to-br from-slate-950 via-[#071d3a] to-slate-900">
              {/* Glass & Bright Light Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-slate-950/40" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-400/20 via-transparent to-transparent pointer-events-none" />

              {/* Center: The Chrome Globe & Orbiting Tech Brands */}
              <div className="relative flex-1 flex items-center justify-center pt-2 sm:pt-4">
                <div className="relative w-36 sm:w-52 md:w-64 lg:w-72 h-36 sm:h-52 md:h-64 lg:h-72 flex items-center justify-center">
                  {/* Outer Glowing Cyan Orbital Ring with Partner Logos */}
                  <div className="absolute inset-0 rounded-full border-2 sm:border-[3px] border-cyan-400/80 shadow-[0_0_25px_rgba(6,182,212,0.6)] rotate-[-22deg] scale-y-[0.42] scale-x-[1.28] flex items-center justify-around pointer-events-none">
                    <span className="text-[7px] sm:text-[9px] md:text-[10px] font-black text-cyan-200 tracking-wider bg-slate-950/80 px-1 py-0.5 rounded border border-cyan-400/40">hp</span>
                    <span className="text-[7px] sm:text-[9px] md:text-[10px] font-black text-cyan-200 tracking-wider bg-slate-950/80 px-1 py-0.5 rounded border border-cyan-400/40">DELL</span>
                    <span className="text-[7px] sm:text-[9px] md:text-[10px] font-black text-cyan-200 tracking-wider bg-slate-950/80 px-1 py-0.5 rounded border border-cyan-400/40">CISCO</span>
                    <span className="text-[7px] sm:text-[9px] md:text-[10px] font-black text-cyan-200 tracking-wider bg-slate-950/80 px-1 py-0.5 rounded border border-cyan-400/40">Microsoft</span>
                    <span className="hidden sm:inline text-[7px] sm:text-[9px] md:text-[10px] font-black text-cyan-200 tracking-wider bg-slate-950/80 px-1 py-0.5 rounded border border-cyan-400/40">kaspersky</span>
                  </div>

                  {/* 3D Silver Chrome Globe Spherical Artwork */}
                  <div className="relative w-24 h-24 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full bg-gradient-to-tr from-slate-400 via-slate-100 to-white shadow-[inset_-12px_-12px_24px_rgba(15,23,42,0.8),_0_0_35px_rgba(56,189,248,0.45)] border border-white/60 overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(255,255,255,0.9),_transparent_60%)]" />
                    <Globe2 className="w-20 h-20 sm:w-32 sm:h-32 md:w-40 md:h-40 text-slate-500/40 stroke-[1.2]" />
                    <div className="absolute w-full h-[2px] bg-cyan-300/80 blur-[1px] rotate-[-22deg]" />
                  </div>
                </div>
              </div>

              {/* Pedestal Base: White Marble Cylinder with "BENGAL ONE" 3D Signage */}
              <div className="relative z-10 px-2 sm:px-4 pb-2 sm:pb-3 text-center">
                <div className="mx-auto max-w-[92%] rounded-xl sm:rounded-2xl bg-gradient-to-b from-white/95 to-slate-200/95 text-slate-900 py-1.5 sm:py-2.5 px-2 sm:px-3 shadow-lg border border-white">
                  <div className="flex items-center justify-center gap-1 sm:gap-1.5 leading-none">
                    <span className="text-sm sm:text-xl md:text-2xl font-black tracking-tight text-slate-800 drop-shadow-sm">
                      BENGAL
                    </span>
                    <span className="text-sm sm:text-xl md:text-2xl font-black tracking-tight text-sky-600 drop-shadow-sm">
                      ONE
                    </span>
                  </div>
                  <div className="text-[7px] sm:text-[9px] md:text-[10px] font-bold text-slate-600 uppercase tracking-wider mt-0.5 sm:mt-1">
                    ONE ROOF. GLOBAL TECH. INFINITE SOLUTIONS.
                  </div>
                  <div className="text-[6px] sm:text-[8px] md:text-[9px] font-black text-slate-700 tracking-wide mt-0.5">
                    EST. 2008 | 16 YEARS OF EXCELLENCE
                  </div>
                </div>

                {/* Bottom footer badge: 1 / BENGAL ONE TECH SOLUTION */}
                <div className="flex items-center justify-between text-[7px] sm:text-[9px] text-slate-400 mt-1 sm:mt-1.5 px-2">
                  <span className="font-mono font-bold text-slate-300">1</span>
                  <span className="font-bold tracking-wider text-slate-300">BENGAL ONE TECH SOLUTION</span>
                </div>
              </div>
            </div>

            {/* ========================================================= */}
            {/* RIGHT SIDE (6 COLS): PANEL 2 (TOP) & PANEL 3 (BOTTOM)     */}
            {/* ========================================================= */}
            <div className="col-span-6 flex flex-col">

              {/* ------------------------------------------------------- */}
              {/* PANEL 2 (TOP RIGHT): Cybernetic Server Room & Connected Ark */}
              {/* ------------------------------------------------------- */}
              <div className="h-1/2 relative border-b-2 border-white/90 overflow-hidden flex flex-col justify-between p-2 sm:p-3 bg-gradient-to-tr from-slate-950 via-[#0a1a36] to-cyan-950/70">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-cyan-950/40" />

                {/* Connected Ark Glowing Dome Top */}
                <div className="relative z-10 text-center">
                  <div className="inline-block px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/50 text-[7px] sm:text-[9px] font-bold text-cyan-300 tracking-wider">
                    Connected Ark
                  </div>
                </div>

                {/* 4 Pillars of IT: Hardware, Software, Networking, Cyber Security */}
                <div className="relative z-10 grid grid-cols-4 gap-1 text-center py-1">
                  {/* Hardware */}
                  <div className="flex flex-col items-center">
                    <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shadow-[0_0_8px_rgba(6,182,212,0.4)]">
                      <Monitor className="w-3 h-3 sm:w-4 sm:h-4" />
                    </div>
                    <span className="text-[6px] sm:text-[8px] font-semibold text-slate-200 mt-0.5">Hardware</span>
                  </div>

                  {/* Software */}
                  <div className="flex flex-col items-center">
                    <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-lg bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.4)]">
                      <Cpu className="w-3 h-3 sm:w-4 sm:h-4" />
                    </div>
                    <span className="text-[6px] sm:text-[8px] font-semibold text-slate-200 mt-0.5">Software</span>
                  </div>

                  {/* Networking */}
                  <div className="flex flex-col items-center">
                    <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-lg bg-sky-950/80 border border-sky-500/40 flex items-center justify-center text-sky-300 shadow-[0_0_8px_rgba(14,165,233,0.4)]">
                      <Wifi className="w-3 h-3 sm:w-4 sm:h-4" />
                    </div>
                    <span className="text-[6px] sm:text-[8px] font-semibold text-slate-200 mt-0.5">Networking</span>
                  </div>

                  {/* Cyber Security */}
                  <div className="flex flex-col items-center">
                    <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-lg bg-indigo-950/80 border border-indigo-500/40 flex items-center justify-center text-indigo-300 shadow-[0_0_8px_rgba(99,102,241,0.4)]">
                      <ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4" />
                    </div>
                    <span className="text-[6px] sm:text-[8px] font-semibold text-slate-200 mt-0.5">Cyber Security</span>
                  </div>
                </div>

                {/* Title & 16-Year Badge */}
                <div className="relative z-10 flex items-end justify-between border-t border-slate-700/60 pt-1">
                  <span className="font-mono text-[7px] sm:text-[9px] font-bold text-slate-400">2</span>
                  <div className="text-center flex-1 px-1">
                    <div className="text-[8px] sm:text-[11px] md:text-xs font-black text-cyan-300 tracking-tight leading-tight">
                      BENGAL ONE UNIFIED IT SOLUTIONS
                    </div>
                    <div className="text-[5px] sm:text-[7px] text-slate-300 font-medium tracking-wide">
                      HARDWARE | SOFTWARE | NETWORKING | SECURITY
                    </div>
                  </div>
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-300 shrink-0" title="16 Years of Excellence">
                    <span className="text-[6px] sm:text-[7px] font-black">16</span>
                  </div>
                </div>
              </div>

              {/* ------------------------------------------------------- */}
              {/* PANEL 3 (BOTTOM RIGHT): High-Tech Training Lab with AI  */}
              {/* ------------------------------------------------------- */}
              <div className="h-1/2 relative overflow-hidden flex flex-col justify-between p-2 sm:p-3 bg-gradient-to-tr from-slate-950 via-[#0a1e3d] to-slate-900">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/70 to-blue-950/40" />

                {/* Top Curved Display Header: 2008: VISION | BENGAL ONE | 2024: INNOVATION */}
                <div className="relative z-10 rounded-lg bg-slate-900/90 border border-cyan-500/40 p-1 sm:p-1.5 text-center shadow-md">
                  <div className="flex items-center justify-between text-[6px] sm:text-[8px] text-cyan-400 font-bold px-1">
                    <span>2008: VISION</span>
                    <span className="text-white font-black tracking-wider">BENGAL ONE</span>
                    <span>2024: INNOVATION</span>
                  </div>
                  <div className="text-[8px] sm:text-[11px] md:text-xs font-black text-cyan-300 tracking-tight mt-0.5">
                    BENGAL TRAINING INSTITUTE
                  </div>
                  <div className="text-[5px] sm:text-[7px] text-slate-300 font-semibold tracking-wider">
                    BUILDING FUTURE LEADERS SINCE 2008 • AI, CLOUD, CYBER, R&D
                  </div>
                </div>

                {/* Bottom Holographic Table indicator */}
                <div className="relative z-10 flex items-center justify-between pt-1">
                  <span className="font-mono text-[7px] sm:text-[9px] font-bold text-slate-400">3</span>
                  <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30 text-[6px] sm:text-[8px] font-bold text-cyan-300">
                    <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
                    <span>Interactive AI Lab & Humanoid Robotics</span>
                  </div>
                  <div className="text-cyan-400">
                    <Maximize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* Hover / Tap Hint Indicator */}
        <div className="absolute bottom-2 right-2 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-900/90 text-cyan-300 text-[10px] font-bold border border-cyan-500/40 shadow-lg">
          <Maximize2 className="w-3 h-3" />
          <span>বড় করে দেখুন</span>
        </div>
      </div>

      {/* Fullscreen Lightbox / Modal for Close-Up Inspection */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-5xl rounded-2xl overflow-hidden border border-cyan-500/60 shadow-2xl bg-slate-950 p-2 sm:p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-white">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
                <h3 className="text-base sm:text-lg font-black text-white">
                  BENGAL ONE UNIFIED IT SOLUTIONS & TRAINING INSTITUTE
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-1 hover:bg-emerald-400 transition-colors"
                >
                  <Upload className="w-3 h-3" />
                  <span>{customImage ? 'আসল ব্যানার পরিবর্তন' : 'আসল ব্যানার আপলোড'}</span>
                </button>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: Large View */}
            <div className="mt-3 relative rounded-xl overflow-hidden border border-slate-800">
              {customImage ? (
                <img 
                  src={customImage} 
                  alt="BENGAL ONE" 
                  referrerPolicy="no-referrer"
                  className="w-full max-h-[75vh] object-contain mx-auto" 
                />
              ) : (
                <div className="relative w-full aspect-[16/9] grid grid-cols-12 bg-slate-950 text-white font-sans">
                  {/* Modal Left Panel */}
                  <div className="col-span-6 relative border-r-2 border-white flex flex-col justify-between p-4 overflow-hidden bg-gradient-to-br from-slate-950 via-[#071d3a] to-slate-900">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-slate-950/40" />
                    
                    {/* Globe & Ring in Modal */}
                    <div className="relative flex-1 flex items-center justify-center">
                      <div className="relative w-72 h-72 flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full border-4 border-cyan-400 shadow-[0_0_35px_rgba(6,182,212,0.8)] rotate-[-22deg] scale-y-[0.45] scale-x-[1.3] flex items-center justify-around pointer-events-none">
                          <span className="text-xs font-black text-cyan-200 bg-slate-950/90 px-1.5 py-0.5 rounded border border-cyan-400">hp</span>
                          <span className="text-xs font-black text-cyan-200 bg-slate-950/90 px-1.5 py-0.5 rounded border border-cyan-400">DELL</span>
                          <span className="text-xs font-black text-cyan-200 bg-slate-950/90 px-1.5 py-0.5 rounded border border-cyan-400">CISCO</span>
                          <span className="text-xs font-black text-cyan-200 bg-slate-950/90 px-1.5 py-0.5 rounded border border-cyan-400">Microsoft</span>
                          <span className="text-xs font-black text-cyan-200 bg-slate-950/90 px-1.5 py-0.5 rounded border border-cyan-400">kaspersky</span>
                        </div>
                        <div className="relative w-48 h-48 rounded-full bg-gradient-to-tr from-slate-400 via-slate-100 to-white shadow-[inset_-14px_-14px_28px_rgba(15,23,42,0.8),_0_0_40px_rgba(56,189,248,0.5)] border-2 border-white flex items-center justify-center overflow-hidden">
                          <Globe2 className="w-44 h-44 text-slate-500/40 stroke-[1.2]" />
                          <div className="absolute w-full h-[3px] bg-cyan-300 blur-[1px] rotate-[-22deg]" />
                        </div>
                      </div>
                    </div>

                    {/* Marble Pedestal in Modal */}
                    <div className="relative z-10 text-center">
                      <div className="mx-auto max-w-[85%] rounded-2xl bg-white text-slate-900 py-3 px-4 shadow-xl border border-slate-200">
                        <div className="flex items-center justify-center gap-2 leading-none">
                          <span className="text-2xl font-black text-slate-800">BENGAL</span>
                          <span className="text-2xl font-black text-sky-600">ONE</span>
                        </div>
                        <div className="text-xs font-bold text-slate-600 uppercase tracking-widest mt-1">
                          ONE ROOF. GLOBAL TECH. INFINITE SOLUTIONS.
                        </div>
                        <div className="text-[10px] font-black text-slate-700 tracking-wider mt-0.5">
                          EST. 2008 | 16 YEARS OF EXCELLENCE
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-300 mt-2 px-3 font-semibold">
                        <span>1</span>
                        <span>BENGAL ONE TECH SOLUTION</span>
                      </div>
                    </div>
                  </div>

                  {/* Modal Right Panels */}
                  <div className="col-span-6 flex flex-col">
                    {/* Modal Panel 2 */}
                    <div className="h-1/2 relative border-b-2 border-white flex flex-col justify-between p-4 overflow-hidden bg-gradient-to-tr from-slate-950 via-[#0a1a36] to-cyan-950/70">
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-cyan-950/40" />

                      <div className="relative z-10 text-center">
                        <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400 text-xs font-bold text-cyan-300 tracking-wider">
                          Connected Ark
                        </div>
                      </div>

                      <div className="relative z-10 grid grid-cols-4 gap-2 text-center py-2">
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 rounded-xl bg-cyan-950/90 border border-cyan-400 flex items-center justify-center text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.5)]">
                            <Monitor className="w-5 h-5" />
                          </div>
                          <span className="text-xs font-semibold text-slate-200 mt-1">Hardware</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 rounded-xl bg-emerald-950/90 border border-emerald-400 flex items-center justify-center text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.5)]">
                            <Cpu className="w-5 h-5" />
                          </div>
                          <span className="text-xs font-semibold text-slate-200 mt-1">Software</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 rounded-xl bg-sky-950/90 border border-sky-400 flex items-center justify-center text-sky-300 shadow-[0_0_12px_rgba(14,165,233,0.5)]">
                            <Wifi className="w-5 h-5" />
                          </div>
                          <span className="text-xs font-semibold text-slate-200 mt-1">Networking</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 rounded-xl bg-indigo-950/90 border border-indigo-400 flex items-center justify-center text-indigo-300 shadow-[0_0_12px_rgba(99,102,241,0.5)]">
                            <ShieldCheck className="w-5 h-5" />
                          </div>
                          <span className="text-xs font-semibold text-slate-200 mt-1">Cyber Security</span>
                        </div>
                      </div>

                      <div className="relative z-10 flex items-center justify-between border-t border-slate-700/80 pt-2">
                        <span className="text-xs font-bold text-slate-400">2</span>
                        <div className="text-center flex-1">
                          <div className="text-sm font-black text-cyan-300 tracking-wide">
                            BENGAL ONE UNIFIED IT SOLUTIONS
                          </div>
                          <div className="text-[10px] text-slate-300 font-medium">
                            HARDWARE | SOFTWARE | NETWORKING | SECURITY
                          </div>
                        </div>
                        <div className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-300 font-bold text-xs">
                          16
                        </div>
                      </div>
                    </div>

                    {/* Modal Panel 3 */}
                    <div className="h-1/2 relative flex flex-col justify-between p-4 overflow-hidden bg-gradient-to-tr from-slate-950 via-[#0a1e3d] to-slate-900">
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/70 to-blue-950/40" />

                      <div className="relative z-10 rounded-xl bg-slate-900/95 border border-cyan-500/50 p-2.5 text-center shadow-lg">
                        <div className="flex items-center justify-between text-xs text-cyan-400 font-bold px-2">
                          <span>2008: VISION</span>
                          <span className="text-white font-black tracking-widest">BENGAL ONE</span>
                          <span>2024: INNOVATION</span>
                        </div>
                        <div className="text-sm sm:text-base font-black text-cyan-300 mt-1">
                          BENGAL TRAINING INSTITUTE
                        </div>
                        <div className="text-[10px] text-slate-300 font-semibold tracking-wider">
                          BUILDING FUTURE LEADERS SINCE 2008 • AI, CLOUD, CYBER, R&D
                        </div>
                      </div>

                      <div className="relative z-10 flex items-center justify-between pt-2">
                        <span className="text-xs font-bold text-slate-400">3</span>
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/90 border border-cyan-400 text-xs font-bold text-cyan-300">
                          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Interactive AI Lab & Humanoid Robotics Training</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
