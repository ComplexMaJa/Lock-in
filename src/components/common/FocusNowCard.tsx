import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { getFocusNowQuest } from '../../utils/priority';
import { Badge } from './Badge';
import { WatchFace } from './WatchFace';
import { SparkleDoodle } from './Doodle';
import heroImg from '../../assets/hero.png';
import { Zap, Flame, Target, Goal } from 'lucide-react';

export const FocusNowCard: React.FC = () => {
  const { userProfile, quests, startFocusSession } = useApp();
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const focusNowQuest = getFocusNowQuest(quests);

  // Luxury Date Formatting
  const dayAbbr = now.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
  const dateNum = now.getDate();
  const monthAbbr = now.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  const yearNum = now.getFullYear();

  return (
    <div className="stationery-card p-4.5 sm:p-5 relative overflow-hidden bg-gradient-to-br from-lockin-card via-lockin-card to-lockin-soft-pink/15 border-2 border-lockin-soft-pink soft-glow-pink shadow-md animate-card-pop stagger-1 select-none">
      
      {/* Background Decorative Sparkles */}
      <SparkleDoodle color="#F8E7A8" className="absolute top-3 left-1/2 -translate-x-1/2 w-5 h-5 animate-pulse pointer-events-none opacity-80" />
      <SparkleDoodle color="#F7C6CE" className="absolute bottom-12 left-1/4 w-3.5 h-3.5 animate-bounce-gentle pointer-events-none opacity-80" />

      {/* Main Top Composition: 3 Centered & Balanced Compact Zones */}
      <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4 relative z-10">
        
        {/* LEFT ZONE (4 cols): Quest Information */}
        <div className="md:col-span-4 space-y-2.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black tracking-widest text-lockin-muted uppercase">FOCUS NOW</span>
            <Badge variant="priority" size="sm">Highest Priority</Badge>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-lockin-dark tracking-tight leading-snug truncate">
            {focusNowQuest ? focusNowQuest.title : 'All Quests Completed!'}
          </h3>

          {focusNowQuest ? (
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-lockin-muted pt-0.5">
              <span>{focusNowQuest.deadline || 'Today'}</span>
              <span>•</span>
              <span>{focusNowQuest.durationMin} min</span>
              <Badge variant="xp">+{focusNowQuest.xp} XP</Badge>
            </div>
          ) : (
            <p className="text-xs text-lockin-muted font-medium">No urgent tasks remaining. Enjoy your focus time!</p>
          )}

          {/* Action Button */}
          <div className="pt-1">
            <button
              onClick={() => startFocusSession(focusNowQuest || undefined)}
              className="flex items-center gap-2 px-5 py-2 bg-lockin-red text-white font-black text-xs rounded-full shadow-pill hover:bg-[#c45a61] transition-all transform hover:scale-[1.03] active:scale-95"
            >
              <Zap className="w-3.5 h-3.5 fill-white" />
              <span>START FOCUS</span>
            </button>
          </div>

          {/* Goal Subtitle */}
          <div className="pt-2 border-t border-lockin-border/50 flex items-center justify-between relative text-xs font-semibold text-lockin-muted">
            <div className="flex items-center gap-2">
              <div className="p-1 bg-lockin-soft-pink/30 text-lockin-red rounded-full border border-lockin-soft-pink shrink-0">
                <Goal className="w-3 h-3" />
              </div>
              <div>
                <span className="font-extrabold text-lockin-dark block text-[10px]">Goal</span>
                <span className="text-[10px]">Complete task & level up.</span>
              </div>
            </div>

            {/* Pink Curved Dotted Arrow pointing to WatchFace */}
            <svg
              className="hidden xl:block absolute -right-10 top-1/2 -translate-y-4 w-12 h-10 pointer-events-none text-lockin-red/70"
              viewBox="0 0 60 40"
              fill="none"
            >
              <path
                d="M 5 35 Q 30 35, 52 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="4 4"
                strokeLinecap="round"
              />
              <path
                d="M 44 12 L 54 8 L 48 20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* CENTER ZONE (5 cols): WATCH-FACE CLOCK & LUXURY DATE - PERFECTLY CENTERED & LARGER */}
        <div className="md:col-span-5 flex flex-col items-center justify-center py-1 relative mx-auto">
          {/* Minimalist Watch-Face Clock - Enlarged to 185px */}
          <WatchFace size={185} />

          {/* Luxury Minimalist Date Display (TUE | 13 | MAY / 2026) */}
          <div className="mt-3 flex flex-col items-center">
            <div className="flex items-center gap-3.5 text-xs font-extrabold tracking-widest text-lockin-muted select-none">
              <span className="text-lockin-red tracking-wider text-xs font-black">{dayAbbr}</span>
              <div className="w-[1.5px] h-6 bg-lockin-border" />
              <span className="text-2xl sm:text-3xl font-black text-lockin-dark tracking-tight leading-none">
                {dateNum}
              </span>
              <div className="w-[1.5px] h-6 bg-lockin-border" />
              <span className="text-lockin-red tracking-wider text-xs font-black">{monthAbbr}</span>
            </div>
            <span className="text-[10px] font-extrabold tracking-widest text-lockin-muted/80 mt-1">
              {yearNum}
            </span>
          </div>
        </div>

        {/* RIGHT ZONE (3 cols): Integrated Anime Character */}
        <div className="md:col-span-3 relative flex items-center justify-center md:justify-end">
          {/* Background Dot Grid Accent */}
          <div className="absolute top-1 right-2 w-14 h-14 grid grid-cols-4 gap-1 opacity-20 pointer-events-none">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-lockin-red" />
            ))}
          </div>

          <img
            src={heroImg}
            alt="Hero Mascot"
            className="w-28 sm:w-32 lg:w-36 h-auto drop-shadow-md object-contain transform hover:scale-105 transition-transform duration-300 animate-float"
          />

          <SparkleDoodle color="#F8E7A8" className="absolute top-0 right-0 w-4 h-4 animate-pulse" />
        </div>

      </div>

      {/* BOTTOM SUMMARY ROW inside Card */}
      <div className="mt-4 pt-3 border-t border-lockin-border/60 grid grid-cols-3 gap-2 bg-lockin-secondary/60 rounded-xl p-2.5 border border-lockin-border/50 text-xs">
        
        {/* Streak */}
        <div className="flex items-center justify-center sm:justify-start gap-2 px-2 py-0.5 border-r border-lockin-border/60">
          <div className="p-1.5 bg-lockin-soft-pink/30 text-lockin-red rounded-lg shrink-0">
            <Flame className="w-3.5 h-3.5 fill-lockin-red animate-pulse" />
          </div>
          <div className="min-w-0">
            <span className="text-sm font-black text-lockin-dark leading-none block">{userProfile.streakDays}</span>
            <span className="text-[8px] font-black tracking-wider text-lockin-muted uppercase truncate block">STREAK</span>
          </div>
        </div>

        {/* Today's Score */}
        <div className="flex items-center justify-center sm:justify-start gap-2 px-2 py-0.5 border-r border-lockin-border/60">
          <div className="p-1.5 bg-lockin-soft-pink/30 text-lockin-red rounded-lg shrink-0">
            <Target className="w-3.5 h-3.5 text-lockin-red" />
          </div>
          <div className="min-w-0">
            <span className="text-sm font-black text-lockin-dark leading-none block">{userProfile.todayScore} <span className="text-[10px] text-lockin-muted font-bold">/ 100</span></span>
            <span className="text-[8px] font-black tracking-wider text-lockin-muted uppercase truncate block">SCORE</span>
          </div>
        </div>

        {/* Level & Rank */}
        <div className="flex items-center justify-center sm:justify-start gap-2 px-2 py-0.5">
          <div className="p-1.5 bg-lockin-soft-pink/30 text-lockin-red rounded-lg shrink-0">
            <Zap className="w-3.5 h-3.5 fill-lockin-red" />
          </div>
          <div className="min-w-0">
            <span className="text-sm font-black text-lockin-dark leading-none block truncate">
              {userProfile.currentXp} <span className="text-[10px] text-lockin-muted font-bold">/ {userProfile.maxXp} XP</span>
            </span>
            <span className="text-[8px] font-black tracking-wider text-lockin-muted uppercase truncate block">
              LVL {userProfile.level} • RANK {userProfile.rank}
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};
