import React from 'react';

interface GovRegLogoProps {
  className?: string;
  title?: string;
}

export const GovRegLogo: React.FC<GovRegLogoProps> = ({
  className = 'h-11 w-11',
  title = 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার অনুমোদিত - কারিগরি আইসিটি বাংলাদেশ (গভঃ রেজি নং- ১৬৫৪৪১)',
}) => {
  // 36 rectangular cog notches around perimeter
  const notches = Array.from({ length: 36 });

  return (
    <div 
      className={`relative inline-flex items-center justify-center shrink-0 select-none group transition-transform duration-200 hover:scale-105 ${className}`}
      title={title}
    >
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full drop-shadow-[0_2px_8px_rgba(185,28,28,0.35)]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Top text arc path */}
          <path
            id="govTopArc"
            d="M 85,250 A 165,165 0 0,1 415,250"
            fill="none"
          />
          {/* Bottom text arc path */}
          <path
            id="govBottomArc"
            d="M 75,250 A 175,175 0 0,0 425,250"
            fill="none"
          />
        </defs>

        {/* 1. Outer Dark Red Ring */}
        <circle cx="250" cy="250" r="242" fill="#991b1b" stroke="#7f1d1d" strokeWidth="4" />

        {/* 2. White Rectangular Notches (Cog / Filmstrip Border) */}
        {notches.map((_, i) => {
          const angle = (360 / 36) * i;
          return (
            <rect
              key={i}
              x="238"
              y="16"
              width="24"
              height="38"
              rx="2"
              fill="#ffffff"
              transform={`rotate(${angle} 250 250)`}
            />
          );
        })}

        {/* 3. Inner White Circle Field */}
        <circle cx="250" cy="250" r="195" fill="#ffffff" stroke="#991b1b" strokeWidth="7" />
        <circle cx="250" cy="250" r="185" fill="none" stroke="#dc2626" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />

        {/* 4. Top Arc Text: গণপ্রজাতন্ত্রী বাংলাদেশ সরকার অনুমোদিত */}
        <text
          fill="#0f172a"
          fontFamily="'Hind Siliguri', 'Noto Sans Bengali', system-ui, sans-serif"
          fontWeight="900"
          fontSize="27"
          letterSpacing="0.8"
        >
          <textPath href="#govTopArc" startOffset="50%" textAnchor="middle">
            গণপ্রজাতন্ত্রী বাংলাদেশ সরকার অনুমোদিত
          </textPath>
        </text>

        {/* Left & Right Decorative Star Florets */}
        <g fill="#991b1b">
          {/* Left Star */}
          <text x="94" y="242" fontSize="24" fontWeight="900" textAnchor="middle">★</text>
          {/* Right Star */}
          <text x="406" y="242" fontSize="24" fontWeight="900" textAnchor="middle">★</text>
        </g>

        {/* 5. Center Registration Number Section (Dark Red) */}
        <g fill="#991b1b" fontFamily="'Hind Siliguri', 'Noto Sans Bengali', system-ui, sans-serif">
          {/* Top Center: গভঃ রেজি নং- */}
          <text
            x="250"
            y="234"
            fontWeight="900"
            fontSize="38"
            textAnchor="middle"
            letterSpacing="0.5"
            style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.15))' }}
          >
            গভঃ রেজি নং-
          </text>
          {/* Bottom Center: ১৬৫৪৪১ */}
          <text
            x="250"
            y="280"
            fontWeight="900"
            fontSize="42"
            textAnchor="middle"
            letterSpacing="2"
            style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.15))' }}
          >
            ১৬৫৪৪১
          </text>
        </g>

        {/* 6. Bottom Arc Text: কারিগরি আইসিটি বাংলাদেশ */}
        <text
          fill="#0f172a"
          fontFamily="'Hind Siliguri', 'Noto Sans Bengali', system-ui, sans-serif"
          fontWeight="900"
          fontSize="36"
          letterSpacing="0.6"
        >
          <textPath href="#govBottomArc" startOffset="50%" textAnchor="middle">
            কারিগরি আইসিটি বাংলাদেশ
          </textPath>
        </text>
      </svg>
    </div>
  );
};
