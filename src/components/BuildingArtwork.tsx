import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Sparkles, 
  Monitor, 
  Cpu, 
  Languages, 
  ShieldCheck, 
  CheckCircle2, 
  Sun, 
  Moon, 
  Navigation,
  Eye
} from 'lucide-react';

interface BuildingArtworkProps {
  onOpenAdmission?: () => void;
  onOpenTour?: () => void;
}

export const BuildingArtwork: React.FC<BuildingArtworkProps> = ({
  onOpenAdmission,
  onOpenTour,
}) => {
  const [activeFloor, setActiveFloor] = useState<'bengal' | 'janata' | null>('bengal');
  const [isNightMode, setIsNightMode] = useState<boolean>(false);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-700/60 shadow-2xl transition-all duration-500">
      {/* Top Banner Toolbar with Mode Switcher & Address */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-slate-200">
            ক্যাম্পাস ভবন: আজিজুর রহমান সুপার মার্কেট
          </span>
          <span className="hidden sm:inline text-slate-500">|</span>
          <span className="hidden sm:flex items-center gap-1 text-emerald-400">
            <MapPin className="w-3.5 h-3.5" /> সিঙ্গার মোড়, এন এস রোড, কুষ্টিয়া
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsNightMode(!isNightMode)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors text-[11px]"
            title="লাইটিং মোড পরিবর্তন করুন"
          >
            {isNightMode ? (
              <>
                <Sun className="w-3 h-3 text-amber-400" />
                <span>ডে ভিউ</span>
              </>
            ) : (
              <>
                <Moon className="w-3 h-3 text-cyan-400" />
                <span>নাইট নিয়ন ভিউ</span>
              </>
            )}
          </button>
          
          <button
            onClick={() => setActiveFloor(activeFloor === 'bengal' ? 'janata' : 'bengal')}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 transition-colors text-[11px] font-medium"
          >
            <Eye className="w-3 h-3" />
            <span>ফ্লোর স্পটলাইট: {activeFloor === 'bengal' ? '১ম তলা (বেঙ্গল)' : 'নিচতলা (জনতা ব্যাংক)'}</span>
          </button>
        </div>
      </div>

      {/* Main Visual Container */}
      <div className={`relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/8.8] select-none overflow-hidden transition-colors duration-700 ${
        isNightMode 
          ? 'bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950' 
          : 'bg-gradient-to-b from-sky-200 via-sky-100 to-amber-50/40'
      }`}>
        {/* Sky Background Elements */}
        {!isNightMode ? (
          <div className="absolute inset-0 pointer-events-none opacity-60">
            {/* Soft Daylight clouds */}
            <div className="absolute top-4 left-10 w-44 h-16 bg-white/70 rounded-full blur-md" />
            <div className="absolute top-10 right-20 w-64 h-20 bg-white/80 rounded-full blur-lg" />
            <div className="absolute top-2 right-12 w-16 h-16 rounded-full bg-amber-200/50 blur-xl" />
          </div>
        ) : (
          <div className="absolute inset-0 pointer-events-none">
            {/* Night Stars & Deep Blue Atmosphere */}
            <div className="absolute top-6 left-1/4 w-1 h-1 bg-white rounded-full animate-ping" />
            <div className="absolute top-12 left-1/2 w-1.5 h-1.5 bg-cyan-200 rounded-full" />
            <div className="absolute top-20 right-1/4 w-1 h-1 bg-emerald-300 rounded-full" />
            <div className="absolute inset-0 bg-radial-gradient opacity-40" />
          </div>
        )}

        {/* SVG Detailed Architectural Model of Janata Bank & Bengal Institute Building */}
        <svg
          viewBox="0 0 1200 680"
          className="absolute inset-0 w-full h-full object-cover"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="buildingFacade" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isNightMode ? "#0f172a" : "#cbd5e1"} />
              <stop offset="50%" stopColor={isNightMode ? "#1e293b" : "#e2e8f0"} />
              <stop offset="100%" stopColor={isNightMode ? "#0f172a" : "#94a3b8"} />
            </linearGradient>

            <linearGradient id="neonGreenSign" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>

            <linearGradient id="janataBankBlue" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="50%" stopColor="#0369a1" />
              <stop offset="100%" stopColor="#075985" />
            </linearGradient>

            <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            
            <filter id="strongGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur1"/>
              <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur2"/>
              <feMerge>
                <feMergeNode in="blur2"/>
                <feMergeNode in="blur1"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Distant Kushtia Town Skyline & Trees */}
          <g opacity={isNightMode ? "0.3" : "0.5"}>
            <polygon points="0,520 80,480 150,520 230,460 300,520 0,520" fill={isNightMode ? "#061325" : "#64748b"} />
            <polygon points="900,520 1020,470 1100,520 1200,450 1200,520 900,520" fill={isNightMode ? "#061325" : "#64748b"} />
            {/* Green Tree silhouettes */}
            <circle cx="120" cy="480" r="45" fill={isNightMode ? "#064e3b" : "#15803d"} opacity="0.6" />
            <circle cx="1080" cy="470" r="55" fill={isNightMode ? "#064e3b" : "#15803d"} opacity="0.6" />
          </g>

          {/* ========================================================
              THE MAIN COMMERCIAL BUILDING (Azizur Rahman Super Market)
             ======================================================== */}
          {/* Main Structural Mass */}
          <polygon
            points="140,540 140,110 1060,110 1060,540"
            fill="url(#buildingFacade)"
            stroke={isNightMode ? "#334155" : "#64748b"}
            strokeWidth="3"
          />

          {/* Roof Parapet & Water Tank / Antennas */}
          <rect x="130" y="90" width="940" height="24" rx="4" fill={isNightMode ? "#020617" : "#475569"} />
          {/* Broadband Internet Tower / Satellite dish */}
          <line x1="200" y1="90" x2="200" y2="40" stroke="#10b981" strokeWidth="4" />
          <line x1="190" y1="45" x2="210" y2="45" stroke="#10b981" strokeWidth="3" />
          <line x1="194" y1="58" x2="206" y2="58" stroke="#10b981" strokeWidth="3" />
          <circle cx="200" cy="40" r="4" fill="#34d399" filter="url(#neonGlow)" />
          {/* WiFi waves */}
          <path d="M 188,30 A 15 15 0 0 1 212,30" fill="none" stroke="#34d399" strokeWidth="2" strokeDasharray="3 2" />
          <path d="M 180,22 A 25 25 0 0 1 220,22" fill="none" stroke="#34d399" strokeWidth="1.5" strokeDasharray="4 2" />

          {/* Decorative Balcony Arches (Distinctive arches on the upper floor like the real building) */}
          <g fill={isNightMode ? "#1e293b" : "#cbd5e1"}>
            {[180, 270, 360, 450, 540, 630, 720, 810, 900, 990].map((x, i) => (
              <path
                key={`arch-${i}`}
                d={`M ${x - 30},140 Q ${x},118 ${x + 30},140 L ${x + 30},170 L ${x - 30},170 Z`}
                stroke={isNightMode ? "#334155" : "#94a3b8"}
                strokeWidth="2"
              />
            ))}
          </g>

          {/* ========================================================
              1ST FLOOR: BENGAL INSTITUTE (Active Spotlight Floor)
             ======================================================== */}
          <g
            className="cursor-pointer transition-all duration-300"
            onClick={() => setActiveFloor('bengal')}
          >
            {/* 1st Floor Background highlight when active */}
            <rect
              x="142"
              y="172"
              width="916"
              height="180"
              fill={activeFloor === 'bengal' 
                ? (isNightMode ? "rgba(16, 185, 129, 0.12)" : "rgba(16, 185, 129, 0.08)") 
                : "transparent"}
              stroke={activeFloor === 'bengal' ? "#10b981" : "transparent"}
              strokeWidth="2"
              strokeDasharray={activeFloor === 'bengal' ? "6 4" : "none"}
            />

            {/* Upper floor modern computer lab windows with glowing screens inside */}
            {[190, 310, 790, 910].map((wx, idx) => (
              <g key={`win-bengal-${idx}`}>
                <rect
                  x={wx}
                  y="200"
                  width="100"
                  height="130"
                  rx="4"
                  fill={isNightMode ? "#090d16" : "#f1f5f9"}
                  stroke={isNightMode ? "#334155" : "#94a3b8"}
                  strokeWidth="3"
                />
                {/* Windows Glass Reflection */}
                <polygon points={`${wx + 5},205 ${wx + 95},205 ${wx + 30},325 ${wx + 5},325`} fill="rgba(56, 189, 248, 0.08)" />
                {/* Student PC screen glow inside */}
                <rect x={wx + 25} y={245} width="50" height="35" rx="2" fill="#38bdf8" opacity={isNightMode ? "0.85" : "0.4"} filter="url(#neonGlow)" />
                <rect x={wx + 44} y={280} width="12" height="15" fill="#475569" />
                <rect x={wx + 35} y={295} width="30" height="4" rx="1" fill="#64748b" />
              </g>
            ))}

            {/* ==========================================================
                THE FAMOUS SIGNBOARD: [ BENGAL® INSTITUTE ] LEARN | PRACTICE | ACHIEVE
               ========================================================== */}
            {/* Glow Aura */}
            <rect
              x="290"
              y="190"
              width="620"
              height="145"
              rx="8"
              fill={isNightMode ? "#052e16" : "#064e3b"}
              opacity={isNightMode ? "0.4" : "0.2"}
              filter="url(#strongGlow)"
            />

            {/* Signboard Backing Plate (Glossy Black Acrylic) */}
            <rect
              x="295"
              y="195"
              width="610"
              height="135"
              rx="6"
              fill="#090d16"
              stroke="#10b981"
              strokeWidth="3.5"
              filter={isNightMode ? "url(#neonGlow)" : "none"}
            />

            {/* Neon Green Accent Frame Box around Logo */}
            <rect
              x="315"
              y="210"
              width="36"
              height="80"
              fill="none"
              stroke="#10b981"
              strokeWidth="4"
              rx="3"
              filter="url(#neonGlow)"
            />
            <rect
              x="323"
              y="202"
              width="36"
              height="80"
              fill="none"
              stroke="#34d399"
              strokeWidth="2.5"
              rx="3"
              opacity="0.8"
            />

            {/* Main Signboard Typography */}
            <text
              x="370"
              y="252"
              fill="#ffffff"
              fontFamily="Outfit, sans-serif"
              fontWeight="900"
              fontSize="44"
              letterSpacing="2.5"
            >
              BENGAL<tspan fill="#10b981" fontSize="30">®</tspan> INSTITUTE
            </text>

            {/* Signboard Subtitle Tagline */}
            <text
              x="374"
              y="288"
              fill="#a7f3d0"
              fontFamily="Outfit, sans-serif"
              fontWeight="700"
              fontSize="16"
              letterSpacing="7"
            >
              LEARN  |  PRACTICE  |  ACHIEVE
            </text>

            {/* BTEB & Kushtia Tag Badge on Signboard */}
            <g transform="translate(730, 212)">
              <rect x="0" y="0" width="160" height="30" rx="4" fill="#047857" />
              <text x="80" y="19" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Hind Siliguri, sans-serif">
                কারিগরি বোর্ড কোড: ২৭১১৭
              </text>
            </g>

            {/* Contact Pill on Signboard */}
            <g transform="translate(680, 280)">
              <rect x="0" y="0" width="210" height="34" rx="17" fill="#10b981" />
              <circle cx="18" cy="17" r="11" fill="#064e3b" />
              <path d="M 14,14 C 14,19 17,21 21,21" stroke="#ffffff" strokeWidth="2" fill="none" />
              <text x="115" y="22" fill="#064e3b" fontSize="15" fontWeight="900" textAnchor="middle" fontFamily="Outfit, sans-serif">
                CALL: 01782-824582
              </text>
            </g>

            {/* Floor Badge Indicator */}
            <g transform="translate(160, 185)">
              <rect x="0" y="0" width="95" height="26" rx="13" fill="#10b981" />
              <text x="47" y="17" fill="#042f2e" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="Hind Siliguri, sans-serif">
                ১ম তলা · একাডেমি
              </text>
            </g>
          </g>

          {/* ========================================================
              GROUND FLOOR: JANATA BANK LIMITED (জনতা ব্যাংক লিমিটেড)
             ======================================================== */}
          <g
            className="cursor-pointer transition-all duration-300"
            onClick={() => setActiveFloor('janata')}
          >
            {/* Ground Floor highlight */}
            <rect
              x="142"
              y="354"
              width="916"
              height="186"
              fill={activeFloor === 'janata' 
                ? (isNightMode ? "rgba(2, 132, 199, 0.12)" : "rgba(2, 132, 199, 0.08)") 
                : "transparent"}
              stroke={activeFloor === 'janata' ? "#0284c7" : "transparent"}
              strokeWidth="2"
              strokeDasharray={activeFloor === 'janata' ? "6 4" : "none"}
            />

            {/* ==========================================================
                THE ICONIC BLUE SIGNBOARD: জনতা ব্যাংক লিমিটেড (Janata Bank)
               ========================================================== */}
            {/* Bank Signboard Glow */}
            <rect
              x="530"
              y="368"
              width="360"
              height="68"
              rx="4"
              fill="#0369a1"
              opacity={isNightMode ? "0.3" : "0.1"}
              filter="url(#strongGlow)"
            />

            {/* Blue Signboard Plate */}
            <rect
              x="535"
              y="370"
              width="350"
              height="64"
              rx="4"
              fill="url(#janataBankBlue)"
              stroke="#bae6fd"
              strokeWidth="2"
            />

            {/* Janata Bank Circular Emblem */}
            <g transform="translate(565, 402)">
              <circle cx="0" cy="0" r="20" fill="#ffffff" />
              <circle cx="0" cy="0" r="16" fill="#0369a1" />
              <text x="0" y="6" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Outfit, sans-serif">
                JB
              </text>
            </g>

            {/* Bengali Text: জনতা ব্যাংক লিমিটেড */}
            <text
              x="600"
              y="410"
              fill="#ffffff"
              fontFamily="Hind Siliguri, sans-serif"
              fontWeight="bold"
              fontSize="27"
              letterSpacing="0.5"
            >
              জনতা ব্যাংক লিমিটেড
            </text>

            <text
              x="602"
              y="426"
              fill="#e0f2fe"
              fontFamily="Hind Siliguri, sans-serif"
              fontSize="11"
            >
              সিঙ্গার মোড় শাখা, কুষ্টিয়া
            </text>

            {/* Neighboring Shop Signs as in uploaded photo (Western Union, Sharmeen Store, Abir Fashion) */}
            {/* Western Union Sign */}
            <rect x="895" y="375" width="130" height="40" rx="3" fill="#000000" stroke="#facc15" strokeWidth="1.5" />
            <rect x="897" y="377" width="126" height="14" fill="#facc15" />
            <text x="960" y="388" fill="#000000" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="Outfit, sans-serif">
              WESTERN UNION
            </text>
            <text x="960" y="405" fill="#facc15" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="Hind Siliguri, sans-serif">
              মানি ট্রান্সফার
            </text>

            {/* Abir Fashion / Local Cloth Stores */}
            <rect x="400" y="380" width="125" height="38" rx="3" fill="#b91c1c" stroke="#f87171" strokeWidth="1.5" />
            <text x="462" y="404" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Hind Siliguri, sans-serif">
              আবির ফ্যাশন
            </text>

            {/* Sharmeen Store / General Store */}
            <rect x="270" y="380" width="120" height="38" rx="3" fill="#ea580c" stroke="#fed7aa" strokeWidth="1.5" />
            <text x="330" y="404" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="Hind Siliguri, sans-serif">
              শারমীনা ক্লথ
            </text>

            {/* Central Entrance & Stairs to Bengal Institute 1st Floor */}
            <g transform="translate(180, 420)">
              {/* Entrance Gate */}
              <rect x="0" y="0" width="80" height="120" fill={isNightMode ? "#020617" : "#334155"} rx="4" />
              {/* Stairs leading up to Bengal Institute */}
              <path d="M 10,120 L 70,120 L 60,60 L 20,60 Z" fill={isNightMode ? "#1e293b" : "#64748b"} />
              <rect x="15" y="10" width="50" height="24" rx="2" fill="#10b981" />
              <text x="40" y="26" fill="#064e3b" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="Hind Siliguri, sans-serif">
                ↑ বেঙ্গল ল্যাব
              </text>
            </g>

            {/* Shopfronts & Rollershutter doors */}
            {[280, 390, 550, 710, 870].map((sx, idx) => (
              <g key={`shop-${idx}`}>
                <rect
                  x={sx}
                  y="435"
                  width="100"
                  height="105"
                  fill={isNightMode ? "#0f172a" : "#e2e8f0"}
                  stroke={isNightMode ? "#334155" : "#94a3b8"}
                  strokeWidth="2"
                />
                {/* Horizontal shutter ridges */}
                {[455, 475, 495, 515].map((ry) => (
                  <line key={`ridge-${ry}`} x1={sx + 4} y1={ry} x2={sx + 96} y2={ry} stroke={isNightMode ? "#1e293b" : "#cbd5e1"} strokeWidth="2" />
                ))}
              </g>
            ))}

            {/* Janata Bank Entrance Glass Doors */}
            <g transform="translate(660, 440)">
              <rect x="0" y="0" width="80" height="100" rx="2" fill="#0284c7" opacity={isNightMode ? "0.3" : "0.15"} stroke="#38bdf8" strokeWidth="2" />
              <line x1="40" y1="0" x2="40" y2="100" stroke="#38bdf8" strokeWidth="2" />
              <text x="40" y="55" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="Hind Siliguri, sans-serif">
                ব্যাংক প্রবেশ
              </text>
            </g>

            {/* Floor Badge Indicator */}
            <g transform="translate(160, 360)">
              <rect x="0" y="0" width="105" height="26" rx="13" fill="#0284c7" />
              <text x="52" y="17" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="Hind Siliguri, sans-serif">
                নিচতলা · জনতা ব্যাংক
              </text>
            </g>
          </g>

          {/* ========================================================
              STREET LEVEL: SINGER MOR, NS ROAD, KUSHTIA (সিঙ্গার মোড়)
             ======================================================== */}
          {/* Street Road Surface */}
          <polygon
            points="0,540 1200,540 1200,680 0,680"
            fill={isNightMode ? "#090d16" : "#334155"}
          />
          {/* Road Curb */}
          <rect x="0" y="540" width="1200" height="12" fill={isNightMode ? "#1e293b" : "#94a3b8"} />
          
          {/* Road White Divider Marks */}
          {[50, 200, 350, 500, 650, 800, 950, 1100].map((dx, i) => (
            <rect key={`div-${i}`} x={dx} y="610" width="80" height="8" rx="2" fill="#f8fafc" opacity="0.75" />
          ))}

          {/* Authentic Bangladeshi Cycle Rickshaws on Singer Mor Street */}
          {/* Rickshaw 1 (Left to Right) */}
          <g transform="translate(420, 530) scale(0.9)">
            {/* Hood / Canopy (Red/Blue floral art) */}
            <path d="M 0,25 Q 30,0 60,25 L 50,55 L 10,55 Z" fill="#dc2626" />
            <path d="M 10,25 Q 30,8 50,25" fill="none" stroke="#facc15" strokeWidth="3" />
            {/* Seat & Passenger */}
            <circle cx="30" cy="30" r="10" fill="#fde047" />
            {/* Rickshaw Wheels */}
            <circle cx="15" cy="80" r="22" fill="none" stroke="#94a3b8" strokeWidth="3" />
            <circle cx="15" cy="80" r="2" fill="#cbd5e1" />
            <circle cx="65" cy="80" r="22" fill="none" stroke="#94a3b8" strokeWidth="3" />
            <circle cx="115" cy="80" r="22" fill="none" stroke="#94a3b8" strokeWidth="3" />
            {/* Puller (Rickshaw Puller) */}
            <circle cx="95" cy="35" r="9" fill="#78350f" />
            <line x1="95" y1="44" x2="90" y2="70" stroke="#0284c7" strokeWidth="5" />
            {/* Frame */}
            <line x1="30" y1="65" x2="95" y2="65" stroke="#f59e0b" strokeWidth="3.5" />
            <line x1="95" y1="65" x2="115" y2="80" stroke="#f59e0b" strokeWidth="3.5" />
            <line x1="95" y1="65" x2="95" y2="48" stroke="#f59e0b" strokeWidth="3.5" />
          </g>

          {/* Rickshaw 2 (Right to Left) */}
          <g transform="translate(860, 545) scale(0.85)">
            <path d="M 0,25 Q 30,0 60,25 L 50,55 L 10,55 Z" fill="#047857" />
            <circle cx="30" cy="30" r="9" fill="#67e8f9" />
            <circle cx="15" cy="80" r="20" fill="none" stroke="#94a3b8" strokeWidth="3" />
            <circle cx="65" cy="80" r="20" fill="none" stroke="#94a3b8" strokeWidth="3" />
            <circle cx="110" cy="80" r="20" fill="none" stroke="#94a3b8" strokeWidth="3" />
            <circle cx="95" cy="38" r="8" fill="#78350f" />
            <line x1="95" y1="46" x2="90" y2="72" stroke="#e11d48" strokeWidth="4" />
            <line x1="30" y1="65" x2="95" y2="65" stroke="#10b981" strokeWidth="3" />
            <line x1="95" y1="65" x2="110" y2="80" stroke="#10b981" strokeWidth="3" />
          </g>

          {/* Kushtia Singer Mor Crossing Street Sign Post */}
          <g transform="translate(60, 470)">
            {/* Pole */}
            <rect x="28" y="0" width="8" height="150" fill="#64748b" />
            {/* Signboard */}
            <rect x="0" y="10" width="160" height="54" rx="6" fill="#047857" stroke="#ffffff" strokeWidth="2.5" />
            <text x="80" y="32" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="Hind Siliguri, sans-serif">
              সিঙ্গার মোড় · এন এস রোড
            </text>
            <text x="80" y="48" fill="#a7f3d0" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="Outfit, sans-serif">
              SINGER MOR, KUSHTIA
            </text>
            {/* Distance Marker Arrow */}
            <polygon points="150,30 162,37 150,44" fill="#ffffff" />
          </g>

          {/* Electric Utility Pole & Cable Lines (Iconic Bangladeshi Townscape) */}
          <line x1="1140" y1="120" x2="1140" y2="540" stroke="#475569" strokeWidth="6" />
          <line x1="1120" y1="160" x2="1160" y2="160" stroke="#475569" strokeWidth="4" />
          <path d="M 0,220 Q 570,300 1140,160" fill="none" stroke={isNightMode ? "#1e293b" : "#64748b"} strokeWidth="1.5" opacity="0.6" />
          <path d="M 0,235 Q 570,315 1140,175" fill="none" stroke={isNightMode ? "#1e293b" : "#64748b"} strokeWidth="1.5" opacity="0.5" />
        </svg>

        {/* Floating Interactive Badge Overlays */}
        {activeFloor === 'bengal' && (
          <div className="absolute top-4 left-4 right-4 sm:right-auto sm:max-w-md p-4 rounded-xl bg-slate-950/90 backdrop-blur-md border border-emerald-500/40 shadow-2xl text-left animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                  <Monitor className="w-5 h-5" />
                </span>
                <div>
                  <h4 className="font-bold text-white text-sm sm:text-base leading-tight">
                    বেঙ্গল কম্পিউটার ট্রেনিং ইনস্টিটিউট
                  </h4>
                  <p className="text-[11px] text-emerald-400 font-medium">
                    আজিজুর রহমান সুপার মার্কেট (১ম তলা, জনতা ব্যাংক ভবন)
                  </p>
                </div>
              </div>
              <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                BTEB কোড ২৭১১৭
              </span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-slate-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>১ জন ১টি কম্পিউটার গ্যারান্টি</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>এআই ও প্র্যাকটিক্যাল ল্যাব</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>মাল্টিমিডিয়া প্রজেক্টর রুম</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>সার্বক্ষণিক বিদ্যুৎ ও ওয়াইফাই</span>
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between gap-2">
              <a
                href="tel:01782824582"
                className="flex items-center gap-1 text-xs text-white hover:text-emerald-300 font-semibold"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                ০১৭৮২-৮২৪৫৮২
              </a>

              {onOpenAdmission && (
                <button
                  onClick={onOpenAdmission}
                  className="px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all"
                >
                  ভর্তি আবেদন করুন
                </button>
              )}
            </div>
          </div>
        )}

        {activeFloor === 'janata' && (
          <div className="absolute top-4 left-4 right-4 sm:right-auto sm:max-w-md p-4 rounded-xl bg-slate-950/90 backdrop-blur-md border border-sky-500/40 shadow-2xl text-left animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-sky-500/20 text-sky-400">
                  <Building2 className="w-5 h-5" />
                </span>
                <div>
                  <h4 className="font-bold text-white text-sm sm:text-base leading-tight">
                    জনতা ব্যাংক লিমিটেড (সিঙ্গার মোড় শাখা)
                  </h4>
                  <p className="text-[11px] text-sky-400 font-medium">
                    গ্রাউন্ড ফ্লোর ও ভবনের প্রধান ল্যান্ডমার্ক
                  </p>
                </div>
              </div>
              <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
                ল্যান্ডমার্ক গাইড
              </span>
            </div>

            <p className="mt-2 text-xs text-slate-300 leading-relaxed">
              কুষ্টিয়ার যে কোনো প্রান্ত থেকে সিঙ্গার মোড়ে এসে জনতা ব্যাংকের সম্মুখ সিঁড়ি দিয়ে সরাসরি ১ম তলায় বেঙ্গল ইনস্টিটিউটের শীতাতপ নিয়ন্ত্রিত আধুনিক ল্যাবে পৌঁছানো যাবে।
            </p>

            <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-1">
                <Navigation className="w-3.5 h-3.5 text-sky-400" />
                এন এস রোড, সিঙ্গার মোড় মোড়
              </span>
              <button
                onClick={() => setActiveFloor('bengal')}
                className="px-3 py-1 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs transition-all"
              >
                ১ম তলা একাডেমি দেখুন ↑
              </button>
            </div>
          </div>
        )}

        {/* Bottom Interactive Floor Switcher Buttons */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 p-1.5 rounded-xl bg-slate-950/90 backdrop-blur-md border border-slate-700/80 shadow-xl z-10">
          <button
            onClick={() => setActiveFloor('bengal')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeFloor === 'bengal'
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>১ম তলা: বেঙ্গল ইনস্টিটিউট (কম্পিউটার ল্যাব)</span>
          </button>

          <button
            onClick={() => setActiveFloor('janata')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeFloor === 'janata'
                ? 'bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>নিচতলা: জনতা ব্যাংক ভবন</span>
          </button>
        </div>
      </div>

      {/* Building Bottom Details Ribbon mirroring the real banner */}
      <div className="p-4 bg-slate-950 border-t border-slate-800">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col items-center justify-center">
            <span className="text-emerald-400 font-black text-lg">২০১৬ সাল</span>
            <span className="text-[11px] text-slate-400">থেকে বিশ্বস্ত প্রতিষ্ঠান</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col items-center justify-center">
            <span className="text-sky-400 font-black text-lg">২৭১১৭</span>
            <span className="text-[11px] text-slate-400">BTEB সরকারি কোড</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col items-center justify-center">
            <span className="text-amber-400 font-black text-lg">১ জন ১টি পিসি</span>
            <span className="text-[11px] text-slate-400">১০০% প্র্যাকটিক্যাল প্রশিক্ষণ</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col items-center justify-center">
            <span className="text-purple-400 font-black text-lg">৫,০০০+</span>
            <span className="text-[11px] text-slate-400">সফল সনদপ্রাপ্ত শিক্ষার্থী</span>
          </div>
        </div>

        {/* Course icon highlights from original banner */}
        <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-around gap-2 text-xs text-slate-300">
          <span className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
            <Monitor className="w-3.5 h-3.5 text-emerald-400" />
            <span>অফিস অ্যাপ্লিকেশন</span>
          </span>
          <span className="text-slate-700">·</span>
          <span className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
            <span>আর্টিফিশিয়াল ইন্টেলিজেন্স (AI)</span>
          </span>
          <span className="text-slate-700">·</span>
          <span className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
            <Languages className="w-3.5 h-3.5 text-emerald-400" />
            <span>স্পোকেন ইংলিশ</span>
          </span>
          <span className="text-slate-700">·</span>
          <span className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>সাইবার সিকিউরিটি ও আইসিটি</span>
          </span>
          <span className="text-slate-700">·</span>
          <span className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>কিডস কম্পিউটার ও কোডিং</span>
          </span>
        </div>
      </div>
    </div>
  );
};
