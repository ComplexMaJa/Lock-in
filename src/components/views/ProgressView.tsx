import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Clock, Target, Award, Flame } from 'lucide-react';

export const ProgressView: React.FC = () => {
  const { userProfile } = useApp();
  const [timeframe, setTimeframe] = useState<'Overview' | 'Week' | 'Month' | 'Year'>('Week');

  // Compute real dynamic weekly XP data for the last 7 days (Mon -> Sun)
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const today = new Date();
  const currentDayIndex = (today.getDay() + 6) % 7; // Monday = 0, Sunday = 6

  const weeklyData = daysOfWeek.map((dayName, idx) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (currentDayIndex - idx));
    const dateKey = d.toISOString().split('T')[0];
    const realXp = userProfile.dailyXpHistory?.[dateKey] || 0;
    return { day: dayName, xp: realXp };
  });

  const totalWeeklyXp = weeklyData.reduce((acc, curr) => acc + curr.xp, 0);
  const maxVal = Math.max(300, ...weeklyData.map(d => d.xp));
  const chartHeight = 140;
  const chartWidth = 500;

  // Compute SVG line points
  const points = weeklyData.map((d, i) => {
    const x = (i / (weeklyData.length - 1)) * (chartWidth - 40) + 20;
    const y = chartHeight - (d.xp / maxVal) * (chartHeight - 30) - 15;
    return { x, y, ...d };
  });

  const pathD = points.reduce((acc, p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`), '');

  return (
    <div className="space-y-6 pb-12 animate-fadeIn select-none">
      {/* Top Header & Timeframe Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-lockin-dark">Progress & Analytics</h2>
          <p className="text-xs text-lockin-muted mt-0.5">
            Real-time analytics tracking your actual XP velocity, focus duration, and RPG stats.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 p-1 bg-lockin-secondary rounded-full border border-lockin-border">
          {(['Overview', 'Week', 'Month', 'Year'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-full transition-all ${
                timeframe === t
                  ? 'bg-lockin-red text-white shadow-pill'
                  : 'text-lockin-muted hover:text-lockin-dark'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="stationery-card p-5 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-black tracking-wider text-lockin-muted uppercase">REAL XP EARNED THIS WEEK</span>
            <p className="text-3xl font-black text-lockin-dark mt-1">{totalWeeklyXp.toLocaleString()} XP</p>
            <p className="text-xs text-lockin-muted font-bold mt-1">Updated live from real activity</p>
          </div>
          <div className="p-3 bg-lockin-soft-pink/30 text-lockin-red rounded-2xl border border-lockin-soft-pink">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>

        <div className="stationery-card p-5 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-black tracking-wider text-lockin-muted uppercase">LIFETIME FOCUS TIME</span>
            <p className="text-3xl font-black text-lockin-dark mt-1">{userProfile.totalFocusHoursLifetime} hrs</p>
            <p className="text-xs text-lockin-muted font-bold mt-1">Logged from focus pomodoro sessions</p>
          </div>
          <div className="p-3 bg-lockin-blue/40 text-[#2B7A9E] rounded-2xl border border-lockin-blue">
            <Clock className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Dynamic Weekly XP Line Chart */}
      <div className="stationery-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xs font-black tracking-wider text-lockin-muted uppercase">REAL DAILY XP VELOCITY</h3>
            <span className="text-sm font-extrabold text-lockin-dark">This Week</span>
          </div>
          <span className="text-xs font-bold text-lockin-red bg-lockin-soft-pink/30 px-3 py-1 rounded-full border border-lockin-soft-pink">
            Today: {userProfile.xpEarnedToday} XP
          </span>
        </div>

        {/* SVG Line Chart */}
        <div className="w-full overflow-x-auto">
          <div className="min-w-[450px] relative">
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto overflow-visible">
              {/* Grid lines */}
              <line x1="0" y1="20" x2={chartWidth} y2="20" stroke="#F2EEE9" strokeDasharray="4 4" />
              <line x1="0" y1="60" x2={chartWidth} y2="60" stroke="#F2EEE9" strokeDasharray="4 4" />
              <line x1="0" y1="100" x2={chartWidth} y2="100" stroke="#F2EEE9" strokeDasharray="4 4" />

              <defs>
                <linearGradient id="xpArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D96B72" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#D96B72" stopOpacity="0" />
                </linearGradient>
              </defs>

              <path
                d={`${pathD} L ${points[points.length - 1].x} ${chartHeight} L ${points[0].x} ${chartHeight} Z`}
                fill="url(#xpArea)"
              />

              <path d={pathD} fill="none" stroke="#D96B72" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />

              {/* Data points */}
              {points.map((p, idx) => (
                <g key={idx} className="group cursor-pointer">
                  <circle cx={p.x} cy={p.y} r="6" fill="#FFFFFF" stroke="#D96B72" strokeWidth="3" className="transition-transform group-hover:scale-150" />
                  <text x={p.x} y={chartHeight + 15} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#777777">
                    {p.day}
                  </text>
                  <g className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <rect x={p.x - 24} y={p.y - 30} width="48" height="20" rx="6" fill="#242424" />
                    <text x={p.x} y={p.y - 16} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#FFFFFF">
                      {p.xp} XP
                    </text>
                  </g>
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>

      {/* Additional Lifetime Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="stationery-card p-4 text-center">
          <Target className="w-5 h-5 text-lockin-red mx-auto mb-1" />
          <p className="text-xl font-black text-lockin-dark">{userProfile.totalTasksCompletedLifetime}</p>
          <span className="text-[10px] font-bold text-lockin-muted uppercase">Tasks Completed</span>
        </div>

        <div className="stationery-card p-4 text-center">
          <Clock className="w-5 h-5 text-[#2B7A9E] mx-auto mb-1" />
          <p className="text-xl font-black text-lockin-dark">{userProfile.totalFocusHoursLifetime} hrs</p>
          <span className="text-[10px] font-bold text-lockin-muted uppercase">Focus Hours</span>
        </div>

        <div className="stationery-card p-4 text-center">
          <Award className="w-5 h-5 text-[#B87A00] mx-auto mb-1" />
          <p className="text-xl font-black text-lockin-dark">{userProfile.totalAchievementsUnlocked} / 100</p>
          <span className="text-[10px] font-bold text-lockin-muted uppercase">Achievements</span>
        </div>

        <div className="stationery-card p-4 text-center">
          <Flame className="w-5 h-5 text-lockin-red mx-auto mb-1" />
          <p className="text-xl font-black text-lockin-dark">{userProfile.longestStreakDays} days</p>
          <span className="text-[10px] font-bold text-lockin-muted uppercase">Longest Streak</span>
        </div>
      </div>
    </div>
  );
};
