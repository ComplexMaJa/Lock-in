import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  UserProfile,
  Quest,
  Skill,
  Achievement,
  Habit,
  SleepLog,
  GamingLog,
  ActivityItem,
  ActiveTab
} from '../types';
import {
  DEFAULT_USER_PROFILE,
  DEFAULT_QUESTS,
  DEFAULT_SKILLS,
  DEFAULT_HABITS,
  DEFAULT_SLEEP_LOG,
  DEFAULT_GAMING_LOG,
  DEFAULT_ACTIVITIES,
  INITIAL_ACHIEVEMENTS
} from '../constants/defaultState';
import { playQuestCompleteSound, playLevelUpSound, playAchievementSound, playClickSound } from '../utils/sound';

interface AppContextType {
  userProfile: UserProfile;
  quests: Quest[];
  skills: Skill[];
  achievements: Achievement[];
  habits: Habit[];
  sleepLog: SleepLog;
  gamingLog: GamingLog;
  activities: ActivityItem[];
  soundEnabled: boolean;
  viewportMode: 'desktop' | 'mobile-preview';
  activeTab: ActiveTab;
  activeFocusQuest: Quest | null;
  isSidebarCollapsed: boolean;
  isMobileDrawerOpen: boolean;
  showLevelUpModal: { show: boolean; oldLevel: number; newLevel: number } | null;
  showAchievementModal: Achievement | null;
  showAddQuestModal: boolean;
  
  // Actions
  setActiveTab: (tab: ActiveTab) => void;
  setViewportMode: (mode: 'desktop' | 'mobile-preview') => void;
  setSoundEnabled: (enabled: boolean) => void;
  setIsSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebarCollapsed: () => void;
  setIsMobileDrawerOpen: (open: boolean) => void;
  completeQuest: (questId: string) => void;
  addQuest: (questData: Partial<Quest>) => void;
  deleteQuest: (questId: string) => void;
  toggleHabit: (habitId: string) => void;
  logSleep: (log: Partial<SleepLog>) => void;
  addGamingEntry: (game: string, durationMinutes: number) => void;
  equipTitle: (title: string) => void;
  startFocusSession: (quest?: Quest) => void;
  completeFocusSession: (minutes: number, bonusXp?: number) => void;
  resetToDefaultState: () => void;
  setShowAddQuestModal: (show: boolean) => void;
  closeLevelUpModal: () => void;
  closeAchievementModal: () => void;
}

const STORAGE_KEY = 'LOCK_IN_APP_DATA_V2_FRESH';

const AppContext = createContext<AppContextType | undefined>(undefined);

// Rank Calculator based on Level
function getRankFromLevel(level: number): UserProfile['rank'] {
  if (level >= 26) return 'SSS';
  if (level >= 22) return 'SS';
  if (level >= 18) return 'S';
  if (level >= 14) return 'A';
  if (level >= 10) return 'B';
  if (level >= 7) return 'C';
  if (level >= 5) return 'D';
  if (level >= 3) return 'E';
  return 'F';
}

function getGradeFromScore(score: number): string {
  if (score >= 95) return 'S';
  if (score >= 85) return 'A';
  if (score >= 70) return 'B';
  if (score >= 50) return 'C';
  if (score >= 30) return 'D';
  return 'F';
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Fresh state initialization
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_profile`);
      return saved ? JSON.parse(saved) : DEFAULT_USER_PROFILE;
    } catch {
      return DEFAULT_USER_PROFILE;
    }
  });

  const [quests, setQuests] = useState<Quest[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_quests`);
      return saved ? JSON.parse(saved) : DEFAULT_QUESTS;
    } catch {
      return DEFAULT_QUESTS;
    }
  });

  const [skills, setSkills] = useState<Skill[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_skills`);
      return saved ? JSON.parse(saved) : DEFAULT_SKILLS;
    } catch {
      return DEFAULT_SKILLS;
    }
  });

  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_achievements`);
      return saved ? JSON.parse(saved) : INITIAL_ACHIEVEMENTS;
    } catch {
      return INITIAL_ACHIEVEMENTS;
    }
  });

  const [habits, setHabits] = useState<Habit[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_habits`);
      return saved ? JSON.parse(saved) : DEFAULT_HABITS;
    } catch {
      return DEFAULT_HABITS;
    }
  });

  const [sleepLog, setSleepLog] = useState<SleepLog>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_sleep`);
      return saved ? JSON.parse(saved) : DEFAULT_SLEEP_LOG;
    } catch {
      return DEFAULT_SLEEP_LOG;
    }
  });

  const [gamingLog, setGamingLog] = useState<GamingLog>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_gaming`);
      return saved ? JSON.parse(saved) : DEFAULT_GAMING_LOG;
    } catch {
      return DEFAULT_GAMING_LOG;
    }
  });

  const [activities, setActivities] = useState<ActivityItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_activities`);
      return saved ? JSON.parse(saved) : DEFAULT_ACTIVITIES;
    } catch {
      return DEFAULT_ACTIVITIES;
    }
  });

  const [soundEnabled, setSoundEnabledState] = useState<boolean>(true);
  const [viewportMode, setViewportMode] = useState<'desktop' | 'mobile-preview'>('desktop');
  const [activeTab, setActiveTabState] = useState<ActiveTab>('Home');
  const [activeFocusQuest, setActiveFocusQuest] = useState<Quest | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);

  const toggleSidebarCollapsed = () => {
    playClickSound(soundEnabled);
    setIsSidebarCollapsed(prev => !prev);
  };

  // Modals
  const [showLevelUpModal, setShowLevelUpModal] = useState<{ show: boolean; oldLevel: number; newLevel: number } | null>(null);
  const [showAchievementModal, setShowAchievementModal] = useState<Achievement | null>(null);
  const [showAddQuestModal, setShowAddQuestModal] = useState<boolean>(false);

  // Save to localStorage on state updates
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_profile`, JSON.stringify(userProfile));
      localStorage.setItem(`${STORAGE_KEY}_quests`, JSON.stringify(quests));
      localStorage.setItem(`${STORAGE_KEY}_skills`, JSON.stringify(skills));
      localStorage.setItem(`${STORAGE_KEY}_achievements`, JSON.stringify(achievements));
      localStorage.setItem(`${STORAGE_KEY}_habits`, JSON.stringify(habits));
      localStorage.setItem(`${STORAGE_KEY}_sleep`, JSON.stringify(sleepLog));
      localStorage.setItem(`${STORAGE_KEY}_gaming`, JSON.stringify(gamingLog));
      localStorage.setItem(`${STORAGE_KEY}_activities`, JSON.stringify(activities));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [userProfile, quests, skills, achievements, habits, sleepLog, gamingLog, activities]);

  // Recalculate Dynamic Today Score based on actual completed tasks, focus time, and habits
  const recalculateTodayScore = (updatedQuests: Quest[], updatedHabits: Habit[], focusHours: number) => {
    const totalQ = updatedQuests.length;
    const completedQ = updatedQuests.filter(q => q.completed).length;
    const questPart = totalQ > 0 ? (completedQ / totalQ) * 50 : 0;

    const completedH = updatedHabits.filter(h => h.completedToday).length;
    const habitPart = updatedHabits.length > 0 ? (completedH / updatedHabits.length) * 25 : 0;

    const focusPart = Math.min((focusHours / 2) * 25, 25); // 2 hours focus gives full 25 pts

    const totalScore = Math.round(questPart + habitPart + focusPart);
    const grade = getGradeFromScore(totalScore);

    setUserProfile(prev => ({
      ...prev,
      todayScore: totalScore,
      todayGrade: grade,
      completedQuestsTodayCount: completedQ,
      totalQuestsTodayCount: totalQ,
    }));
  };

  // Evaluate Dynamic Achievement Engine
  const evaluateAchievements = (
    currentProfile: UserProfile,
    currentQuests: Quest[],
    currentHabits: Habit[],
    currentAchievements: Achievement[]
  ) => {
    const completedQuestsCount = currentQuests.filter(q => q.completed).length;
    const completedHabitsCount = currentHabits.filter(h => h.completedToday).length;
    const focusMins = currentProfile.totalFocusHoursLifetime * 60;
    const streakDays = currentProfile.streakDays;
    const level = currentProfile.level;

    currentAchievements.forEach(ach => {
      if (ach.unlocked) return;

      let isTriggered = false;
      switch (ach.conditionType) {
        case 'quest_count':
          if (completedQuestsCount >= ach.targetValue || currentProfile.totalTasksCompletedLifetime >= ach.targetValue) {
            isTriggered = true;
          }
          break;
        case 'focus_mins':
          if (focusMins >= ach.targetValue) isTriggered = true;
          break;
        case 'streak_days':
          if (streakDays >= ach.targetValue) isTriggered = true;
          break;
        case 'level':
          if (level >= ach.targetValue) isTriggered = true;
          break;
        case 'habit_count':
          if (completedHabitsCount >= ach.targetValue) isTriggered = true;
          break;
        case 'sleep_log':
          if (sleepLog.durationHours > 0) isTriggered = true;
          break;
        case 'gaming_log':
          if (gamingLog.entries.length > 0) isTriggered = true;
          break;
      }

      if (isTriggered) {
        unlockAchievement(ach.id);
      }
    });
  };

  const setActiveTab = (tab: ActiveTab) => {
    playClickSound(soundEnabled);
    setActiveTabState(tab);
  };

  const setSoundEnabled = (enabled: boolean) => {
    setSoundEnabledState(enabled);
  };

  // Real Dynamic XP Engine
  const addXP = (amount: number, category?: string) => {
    const todayKey = new Date().toISOString().split('T')[0];

    setUserProfile(prev => {
      let newXp = prev.currentXp + amount;
      let newLevel = prev.level;
      let maxXp = prev.maxXp;
      let levelUpOccurred = false;

      while (newXp >= maxXp) {
        newXp -= maxXp;
        newLevel += 1;
        maxXp = Math.round(maxXp * 1.2);
        levelUpOccurred = true;
      }

      const progressPercent = Number(((newXp / maxXp) * 100).toFixed(1));
      const rank = getRankFromLevel(newLevel);
      const rankProgress = Math.min(Number((prev.rankProgressPercent + (amount * 0.1)).toFixed(1)), 100);

      if (levelUpOccurred) {
        playLevelUpSound(soundEnabled);
        setShowLevelUpModal({ show: true, oldLevel: prev.level, newLevel });
      }

      const updatedHistory = {
        ...prev.dailyXpHistory,
        [todayKey]: (prev.dailyXpHistory[todayKey] || 0) + amount,
      };

      // Set initial streak if first activity
      const streak = prev.streakDays === 0 ? 1 : prev.streakDays;
      const longest = Math.max(streak, prev.longestStreakDays);

      return {
        ...prev,
        currentXp: newXp,
        level: newLevel,
        rank,
        maxXp,
        levelProgressPercent: progressPercent,
        rankProgressPercent: rankProgress,
        xpEarnedToday: prev.xpEarnedToday + amount,
        streakDays: streak,
        longestStreakDays: longest,
        dailyXpHistory: updatedHistory,
      };
    });

    // Update Skill Category XP
    if (category) {
      setSkills(prevSkills =>
        prevSkills.map(sk => {
          if (sk.category === category || sk.name === category) {
            const newSkillXp = sk.xp + amount;
            let newSkillLevel = sk.level;
            let maxSkillXp = sk.maxXp;
            if (newSkillXp >= maxSkillXp) {
              newSkillLevel += 1;
              maxSkillXp = Math.round(maxSkillXp * 1.25);
            }
            const prog = Math.min(Math.round((newSkillXp / maxSkillXp) * 100), 100);
            return { ...sk, xp: newSkillXp, level: newSkillLevel, maxXp: maxSkillXp, progressPercent: prog };
          }
          return sk;
        })
      );
    }
  };

  const completeQuest = (questId: string) => {
    const targetQuest = quests.find(q => q.id === questId);
    if (!targetQuest) return;

    const isCompleting = !targetQuest.completed;
    const updatedQuests = quests.map(q => (q.id === questId ? { ...q, completed: isCompleting } : q));
    setQuests(updatedQuests);

    if (isCompleting) {
      playQuestCompleteSound(soundEnabled);
      addXP(targetQuest.xp, targetQuest.category);

      const newActivity: ActivityItem = {
        id: Date.now().toString(),
        text: `Completed quest: ${targetQuest.title}`,
        type: 'quest',
        xpEarned: targetQuest.xp,
        timestamp: 'Just now',
      };
      setActivities(prev => [newActivity, ...prev.slice(0, 15)]);

      setUserProfile(prev => {
        const updated = {
          ...prev,
          totalTasksCompletedLifetime: prev.totalTasksCompletedLifetime + 1,
        };
        evaluateAchievements(updated, updatedQuests, habits, achievements);
        return updated;
      });

      recalculateTodayScore(updatedQuests, habits, userProfile.totalFocusHoursLifetime);
    }
  };

  const addQuest = (questData: Partial<Quest>) => {
    playClickSound(soundEnabled);
    const newQuest: Quest = {
      id: `q-${Date.now()}`,
      title: questData.title || 'New Quest',
      category: questData.category || 'Personal',
      type: questData.type || 'Daily',
      deadline: questData.deadline || 'Today',
      durationMin: questData.durationMin || 30,
      xp: questData.xp || 40,
      completed: false,
      priorityScore: questData.priorityScore || 50,
      difficulty: questData.difficulty || 'Medium',
      isHighestPriority: questData.isHighestPriority || false,
    };

    const updated = [newQuest, ...quests];
    setQuests(updated);
    recalculateTodayScore(updated, habits, userProfile.totalFocusHoursLifetime);
  };

  const deleteQuest = (questId: string) => {
    playClickSound(soundEnabled);
    const updated = quests.filter(q => q.id !== questId);
    setQuests(updated);
    recalculateTodayScore(updated, habits, userProfile.totalFocusHoursLifetime);
  };

  const toggleHabit = (habitId: string) => {
    const habit = habits.find(h => h.id === habitId);
    if (!habit) return;

    const isCompleting = !habit.completedToday;
    const updatedHabits = habits.map(h =>
      h.id === habitId ? { ...h, completedToday: isCompleting, streakDays: isCompleting ? h.streakDays + 1 : h.streakDays } : h
    );
    setHabits(updatedHabits);

    if (isCompleting) {
      playQuestCompleteSound(soundEnabled);
      addXP(habit.xpReward, habit.category);

      const newActivity: ActivityItem = {
        id: Date.now().toString(),
        text: `Completed habit: ${habit.title}`,
        type: 'habit',
        xpEarned: habit.xpReward,
        timestamp: 'Just now',
      };
      setActivities(prev => [newActivity, ...prev.slice(0, 15)]);

      evaluateAchievements(userProfile, quests, updatedHabits, achievements);
      recalculateTodayScore(quests, updatedHabits, userProfile.totalFocusHoursLifetime);
    }
  };

  const logSleep = (log: Partial<SleepLog>) => {
    playClickSound(soundEnabled);
    const updatedLog: SleepLog = {
      ...sleepLog,
      ...log,
      qualityScore: log.durationHours ? Math.min(Math.round((log.durationHours / 8) * 100), 100) : 100,
    };
    setSleepLog(updatedLog);
    addXP(30, 'Recovery');
    evaluateAchievements(userProfile, quests, habits, achievements);
  };

  const addGamingEntry = (game: string, durationMinutes: number) => {
    playClickSound(soundEnabled);
    const newEntry = {
      id: Date.now().toString(),
      game,
      durationMinutes,
      date: 'Today',
    };

    setGamingLog(prev => {
      const newTotal = prev.todayTotalMinutes + durationMinutes;
      const ratio = newTotal / prev.plannedMinutes;
      const score = Math.max(Math.round(100 - Math.max(0, (ratio - 1) * 30)), 40);
      return {
        ...prev,
        todayTotalMinutes: newTotal,
        balanceScore: score,
        entries: [newEntry, ...prev.entries],
      };
    });

    addXP(20, 'Balance');
    evaluateAchievements(userProfile, quests, habits, achievements);
  };

  const equipTitle = (title: string) => {
    playClickSound(soundEnabled);
    setUserProfile(prev => ({ ...prev, equippedTitle: title }));
  };

  const startFocusSession = (quest?: Quest) => {
    playClickSound(soundEnabled);
    if (quest) {
      setActiveFocusQuest(quest);
    } else {
      const firstUncompleted = quests.find(q => !q.completed);
      setActiveFocusQuest(firstUncompleted || null);
    }
    setActiveTabState('Focus');
  };

  const completeFocusSession = (minutes: number, bonusXp: number = 10) => {
    const baseXp = Math.round(minutes * 1.5);
    const totalEarned = baseXp + bonusXp;

    playQuestCompleteSound(soundEnabled);
    addXP(totalEarned, activeFocusQuest?.category || 'Discipline');

    if (activeFocusQuest) {
      completeQuest(activeFocusQuest.id);
    }

    const newFocusHours = Number((userProfile.totalFocusHoursLifetime + minutes / 60).toFixed(1));
    setUserProfile(prev => {
      const updated = {
        ...prev,
        totalFocusHoursLifetime: newFocusHours,
      };
      evaluateAchievements(updated, quests, habits, achievements);
      return updated;
    });

    recalculateTodayScore(quests, habits, newFocusHours);

    const newActivity: ActivityItem = {
      id: Date.now().toString(),
      text: `Focus session: ${minutes} minutes completed`,
      type: 'focus',
      xpEarned: totalEarned,
      timestamp: 'Just now',
    };
    setActivities(prev => [newActivity, ...prev.slice(0, 15)]);
  };

  const unlockAchievement = (id: string) => {
    const target = achievements.find(a => a.id === id);
    if (!target || target.unlocked) return;

    setAchievements(prev =>
      prev.map(a => (a.id === id ? { ...a, unlocked: true, unlockedAt: 'Just now' } : a))
    );

    setUserProfile(prev => ({
      ...prev,
      totalAchievementsUnlocked: prev.totalAchievementsUnlocked + 1,
    }));

    playAchievementSound(soundEnabled);
    setShowAchievementModal({ ...target, unlocked: true });
    addXP(target.xpReward);
  };

  const resetToDefaultState = () => {
    localStorage.clear();
    setUserProfile(DEFAULT_USER_PROFILE);
    setQuests(DEFAULT_QUESTS);
    setSkills(DEFAULT_SKILLS);
    setAchievements(INITIAL_ACHIEVEMENTS);
    setHabits(DEFAULT_HABITS);
    setSleepLog(DEFAULT_SLEEP_LOG);
    setGamingLog(DEFAULT_GAMING_LOG);
    setActivities(DEFAULT_ACTIVITIES);
    setActiveTabState('Home');
  };

  const closeLevelUpModal = () => setShowLevelUpModal(null);
  const closeAchievementModal = () => setShowAchievementModal(null);

  return (
    <AppContext.Provider
      value={{
        userProfile,
        quests,
        skills,
        achievements,
        habits,
        sleepLog,
        gamingLog,
        activities,
        soundEnabled,
        viewportMode,
        activeTab,
        activeFocusQuest,
        isSidebarCollapsed,
        isMobileDrawerOpen,
        showLevelUpModal,
        showAchievementModal,
        showAddQuestModal,
        setActiveTab,
        setViewportMode,
        setSoundEnabled,
        setIsSidebarCollapsed,
        toggleSidebarCollapsed,
        setIsMobileDrawerOpen,
        completeQuest,
        addQuest,
        deleteQuest,
        toggleHabit,
        logSleep,
        addGamingEntry,
        equipTitle,
        startFocusSession,
        completeFocusSession,
        resetToDefaultState,
        setShowAddQuestModal,
        closeLevelUpModal,
        closeAchievementModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
