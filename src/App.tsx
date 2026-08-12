import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { MobileNav } from './components/layout/MobileNav';
import { ViewToggle } from './components/common/ViewToggle';

// Views
import { DashboardView } from './components/views/DashboardView';
import { QuestsView } from './components/views/QuestsView';
import { FocusView } from './components/views/FocusView';
import { HabitsView } from './components/views/HabitsView';
import { SkillsView } from './components/views/SkillsView';
import { AchievementsView } from './components/views/AchievementsView';
import { ProgressView } from './components/views/ProgressView';
import { SleepView } from './components/views/SleepView';
import { GamingView } from './components/views/GamingView';
import { ProfileView } from './components/views/ProfileView';
import { SettingsView } from './components/views/SettingsView';

// Modals & Drawers
import { LevelUpModal } from './components/modals/LevelUpModal';
import { AchievementModal } from './components/modals/AchievementModal';
import { AddQuestModal } from './components/modals/AddQuestModal';
import { MobileDrawer } from './components/layout/MobileDrawer';

const AppContent: React.FC = () => {
  const { activeTab, viewportMode } = useApp();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'Home':
        return <DashboardView />;
      case 'Quests':
        return <QuestsView />;
      case 'Focus':
        return <FocusView />;
      case 'Habits':
        return <HabitsView />;
      case 'Skills':
        return <SkillsView />;
      case 'Achievements':
        return <AchievementsView />;
      case 'Progress':
        return <ProgressView />;
      case 'Sleep':
        return <SleepView />;
      case 'Gaming':
        return <GamingView />;
      case 'Profile':
        return <ProfileView />;
      case 'Settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  const isMobileMode = viewportMode === 'mobile-preview';

  return (
    <div className={`min-h-screen bg-lockin-bg text-lockin-dark font-sans flex justify-center ${isMobileMode ? 'py-6 px-2' : ''}`}>
      {/* Mobile Frame Container if mobile-preview toggled */}
      <div
        className={`w-full transition-all duration-300 ${
          isMobileMode
            ? 'max-w-[430px] min-h-[880px] bg-lockin-bg rounded-[45px] border-[10px] border-lockin-dark shadow-2xl overflow-hidden relative pb-16'
            : 'max-w-[1600px] flex min-h-screen'
        }`}
      >
        {/* Sidebar (Desktop Mode only) */}
        {!isMobileMode && (
          <div className="hidden lg:block h-full">
            <Sidebar />
          </div>
        )}

        {/* Main Content Area */}
        <main className={`flex-1 flex flex-col min-w-0 ${isMobileMode ? 'p-4' : 'p-6 sm:p-8'}`}>
          <Header />
          <div className="flex-1 mt-2">{renderActiveView()}</div>
        </main>

        {/* Mobile Navigation (Shown on mobile view or mobile screen sizes) */}
        {(isMobileMode || typeof window !== 'undefined') && (
          <div className={isMobileMode ? 'block' : 'block lg:hidden'}>
            <MobileNav />
          </div>
        )}
      </div>

      {/* Floating View Switcher & Audio Controls */}
      <ViewToggle />

      {/* Mobile Navigation Drawer */}
      <MobileDrawer />

      {/* RPG Modals */}
      <LevelUpModal />
      <AchievementModal />
      <AddQuestModal />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
