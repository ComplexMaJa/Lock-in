import React from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, User, Sparkles, Menu } from 'lucide-react';
import { CatDoodle } from '../common/Doodle';

export const Header: React.FC = () => {
  const { userProfile, setActiveTab, setIsMobileDrawerOpen } = useApp();

  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 sm:pb-4 relative select-none">
      {/* Greeting Title & Mobile Menu Trigger */}
      <div className="flex items-center justify-between w-full md:w-auto">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-xs font-bold tracking-widest text-lockin-muted uppercase">GOOD EVENING,</span>
          </div>
          <h2 className="text-3xl font-extrabold text-lockin-dark tracking-tight flex items-center gap-1.5 mt-0.5">
            {userProfile.name}
            <span className="text-lockin-red font-bold">.</span>
          </h2>
          <p className="text-sm font-medium text-lockin-muted mt-1">
            What are we locking in on today?
          </p>
        </div>

        {/* Mobile Hamburger Menu Button */}
        <button
          onClick={() => setIsMobileDrawerOpen(true)}
          className="md:hidden p-2.5 rounded-full bg-white border border-lockin-border text-lockin-dark hover:bg-lockin-secondary shadow-card"
          aria-label="Open Mobile Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Decorative Cat Doodle in background */}
      <div className="hidden lg:block absolute left-[320px] top-1 opacity-20 pointer-events-none">
        <CatDoodle stroke="#242424" />
      </div>

      {/* Right User Bar */}
      <div className="flex items-center gap-3">
        {/* Notifications Button */}
        <button className="p-2.5 rounded-full bg-white border border-lockin-border text-lockin-dark/70 hover:text-lockin-dark hover:bg-lockin-secondary transition-all shadow-card relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-lockin-red rounded-full" />
        </button>

        {/* Profile Avatar Button */}
        <button
          onClick={() => setActiveTab('Profile')}
          className="p-2.5 rounded-full bg-white border border-lockin-border text-lockin-dark/70 hover:text-lockin-dark hover:bg-lockin-secondary transition-all shadow-card"
        >
          <User className="w-4 h-4" />
        </button>

        {/* Level / Rank Badge Pill */}
        <button
          onClick={() => setActiveTab('Profile')}
          className="flex items-center gap-2 px-3.5 py-1.5 bg-white border border-lockin-border rounded-full shadow-card hover:border-lockin-soft-pink transition-all"
        >
          <Sparkles className="w-4 h-4 text-lockin-red" />
          <div className="flex items-center gap-1.5 text-xs font-extrabold text-lockin-dark">
            <span>LEVEL {userProfile.level}</span>
            <span className="text-lockin-muted">•</span>
            <span className="text-lockin-red">RANK {userProfile.rank}</span>
          </div>
        </button>
      </div>
    </header>
  );
};
