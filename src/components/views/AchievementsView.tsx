import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { XPProgressBar } from '../common/XPProgressBar';
import { Trophy, Lock, CheckCircle2 } from 'lucide-react';

export const AchievementsView: React.FC = () => {
  const { achievements } = useApp();
  const [filter, setFilter] = useState<'All' | 'Unlocked' | 'Locked'>('All');

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;
  const progressPercent = Math.round((unlockedCount / totalCount) * 100);

  const filtered = achievements.filter(a => {
    if (filter === 'Unlocked') return a.unlocked;
    if (filter === 'Locked') return !a.unlocked;
    return true;
  });

  const getRarityBadge = (rarity: string) => {
    switch (rarity) {
      case 'Legendary': return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Epic': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Rare': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Uncommon': return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn select-none">
      <div>
        <h2 className="text-2xl font-extrabold text-lockin-dark">Achievements</h2>
        <p className="text-xs text-lockin-muted mt-0.5">
          Collect badges and trophies as you build consistency across your life.
        </p>
      </div>

      {/* Progress Card */}
      <div className="stationery-card p-6 bg-gradient-to-r from-white via-white to-lockin-soft-pink/10">
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="text-[11px] font-black tracking-wider text-lockin-muted uppercase">COLLECTION PROGRESS</span>
            <h3 className="text-3xl font-black text-lockin-dark mt-0.5">{unlockedCount} / {totalCount}</h3>
            <p className="text-xs font-semibold text-lockin-muted">Achievements Unlocked</p>
          </div>
          <span className="text-2xl font-black text-lockin-red">{progressPercent}%</span>
        </div>
        <XPProgressBar progressPercent={progressPercent} barColor="bg-lockin-red" height={10} />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        {(['All', 'Unlocked', 'Locked'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all ${
              filter === f
                ? 'bg-lockin-red text-white shadow-pill'
                : 'bg-white border border-lockin-border text-lockin-muted hover:text-lockin-dark'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Achievement Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(ach => (
          <div
            key={ach.id}
            className={`stationery-card p-4 flex items-center justify-between gap-4 transition-all ${
              ach.unlocked ? 'bg-white' : 'bg-lockin-secondary/40 opacity-70'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className={`p-3 rounded-2xl border ${ach.unlocked ? 'bg-lockin-cream text-[#B87A00] border-lockin-yellow' : 'bg-gray-100 text-gray-400 border-gray-200'}`}>
                {ach.unlocked ? <Trophy className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-extrabold text-lockin-dark">{ach.name}</h4>
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${getRarityBadge(ach.rarity)}`}>
                    {ach.rarity}
                  </span>
                </div>
                <p className="text-xs text-lockin-muted mt-0.5 font-medium">{ach.description}</p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1">
              <span className="text-xs font-black text-lockin-red">+{ach.xpReward} XP</span>
              {ach.unlocked ? (
                <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5">
                  <CheckCircle2 className="w-3 h-3" /> Unlocked
                </span>
              ) : (
                <span className="text-[10px] font-bold text-lockin-muted flex items-center gap-0.5">
                  <Lock className="w-3 h-3" /> Locked
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
