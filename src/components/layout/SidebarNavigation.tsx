import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { ActiveTab } from '../../types';
import {
  Home,
  Swords,
  Clock,
  CheckSquare,
  BarChart2,
  Trophy,
  TrendingUp,
  Moon,
  Gamepad2,
  Settings,
  User
} from 'lucide-react';

interface NavConfig {
  tab: ActiveTab;
  label: string;
  icon: React.ReactNode;
  group: 'main' | 'life' | 'system';
}

export const SidebarNavigation: React.FC<{ onNavigate?: () => void }> = ({ onNavigate }) => {
  const { activeTab, setActiveTab, quests, achievements, activeFocusQuest, isSidebarCollapsed } = useApp();
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  const incompleteQuestsCount = quests.filter(q => !q.completed).length;
  const unlockedAchieveCount = achievements.filter(a => a.unlocked).length;

  const navItems: NavConfig[] = [
    { tab: 'Home', label: 'Home', icon: <Home className="w-4 h-4" />, group: 'main' },
    { tab: 'Quests', label: 'Quests', icon: <Swords className="w-4 h-4" />, group: 'main' },
    { tab: 'Focus', label: 'Focus', icon: <Clock className="w-4 h-4" />, group: 'main' },
    { tab: 'Habits', label: 'Habits', icon: <CheckSquare className="w-4 h-4" />, group: 'main' },
    { tab: 'Skills', label: 'Skills', icon: <BarChart2 className="w-4 h-4" />, group: 'main' },
    { tab: 'Achievements', label: 'Achievements', icon: <Trophy className="w-4 h-4" />, group: 'main' },
    { tab: 'Progress', label: 'Progress', icon: <TrendingUp className="w-4 h-4" />, group: 'main' },
    { tab: 'Sleep', label: 'Sleep', icon: <Moon className="w-4 h-4" />, group: 'life' },
    { tab: 'Gaming', label: 'Gaming', icon: <Gamepad2 className="w-4 h-4" />, group: 'life' },
    { tab: 'Profile', label: 'Profile', icon: <User className="w-4 h-4" />, group: 'system' },
    { tab: 'Settings', label: 'Settings', icon: <Settings className="w-4 h-4" />, group: 'system' },
  ];

  const handleSelect = (tab: ActiveTab) => {
    setActiveTab(tab);
    if (onNavigate) onNavigate();
  };

  const getBadge = (tab: ActiveTab) => {
    if (tab === 'Quests' && incompleteQuestsCount > 0) {
      return (
        <span className="text-[10px] font-extrabold bg-lockin-soft-pink/60 text-lockin-red px-2 py-0.5 rounded-full border border-lockin-soft-pink">
          {incompleteQuestsCount}
        </span>
      );
    }
    if (tab === 'Focus' && activeFocusQuest) {
      return (
        <span className="inline-flex items-center gap-1 text-[10px] font-extrabold bg-lockin-red text-white px-2 py-0.5 rounded-full animate-pulse shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-white" />
          <span>Active</span>
        </span>
      );
    }
    if (tab === 'Achievements' && unlockedAchieveCount > 0) {
      return (
        <span className="text-[10px] font-extrabold bg-lockin-cream text-[#B87A00] px-2 py-0.5 rounded-full border border-lockin-yellow">
          {unlockedAchieveCount}
        </span>
      );
    }
    return null;
  };

  const renderGroup = (groupName: 'main' | 'life' | 'system', headerLabel?: string) => {
    const items = navItems.filter(i => i.group === groupName);

    return (
      <div className="space-y-1 my-2">
        {headerLabel && !isSidebarCollapsed && (
          <span className="text-[10px] font-black tracking-widest text-lockin-muted uppercase px-4 my-1 block">
            {headerLabel}
          </span>
        )}

        {items.map(item => {
          const isActive = activeTab === item.tab;
          const badge = getBadge(item.tab);

          return (
            <div
              key={item.tab}
              className="relative group"
              onMouseEnter={() => setHoveredTab(item.tab)}
              onMouseLeave={() => setHoveredTab(null)}
            >
              <button
                onClick={() => handleSelect(item.tab)}
                aria-label={item.label}
                className={`w-full flex items-center gap-3 py-2.5 rounded-2xl text-xs font-bold transition-all duration-200 relative select-none transform active:scale-95 ${
                  isSidebarCollapsed ? 'justify-center px-2' : 'px-4'
                } ${
                  isActive
                    ? 'bg-lockin-red text-white shadow-pill font-black'
                    : 'text-lockin-dark/70 hover:text-lockin-dark hover:bg-lockin-secondary'
                }`}
              >
                {/* Active Indicator Line on Left */}
                {isActive && !isSidebarCollapsed && (
                  <div className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-5 bg-white rounded-full" />
                )}

                {/* Icon with 1-2px subtle hover translate */}
                <span
                  className={`transition-transform duration-200 ${
                    isActive ? 'text-white scale-105' : 'text-lockin-dark/60 group-hover:translate-x-0.5'
                  }`}
                >
                  {item.icon}
                </span>

                {/* Label */}
                {!isSidebarCollapsed && (
                  <span className="truncate flex-1 text-left">{item.label}</span>
                )}

                {/* Badge when expanded */}
                {!isSidebarCollapsed && badge}
              </button>

              {/* Tooltip for Collapsed Sidebar */}
              {isSidebarCollapsed && hoveredTab === item.tab && (
                <div className="fixed left-20 z-50 px-3 py-1.5 bg-lockin-dark text-white text-xs font-extrabold rounded-xl shadow-xl whitespace-nowrap animate-fadeIn flex items-center gap-2 pointer-events-none">
                  <span>{item.label}</span>
                  {badge}
                  <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-lockin-dark transform rotate-45" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <nav className="space-y-3">
      {renderGroup('main')}
      <div className="h-[1px] bg-lockin-border/50 my-2" />
      {renderGroup('life', 'Life')}
      <div className="h-[1px] bg-lockin-border/50 my-2" />
      {renderGroup('system', 'Account')}
    </nav>
  );
};
