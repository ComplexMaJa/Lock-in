import type { UserProfile, Quest, Skill, Habit, SleepLog, GamingLog, ActivityItem } from '../types';
import { INITIAL_ACHIEVEMENTS } from './achievements';

export const DEFAULT_USER_PROFILE: UserProfile = {
  name: 'Bumi',
  equippedTitle: 'Beginner',
  level: 1,
  rank: 'F',
  currentXp: 0,
  maxXp: 500,
  levelProgressPercent: 0,
  rankProgressPercent: 0,
  streakDays: 0,
  longestStreakDays: 0,
  todayScore: 0,
  todayGrade: 'F',
  xpEarnedToday: 0,
  completedQuestsTodayCount: 0,
  totalQuestsTodayCount: 3,
  totalTasksCompletedLifetime: 0,
  totalFocusHoursLifetime: 0,
  totalAchievementsUnlocked: 0,
  equippedFrame: 'default',
  avatarMascotExpression: 'idle',
  dailyXpHistory: {},
};

export const DEFAULT_QUESTS: Quest[] = [
  {
    id: 'q1',
    title: 'Complete your first task',
    category: 'Personal',
    type: 'Daily',
    deadline: 'Today',
    durationMin: 15,
    xp: 50,
    completed: false,
    priorityScore: 90,
    isHighestPriority: true,
    difficulty: 'Easy'
  },
  {
    id: 'q2',
    title: 'Start a 25-minute focus session',
    category: 'Discipline',
    type: 'Daily',
    deadline: 'Today',
    durationMin: 25,
    xp: 40,
    completed: false,
    priorityScore: 70,
    difficulty: 'Easy'
  },
  {
    id: 'q3',
    title: 'Set your daily sleep goal',
    category: 'Recovery',
    type: 'Daily',
    deadline: 'Tonight',
    durationMin: 5,
    xp: 30,
    completed: false,
    priorityScore: 50,
    difficulty: 'Easy'
  }
];

export const DEFAULT_SKILLS: Skill[] = [
  {
    id: 'sk-1',
    name: 'Development',
    category: 'Development',
    level: 1,
    xp: 0,
    maxXp: 200,
    progressPercent: 0,
    color: '#D96B72',
    bgColor: '#F7C6CE',
    iconName: 'code',
    perksUnlocked: ['Novice Coder']
  },
  {
    id: 'sk-2',
    name: 'Academics',
    category: 'Academics',
    level: 1,
    xp: 0,
    maxXp: 200,
    progressPercent: 0,
    color: '#D96B72',
    bgColor: '#F8F6F4',
    iconName: 'book-open',
    perksUnlocked: ['Student']
  },
  {
    id: 'sk-3',
    name: 'Discipline',
    category: 'Discipline',
    level: 1,
    xp: 0,
    maxXp: 200,
    progressPercent: 0,
    color: '#F8E7A8',
    bgColor: '#FFF1D6',
    iconName: 'sparkles',
    perksUnlocked: ['Focus Trainee']
  },
  {
    id: 'sk-4',
    name: 'Fitness',
    category: 'Fitness',
    level: 1,
    xp: 0,
    maxXp: 200,
    progressPercent: 0,
    color: '#F7C6CE',
    bgColor: '#FFFDFB',
    iconName: 'activity',
    perksUnlocked: ['Beginner Runner']
  },
  {
    id: 'sk-5',
    name: 'Balance',
    category: 'Balance',
    level: 1,
    xp: 0,
    maxXp: 200,
    progressPercent: 0,
    color: '#DDD2F4',
    bgColor: '#F8F6F4',
    iconName: 'scale',
    perksUnlocked: ['Balanced Mind']
  },
  {
    id: 'sk-6',
    name: 'Recovery',
    category: 'Recovery',
    level: 1,
    xp: 0,
    maxXp: 200,
    progressPercent: 0,
    color: '#C7E4F5',
    bgColor: '#F8F6F4',
    iconName: 'moon',
    perksUnlocked: ['Restful Sleeper']
  }
];

export const DEFAULT_HABITS: Habit[] = [
  { id: 'h1', title: 'Exercise for 20 mins', streakDays: 0, weeklyAdherence: 0, xpReward: 30, completedToday: false, category: 'Fitness' },
  { id: 'h2', title: 'Sleep 8 hours', streakDays: 0, weeklyAdherence: 0, xpReward: 30, completedToday: false, category: 'Recovery' },
  { id: 'h3', title: 'Practice English 15m', streakDays: 0, weeklyAdherence: 0, xpReward: 20, completedToday: false, category: 'Personal' },
  { id: 'h4', title: 'Drink 2L Water', streakDays: 0, weeklyAdherence: 0, xpReward: 15, completedToday: false, category: 'Recovery' },
];

export const DEFAULT_SLEEP_LOG: SleepLog = {
  bedtime: '23:00',
  wakeTime: '07:00',
  durationHours: 0,
  targetHours: 8.0,
  qualityScore: 0,
  date: 'Today'
};

export const DEFAULT_GAMING_LOG: GamingLog = {
  todayTotalMinutes: 0,
  plannedMinutes: 120,
  balanceScore: 100,
  entries: []
};

export const DEFAULT_ACTIVITIES: ActivityItem[] = [
  { id: 'a1', text: 'Account initialized: Welcome to LOCK-IN!', type: 'streak', xpEarned: 0, timestamp: 'Just now' }
];

export { INITIAL_ACHIEVEMENTS };
