import React from 'react';

interface XPProgressBarProps {
  progressPercent: number;
  barColor?: string;
  height?: number;
  showPercentText?: boolean;
  striped?: boolean;
  className?: string;
}

export const XPProgressBar: React.FC<XPProgressBarProps> = ({
  progressPercent,
  barColor = 'bg-lockin-red',
  height = 12,
  showPercentText = false,
  striped = false,
  className = '',
}) => {
  const cappedPercent = Math.min(Math.max(progressPercent, 0), 100);

  return (
    <div className={`w-full flex items-center gap-3 ${className}`}>
      <div
        className="w-full bg-[#F2EEE9] rounded-full overflow-hidden p-0.5 border border-[#EBE7E3] relative"
        style={{ height: height + 4 }}
      >
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out relative overflow-hidden ${barColor}`}
          style={{ width: `${cappedPercent}%` }}
        >
          {/* Subtle shimmer highlight overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />

          {/* Optional Candy Stripe overlay */}
          {striped && (
            <div
              className="absolute inset-0 opacity-25"
              style={{
                backgroundImage: 'linear-gradient(45deg, rgba(255, 255, 255, 0.4) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0.4) 75%, transparent 75%, transparent)',
                backgroundSize: '16px 16px',
              }}
            />
          )}
        </div>
      </div>

      {showPercentText && (
        <span className="text-xs font-bold text-lockin-dark min-w-[42px] text-right">
          {cappedPercent.toFixed(1)}%
        </span>
      )}
    </div>
  );
};
