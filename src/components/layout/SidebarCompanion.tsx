import React from 'react';
import { useApp } from '../../context/AppContext';
import { SparkleDoodle } from '../common/Doodle';
import lockInImg from '../../assets/lock_in.png';

export const SidebarCompanion: React.FC = () => {
  const { isSidebarCollapsed, activeFocusQuest } = useApp();

  if (isSidebarCollapsed) {
    return (
      <div className="w-full flex justify-center py-2 relative group">
        <div className="w-10 h-10 rounded-full bg-lockin-soft-pink/30 border border-lockin-soft-pink overflow-hidden p-0.5 flex items-center justify-center shadow-sm">
          <img
            src={lockInImg}
            alt="Mascot"
            className="w-full h-full object-contain transform group-hover:scale-110 transition-transform"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="my-3 px-2 relative select-none">
      <div
        className={`relative flex items-center justify-center p-3 rounded-3xl transition-all duration-300 ${
          activeFocusQuest
            ? 'bg-gradient-to-b from-white via-white to-lockin-soft-pink/20 border border-lockin-soft-pink soft-glow-pink'
            : 'bg-gradient-to-b from-white via-white to-lockin-secondary/60 border border-lockin-border/60'
        }`}
      >
        {/* Subtle Background Sparkles */}
        <SparkleDoodle color="#F8E7A8" className="absolute top-2 right-3 w-4 h-4 animate-pulse pointer-events-none" />
        <SparkleDoodle color="#F7C6CE" className="absolute bottom-3 left-3 w-4 h-4 animate-bounce-gentle pointer-events-none" />

        {/* Lock In Mascot Image (Preserved exactly as provided) */}
        <img
          src={lockInImg}
          alt="Let's Lock In Mascot"
          className="w-full max-w-[195px] h-auto object-contain drop-shadow-md hover:scale-105 transition-transform duration-300"
        />
      </div>
    </div>
  );
};
