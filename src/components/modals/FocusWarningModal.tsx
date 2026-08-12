import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { SparkleDoodle } from '../common/Doodle';
import lockInImg from '../../assets/lock_in.png';
import { Lock, Zap, ShieldAlert, ArrowLeft } from 'lucide-react';

const FOCUS_QUOTES = [
  "Hey! You're in Focus Mode! Stay locked in to claim your +10 Focus Bonus XP!",
  "Distraction detected! 🛑 Deep focus protects your productivity combo!",
  "Quest in progress! Lock in for just a few more minutes to keep the run alive!",
  "Future you will thank you if you finish this focus session first!"
];

export const FocusWarningModal: React.FC = () => {
  const { showFocusWarningModal, closeFocusWarningModal, confirmAbandonFocus } = useApp();
  const [quoteIndex, setQuoteIndex] = useState<number>(0);

  useEffect(() => {
    if (showFocusWarningModal?.show) {
      setQuoteIndex(Math.floor(Math.random() * FOCUS_QUOTES.length));
    }
  }, [showFocusWarningModal?.show]);

  if (!showFocusWarningModal?.show) return null;

  const targetTab = showFocusWarningModal.pendingTab || 'Dashboard';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none animate-fadeIn">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-lockin-dark/60 backdrop-blur-md transition-opacity"
        onClick={closeFocusWarningModal}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border-4 border-lockin-soft-pink z-10 text-center overflow-hidden animate-scaleUp">
        {/* Top Header Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-lockin-soft-pink/40 text-lockin-red font-black text-xs rounded-full border border-lockin-soft-pink mb-3 shadow-sm">
          <ShieldAlert className="w-3.5 h-3.5 animate-bounce" />
          <span>FOCUS SHIELD ACTIVE</span>
        </div>

        {/* Mascot & Lock Graphic */}
        <div className="relative my-2 flex justify-center items-center">
          <div className="relative w-36 h-36 flex items-center justify-center">
            <img
              src={lockInImg}
              alt="Locked Mascot"
              className="w-full h-full object-contain drop-shadow-lg transform hover:scale-105 transition-transform"
            />
            <div className="absolute -bottom-1 -right-1 p-2 bg-lockin-red text-white rounded-full border-2 border-white shadow-md animate-pulse">
              <Lock className="w-5 h-5" />
            </div>
          </div>
          <SparkleDoodle color="#F8E7A8" className="absolute top-0 right-8 w-6 h-6 animate-pulse" />
          <SparkleDoodle color="#D96B72" className="absolute bottom-2 left-8 w-5 h-5 animate-spin-slow" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-black text-lockin-dark tracking-tight mt-2">
          Hold On! You're Locked In! ⚡
        </h3>

        {/* Quote */}
        <p className="text-xs font-semibold text-lockin-muted bg-lockin-secondary/60 p-3 rounded-2xl border border-lockin-border my-3 italic">
          "{FOCUS_QUOTES[quoteIndex]}"
        </p>

        <p className="text-[11px] font-bold text-lockin-dark/70 mb-5">
          Leaving Focus Mode now to go to <span className="text-lockin-red font-extrabold">{targetTab}</span> will pause your focus streak.
        </p>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          <button
            onClick={closeFocusWarningModal}
            className="w-full py-3.5 bg-lockin-red text-white font-black text-xs rounded-2xl shadow-pill hover:bg-[#c45a61] transition-all transform active:scale-95 flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4 fill-white" />
            <span>STAY LOCKED IN ⚡</span>
          </button>

          <button
            onClick={confirmAbandonFocus}
            className="w-full py-2.5 text-xs font-bold text-lockin-muted hover:text-lockin-dark hover:bg-lockin-secondary/60 rounded-xl transition-all flex items-center justify-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Leave anyway (Pause focus session)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
