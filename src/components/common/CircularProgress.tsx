import React from 'react';

interface CircularProgressProps {
  value: number; // 0 to 100
  size?: number;
  strokeWidth?: number;
  grade?: string;
  label?: string;
  color?: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  size = 90,
  strokeWidth = 8,
  grade = 'A',
  label = "TODAY'S SCORE",
  color = '#D96B72',
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="relative inline-flex flex-col items-center justify-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#F2EEE9"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Active progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-xl font-extrabold text-lockin-dark leading-none">
            {value} <span className="text-xs text-lockin-muted font-semibold">/ 100</span>
          </span>
        </div>
      </div>
      {grade && (
        <div className="absolute -top-1 -right-1 bg-lockin-soft-pink text-lockin-red font-black text-xs px-2 py-0.5 rounded-full border border-white shadow-sm">
          {grade}
        </div>
      )}
      {label && <span className="text-[11px] font-bold tracking-wider text-lockin-muted uppercase mt-2">{label}</span>}
    </div>
  );
};
