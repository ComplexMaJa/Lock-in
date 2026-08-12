import React from 'react';
import { useApp } from '../../context/AppContext';
import { getFocusNowQuest } from '../../utils/priority';
import { XPProgressBar } from '../common/XPProgressBar';
import { CircularProgress } from '../common/CircularProgress';
import { Badge } from '../common/Badge';
import { SparkleDoodle } from '../common/Doodle';
import heroImg from '../../assets/hero.png';
import {
  Flame,
  Zap,
  CheckCircle2,
  Circle,
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
    completeQuest,
    startFocusSession,
    setActiveTab,
  } = useApp();

  const focusNowQuest = getFocusNowQuest(quests);
  const completedTodayCount = quests.filter(q => q.completed).length;
  const totalTodayCount = quests.length;

  return (
    <div className="space-y-6 pb-12 animate-fadeIn select-none">
      {/* Top Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Dominant Column (7 cols): FOCUS NOW + TODAY'S QUESTS */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* FOCUS NOW Card - Main Visual Focus of Dashboard */}
          <div className="stationery-card p-7 sm:p-9 relative overflow-hidden bg-gradient-to-br from-white via-white to-lockin-soft-pink/15 border-2 border-lockin-soft-pink soft-glow-pink shadow-lg">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative z-10">
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black tracking-widest text-lockin-muted uppercase">FOCUS NOW</span>
                  <Badge variant="priority" size="sm">Highest Priority</Badge>
                </div>

                <h3 className="text-3xl sm:text-4xl font-black text-lockin-dark tracking-tight leading-tight">
                  {focusNowQuest ? focusNowQuest.title : 'All Quests Completed!'}
                </h3>

                {focusNowQuest ? (
                  <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-bold text-lockin-muted pt-1">
                    <span>{focusNowQuest.deadline || 'Due soon'}</span>
                    <span>•</span>
                    <span>{focusNowQuest.durationMin} min estimated</span>
                    <Badge variant="xp">+{focusNowQuest.xp} XP</Badge>
                  </div>
                ) : (
                  <p className="text-xs text-lockin-muted">No urgent tasks remaining. Enjoy your focus time!</p>
                )}

                <div className="pt-5">
                  <button
                    onClick={() => startFocusSession(focusNowQuest || undefined)}
                    className="flex items-center gap-2.5 px-8 py-3.5 bg-lockin-red text-white font-black text-sm rounded-full shadow-pill hover:bg-[#c45a61] transition-all transform hover:scale-[1.03] active:scale-95"
                  >
                    <Zap className="w-4 h-4 fill-white" />
                    <span>START QUEST</span>
                  </button>
                </div>
              </div>

              {/* Prominent Hero Image Mascot inside Focus Now Card */}
              <div className="self-center sm:self-auto shrink-0 relative mt-2 sm:mt-0">
                <img
                  src={heroImg}
                  alt="Hero Mascot"
                  className="w-40 sm:w-48 lg:w-56 h-auto drop-shadow-xl object-contain transform hover:scale-105 transition-transform duration-300 animate-float"
                />
                <SparkleDoodle color="#F8E7A8" className="absolute -top-3 -right-3 w-6 h-6 animate-pulse" />
                <SparkleDoodle color="#F7C6CE" className="absolute bottom-2 -left-3 w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
              </div>
            </div>
          </div>

          {/* TODAY'S QUESTS Card */}
          <div className="stationery-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-xs font-black tracking-wider text-lockin-muted uppercase">TODAY'S QUESTS</h4>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-sm font-extrabold text-lockin-dark">{completedTodayCount} / {totalTodayCount} COMPLETED</span>
                </div>
              </div>
              <span className="text-xs font-bold text-lockin-red bg-lockin-soft-pink/30 px-2.5 py-1 rounded-full border border-lockin-soft-pink">
                +{userProfile.xpEarnedToday} XP earned today
              </span>
            </div>

            {/* Quests List */}
            <div className="space-y-2.5">
              {quests.map(quest => (
                <div
                  key={quest.id}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                    quest.completed
                      ? 'bg-lockin-secondary/60 border-lockin-border opacity-75'
                      : 'bg-white border-lockin-border hover:border-lockin-soft-pink'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <button
                      onClick={() => completeQuest(quest.id)}
                      className="shrink-0 transition-transform active:scale-90"
                    >
                      {quest.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-lockin-red fill-lockin-soft-pink/40" />
                      ) : (
                        <Circle className="w-5 h-5 text-lockin-muted/60 hover:text-lockin-red" />
                      )}
                    </button>

                    <div className="min-w-0">
                      <p className={`text-xs sm:text-sm font-bold truncate ${quest.completed ? 'line-through text-lockin-muted' : 'text-lockin-dark'}`}>
                        {quest.title}
                      </p>
                    </div>

                    <Badge category={quest.category} size="sm" className="hidden sm:inline-flex shrink-0">
                      {quest.category}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-extrabold text-lockin-red">+{quest.xp} XP</span>
                    <button
                      onClick={() => completeQuest(quest.id)}
                      className={`p-1.5 rounded-full border text-xs ${
                        quest.completed
                          ? 'bg-lockin-soft-pink/30 border-lockin-soft-pink text-lockin-red'
                          : 'bg-lockin-secondary border-lockin-border text-lockin-muted hover:text-lockin-dark'
                      }`}
                    >
                      {quest.completed ? '✓' : '○'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Status Column (5 cols): Player Status, Level/Rank, Streak, Score, Next Reward */}
        <div className="lg:col-span-5 space-y-6">

          {/* Level & Rank Card */}
          <div className="stationery-card p-6">
            <div className="grid grid-cols-2 gap-4 divide-x divide-lockin-border">
              {/* LEVEL */}
              <div className="pr-2">
                <span className="text-[11px] font-black tracking-wider text-lockin-muted uppercase">LEVEL</span>
                <p className="text-3xl font-extrabold text-lockin-dark mt-0.5">{userProfile.level}</p>
                <div className="flex items-center gap-1 text-[11px] font-bold text-lockin-red mt-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>{userProfile.currentXp.toLocaleString()} / {userProfile.maxXp.toLocaleString()} XP</span>
                </div>
                <div className="mt-2">
                  <XPProgressBar progressPercent={userProfile.levelProgressPercent} barColor="bg-lockin-red" height={8} />
                  <span className="text-[10px] font-bold text-lockin-muted mt-1 block text-right">
                    {userProfile.levelProgressPercent}%
                  </span>
                </div>
              </div>

              {/* RANK */}
              <div className="pl-4">
                <span className="text-[11px] font-black tracking-wider text-lockin-muted uppercase">RANK</span>
                <p className="text-3xl font-extrabold text-lockin-dark mt-0.5">{userProfile.rank}</p>
                <div className="text-[11px] font-bold text-lockin-muted mt-1">
                  <span>{userProfile.rankProgressPercent}% to S Rank</span>
                </div>
                <div className="mt-2">
                  <XPProgressBar progressPercent={userProfile.rankProgressPercent} barColor="bg-lockin-dark" height={8} />
                  <span className="text-[10px] font-bold text-lockin-muted mt-1 block text-right">
                    {userProfile.rankProgressPercent}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Streak & Today's Score Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Streak Card */}
            <div className="stationery-card p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-lockin-red">
                  <Flame className="w-5 h-5 fill-lockin-red animate-pulse" />
                  <span className="text-xl font-extrabold text-lockin-dark">{userProfile.streakDays}</span>
                </div>
                <p className="text-xs font-black tracking-wider text-lockin-muted uppercase mt-1">DAY STREAK</p>
              </div>
              <p className="text-[11px] font-semibold text-lockin-muted mt-3">
                "Keep the run alive."
              </p>
            </div>

            {/* Today's Score Card */}
            <div className="stationery-card p-4 flex flex-col items-center justify-center">
              <CircularProgress
                value={userProfile.todayScore}
                grade={userProfile.todayGrade}
                size={82}
                strokeWidth={7}
                label="TODAY'S SCORE"
              />
            </div>
          </div>

          {/* Next Level Reward Preview Card */}
          <div className="stationery-card p-5 bg-gradient-to-r from-white via-white to-lockin-cream/30 border border-lockin-border">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-black tracking-wider text-lockin-muted uppercase">NEXT LEVEL REWARD</span>
                <h5 className="text-lg font-extrabold text-lockin-dark mt-0.5">Lv. {userProfile.level + 1}</h5>
                <ul className="text-xs font-semibold text-lockin-muted space-y-1 mt-2">
                  <li>✦ New Title: <span className="text-lockin-dark font-extrabold">DISCIPLINED</span></li>
                  <li>✦ + 1 Achievement Point</li>
                  <li>✦ New Badge</li>
                </ul>
              </div>

              {/* Chest/Gift Icon */}
              <div className="p-3 bg-lockin-cream text-[#B87A00] rounded-2xl border border-lockin-yellow shadow-sm shrink-0">
                <Gift className="w-7 h-7" />
              </div>
            </div>

            <div className="mt-4">
              <XPProgressBar progressPercent={userProfile.levelProgressPercent} barColor="bg-lockin-red" height={6} />
              <span className="text-[10px] font-bold text-lockin-muted mt-1 block text-right">{userProfile.levelProgressPercent}%</span>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Grid: SKILL PROGRESSION + RECENT ACHIEVEMENTS & ACTIVITY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* SKILL PROGRESSION Card (7 cols) */}
        <div className="lg:col-span-7 stationery-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xs font-black tracking-wider text-lockin-muted uppercase">SKILL PROGRESSION</h4>
            <button
              onClick={() => setActiveTab('Skills')}
              className="text-xs font-bold text-lockin-red hover:underline flex items-center gap-0.5"
            >
              <span>View all</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skills.map(skill => (
              <div key={skill.id} className="p-3.5 bg-lockin-secondary/50 rounded-2xl border border-lockin-border/80">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-lockin-dark">{skill.name}</span>
                  </div>
                  <span className="text-xs font-bold text-lockin-muted">Lv. {skill.level}</span>
                </div>
                <XPProgressBar progressPercent={skill.progressPercent} barColor="bg-lockin-red" height={7} showPercentText />
              </div>
            ))}
          </div>
        </div>

        {/* RECENT ACHIEVEMENT & RECENT ACTIVITY (5 cols) */}
        <div className="lg:col-span-5 space-y-6">

          {/* Recent Achievement Card */}
          {achievements.length > 0 && (
            <div className="stationery-card p-5 bg-gradient-to-r from-white to-lockin-cream/30">
              <span className="text-[11px] font-black tracking-wider text-lockin-muted uppercase">RECENT ACHIEVEMENT</span>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-lockin-cream text-[#B87A00] rounded-2xl border border-lockin-yellow">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-lockin-dark">{achievements[0].name}</p>
                    <p className="text-[11px] text-lockin-muted font-medium">{achievements[0].description}</p>
                  </div>
                </div>
                <span className="text-xs font-extrabold text-lockin-red shrink-0">+{achievements[0].xpReward} XP</span>
              </div>
            </div>
          )}

          {/* Recent Activity List Card */}
          <div className="stationery-card p-5">
            <h4 className="text-[11px] font-black tracking-wider text-lockin-muted uppercase mb-3">RECENT ACTIVITY</h4>
            <div className="space-y-3">
              {activities.slice(0, 4).map(act => (
                <div key={act.id} className="flex items-center justify-between text-xs font-medium pb-2 border-b border-lockin-border/50 last:border-0 last:pb-0">
                  <div className="flex items-center gap-2 truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-lockin-red shrink-0" />
                    <span className="text-lockin-dark font-semibold truncate">{act.text}</span>
                  </div>
                  <span className="text-lockin-red font-bold shrink-0 ml-2">+{act.xpEarned} XP</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
