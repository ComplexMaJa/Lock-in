import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Mascot } from '../common/Mascot';
import { XPProgressBar } from '../common/XPProgressBar';
import { SparkleDoodle } from '../common/Doodle';
import { Award, Check, Crown, Flame, Target, Clock, Settings } from 'lucide-react';

const AVAILABLE_TITLES = [
  'LOCKED IN',
  'DISCIPLINED',
  'Coder',
  'Grinder',
  'Early Bird',
  'Night Owl',
  'Scholar',
  'Balanced',
  'Elite',
];

export const ProfileView: React.FC = () => {
  const { userProfile, equipTitle, setActiveTab } = useApp();
  const [showTitleSelector, setShowTitleSelector] = useState(false);

  return (
    <div className="space-y-6 pb-12 animate-fadeIn max-w-3xl mx-auto select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-lockin-dark">Character Sheet</h2>
          <p className="text-xs text-lockin-muted mt-0.5">
            Your personal RPG character status, equipped titles, and lifetime stats.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('Settings')}
          className="p-2.5 rounded-full bg-white border border-lockin-border text-lockin-muted hover:text-lockin-dark transition-all"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>

      {/* Main RPG Character Card */}
      <div className="stationery-card p-6 sm:p-8 bg-gradient-to-b from-white via-white to-lockin-soft-pink/10 text-center relative overflow-hidden">
        {/* Decorative Sparkles */}
        <div className="absolute top-4 left-6">
          <SparkleDoodle color="#F8E7A8" className="w-6 h-6 animate-pulse" />
        </div>
        <div className="absolute top-4 right-6">
          <SparkleDoodle color="#F7C6CE" className="w-6 h-6" />
        </div>

        {/* Mascot Avatar with Avatar Frame */}
        <div className="relative inline-block my-2">
          <div className="p-2 rounded-full bg-gradient-to-r from-lockin-soft-pink via-lockin-yellow to-lockin-blue p-1 shadow-soft">
            <div className="bg-white rounded-full p-2">
              <Mascot expression="idle" size={130} />
            </div>
          </div>
        </div>

        {/* Character Name & Equipped Title */}
        <h3 className="text-3xl font-black text-lockin-dark mt-2 tracking-tight">
          {userProfile.name}
        </h3>

        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-lockin-cream text-[#B87A00] font-black text-xs rounded-full border border-lockin-yellow my-2">
          <Crown className="w-3.5 h-3.5" />
          <span>"{userProfile.equippedTitle}"</span>
        </div>

        {/* Level & Rank status */}
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto my-6 text-left p-4 bg-lockin-secondary/60 rounded-2xl border border-lockin-border">
          <div>
            <span className="text-[10px] font-black tracking-wider text-lockin-muted uppercase">LEVEL {userProfile.level}</span>
            <p className="text-xs font-bold text-lockin-dark mt-0.5">{userProfile.currentXp} / {userProfile.maxXp} XP</p>
            <XPProgressBar progressPercent={userProfile.levelProgressPercent} barColor="bg-lockin-red" height={6} className="mt-1" />
          </div>

          <div>
            <span className="text-[10px] font-black tracking-wider text-lockin-muted uppercase">RANK {userProfile.rank}</span>
            <p className="text-xs font-bold text-lockin-dark mt-0.5">{userProfile.rankProgressPercent}% to S Rank</p>
            <XPProgressBar progressPercent={userProfile.rankProgressPercent} barColor="bg-lockin-dark" height={6} className="mt-1" />
          </div>
        </div>

        {/* Lifetime Stats 4 Box Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3 bg-white rounded-2xl border border-lockin-border">
            <Target className="w-4 h-4 text-lockin-red mx-auto mb-1" />
            <p className="text-lg font-black text-lockin-dark">{userProfile.totalTasksCompletedLifetime}</p>
            <span className="text-[10px] font-bold text-lockin-muted uppercase">Tasks Completed</span>
          </div>

          <div className="p-3 bg-white rounded-2xl border border-lockin-border">
            <Clock className="w-4 h-4 text-[#2B7A9E] mx-auto mb-1" />
            <p className="text-lg font-black text-lockin-dark">{userProfile.totalFocusHoursLifetime}</p>
            <span className="text-[10px] font-bold text-lockin-muted uppercase">Focus Hours</span>
          </div>

          <div className="p-3 bg-white rounded-2xl border border-lockin-border">
            <Award className="w-4 h-4 text-[#B87A00] mx-auto mb-1" />
            <p className="text-lg font-black text-lockin-dark">{userProfile.totalAchievementsUnlocked} / 100</p>
            <span className="text-[10px] font-bold text-lockin-muted uppercase">Achievements</span>
          </div>

          <div className="p-3 bg-white rounded-2xl border border-lockin-border">
            <Flame className="w-4 h-4 text-lockin-red mx-auto mb-1" />
            <p className="text-lg font-black text-lockin-dark">{userProfile.longestStreakDays} days</p>
            <span className="text-[10px] font-bold text-lockin-muted uppercase">Longest Streak</span>
          </div>
        </div>
      </div>

      {/* Change Title Section */}
      <div className="stationery-card p-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h4 className="text-xs font-black tracking-wider text-lockin-muted uppercase">EQUIPPED TITLE</h4>
            <p className="text-sm font-extrabold text-lockin-dark">"{userProfile.equippedTitle}"</p>
          </div>

          <button
            onClick={() => setShowTitleSelector(!showTitleSelector)}
            className="px-4 py-1.5 bg-lockin-secondary border border-lockin-border hover:border-lockin-soft-pink text-xs font-bold rounded-full transition-all"
          >
            {showTitleSelector ? 'Close' : 'Change Title'}
          </button>
        </div>

        {showTitleSelector && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-3 border-t border-lockin-border">
            {AVAILABLE_TITLES.map(title => {
              const isEquipped = userProfile.equippedTitle === title;
              return (
                <button
                  key={title}
                  onClick={() => {
                    equipTitle(title);
                    setShowTitleSelector(false);
                  }}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-between transition-all ${
                    isEquipped
                      ? 'bg-lockin-soft-pink/30 border-lockin-soft-pink text-lockin-red'
                      : 'bg-white border-lockin-border hover:border-lockin-soft-pink text-lockin-dark'
                  }`}
                >
                  <span>"{title}"</span>
                  {isEquipped && <Check className="w-3.5 h-3.5 text-lockin-red" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
