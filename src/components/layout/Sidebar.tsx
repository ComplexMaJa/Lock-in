import React from 'react';
import { useApp } from '../../context/AppContext';
import type { ActiveTab } from '../../types';
import { Mascot } from '../common/Mascot';
import { SparkleDoodle } from '../common/Doodle';
import {
  Home,
  Target,
  Clock,
  CheckSquare,
  Award,
  Trophy,
  BarChart3,
  Moon,
  Gamepad2,
  Settings
} from 'lucide-react';

interface NavItem {
  tab: ActiveTab;
  label: string;
  icon: React.ReactNode;
}

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  const navItems: NavItem[] = [
    { tab: 'Home', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { tab: 'Quests', label: 'Quests', icon: <Target className="w-4 h-4" /> },
    { tab: 'Focus', label: 'Focus', icon: <Clock className="w-4 h-4" /> },
    { tab: 'Habits', label: 'Habits', icon: <CheckSquare className="w-4 h-4" /> },
    { tab: 'Skills', label: 'Skills', icon: <Award className="w-4 h-4" /> },
    { tab: 'Achievements', label: 'Achievements', icon: <Trophy className="w-4 h-4" /> },
    { tab: 'Progress', label: 'Progress', icon: <BarChart3 className="w-4 h-4" /> },
    { tab: 'Sleep', label: 'Sleep', icon: <Moon className="w-4 h-4" /> },
    { tab: 'Gaming', label: 'Gaming', icon: <Gamepad2 className="w-4 h-4" /> },
    { tab: 'Settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <aside className="w-64 bg-lockin-bg min-h-screen p-5 flex flex-col justify-between border-r border-lockin-border select-none">
      <div>
        {/* Brand Wordmark Logo */}
        <div className="mb-8 px-2">
          <div className="flex items-center gap-1.5">
            <h1 className="text-2xl font-extrabold tracking-tight text-lockin-dark">LOCK-IN</h1>
            <SparkleDoodle color="#D96B72" className="animate-pulse" />
          </div>
          <p className="text-xs text-lockin-muted font-medium mt-0.5">Get your life together.</p>
        </div>

        {/* Navigation items */}
        <nav className="space-y-1">
          {navItems.map(item => {
            const isActive = activeTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => setActiveTab(item.tab)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-lockin-red text-white shadow-pill transform scale-[1.02]'
                    : 'text-lockin-dark/70 hover:text-lockin-dark hover:bg-lockin-secondary'
                }`}
              >
                <span className={isActive ? 'text-white' : 'text-lockin-dark/60'}>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mascot Speech Bubble at bottom of sidebar */}
      <div className="mt-8 pt-4 border-t border-lockin-border/60 relative flex flex-col items-center">
        {/* Speech Bubble */}
        <div className="bg-white border border-lockin-border px-3.5 py-2 rounded-2xl shadow-card text-center mb-2 relative animate-float">
          <p className="text-xs font-extrabold text-lockin-dark">Let's lock in.</p>
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r border-b border-lockin-border transform rotate-45" />
        </div>
        {/* Mascot */}
        <Mascot expression="idle" size={90} className="hover:scale-105 transition-transform cursor-pointer" />
      </div>
    </aside>
  );
};
