import React from 'react';
import { useApp } from '../../context/AppContext';
import { getOSUsername } from '../../utils/getOSUsername';
import { XPProgressBar } from '../common/XPProgressBar';
import { Mascot } from '../common/Mascot';
import { Flame } from 'lucide-react';

export const SidebarPlayer: React.FC = () => {
  const { userProfile, setActiveTab, isSidebarCollapsed } = useApp();
  const osUsername = getOSUsername();
  const displayName = userProfile.name && userProfile.name !== 'Bumi' ? userProfile.name : osUsername;

  if (isSidebarCollapsed) {
    return (
      <button
        onClick={() => setActiveTab('Profile')}
        className="w-full flex justify-center py-2 relative group"
        title={`${displayName} - Lv. ${userProfile.level} Rank ${userProfile.rank}`}
        aria-label="View Profile"
      >
        <div className="w-10 h-10 rounded-full bg-lockin-soft-pink/30 border border-lockin-red flex items-center justify-center overflow-hidden p-0.5 shadow-sm transform group-hover:scale-105 transition-transform">
          <Mascot expression="idle" size={40} />
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={() => setActiveTab('Profile')}
      className="w-full stationery-card p-3 bg-gradient-to-r from-white via-white to-lockin-cream/30 hover:border-lockin-soft-pink transition-all text-left select-none group transform active:scale-95 shadow-sm"
    >
      <div className="flex items-center gap-2.5 mb-2">
        <div className="p-0.5 rounded-full bg-lockin-soft-pink/40 border border-lockin-red shrink-0">
          <Mascot expression="idle" size={38} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-black text-lockin-dark truncate group-hover:text-lockin-red transition-colors">
              {displayName}
            </h4>
            <span className="text-[10px] font-black text-lockin-red bg-lockin-soft-pink/30 px-1.5 py-0.5 rounded-full">
              {userProfile.rank}
            </span>
          </div>

          <div className="flex items-center gap-1 text-[10px] font-bold text-lockin-muted mt-0.5">
            <span>Lv. {userProfile.level}</span>
            <span>•</span>
            <span className="flex items-center gap-0.5 text-lockin-red">
              <Flame className="w-3 h-3 fill-lockin-red" />
              {userProfile.streakDays}d
            </span>
          </div>
        </div>
      </div>

      <div className="w-full">
        <XPProgressBar progressPercent={userProfile.levelProgressPercent} barColor="bg-lockin-red" height={5} />
        <div className="flex items-center justify-between text-[9px] font-extrabold text-lockin-muted mt-1">
          <span>{userProfile.currentXp} / {userProfile.maxXp} XP</span>
          <span>{userProfile.levelProgressPercent}%</span>
        </div>
      </div>
    </button>
  );
};
