import React from 'react';
import { useApp } from '../../context/AppContext';
import type { ActivityItem } from '../../types';
import { XPProgressBar } from '../common/XPProgressBar';
import { Badge } from '../common/Badge';
import { FocusNowCard } from '../common/FocusNowCard';
import bannerImg from '../../assets/banner.png';
import {
  Zap,
  Gift,
  ChevronRight,
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

  const completedTodayCount = quests.filter(q => q.completed).length;
  const totalTodayCount = quests.length;

  return (
    <div className="space-y-5 pb-12 animate-page-pop select-none">
      
      {/* MAIN DASHBOARD GRID LAYOUT (2 Columns: Left 7 cols, Right 5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
        
        {/* LEFT COLUMN (7 cols): FocusNowCard + TODAY'S QUESTS + SKILL PROGRESSION */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* 1. FOCUS NOW Hero Card (Compact Left Placement) */}
          <FocusNowCard />

          {/* 2. TODAY'S QUESTS Card */}
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

          {/* 3. SKILL PROGRESSION Card */}
          <div className="stationery-card p-4.5 sm:p-5 animate-card-pop stagger-3">
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

        </div>

        {/* RIGHT COLUMN (5 cols): NEXT LEVEL REWARD + BANNER + ACHIEVEMENTS & ACTIVITY */}
        <div className="lg:col-span-5 space-y-4">

          {/* 1. Next Level Reward Preview Card */}
          <div className="stationery-card p-4 bg-gradient-to-r from-lockin-card via-lockin-card to-lockin-cream/30 border border-lockin-border animate-card-pop stagger-4">
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

          {/* 2. Aesthetic Banner Card */}
          <div className="stationery-card overflow-hidden p-0 relative border-2 border-lockin-soft-pink/60 shadow-sm group hover:border-lockin-red transition-all animate-card-pop stagger-5">
            <img
              src={bannerImg}
              alt="LOCK-IN RPG Banner"
              className="w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-500 rounded-3xl"
            />
          </div>

          {/* 3. Recent Achievement Card */}
          {achievements.length > 0 && (
            <div className="stationery-card p-4 bg-gradient-to-r from-lockin-card to-lockin-cream/30 animate-card-pop stagger-6">
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

          {/* 4. Recent Activity List Card */}
          <div className="stationery-card p-4 animate-card-pop stagger-7">
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
