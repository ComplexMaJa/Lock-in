import React from 'react';
import { useApp } from '../../context/AppContext';
import { SparkleDoodle } from '../common/Doodle';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const SidebarHeader: React.FC = () => {
  const { isSidebarCollapsed, toggleSidebarCollapsed } = useApp();

  return (
    <div className="flex items-center justify-between px-3 py-4 mb-2 select-none border-b border-lockin-border/40">
      {!isSidebarCollapsed ? (
        <div className="min-w-0 pr-2">
          <div className="flex items-center gap-1.5">
            <h1 className="text-xl font-black tracking-tight text-lockin-dark">LOCK-IN</h1>
            <SparkleDoodle color="#D96B72" className="animate-pulse w-4 h-4 shrink-0" />
          </div>
          <p className="text-[11px] text-lockin-muted font-semibold truncate">Get your life together.</p>
        </div>
      ) : (
        <div className="w-full flex justify-center py-1">
          <SparkleDoodle color="#D96B72" className="w-6 h-6 animate-pulse" />
        </div>
      )}

      {/* Collapse Toggle Button */}
      <button
        onClick={toggleSidebarCollapsed}
        className="p-1.5 rounded-full bg-lockin-secondary hover:bg-lockin-soft-pink/30 text-lockin-dark/70 hover:text-lockin-red border border-lockin-border transition-all transform active:scale-95 shrink-0"
        title={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        aria-label={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
      >
        {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </div>
  );
};
