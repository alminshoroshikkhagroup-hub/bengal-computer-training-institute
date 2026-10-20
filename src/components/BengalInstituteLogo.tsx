import React from 'react';

interface BengalInstituteLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const BengalInstituteLogo: React.FC<BengalInstituteLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
}) => {
  const sizeMap: Record<string, string> = {
    xs: 'h-8 w-auto',
    sm: 'h-10 w-auto',
    md: 'h-12 w-auto',
    lg: 'h-16 w-auto',
    xl: 'h-24 w-auto',
  };

  const currentHeight = sizeMap[size] || sizeMap.md;

  return (
    <div
      className={`inline-flex items-center shrink-0 select-none group transition-transform duration-200 hover:scale-105 ${className}`}
      title="BENGAL® INSTITUTE"
    >
      {/* 
        Official Bengal Institute Logo (Background Removed)
        Reference: IMG_E1887_edited.png
        - Transparent Background
        - Electric Neon Green Double Frame
        - Bold White BENGAL® & INSTITUTE Typography
      */}
      <svg
        viewBox="0 0 460 300"
        className={`${currentHeight} w-auto drop-shadow-[0_0_12px_rgba(0,255,0,0.45)]`}
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Vivid Neon Green Glow Filter for the Frame */}
          <filter id="bengalNeonGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Outer Neon Green Frame (Left, Top, Bottom) */}
        {/* Frame starts from top-right (235, 55), goes left to (50, 55), down to (50, 245), right to (235, 245) */}
        <path
          d="M 235,55 L 50,55 L 50,245 L 235,245"
          fill="none"
          stroke="#00ff00"
          strokeWidth="6"
          strokeLinecap="square"
          strokeLinejoin="miter"
          filter="url(#bengalNeonGlow)"
        />

        {/* 2. Inner Parallel Neon Green Frame (Offset slightly down and right) */}
        {/* Starts at (252, 78), goes left to (68, 78), down to (68, 268), right to (252, 268) */}
        <path
          d="M 252,78 L 68,78 L 68,268 L 252,268"
          fill="none"
          stroke="#00ff00"
          strokeWidth="6"
          strokeLinecap="square"
          strokeLinejoin="miter"
          filter="url(#bengalNeonGlow)"
        />

        {/* 3. Typography (Solid Crisp White, Pure Transparent Background) */}
        {showText && (
          <g fill="#ffffff">
            {/* Top Line: BENGAL */}
            <text
              x="92"
              y="146"
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Outfit', 'Montserrat', sans-serif"
              fontWeight="900"
              fontSize="66"
              letterSpacing="3"
              style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.6))' }}
            >
              BENGAL
            </text>

            {/* Registered Trademark ® Icon */}
            <g transform="translate(415, 128)">
              <circle
                cx="0"
                cy="0"
                r="13"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2.8"
              />
              <text
                x="0"
                y="5"
                fill="#ffffff"
                fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
                fontWeight="900"
                fontSize="14"
                textAnchor="middle"
              >
                R
              </text>
            </g>

            {/* Bottom Line: INSTITUTE */}
            <text
              x="92"
              y="204"
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Outfit', 'Montserrat', sans-serif"
              fontWeight="900"
              fontSize="58"
              letterSpacing="3"
              style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.6))' }}
            >
              INSTITUTE
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};
