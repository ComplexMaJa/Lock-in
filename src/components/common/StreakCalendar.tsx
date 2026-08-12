import React from 'react';
import { Flame } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface StreakCalendarProps {
  className?: string;
  showTitle?: boolean;
}

export const StreakCalendar: React.FC<StreakCalendarProps> = ({
  className = '',
  showTitle = true,
}) => {
  const { userProfile } = useApp();

  // Generate 7 days ending today (or current week Mon-Sun)
  const today = new Date();
  const currentDayIndex = today.getDay(); // 0 = Sun, 1 = Mon ...
  // Calculate Monday of current week
  const mondayOffset = currentDayIndex === 0 ? -6 : 1 - currentDayIndex;

  const weekDays = Array.from({ length: 7 }).map((_, idx) => {
    const d = new Date(today);
    d.setDate(today.getDate() + mondayOffset + idx);
    
    const isToday = d.toDateString() === today.toDateString();
    const isPastOrToday = d <= today;

    // Check if streak applies to this day
    // If user has streakDays > 0, past streakDays days up to today are marked active
    const daysAgo = Math.floor((today.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
    const hasStreak = isPastOrToday && daysAgo >= 0 && daysAgo < Math.max(1, userProfile.streakDays);

    return {
      date: d,
      dayAbbr: d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
      dayNum: d.getDate(),
      isToday,
      hasStreak,
    };
  });

  return (
    <div className={`space-y-2.5 ${className}`}>
      {showTitle && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-lockin-red">
            <Flame className="w-4.5 h-4.5 fill-lockin-red animate-pulse" />
            <span className="text-lg font-black text-lockin-dark">{userProfile.streakDays}</span>
            <span className="text-xs font-black tracking-wider text-lockin-muted uppercase">DAY STREAK</span>
          </div>
          <span className="text-[10px] font-semibold text-lockin-muted">"Keep the run alive."</span>
        </div>
      )}

      {/* Horizontal 7-Day Calendar Grid */}
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
        {weekDays.map((day, idx) => (
          <div
            key={idx}
            className={`flex flex-col items-center justify-between p-1.5 sm:p-2 rounded-2xl border text-center transition-all ${
              day.isToday
                ? 'bg-lockin-soft-pink/30 border-lockin-red shadow-sm'
                : day.hasStreak
                ? 'bg-lockin-secondary/70 border-lockin-soft-pink'
                : 'bg-lockin-card border-lockin-border/60 opacity-60'
            }`}
          >
            {/* Day Abbreviation */}
            <span className={`text-[9px] font-black uppercase tracking-wider ${day.isToday ? 'text-lockin-red' : 'text-lockin-muted'}`}>
              {day.dayAbbr}
            </span>

            {/* Date Number */}
            <span className="text-xs font-black text-lockin-dark my-0.5">
              {day.dayNum}
            </span>

            {/* Status Fire Emoji or Dot Indicator */}
            <div className="h-5 flex items-center justify-center mt-0.5">
              {day.hasStreak ? (
                <span className="text-sm transform hover:scale-125 transition-transform" title="Logged in & streak active!">
                  🔥
                </span>
              ) : (
                <span className="w-1.5 h-1.5 rounded-full bg-lockin-border" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
