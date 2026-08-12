import React, { useState, useEffect } from 'react';

interface WatchFaceProps {
  size?: number; // Diameter in pixels
  className?: string;
  showDigitalClock?: boolean;
}

export const WatchFace: React.FC<WatchFaceProps> = ({
  size = 220,
  className = '',
  showDigitalClock = true,
}) => {
  const [time, setTime] = useState<Date>(() => new Date());

  useEffect(() => {
    let animId: number;
    const updateTime = () => {
      setTime(new Date());
      animId = requestAnimationFrame(updateTime);
    };
    animId = requestAnimationFrame(updateTime);
    return () => cancelAnimationFrame(animId);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const milliseconds = time.getMilliseconds();

  // Digital time strings
  const hoursStr = hours.toString().padStart(2, '0');
  const minsStr = minutes.toString().padStart(2, '0');
  const secsStr = seconds.toString().padStart(2, '0');

  // Smooth rotation angles
  const secondAngle = ((seconds + milliseconds / 1000) / 60) * 360;
  const minuteAngle = ((minutes + seconds / 60) / 60) * 360;
  const hourAngle = (((hours % 12) + minutes / 60 + seconds / 3600) / 12) * 360;

  const center = size / 2;
  const radius = size / 2 - 8;

  // Generate 60 tick marks around the perimeter
  const ticks = Array.from({ length: 60 }).map((_, i) => {
    const angle = (i * 6 * Math.PI) / 180;
    const isPrimary = i % 5 === 0;
    const isQuarter = i % 15 === 0;
    const tickLength = isQuarter ? 10 : isPrimary ? 7 : 4;
    const innerR = radius - tickLength;
    const outerR = radius;

    const x1 = center + innerR * Math.sin(angle);
    const y1 = center - innerR * Math.cos(angle);
    const x2 = center + outerR * Math.sin(angle);
    const y2 = center - outerR * Math.cos(angle);

    let strokeColor = 'var(--color-lockin-border)';
    let strokeWidth = 1;

    if (isQuarter) {
      strokeColor = 'var(--color-lockin-red)';
      strokeWidth = 2;
    } else if (isPrimary) {
      strokeColor = 'var(--color-lockin-dark)';
      strokeWidth = 1.5;
    }

    return (
      <line
        key={i}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        opacity={isPrimary ? 0.85 : 0.4}
      />
    );
  });

  // Calculate clock hand coordinates
  const getHandCoords = (angleDeg: number, length: number) => {
    const rad = (angleDeg * Math.PI) / 180;
    return {
      x2: center + length * Math.sin(rad),
      y2: center - length * Math.cos(rad),
    };
  };

  const hourHand = getHandCoords(hourAngle, radius * 0.48);
  const minuteHand = getHandCoords(minuteAngle, radius * 0.72);
  const secondHand = getHandCoords(secondAngle, radius * 0.84);

  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible drop-shadow-sm"
      >
        {/* Outer Minimal Watch Ring */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="transparent"
          stroke="var(--color-lockin-border)"
          strokeWidth="1.5"
          opacity="0.6"
        />

        {/* 60 Tick Marks */}
        <g>{ticks}</g>

        {/* Dial Numbers: 12, 3, 6, 9 */}
        <text
          x={center}
          y={center - radius + 25}
          textAnchor="middle"
          dominantBaseline="central"
          fill="var(--color-lockin-dark)"
          className="text-xs font-black select-none"
        >
          12
        </text>
        <text
          x={center + radius - 25}
          y={center}
          textAnchor="middle"
          dominantBaseline="central"
          fill="var(--color-lockin-dark)"
          className="text-xs font-black select-none"
        >
          3
        </text>
        <text
          x={center}
          y={center + radius - 16}
          textAnchor="middle"
          dominantBaseline="central"
          fill="var(--color-lockin-dark)"
          className="text-xs font-black select-none"
        >
          6
        </text>
        <text
          x={center - radius + 25}
          y={center}
          textAnchor="middle"
          dominantBaseline="central"
          fill="var(--color-lockin-dark)"
          className="text-xs font-black select-none"
        >
          9
        </text>

        {/* Hour Hand */}
        <line
          x1={center}
          y1={center}
          x2={hourHand.x2}
          y2={hourHand.y2}
          stroke="var(--color-lockin-dark)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Minute Hand */}
        <line
          x1={center}
          y1={center}
          x2={minuteHand.x2}
          y2={minuteHand.y2}
          stroke="var(--color-lockin-dark)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Second Hand (LOCK-IN Pink Sweep) */}
        <line
          x1={center}
          y1={center}
          x2={secondHand.x2}
          y2={secondHand.y2}
          stroke="var(--color-lockin-red)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Center Pivot Dot */}
        <circle
          cx={center}
          cy={center}
          r="4.5"
          fill="var(--color-lockin-card)"
          stroke="var(--color-lockin-red)"
          strokeWidth="2.5"
        />
      </svg>

      {/* Embedded Digital Clock Capsule Pill */}
      {showDigitalClock && (
        <div className="absolute bottom-[30%] left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-lockin-card/95 border border-lockin-border/80 rounded-full font-mono text-[10px] sm:text-[11px] font-extrabold shadow-sm flex items-center justify-center gap-0.5 z-20 pointer-events-none">
          <span className="text-lockin-dark">{hoursStr}:{minsStr}:</span>
          <span className="text-lockin-red font-black">{secsStr}</span>
        </div>
      )}
    </div>
  );
};
