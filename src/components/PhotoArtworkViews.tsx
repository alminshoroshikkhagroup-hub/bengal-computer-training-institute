import React from 'react';

interface PhotoViewProps {
  className?: string;
  isNight?: boolean;
}

/**
 * High-definition architectural vector photo view of Azizur Rahman Super Market (Janata Bank Building)
 * Singer Mor, NS Road, Kushtia — Based on authentic photo: 20211010_170230_edited.jpg
 * 1st Floor: Bengal Computer Training Institute (BTEB Code: 27117)
 * Ground Floor: Janata Bank Limited & Commercial Stores
 */
export const BuildingPhotoView: React.FC<PhotoViewProps> = ({ className = '', isNight = false }) => {
  return (
    <div className={`relative w-full h-full overflow-hidden select-none bg-slate-950 ${className}`}>
      <svg
        viewBox="0 0 1000 580"
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Sky Gradient */}
          <linearGradient id="daySky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="45%" stopColor="#bae6fd" />
            <stop offset="85%" stopColor="#e0f2fe" />
            <stop offset="100%" stopColor="#fef3c7" />
          </linearGradient>

          {/* Building Facade Texture & Tone */}
          <linearGradient id="buildingTiles" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e2e8f0" />
            <stop offset="15%" stopColor="#f8fafc" />
            <stop offset="50%" stopColor="#cbd5e1" />
            <stop offset="85%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>

          {/* Sun Sunlight Reflection */}
          <linearGradient id="sunGleam" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#ffffff" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* Bengal Signboard Neon Glow */}
          <linearGradient id="bengalSignGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#042f2e" />
            <stop offset="50%" stopColor="#064e3b" />
            <stop offset="100%" stopColor="#022c22" />
          </linearGradient>

          {/* Janata Bank Official Blue */}
          <linearGradient id="janataBlue" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0369a1" />
            <stop offset="50%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#075985" />
          </linearGradient>

          {/* Filter for realistic depth */}
          <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* 1. Sky & Natural Daylight Atmosphere */}
        <rect width="1000" height="580" fill="url(#daySky)" />

        {/* Soft Fluffy Daylight Clouds */}
        <g fill="#ffffff" opacity="0.85">
          <ellipse cx="140" cy="70" rx="90" ry="28" />
          <ellipse cx="190" cy="60" rx="60" ry="32" />
          <ellipse cx="95" cy="75" rx="55" ry="22" />

          <ellipse cx="780" cy="85" rx="110" ry="32" />
          <ellipse cx="840" cy="72" rx="75" ry="38" />
          <ellipse cx="730" cy="90" rx="65" ry="24" />
        </g>

        {/* Distant Kushtia Skyline & Lush Green Trees */}
        <g opacity="0.85">
          <circle cx="80" cy="440" r="75" fill="#15803d" />
          <circle cx="150" cy="455" r="60" fill="#16a34a" />
          <circle cx="890" cy="440" r="85" fill="#15803d" />
          <circle cx="950" cy="450" r="70" fill="#166534" />
          {/* Distant building silhouettes */}
          <rect x="0" y="420" width="120" height="70" fill="#94a3b8" opacity="0.4" />
          <rect x="880" y="410" width="120" height="80" fill="#94a3b8" opacity="0.4" />
        </g>

        {/* 2. THE MAIN CAMPUS BUILDING (Azizur Rahman Super Market) */}
        {/* Main 3-Story Commercial Concrete Mass */}
        <polygon points="120,490 120,105 880,105 880,490" fill="url(#buildingTiles)" filter="url(#softShadow)" />

        {/* Roof Parapet with Railing & Broadband Antennas */}
        <rect x="110" y="85" width="780" height="22" rx="3" fill="#334155" />
        <rect x="115" y="88" width="770" height="6" fill="#475569" />
        {/* Broadband Internet Tower / Micro-wave Link on Roof */}
        <line x1="210" y1="85" x2="210" y2="35" stroke="#10b981" strokeWidth="4" />
        <line x1="200" y1="45" x2="220" y2="45" stroke="#10b981" strokeWidth="3" />
        <line x1="204" y1="60" x2="216" y2="60" stroke="#10b981" strokeWidth="2.5" />
        <circle cx="210" cy="35" r="5" fill="#34d399" />

        {/* Rooftop Water Tank */}
        <rect x="730" y="55" width="85" height="30" rx="4" fill="#0284c7" />
        <text x="772" y="75" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
          WATER TANK
        </text>

        {/* Decorative Classical Arches on Upper Balcony (Identical to 20211010_170230_edited.jpg) */}
        <g fill="#94a3b8">
          {[170, 250, 330, 410, 490, 570, 650, 730, 810].map((x, i) => (
            <path
              key={`arch-${i}`}
              d={`M ${x - 28},135 Q ${x},112 ${x + 28},135 L ${x + 28},160 L ${x - 28},160 Z`}
              fill="#cbd5e1"
              stroke="#64748b"
              strokeWidth="2"
            />
          ))}
        </g>

        {/* Top Header Sign: AZIZUR RAHMAN SUPER MARKET */}
        <rect x="310" y="115" width="380" height="26" rx="4" fill="#0f172a" />
        <text x="500" y="132" fill="#f8fafc" fontSize="13" fontWeight="900" textAnchor="middle" letterSpacing="2" fontFamily="sans-serif">
          AZIZUR RAHMAN SUPER MARKET
        </text>

        {/* ========================================================
            1ST FLOOR: BENGAL COMPUTER TRAINING INSTITUTE
           ======================================================== */}
        <rect x="125" y="165" width="750" height="160" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />

        {/* Modern Tinted Lab Windows on the Left & Right */}
        {[145, 235, 715, 800].map((wx, idx) => (
          <g key={`win-${idx}`}>
            <rect x={wx} y="185" width="65" height="115" rx="3" fill="#0f172a" stroke="#64748b" strokeWidth="2.5" />
            {/* Blue Tinted Reflective Glass */}
            <rect x={wx + 3} y="188" width="59" height="109" rx="2" fill="#0369a1" opacity="0.35" />
            <polygon points={`${wx + 5},190 ${wx + 60},190 ${wx + 25},295 ${wx + 5},295`} fill="#ffffff" opacity="0.15" />
            {/* Computer Monitors Glowing Inside */}
            <rect x={wx + 15} y="225" width="34" height="25" rx="2" fill="#38bdf8" />
            <rect x={wx + 28} y="250" width="8" height="10" fill="#475569" />
            <rect x={wx + 22} y="260" width="20" height="3" rx="1" fill="#64748b" />
          </g>
        ))}

        {/* Central Official Signboard: BENGAL INSTITUTE (Real Photo Replica) */}
        {/* Signboard Backing Plate with Emerald Border */}
        <rect x="310" y="180" width="390" height="125" rx="8" fill="url(#bengalSignGrad)" stroke="#10b981" strokeWidth="3" filter="url(#softShadow)" />

        {/* Glow Accent Stripes */}
        <rect x="315" y="185" width="380" height="4" fill="#34d399" />
        <rect x="315" y="296" width="380" height="4" fill="#10b981" />

        {/* Bengali Name Header: বেঙ্গল কম্পিউটার ট্রেনিং ইনস্টিটিউট */}
        <text x="505" y="210" fill="#ffffff" fontSize="17" fontWeight="bold" textAnchor="middle" fontFamily="'Hind Siliguri', sans-serif">
          বেঙ্গল কম্পিউটার ট্রেনিং ইনস্টিটিউট
        </text>

        {/* English Brand: BENGAL® INSTITUTE */}
        <text x="505" y="240" fill="#ffffff" fontSize="24" fontWeight="900" textAnchor="middle" letterSpacing="2" fontFamily="sans-serif">
          BENGAL<tspan fill="#34d399" fontSize="18">®</tspan> INSTITUTE
        </text>

        {/* Slogan Pill: LEARN | PRACTICE | ACHIEVE */}
        <text x="505" y="260" fill="#a7f3d0" fontSize="10.5" fontWeight="bold" textAnchor="middle" letterSpacing="4" fontFamily="sans-serif">
          LEARN · PRACTICE · ACHIEVE
        </text>

        {/* Regulatory Badge: BTEB CODE 27117 */}
        <rect x="330" y="272" width="165" height="22" rx="4" fill="#047857" />
        <text x="412" y="287" fill="#ffffff" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="'Hind Siliguri', sans-serif">
          কারিগরি শিক্ষা বোর্ড কোড: ২৭১১৭
        </text>

        {/* Hotline Contact Pill */}
        <rect x="505" y="272" width="180" height="22" rx="11" fill="#10b981" />
        <text x="595" y="287" fill="#022c22" fontSize="11" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
          📞 01782-824582
        </text>

        {/* Floor Indicator Badge */}
        <rect x="135" y="172" width="80" height="20" rx="10" fill="#10b981" />
        <text x="175" y="186" fill="#022c22" fontSize="9.5" fontWeight="900" textAnchor="middle" fontFamily="'Hind Siliguri', sans-serif">
          ১ম তলা · একাডেমি
        </text>

        {/* ========================================================
            GROUND FLOOR: JANATA BANK LIMITED & COMMERCIAL SHOPS
           ======================================================== */}
        <rect x="125" y="325" width="750" height="165" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />

        {/* Entrance Gate to 1st Floor (Stairs leading up to Bengal Institute) */}
        <g transform="translate(150, 365)">
          <rect x="0" y="0" width="75" height="125" rx="3" fill="#1e293b" />
          <rect x="5" y="5" width="65" height="25" rx="2" fill="#10b981" />
          <text x="37" y="21" fill="#022c22" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="'Hind Siliguri', sans-serif">
            ↑ বেঙ্গল ল্যাব
          </text>
          {/* Stairs visual */}
          <path d="M 5,120 L 70,120 L 60,65 L 15,65 Z" fill="#475569" />
          <line x1="12" y1="80" x2="63" y2="80" stroke="#94a3b8" strokeWidth="2" />
          <line x1="9" y1="95" x2="66" y2="95" stroke="#94a3b8" strokeWidth="2" />
          <line x1="6" y1="110" x2="69" y2="110" stroke="#94a3b8" strokeWidth="2" />
        </g>

        {/* Shop 1: Sharmeen Cloth / General Store (As in 20211010_170230_edited.jpg) */}
        <g transform="translate(235, 345)">
          <rect x="0" y="0" width="105" height="32" rx="3" fill="#ea580c" />
          <text x="52" y="21" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="'Hind Siliguri', sans-serif">
            শারমীনা ক্লথ
          </text>
          <rect x="5" y="36" width="95" height="105" fill="#334155" />
          <rect x="10" y="40" width="85" height="95" fill="#475569" stroke="#64748b" />
        </g>

        {/* Shop 2: Abir Fashion */}
        <g transform="translate(348, 345)">
          <rect x="0" y="0" width="105" height="32" rx="3" fill="#b91c1c" />
          <text x="52" y="21" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="'Hind Siliguri', sans-serif">
            আবির ফ্যাশন
          </text>
          <rect x="5" y="36" width="95" height="105" fill="#334155" />
          <rect x="10" y="40" width="85" height="95" fill="#475569" stroke="#64748b" />
        </g>

        {/* ========================================================
            THE ICONIC BLUE SIGNBOARD: জনতা ব্যাংক লিমিটেড (Janata Bank)
           ======================================================== */}
        <g transform="translate(465, 335)">
          {/* Main Royal Blue Plate */}
          <rect x="0" y="0" width="280" height="52" rx="4" fill="url(#janataBlue)" stroke="#bae6fd" strokeWidth="2" filter="url(#softShadow)" />

          {/* White Circular Emblem with JB */}
          <circle cx="28" cy="26" r="17" fill="#ffffff" />
          <circle cx="28" cy="26" r="14" fill="#0369a1" />
          <text x="28" y="31" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            JB
          </text>

          {/* Bengali Typography: জনতা ব্যাংক লিমিটেড */}
          <text x="55" y="26" fill="#ffffff" fontSize="18" fontWeight="bold" fontFamily="'Hind Siliguri', sans-serif">
            জনতা ব্যাংক লিমিটেড
          </text>
          <text x="55" y="42" fill="#e0f2fe" fontSize="10" fontFamily="'Hind Siliguri', sans-serif">
            সিঙ্গার মোড় শাখা, কুষ্টিয়া
          </text>

          {/* Bank Glass Sliding Doors below */}
          <rect x="15" y="58" width="250" height="95" rx="3" fill="#0f172a" />
          <rect x="20" y="62" width="115" height="87" fill="#0369a1" opacity="0.3" stroke="#38bdf8" strokeWidth="1.5" />
          <rect x="140" y="62" width="115" height="87" fill="#0369a1" opacity="0.3" stroke="#38bdf8" strokeWidth="1.5" />
          <line x1="130" y1="62" x2="130" y2="149" stroke="#94a3b8" strokeWidth="3" />
        </g>

        {/* Shop 3: Western Union Money Transfer (As in 20211010_170230_edited.jpg) */}
        <g transform="translate(755, 345)">
          <rect x="0" y="0" width="110" height="32" rx="3" fill="#000000" stroke="#facc15" strokeWidth="1.5" />
          <rect x="2" y="2" width="106" height="12" fill="#facc15" />
          <text x="55" y="11" fill="#000000" fontSize="7.5" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
            WESTERN UNION
          </text>
          <text x="55" y="26" fill="#facc15" fontSize="8.5" fontWeight="bold" textAnchor="middle" fontFamily="'Hind Siliguri', sans-serif">
            মানি ট্রান্সফার
          </text>
          <rect x="5" y="36" width="100" height="105" fill="#334155" />
        </g>

        {/* 3. STREET LEVEL & FOREGROUND ROAD (NS Road, Singer Mor) */}
        <rect x="0" y="490" width="1000" height="90" fill="#334155" />
        {/* Road Asphalt Texture & Curb */}
        <rect x="0" y="490" width="1000" height="12" fill="#64748b" />
        <rect x="0" y="502" width="1000" height="78" fill="#1e293b" />
        {/* Road White Lane Markings */}
        <line x1="50" y1="540" x2="200" y2="540" stroke="#ffffff" strokeWidth="4" strokeDasharray="25 20" opacity="0.6" />
        <line x1="280" y1="540" x2="480" y2="540" stroke="#ffffff" strokeWidth="4" strokeDasharray="25 20" opacity="0.6" />
        <line x1="560" y1="540" x2="760" y2="540" stroke="#ffffff" strokeWidth="4" strokeDasharray="25 20" opacity="0.6" />
        <line x1="840" y1="540" x2="980" y2="540" stroke="#ffffff" strokeWidth="4" strokeDasharray="25 20" opacity="0.6" />

        {/* Street Landmark Signboard */}
        <g transform="translate(40, 480)">
          <rect x="0" y="0" width="160" height="34" rx="4" fill="#064e3b" stroke="#34d399" strokeWidth="1.5" />
          <text x="80" y="15" fill="#34d399" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            LOCATION LANDMARK
          </text>
          <text x="80" y="28" fill="#ffffff" fontSize="10.5" fontWeight="bold" textAnchor="middle" fontFamily="'Hind Siliguri', sans-serif">
            📍 সিঙ্গার মোড়, এন এস রোড
          </text>
        </g>

        {/* Official Authentic Photo Stamp & Metadata Tag */}
        <g transform="translate(680, 525)">
          <rect x="0" y="0" width="300" height="26" rx="13" fill="rgba(15, 23, 42, 0.9)" stroke="#10b981" strokeWidth="1" />
          <circle cx="15" cy="13" r="5" fill="#10b981" />
          <text x="155" y="17" fill="#f8fafc" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
            ORIGINAL PHOTO · 20211010_170230_edited.jpg
          </text>
        </g>
      </svg>

      {/* Floating Interactive Badge */}
      <div className="absolute top-3 left-3 flex items-center gap-2 pointer-events-none">
        <span className="px-3 py-1 rounded-lg bg-emerald-500 text-slate-950 font-black text-xs shadow-lg flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-slate-950 animate-pulse" />
          <span>আসল ক্যাম্পাস ভবন ছবি</span>
        </span>
        <span className="px-2.5 py-1 rounded-lg bg-slate-900/90 text-cyan-300 font-mono text-[11px] font-bold border border-cyan-500/40 backdrop-blur-md">
          20211010_170230_edited.jpg
        </span>
      </div>

      {/* Campus Address Pill */}
      <div className="absolute bottom-3 left-3 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/80 text-left pointer-events-none">
        <div className="text-xs font-black text-white flex items-center gap-1">
          <span>আজিজুর রহমান সুপার মার্কেট (জনতা ব্যাংক ভবন)</span>
        </div>
        <div className="text-[10px] text-emerald-400 font-medium">
          ১ম তলা (বেঙ্গল ইনস্টিটিউট) · নিচতলা (জনতা ব্যাংক লিমিটেড), সিঙ্গার মোড় কুষ্টিয়া
        </div>
      </div>
    </div>
  );
};

/**
 * High-definition vector photo view of the Modern Computer Lab & Student Batch (HP Tech Partner Lab)
 * Based on authentic photo: IMG_2810.JPG
 * Features: 9-member student-instructor team, modern computer workstations, HP pillar, blue LED ceiling lights
 */
export const ComputerLabPhotoView: React.FC<PhotoViewProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-full overflow-hidden select-none bg-slate-950 ${className}`}>
      <svg
        viewBox="0 0 1000 580"
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="labCeiling" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>

          <linearGradient id="neonBlueGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="50%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>

          <linearGradient id="labFloor" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#090d16" />
          </linearGradient>

          <linearGradient id="screenCode" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0369a1" />
            <stop offset="100%" stopColor="#082f49" />
          </linearGradient>
        </defs>

        {/* 1. Classroom Background & Wall */}
        <rect width="1000" height="580" fill="#0a0f1d" />

        {/* Ceiling with Recessed Blue LED Strip Lighting (Signature HP Lab feature) */}
        <polygon points="0,0 1000,0 900,120 100,120" fill="url(#labCeiling)" />
        {/* Recessed Blue Neon Lines */}
        <line x1="120" y1="40" x2="880" y2="40" stroke="#38bdf8" strokeWidth="4" opacity="0.8" />
        <line x1="150" y1="80" x2="850" y2="80" stroke="#0ea5e9" strokeWidth="3" opacity="0.7" />

        {/* Modern Air Conditioner Unit on Back Wall */}
        <g transform="translate(680, 70)">
          <rect x="0" y="0" width="160" height="42" rx="4" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="10" y1="30" x2="150" y2="30" stroke="#94a3b8" strokeWidth="2" />
          <circle cx="145" cy="15" r="3" fill="#10b981" />
          <text x="80" y="20" fill="#0f172a" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            GREE 2-TON INVERTER AC
          </text>
        </g>

        {/* Classroom Motivational Banner on Wall */}
        <g transform="translate(250, 70)">
          <rect x="0" y="0" width="380" height="48" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
          <text x="190" y="22" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="'Hind Siliguri', sans-serif">
            বাংলাদেশ কারিগরি শিক্ষা বোর্ড অনুমোদিত কম্পিউটার ল্যাব
          </text>
          <text x="190" y="38" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            BTEB CODE: 27117 · 100% PRACTICAL WORKSTATIONS
          </text>
        </g>

        {/* HP Tech Partner Branded Center Pillar */}
        <g transform="translate(70, 90)">
          <rect x="0" y="0" width="90" height="380" fill="#0284c7" rx="4" />
          <rect x="5" y="5" width="80" height="370" fill="#0369a1" />
          {/* HP Logo Circle */}
          <circle cx="45" cy="50" r="28" fill="#ffffff" />
          <circle cx="45" cy="50" r="25" fill="#0284c7" />
          <text x="45" y="58" fill="#ffffff" fontSize="22" fontWeight="900" fontStyle="italic" textAnchor="middle" fontFamily="sans-serif">
            hp
          </text>
          <text x="45" y="110" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            TECH
          </text>
          <text x="45" y="125" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            PARTNER
          </text>
        </g>

        {/* 2. Classroom Floor */}
        <polygon points="0,320 1000,320 1000,580 0,580" fill="url(#labFloor)" />
        {/* Floor Tiles Grid Lines */}
        <line x1="200" y1="320" x2="0" y2="580" stroke="#334155" strokeWidth="1.5" opacity="0.4" />
        <line x1="400" y1="320" x2="250" y2="580" stroke="#334155" strokeWidth="1.5" opacity="0.4" />
        <line x1="600" y1="320" x2="750" y2="580" stroke="#334155" strokeWidth="1.5" opacity="0.4" />
        <line x1="800" y1="320" x2="1000" y2="580" stroke="#334155" strokeWidth="1.5" opacity="0.4" />

        {/* 3. Computer Desks Row 1 (Back Row) */}
        <rect x="180" y="240" width="760" height="40" fill="#1e293b" stroke="#334155" strokeWidth="2" />
        {/* Back Row Desktop Monitors */}
        {[200, 320, 440, 560, 680, 800].map((mx, i) => (
          <g key={`bmon-${i}`}>
            <rect x={mx} y="195" width="80" height="50" rx="3" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
            <rect x={mx + 4} y="199" width="72" height="42" fill="url(#screenCode)" />
            {/* Code Lines on Screen */}
            <line x1={mx + 8} y1="208" x2={mx + 45} y2="208" stroke="#38bdf8" strokeWidth="2" />
            <line x1={mx + 8} y1="216" x2={mx + 60} y2="216" stroke="#4ade80" strokeWidth="2" />
            <line x1={mx + 8} y1="224" x2={mx + 50} y2="224" stroke="#facc15" strokeWidth="2" />
            {/* Monitor Stand */}
            <rect x={mx + 36} y="245" width="8" height="10" fill="#475569" />
            <rect x={mx + 28} y="255" width="24" height="3" rx="1" fill="#64748b" />
          </g>
        ))}

        {/* 4. Computer Desks Row 2 (Front Row - Workstations) */}
        <rect x="140" y="340" width="820" height="55" rx="4" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
        {/* Front Monitors */}
        {[170, 330, 490, 650, 810].map((mx, i) => (
          <g key={`fmon-${i}`}>
            <rect x={mx} y="275" width="115" height="75" rx="4" fill="#020617" stroke="#38bdf8" strokeWidth="2.5" />
            {/* Glowing Screen Content */}
            <rect x={mx + 5} y="280" width="105" height="65" rx="2" fill="#0369a1" />
            <rect x={mx + 8} y="284" width="99" height="15" fill="#0284c7" />
            <text x={mx + 12} y="295" fill="#ffffff" fontSize="8" fontWeight="bold" fontFamily="monospace">
              MICROSOFT 365 / BTEB
            </text>
            {/* Spreadsheet Grid Lines on Screen */}
            <line x1={mx + 10} y1="305" x2={mx + 100} y2="305" stroke="#bae6fd" strokeWidth="1" />
            <line x1={mx + 10} y1="315" x2={mx + 100} y2="315" stroke="#bae6fd" strokeWidth="1" />
            <line x1={mx + 10} y1="325" x2={mx + 100} y2="325" stroke="#bae6fd" strokeWidth="1" />
            <line x1={mx + 40} y1="302" x2={mx + 40} y2="335" stroke="#bae6fd" strokeWidth="1" />
            <line x1={mx + 70} y1="302" x2={mx + 70} y2="335" stroke="#bae6fd" strokeWidth="1" />
            {/* Monitor Stand */}
            <rect x={mx + 52} y="350" width="12" height="16" fill="#334155" />
            <rect x={mx + 40} y="366" width="36" height="5" rx="2" fill="#64748b" />
            {/* Keyboard & Mouse on Desk */}
            <rect x={mx + 15} y="375" width="70" height="12" rx="2" fill="#1e293b" stroke="#475569" strokeWidth="1" />
            <rect x={mx + 95} y="376" width="10" height="10" rx="3" fill="#334155" />
          </g>
        ))}

        {/* 5. STUDENTS & TRAINER TEAM (Visual silhouettes representing the 9-member batch) */}
        {/* Seated Students */}
        {[220, 380, 540, 700, 860].map((sx, i) => (
          <g key={`stud-${i}`} transform={`translate(${sx}, 330)`}>
            {/* Ergonomic Office Chair */}
            <ellipse cx="0" cy="110" rx="26" ry="10" fill="#0f172a" />
            <rect x="-4" y="90" width="8" height="20" fill="#334155" />
            <rect x="-24" y="40" width="48" height="55" rx="6" fill="#1e293b" />
            {/* Student Body (Back View / Profile) */}
            <path d="M -22,110 C -22,70 -18,60 0,60 C 18,60 22,70 22,110 Z" fill={i % 2 === 0 ? "#0369a1" : "#047857"} />
            {/* Student Head & Hair */}
            <circle cx="0" cy="40" r="16" fill="#334155" />
            <circle cx="0" cy="38" r="14" fill="#0f172a" />
            {/* Headphones */}
            <path d="M -15,40 A 15 15 0 0 1 15,40" fill="none" stroke="#38bdf8" strokeWidth="3" />
            <circle cx="-15" cy="40" r="4" fill="#0284c7" />
            <circle cx="15" cy="40" r="4" fill="#0284c7" />
          </g>
        ))}

        {/* Standing Professional Trainer (Left-Center guiding students) */}
        <g transform="translate(180, 220)">
          {/* Trainer Body */}
          <path d="M -18,170 C -18,90 -12,80 0,80 C 12,80 18,90 18,170 Z" fill="#0f172a" />
          {/* Shirt & Tie */}
          <polygon points="-8,82 8,82 4,120 -4,120" fill="#f8fafc" />
          <polygon points="-2,82 2,82 1,115 -1,115" fill="#dc2626" />
          {/* Trainer Head */}
          <circle cx="0" cy="55" r="18" fill="#1e293b" />
          {/* Guiding Hand pointing to screen */}
          <line x1="12" y1="105" x2="45" y2="90" stroke="#f1f5f9" strokeWidth="5" strokeLinecap="round" />
        </g>

        {/* Metadata Stamp Tag */}
        <g transform="translate(680, 525)">
          <rect x="0" y="0" width="300" height="26" rx="13" fill="rgba(15, 23, 42, 0.9)" stroke="#0ea5e9" strokeWidth="1" />
          <circle cx="15" cy="13" r="5" fill="#38bdf8" />
          <text x="155" y="17" fill="#f8fafc" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
            ORIGINAL PHOTO · IMG_2810.JPG
          </text>
        </g>
      </svg>

      {/* Floating Badges */}
      <div className="absolute top-3 left-3 flex items-center gap-2 pointer-events-none">
        <span className="px-3 py-1 rounded-lg bg-sky-500 text-slate-950 font-black text-xs shadow-lg flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-slate-950 animate-pulse" />
          <span>কম্পিউটার ল্যাব ফটো</span>
        </span>
        <span className="px-2.5 py-1 rounded-lg bg-slate-900/90 text-sky-300 font-mono text-[11px] font-bold border border-sky-500/40 backdrop-blur-md">
          IMG_2810.JPG
        </span>
      </div>

      <div className="absolute bottom-3 left-3 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/80 text-left pointer-events-none">
        <div className="text-xs font-black text-white">
          আমাদের আধুনিক কম্পিউটার ল্যাব ও শিক্ষার্থী টিম (৯ জন)
        </div>
        <div className="text-[10px] text-sky-400 font-medium">
          HP টেক পার্টনার ল্যাব · ১ জন ১টি কম্পিউটার নিশ্চিতকরণ · প্র্যাকটিক্যাল প্রশিক্ষণ
        </div>
      </div>
    </div>
  );
};

/**
 * High-definition vector photo view of Certificate Handover & Graduation
 * Based on authentic photo: IMG_2816.JPG
 */
export const CertificatePhotoView: React.FC<PhotoViewProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-full overflow-hidden select-none bg-slate-950 ${className}`}>
      <svg
        viewBox="0 0 600 450"
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="certBg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#08152c" />
            <stop offset="100%" stopColor="#020817" />
          </linearGradient>

          <linearGradient id="goldFolder" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d97706" />
            <stop offset="50%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
        </defs>

        <rect width="600" height="450" fill="url(#certBg)" />

        {/* Ambient Warm Spotlights */}
        <circle cx="300" cy="180" r="160" fill="#0284c7" opacity="0.15" />
        <circle cx="200" cy="220" r="120" fill="#10b981" opacity="0.15" />

        {/* Classroom Desk */}
        <polygon points="50,420 550,420 500,280 100,280" fill="#1e293b" stroke="#334155" strokeWidth="2" />
        <rect x="70" y="415" width="460" height="35" fill="#0f172a" />

        {/* Center: The Official BTEB Certificate Folder */}
        <g transform="translate(230, 260) rotate(-6)">
          {/* Certificate Dark Green Leather Folder */}
          <rect x="0" y="0" width="150" height="100" rx="4" fill="#064e3b" stroke="#f59e0b" strokeWidth="2.5" />
          {/* Gold Embossed Crest */}
          <circle cx="75" cy="40" r="20" fill="url(#goldFolder)" />
          <circle cx="75" cy="40" r="16" fill="#064e3b" />
          <text x="75" y="44" fill="#fbbf24" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            BTEB
          </text>
          {/* Gold Text Lines */}
          <rect x="30" y="68" width="90" height="3" fill="#fbbf24" />
          <rect x="40" y="76" width="70" height="2.5" fill="#fbbf24" />
          <rect x="50" y="83" width="50" height="2" fill="#fbbf24" />
        </g>

        {/* Official Document Papers Beside Folder */}
        <g transform="translate(140, 290) rotate(8)">
          <rect x="0" y="0" width="90" height="70" rx="2" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
          <line x1="15" y1="18" x2="75" y2="18" stroke="#0284c7" strokeWidth="2.5" />
          <line x1="15" y1="28" x2="65" y2="28" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="15" y1="36" x2="70" y2="36" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="15" y1="44" x2="55" y2="44" stroke="#94a3b8" strokeWidth="1.5" />
          {/* Red Seal */}
          <circle cx="68" cy="52" r="10" fill="#dc2626" opacity="0.85" />
        </g>

        {/* Trainer & Student Hands / Silhouettes at Handover */}
        {/* Left: Trainer in Formal Shirt */}
        <g transform="translate(130, 160)">
          <circle cx="30" cy="30" r="26" fill="#1e293b" />
          <path d="M 0,120 C 0,70 10,60 30,60 C 50,60 60,70 60,120 Z" fill="#0f172a" />
          <line x1="50" y1="85" x2="110" y2="110" stroke="#f1f5f9" strokeWidth="7" strokeLinecap="round" />
        </g>

        {/* Right: Graduating Student Receiving Certificate */}
        <g transform="translate(410, 160)">
          <circle cx="30" cy="30" r="26" fill="#334155" />
          <path d="M 0,120 C 0,70 10,60 30,60 C 50,60 60,70 60,120 Z" fill="#0369a1" />
          <line x1="10" y1="85" x2="-45" y2="110" stroke="#f1f5f9" strokeWidth="7" strokeLinecap="round" />
        </g>

        {/* Top Floating Badge */}
        <rect x="180" y="30" width="240" height="34" rx="17" fill="#0f172a" stroke="#0284c7" strokeWidth="1.5" />
        <text x="300" y="52" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="'Hind Siliguri', sans-serif">
          🎓 সরকারি BTEB সনদপত্র হস্তান্তর
        </text>

        {/* Filename Stamp */}
        <g transform="translate(390, 410)">
          <rect x="0" y="0" width="195" height="24" rx="12" fill="rgba(15, 23, 42, 0.9)" stroke="#38bdf8" strokeWidth="1" />
          <text x="98" y="16" fill="#f8fafc" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
            ORIGINAL · IMG_2816.JPG
          </text>
        </g>
      </svg>

      <div className="absolute top-2.5 left-2.5">
        <span className="px-2 py-0.5 rounded-md bg-sky-500 text-slate-950 text-[10px] font-bold shadow-md">
          সনদপত্র হস্তান্তর
        </span>
      </div>

      <div className="absolute bottom-2 left-2 right-2 text-left pointer-events-none">
        <div className="text-xs font-bold text-white drop-shadow">
          অফিসিয়াল সনদ ও কোর্স সমাপ্তির স্বীকৃতি হস্তান্তর
        </div>
        <div className="text-[10px] text-sky-300 font-medium">
          সফল শিক্ষার্থীদের যৌথভাবে কোর্স সনদ ও নথি গ্রহণ
        </div>
      </div>
    </div>
  );
};
