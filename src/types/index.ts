export type CategoryType = 'School' | 'Development' | 'Fitness' | 'Personal' | 'Balance' | 'Recovery' | 'Academics' | 'Discipline';

export type QuestType = 'Daily' | 'Weekly' | 'Main' | 'Side';

export type ThemeMode = 'light' | 'dark';

export interface Milestone {
  id: string;
  title: string;
  completed: boolean;
}

export interface Quest {
  id: string;
  title: string;
  category: CategoryType;
  type: QuestType;
  deadline?: string;
  durationMin: number;
  xp: number;
  completed: boolean;
  priorityScore: number;
  isHighestPriority?: boolean;
  progressPercent?: number;
  milestones?: Milestone[];
  difficulty?: 'Easy' | 'Medium' | 'Hard' | 'Boss';
}

export interface Skill {
  id: string;
  name: string;
  category: CategoryType;
  level: number;
  xp: number;
  maxXp: number;
  progressPercent: number;
  color: string;
  bgColor: string;
  iconName: string;
  perksUnlocked: string[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  xpReward: number;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';
  unlocked: boolean;
  unlockedAt?: string;
  iconName: string;
  conditionType: 'first_quest' | 'quest_count' | 'focus_mins' | 'streak_days' | 'level' | 'rank' | 'habit_count' | 'sleep_log' | 'gaming_log';
  targetValue: number;
}

export interface Habit {
  id: string;
  title: string;
  streakDays: number;
  weeklyAdherence: number;
  xpReward: number;
  completedToday: boolean;
  category: CategoryType;
}

export interface SleepLog {
  bedtime: string;
  wakeTime: string;
  durationHours: number;
  targetHours: number;
  qualityScore: number;
  date: string;
}

export interface GamingLogEntry {
  id: string;
  game: string;
  durationMinutes: number;
  date: string;
}

export interface GamingLog {
  todayTotalMinutes: number;
  plannedMinutes: number;
  balanceScore: number;
  entries: GamingLogEntry[];
}

export interface UserProfile {
  name: string;
  equippedTitle: string;
  level: number;
  rank: 'F' | 'E' | 'D' | 'C' | 'B' | 'A' | 'S' | 'SS' | 'SSS';
  currentXp: number;
  maxXp: number;
  levelProgressPercent: number;
  rankProgressPercent: number;
  streakDays: number;
  longestStreakDays: number;
  todayScore: number;
  todayGrade: string;
  xpEarnedToday: number;
  completedQuestsTodayCount: number;
  totalQuestsTodayCount: number;
  totalTasksCompletedLifetime: number;
  totalFocusHoursLifetime: number;
  totalAchievementsUnlocked: number;
  equippedFrame: string;
  avatarMascotExpression: 'idle' | 'happy' | 'focused' | 'cheering' | 'sleeping' | 'gaming';
  dailyXpHistory: Record<string, number>; // YYYY-MM-DD -> XP earned
}

export interface ActivityItem {
  id: string;
  text: string;
  type: 'quest' | 'focus' | 'habit' | 'streak' | 'achievement' | 'level';
  xpEarned: number;
  timestamp: string;
}

export type FocusSessionState = 'IDLE' | 'READY' | 'RUNNING' | 'PAUSED' | 'READY_TO_CLAIM' | 'COMPLETED' | 'CANCELLED';

export interface FocusSession {
  id: string;
  questId: string;
  questTitle: string;
  plannedDurationMin: number;
  startedAt: number; // Date.now() timestamp
  pausedAt: number | null; // Date.now() timestamp when paused
  totalPausedMs: number;
  state: FocusSessionState;
  rewardXp: number;
  bonusXp: number;
  rewardClaimed: boolean;
  createdAt: number;
  completedAt?: number;
  cancelledAt?: number;
  activeDurationMin?: number;
}

export interface XPTransaction {
  id: string;
  source: 'focus_session' | 'quest' | 'habit' | 'achievement' | 'sleep' | 'gaming';
  sourceId: string;
  amount: number;
  createdAt: number;
}

export type ActiveTab = 'Home' | 'Quests' | 'Focus' | 'Habits' | 'Skills' | 'Achievements' | 'Progress' | 'Sleep' | 'Gaming' | 'Profile' | 'Settings';

