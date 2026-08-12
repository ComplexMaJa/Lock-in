import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { Mascot } from '../common/Mascot';
import { SparkleDoodle } from '../common/Doodle';
import { Trophy, Award, Sparkles, ChevronRight } from 'lucide-react';

export const LevelUpModal: React.FC = () => {
  const { showLevelUpModal, closeLevelUpModal } = useApp();

  useEffect(() => {
    if (showLevelUpModal?.show) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D96B72', '#F7C6CE', '#F8E7A8', '#C7E4F5', '#DDD2F4'],
        });
      } catch (e) {
        console.log(e);
      }
    }
  }, [showLevelUpModal]);

  if (!showLevelUpModal?.show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-lockin-dark/40 backdrop-blur-sm animate-fadeIn select-none">
      <div className="bg-white border-2 border-lockin-soft-pink rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative text-center overflow-hidden">
        {/* Top Decorative Header Sparkles */}
        <div className="absolute top-3 left-6">
          <SparkleDoodle color="#F8E7A8" className="w-6 h-6 animate-spin" />
        </div>
        <div className="absolute top-3 right-6">
          <SparkleDoodle color="#F7C6CE" className="w-6 h-6" />
        </div>

        {/* Mascot Celebrating */}
        <div className="my-2 flex justify-center">
          <Mascot expression="cheering" size={130} className="animate-bounce-gentle" />
        </div>

        {/* Title */}
        <div className="inline-block px-4 py-1 bg-lockin-soft-pink/40 text-lockin-red font-black text-xs rounded-full uppercase tracking-widest mb-2 border border-lockin-soft-pink">
          LEVEL UP!
        </div>

        <h3 className="text-4xl font-extrabold text-lockin-dark tracking-tight flex items-center justify-center gap-3 my-2">
          <span>Lv. {showLevelUpModal.oldLevel}</span>
          <ChevronRight className="w-6 h-6 text-lockin-red" />
          <span className="text-lockin-red">Lv. {showLevelUpModal.newLevel}</span>
        </h3>

        <p className="text-sm font-medium text-lockin-muted mb-6">
          Future you is proud of this progress! Keep locking in.
        </p>

        {/* Rewards Unlocked Box */}
        <div className="bg-lockin-secondary p-4 rounded-2xl border border-lockin-border text-left space-y-2.5 mb-6">
          <div className="text-xs font-bold text-lockin-muted uppercase tracking-wider mb-1 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-lockin-red" />
            <span>UNLOCKED REWARDS</span>
          </div>

          <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-lockin-border">
            <Award className="w-5 h-5 text-lockin-red" />
            <div>
              <p className="text-xs font-extrabold text-lockin-dark">New Title: DISCIPLINED</p>
              <p className="text-[11px] text-lockin-muted">Equippable in Profile</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-lockin-border">
            <Trophy className="w-5 h-5 text-lockin-yellow" />
            <div>
              <p className="text-xs font-extrabold text-lockin-dark">+1 Achievement Point</p>
              <p className="text-[11px] text-lockin-muted">Added to lifetime score</p>
            </div>
          </div>
        </div>

        {/* Claim Button */}
        <button
          onClick={closeLevelUpModal}
          className="w-full py-3.5 bg-lockin-red text-white font-extrabold rounded-2xl shadow-pill hover:bg-[#c45a61] transition-all transform active:scale-95"
        >
          CLAIM REWARDS ✦
        </button>
      </div>
    </div>
  );
};
