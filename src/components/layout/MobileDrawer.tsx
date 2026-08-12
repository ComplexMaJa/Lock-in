import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { SidebarHeader } from './SidebarHeader';
import { SidebarNavigation } from './SidebarNavigation';
import { SidebarCompanion } from './SidebarCompanion';
import { SidebarPlayer } from './SidebarPlayer';
import { X } from 'lucide-react';

export const MobileDrawer: React.FC = () => {
  const { isMobileDrawerOpen, setIsMobileDrawerOpen } = useApp();

  // Close drawer on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileDrawerOpen) {
        setIsMobileDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileDrawerOpen, setIsMobileDrawerOpen]);

  if (!isMobileDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex select-none animate-fadeIn">
      {/* Backdrop Blur overlay */}
      <div
        className="fixed inset-0 bg-lockin-dark/40 backdrop-blur-sm transition-opacity"
        onClick={() => setIsMobileDrawerOpen(false)}
      />

      {/* Slide-out Left Drawer */}
      <div className="relative w-[280px] max-w-[85vw] bg-lockin-bg min-h-screen h-full p-4 flex flex-col justify-between shadow-2xl z-10 overflow-y-auto transform transition-transform duration-300">
        <button
          onClick={() => setIsMobileDrawerOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full bg-lockin-secondary text-lockin-dark hover:bg-lockin-soft-pink/40 transition-all"
          aria-label="Close Menu"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="pt-2">
          <SidebarHeader />
          <div className="mt-4">
            <SidebarNavigation onNavigate={() => setIsMobileDrawerOpen(false)} />
          </div>
        </div>

        <div className="pt-4 border-t border-lockin-border/60 space-y-3">
          <SidebarCompanion />
          <SidebarPlayer />
        </div>
      </div>
    </div>
  );
};
