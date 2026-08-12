import React from 'react';
import { useApp } from '../../context/AppContext';
import { Mascot } from '../common/Mascot';
import { SparkleDoodle } from '../common/Doodle';
import { Trophy, Zap } from 'lucide-react';

export const AchievementModal: React.FC = () => {
  const { showAchievementModal, closeAchievementModal } = useApp();

  if (!showAchievementModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-lockin-dark/40 backdrop-blur-sm animate-fadeIn select-none">
      <div className="bg-white border-2 border-lockin-yellow rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative text-center overflow-hidden">
        {/* Sparkles */}
        <div className="absolute top-4 left-6">
          <SparkleDoodle color="#F8E7A8" className="w-6 h-6 animate-pulse" />
        </div>
        <div className="absolute top-4 right-6">
          <SparkleDoodle color="#D96B72" className="w-5 h-5" />
        </div>

        <div className="my-2 flex justify-center">
          <Mascot expression="happy" size={110} />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-lockin-cream text-[#B87A00] font-black text-xs rounded-full uppercase tracking-wider mb-2 border border-lockin-yellow">
          <Trophy className="w-3.5 h-3.5" />
          <span>ACHIEVEMENT UNLOCKED!</span>
        </div>

        <h3 className="text-2xl font-extrabold text-lockin-dark mt-1">
          {showAchievementModal.name}
        </h3>

        <p className="text-xs font-medium text-lockin-muted my-2 px-4">
          "{showAchievementModal.description}"
        </p>

        {/* Reward pill */}
        <div className="inline-flex items-center gap-2 bg-lockin-soft-pink/30 text-lockin-red font-extrabold px-4 py-1.5 rounded-full text-sm my-3 border border-lockin-soft-pink">
          <Zap className="w-4 h-4 fill-lockin-red" />
          <span>+{showAchievementModal.xpReward} XP EARNED</span>
        </div>

        <button
          onClick={closeAchievementModal}
          className="w-full mt-4 py-3 bg-lockin-dark text-white font-extrabold rounded-2xl hover:bg-black transition-all shadow-md active:scale-95"
        >
          CONTINUE ✦
        </button>
      </div>
    </div>
  );
};
