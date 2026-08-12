import React from 'react';

interface MascotProps {
  expression?: 'idle' | 'happy' | 'focused' | 'cheering' | 'sleeping' | 'gaming';
  className?: string;
  size?: number;
}

export const Mascot: React.FC<MascotProps> = ({
  expression = 'idle',
  className = '',
  size = 120,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-sm transition-all duration-300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Soft blush radial gradient */}
          <radialGradient id="blush-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F7C6CE" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#F7C6CE" stopOpacity="0" />
          </radialGradient>
          {/* Hair gradient */}
          <linearGradient id="hair-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#F2EEEC" />
            <stop offset="100%" stopColor="#E5DFDC" />
          </linearGradient>
          {/* Goggles glass shine */}
          <linearGradient id="goggles-shine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4A4A4A" />
            <stop offset="50%" stopColor="#242424" />
            <stop offset="100%" stopColor="#1A1A1A" />
          </linearGradient>
        </defs>

        {/* Cat Tail doodle (back layer) */}
        <path
          d="M 145 155 C 175 145 180 120 168 105 C 160 95 150 100 155 110 C 160 120 150 135 135 140"
          stroke="#242424"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* School Uniform Body */}
        {/* White Shirt Collar */}
        <path d="M 70 142 L 100 162 L 130 142 L 140 185 L 60 185 Z" fill="#FFFFFF" stroke="#242424" strokeWidth="3" />
        {/* Dark Vest/Jacket Sides */}
        <path d="M 58 148 C 58 148 72 165 72 185 H 60 Z" fill="#242424" />
        <path d="M 142 148 C 142 148 128 165 128 185 H 140 Z" fill="#242424" />

        {/* Red Tie */}
        <path d="M 94 150 L 106 150 L 109 178 L 100 190 L 91 178 Z" fill="#D96B72" stroke="#242424" strokeWidth="2.5" strokeLinejoin="round" />

        {/* Head Base - Face Skin */}
        <path
          d="M 62 82 C 62 58 80 50 100 50 C 120 50 138 58 138 82 C 138 112 122 128 100 128 C 78 128 62 112 62 82 Z"
          fill="#FFF3EB"
          stroke="#242424"
          strokeWidth="3"
        />

        {/* Soft Blush on cheeks */}
        <ellipse cx="76" cy="96" rx="9" ry="5" fill="url(#blush-grad)" />
        <ellipse cx="124" cy="96" rx="9" ry="5" fill="url(#blush-grad)" />

        {/* Cute Eyes depending on expression */}
        {expression === 'sleeping' ? (
          // Closed Zzz eyes
          <>
            <path d="M 74 90 Q 82 96 90 90" stroke="#242424" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path d="M 110 90 Q 118 96 126 90" stroke="#242424" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <text x="145" y="65" fill="#D96B72" fontSize="16" fontWeight="bold" className="animate-bounce">Zzz...</text>
          </>
        ) : expression === 'cheering' || expression === 'happy' ? (
          // Happy arc eyes
          <>
            <path d="M 73 92 Q 81 82 89 92" stroke="#242424" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M 111 92 Q 119 82 127 92" stroke="#242424" strokeWidth="4" strokeLinecap="round" fill="none" />
          </>
        ) : (
          // Large expressively dark anime eyes
          <>
            <ellipse cx="80" cy="90" rx="7.5" ry="9.5" fill="#242424" />
            <circle cx="78" cy="87" r="2.5" fill="#FFFFFF" />
            <ellipse cx="120" cy="90" rx="7.5" ry="9.5" fill="#242424" />
            <circle cx="118" cy="87" r="2.5" fill="#FFFFFF" />
          </>
        )}

        {/* Cute Mouth */}
        {expression === 'cheering' || expression === 'happy' ? (
          <path d="M 94 104 Q 100 114 106 104 Z" fill="#D96B72" stroke="#242424" strokeWidth="2" />
        ) : expression === 'focused' ? (
          <path d="M 93 105 L 107 105" stroke="#242424" strokeWidth="3" strokeLinecap="round" />
        ) : (
          // Mischievous slight smile
          <path d="M 94 103 Q 100 109 106 103" stroke="#242424" strokeWidth="3" strokeLinecap="round" fill="none" />
        )}

        {/* Messy Silver/White Hair Bangs & Tufts */}
        {/* Back Hair */}
        <path
          d="M 55 75 Q 45 45 75 35 Q 100 25 125 35 Q 155 45 145 75 Q 152 95 146 115 L 138 105 Q 142 68 128 50 Q 100 38 72 50 Q 58 68 62 105 L 54 115 Q 48 95 55 75 Z"
          fill="url(#hair-grad)"
          stroke="#242424"
          strokeWidth="3"
        />

        {/* Front Hair Bangs */}
        <path d="M 68 56 Q 74 72 82 78 Q 80 62 86 52" fill="url(#hair-grad)" stroke="#242424" strokeWidth="2.5" />
        <path d="M 85 50 Q 94 76 100 84 Q 105 74 112 50" fill="url(#hair-grad)" stroke="#242424" strokeWidth="2.5" />
        <path d="M 112 52 Q 118 64 126 78 Q 128 62 134 56" fill="url(#hair-grad)" stroke="#242424" strokeWidth="2.5" />

        {/* Large Dark Goggles on forehead */}
        <g transform="translate(0, -6)">
          {/* Goggles Strap around head */}
          <path d="M 52 56 Q 100 48 148 56" stroke="#242424" strokeWidth="7" strokeLinecap="round" />
          {/* Goggles Frame Left */}
          <rect x="62" y="44" width="34" height="24" rx="8" fill="url(#goggles-shine)" stroke="#242424" strokeWidth="3" />
          <path d="M 66 48 L 76 60" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          {/* Goggles Frame Right */}
          <rect x="104" y="44" width="34" height="24" rx="8" fill="url(#goggles-shine)" stroke="#242424" strokeWidth="3" />
          <path d="M 108 48 L 118 60" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          {/* Center Bridge */}
          <rect x="94" y="52" width="12" height="6" rx="2" fill="#242424" />
        </g>

        {/* Optional Gadget / Phone in hand if idle or focused */}
        {expression === 'idle' || expression === 'focused' ? (
          <g transform="translate(115, 135) rotate(-10)">
            <rect x="0" y="0" width="22" height="34" rx="4" fill="#242424" stroke="#FFFFFF" strokeWidth="1.5" />
            <rect x="3" y="4" width="16" height="22" rx="2" fill="#C7E4F5" />
            <circle cx="11" cy="30" r="1.5" fill="#FFFFFF" />
          </g>
        ) : null}

        {/* Small floating sparkles around character */}
        <path d="M 155 40 L 157 44 L 161 46 L 157 48 L 155 52 L 153 48 L 149 46 L 153 44 Z" fill="#F8E7A8" />
        <path d="M 40 100 L 41 103 L 44 104 L 41 105 L 40 108 L 39 105 L 36 104 L 39 103 Z" fill="#F7C6CE" />
      </svg>
    </div>
  );
};
