import React from 'react';
import { useApp } from '../../context/AppContext';
import type { ActiveTab } from '../../types';
import { Home, Target, Clock, BarChart3, User } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  const mobileTabs: { tab: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { tab: 'Home', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { tab: 'Quests', label: 'Quests', icon: <Target className="w-5 h-5" /> },
    { tab: 'Focus', label: 'Focus', icon: <Clock className="w-5 h-5" /> },
    { tab: 'Progress', label: 'Progress', icon: <BarChart3 className="w-5 h-5" /> },
    { tab: 'Profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-lockin-border px-4 py-2 flex items-center justify-around shadow-lg">
      {mobileTabs.map(item => {
        const isActive = activeTab === item.tab;
        return (
          <button
            key={item.tab}
            onClick={() => setActiveTab(item.tab)}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all ${
              isActive ? 'text-lockin-red font-bold scale-105' : 'text-lockin-muted font-medium hover:text-lockin-dark'
            }`}
          >
            <div className={`p-1 rounded-full ${isActive ? 'bg-lockin-soft-pink/40' : ''}`}>
              {item.icon}
            </div>
            <span className="text-[10px] mt-0.5">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
