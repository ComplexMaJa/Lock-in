import React from 'react';
import { useApp } from '../../context/AppContext';
import { SparkleDoodle } from '../common/Doodle';
import lockInImg from '../../assets/lock_in.png';

export const SidebarCompanion: React.FC = () => {
  const { isSidebarCollapsed } = useApp();

  if (isSidebarCollapsed) {
    return (
      <div className="w-full flex justify-center py-2 relative group select-none">
        <div className="w-10 h-10 rounded-full overflow-hidden p-0.5 flex items-center justify-center">
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
    <div className="my-2 px-2 relative select-none flex items-center justify-center">
      {/* Subtle Floating Sparkles */}
      <SparkleDoodle color="#F8E7A8" className="absolute top-1 right-2 w-4 h-4 animate-pulse pointer-events-none" />
      <SparkleDoodle color="#F7C6CE" className="absolute bottom-1 left-2 w-4 h-4 animate-bounce-gentle pointer-events-none" />

      {/* Lock In Mascot Image without any container background or card */}
      <img
        src={lockInImg}
        alt="Let's Lock In Mascot"
        className="w-full max-w-[185px] h-auto object-contain drop-shadow-md hover:scale-105 transition-transform duration-300"
      />
    </div>
  );
};
