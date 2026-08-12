import React from 'react';
import { useApp } from '../../context/AppContext';
import type { ActivityItem } from '../../types';
import { getFocusNowQuest } from '../../utils/priority';
import { XPProgressBar } from '../common/XPProgressBar';
import { Badge } from '../common/Badge';
import { StreakCalendar } from '../common/StreakCalendar';
import { SparkleDoodle } from '../common/Doodle';
import heroImg from '../../assets/hero.png';
import bannerImg from '../../assets/banner.png';
import {
  Zap,
  Gift,
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const {
    userProfile,
    quests,
    skills,
    achievements,
    activities,
    startFocusSession,
    setActiveTab,
  } = useApp();

  const focusNowQuest = getFocusNowQuest(quests);
  const completedTodayCount = quests.filter(q => q.completed).length;
  const totalTodayCount = quests.length;

  return (
    <div className="space-y-5 pb-12 animate-page-pop select-none">
      {/* Top Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
        {/* Left Dominant Column (7 cols): FOCUS NOW + TODAY'S QUESTS */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* FOCUS NOW Card - Compact & Punchy */}
          <div className="stationery-card p-5 sm:p-6 relative overflow-hidden bg-gradient-to-br from-lockin-card via-lockin-card to-lockin-soft-pink/15 border-2 border-lockin-soft-pink soft-glow-pink shadow-md animate-card-pop stagger-1">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-black tracking-widest text-lockin-muted uppercase">FOCUS NOW</span>
                  <Badge variant="priority" size="sm">Highest Priority</Badge>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-lockin-dark tracking-tight leading-snug">
                  {focusNowQuest ? focusNowQuest.title : 'All Quests Completed!'}
                </h3>

                {focusNowQuest ? (
                  <div className="flex flex-wrap items-center gap-2.5 text-xs font-bold text-lockin-muted pt-0.5">
                    <span>{focusNowQuest.deadline || 'Due soon'}</span>
                    <span>•</span>
                    <span>{focusNowQuest.durationMin} min estimated</span>
                    <Badge variant="xp">+{focusNowQuest.xp} XP</Badge>
                  </div>
                ) : (
                  <p className="text-xs text-lockin-muted">No urgent tasks remaining. Enjoy your focus time!</p>
                )}

                <div className="pt-3">
                  <button
                    onClick={() => startFocusSession(focusNowQuest || undefined)}
                    className="flex items-center gap-2 px-6 py-2.5 bg-lockin-red text-white font-black text-xs rounded-full shadow-pill hover:bg-[#c45a61] transition-all transform hover:scale-[1.03] active:scale-95"
                  >
                    <Zap className="w-3.5 h-3.5 fill-white" />
                    <span>START QUEST</span>
                  </button>
                </div>
              </div>

              {/* Compact Hero Mascot Illustration */}
              <div className="self-center sm:self-auto shrink-0 relative">
                <img
                  src={heroImg}
                  alt="Hero Mascot"
                  className="w-32 sm:w-36 lg:w-40 h-auto drop-shadow-md object-contain transform hover:scale-105 transition-transform duration-300 animate-float"
                />
                <SparkleDoodle color="#F8E7A8" className="absolute -top-2 -right-2 w-5 h-5 animate-pulse" />
              </div>
            </div>
          </div>

          {/* TODAY'S QUESTS Card */}
          <div className="stationery-card p-4.5 sm:p-5 animate-card-pop stagger-2">
            <div className="flex items-center justify-between mb-3 border-b border-lockin-border/60 pb-3">
              <div>
                <h4 className="text-[11px] font-black tracking-wider text-lockin-muted uppercase">TODAY'S QUESTS</h4>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs font-extrabold text-lockin-dark">{completedTodayCount} / {totalTodayCount} COMPLETED</span>
                </div>
              </div>
              <span className="text-[11px] font-bold text-lockin-red bg-lockin-soft-pink/30 px-2.5 py-0.5 rounded-full border border-lockin-soft-pink">
                +{userProfile.xpEarnedToday} XP earned today
              </span>
            </div>

            {/* Quests List */}
            <div className="space-y-2">
              {quests.map(quest => (
                <div
                  key={quest.id}
                  className={`flex items-center justify-between p-2.5 sm:p-3 rounded-2xl border transition-all ${
                    quest.completed
                      ? 'bg-lockin-secondary/60 border-lockin-border opacity-75'
                      : 'bg-lockin-card border-lockin-border hover:border-lockin-soft-pink'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="p-1.5 bg-lockin-soft-pink/30 text-lockin-red rounded-lg shrink-0">
                      <Zap className="w-3.5 h-3.5 fill-lockin-red" />
                    </div>

                    <div className="min-w-0">
                      <p className={`text-xs font-bold truncate ${quest.completed ? 'line-through text-lockin-muted' : 'text-lockin-dark'}`}>
                        {quest.title}
                      </p>
                    </div>

                    <Badge category={quest.category} size="sm" className="hidden sm:inline-flex shrink-0">
                      {quest.category}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] font-extrabold text-lockin-red">+{quest.xp} XP</span>
                    <button
                      onClick={() => startFocusSession(quest)}
                      className="flex items-center gap-1 px-3 py-1 bg-lockin-red text-white font-extrabold text-[11px] rounded-full shadow-pill hover:bg-[#c45a61] transition-all transform active:scale-95 shrink-0"
                      title="Focus on this quest"
                    >
                      <Zap className="w-3 h-3 fill-white" />
                      <span>FOCUS</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Status Column (5 cols): Player Status, Level/Rank, Streak, Score, Next Reward */}
        <div className="lg:col-span-5 space-y-4">

          {/* Level & Rank Card */}
          <div className="stationery-card p-4.5 sm:p-5 animate-card-pop stagger-3">
            <div className="grid grid-cols-2 gap-3 divide-x divide-lockin-border">
              {/* LEVEL */}
              <div className="pr-2">
                <span className="text-[10px] font-black tracking-wider text-lockin-muted uppercase">LEVEL</span>
                <p className="text-2xl font-black text-lockin-dark mt-0.5">{userProfile.level}</p>
                <div className="flex items-center gap-1 text-[10px] font-bold text-lockin-red mt-0.5">
                  <TrendingUp className="w-3 h-3" />
                  <span>{userProfile.currentXp.toLocaleString()} / {userProfile.maxXp.toLocaleString()} XP</span>
                </div>
                <div className="mt-1.5">
                  <XPProgressBar progressPercent={userProfile.levelProgressPercent} barColor="bg-lockin-red" height={6} />
                  <span className="text-[9px] font-bold text-lockin-muted mt-0.5 block text-right">
                    {userProfile.levelProgressPercent}%
                  </span>
                </div>
              </div>

              {/* RANK */}
              <div className="pl-3">
                <span className="text-[10px] font-black tracking-wider text-lockin-muted uppercase">RANK</span>
                <p className="text-2xl font-black text-lockin-dark mt-0.5">{userProfile.rank}</p>
                <div className="text-[10px] font-bold text-lockin-muted mt-0.5">
                  <span>{userProfile.rankProgressPercent}% to S Rank</span>
                </div>
                <div className="mt-1.5">
                  <XPProgressBar progressPercent={userProfile.rankProgressPercent} barColor="bg-lockin-dark" height={6} />
                  <span className="text-[9px] font-bold text-lockin-muted mt-0.5 block text-right">
                    {userProfile.rankProgressPercent}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Horizontal Streak Calendar Card */}
          <div className="stationery-card p-4 animate-card-pop stagger-4">
            <StreakCalendar />
          </div>

          {/* Next Level Reward Preview Card */}
          <div className="stationery-card p-4 bg-gradient-to-r from-lockin-card via-lockin-card to-lockin-cream/30 border border-lockin-border animate-card-pop stagger-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-black tracking-wider text-lockin-muted uppercase">NEXT LEVEL REWARD</span>
                <h5 className="text-base font-extrabold text-lockin-dark mt-0.5">Lv. {userProfile.level + 1}</h5>
                <ul className="text-[11px] font-semibold text-lockin-muted space-y-0.5 mt-1.5">
                  <li>✦ New Title: <span className="text-lockin-dark font-extrabold">DISCIPLINED</span></li>
                  <li>✦ + 1 Achievement Point</li>
                </ul>
              </div>

              <div className="p-2.5 bg-lockin-cream text-[#B87A00] rounded-xl border border-lockin-yellow shadow-sm shrink-0">
                <Gift className="w-5.5 h-5.5" />
              </div>
            </div>

            <div className="mt-2.5">
              <XPProgressBar progressPercent={userProfile.levelProgressPercent} barColor="bg-lockin-red" height={5} />
            </div>
          </div>

          {/* Aesthetic Banner Card */}
          <div className="stationery-card overflow-hidden p-0 relative border-2 border-lockin-soft-pink/60 shadow-sm group hover:border-lockin-red transition-all animate-card-pop stagger-6">
            <img
              src={bannerImg}
              alt="LOCK-IN RPG Banner"
              className="w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-500 rounded-3xl"
            />
          </div>

        </div>
      </div>

      {/* Bottom Grid: SKILL PROGRESSION + RECENT ACHIEVEMENTS & ACTIVITY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">

        {/* SKILL PROGRESSION Card (7 cols) */}
        <div className="lg:col-span-7 stationery-card p-4.5 sm:p-5 animate-card-pop stagger-7">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-[11px] font-black tracking-wider text-lockin-muted uppercase">SKILL PROGRESSION</h4>
            <button
              onClick={() => setActiveTab('Skills')}
              className="text-xs font-bold text-lockin-red hover:underline flex items-center gap-0.5"
            >
              <span>View all</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {skills.map(skill => (
              <div key={skill.id} className="p-2.5 bg-lockin-secondary/50 rounded-xl border border-lockin-border/80">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-extrabold text-lockin-dark">{skill.name}</span>
                  <span className="text-[11px] font-bold text-lockin-muted">Lv. {skill.level}</span>
                </div>
                <XPProgressBar progressPercent={skill.progressPercent} barColor="bg-lockin-red" height={6} showPercentText />
              </div>
            ))}
          </div>
        </div>

        {/* RECENT ACHIEVEMENT & RECENT ACTIVITY (5 cols) */}
        <div className="lg:col-span-5 space-y-4 animate-card-pop stagger-8">

          {/* Recent Achievement Card */}
          {achievements.length > 0 && (
            <div className="stationery-card p-4 bg-gradient-to-r from-lockin-card to-lockin-cream/30">
              <span className="text-[10px] font-black tracking-wider text-lockin-muted uppercase">RECENT ACHIEVEMENT</span>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 bg-lockin-cream text-[#B87A00] rounded-xl border border-lockin-yellow">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-lockin-dark">{achievements[0].name}</p>
                    <p className="text-[10px] text-lockin-muted font-medium">{achievements[0].description}</p>
                  </div>
                </div>
                <span className="text-xs font-extrabold text-lockin-red shrink-0">+{achievements[0].xpReward} XP</span>
              </div>
            </div>
          )}

          {/* Recent Activity List Card */}
          <div className="stationery-card p-4">
            <h4 className="text-[10px] font-black tracking-wider text-lockin-muted uppercase mb-2">RECENT ACTIVITY</h4>
            <div className="space-y-2">
              {activities.slice(0, 3).map((act: ActivityItem) => (
                <div key={act.id} className="flex items-center justify-between text-xs font-medium pb-1.5 border-b border-lockin-border/50 last:border-0 last:pb-0">
                  <div className="flex items-center gap-2 truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-lockin-red shrink-0" />
                    <span className="text-lockin-dark font-semibold text-[11px] truncate">{act.text}</span>
                  </div>
                  <span className="text-[11px] text-lockin-red font-bold shrink-0 ml-2">+{act.xpEarned} XP</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
