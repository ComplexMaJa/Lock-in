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
import { FocusWarningModal } from './components/modals/FocusWarningModal';
import { MobileDrawer } from './components/layout/MobileDrawer';

const AppContent: React.FC = () => {
  const { activeTab, viewportMode, focusSession, setActiveTab } = useApp();

  const isImmersiveMode = Boolean(
    focusSession &&
    (focusSession.state === 'RUNNING' || focusSession.state === 'PAUSED' || focusSession.state === 'READY_TO_CLAIM')
  );

  // Intercept browser Back button when focus session is active
  React.useEffect(() => {
    if (isImmersiveMode) {
      window.history.pushState(null, '', window.location.href);
      const handlePopState = (e: PopStateEvent) => {
        e.preventDefault();
        window.history.pushState(null, '', window.location.href);
        setActiveTab('Focus');
      };
      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
    }
  }, [isImmersiveMode, setActiveTab]);

  const renderActiveView = () => {
    if (isImmersiveMode) {
      return <FocusView />;
    }

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
    <div className={`min-h-screen bg-lockin-bg text-lockin-dark font-sans flex ${isMobileMode ? 'justify-center py-6 px-2' : ''}`}>
      {/* Container - Flush left on desktop view */}
      <div
        className={`w-full transition-all duration-300 ${
          isMobileMode
            ? 'max-w-[430px] min-h-[880px] bg-lockin-bg rounded-[45px] border-[10px] border-lockin-dark shadow-2xl overflow-hidden relative pb-16'
            : 'flex min-h-screen w-full'
        }`}
      >
        {/* Sidebar (Desktop Mode only - Hidden during Immersive Active Focus Mode) */}
        {!isMobileMode && !isImmersiveMode && (
          <div className="hidden lg:block h-full">
            <Sidebar />
          </div>
        )}

        {/* Main Content Area */}
        <main className={`flex-1 flex flex-col min-w-0 ${isMobileMode ? 'p-4' : 'p-6 sm:p-8'}`}>
          {!isImmersiveMode && <Header />}
          <div className="flex-1 mt-2">{renderActiveView()}</div>
        </main>

        {/* Mobile Navigation (Hidden during Immersive Active Focus Mode) */}
        {!isImmersiveMode && (isMobileMode || typeof window !== 'undefined') && (
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
      <FocusWarningModal />
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
