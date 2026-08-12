import React from 'react';
import { useApp } from '../../context/AppContext';
import { SidebarHeader } from './SidebarHeader';
import { SidebarNavigation } from './SidebarNavigation';
import { SidebarCompanion } from './SidebarCompanion';
import { SidebarPlayer } from './SidebarPlayer';

export const Sidebar: React.FC = () => {
  const { isSidebarCollapsed } = useApp();

  return (
    <aside
      className={`bg-lockin-bg min-h-screen h-full flex flex-col justify-between border-r border-lockin-border/70 select-none transition-all duration-300 ease-in-out shrink-0 ${
        isSidebarCollapsed ? 'w-[72px] p-2' : 'w-[230px] p-3.5'
      }`}
    >
      {/* Top Header */}
      <SidebarHeader />

      {/* Middle Scrollable Navigation List */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden pr-1 my-1 scrollbar-thin">
        <SidebarNavigation />
      </div>

      {/* Bottom Fixed Companion & Player Card */}
      <div className="pt-2 border-t border-lockin-border/40 space-y-2 shrink-0">
        <SidebarCompanion />
        <SidebarPlayer />
      </div>
    </aside>
  );
};
