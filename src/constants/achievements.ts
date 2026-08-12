import type { Achievement } from '../types';

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  // Core Starter Achievements
  { id: '1', name: 'FIRST STEP', description: 'Complete your first quest.', xpReward: 50, rarity: 'Common', unlocked: false, iconName: 'check-circle', conditionType: 'quest_count', targetValue: 1 },
  { id: '2', name: 'EARLY BIRD', description: 'Complete 5 tasks.', xpReward: 100, rarity: 'Common', unlocked: false, iconName: 'sun', conditionType: 'quest_count', targetValue: 5 },
  { id: '3', name: 'LOCKED IN', description: 'Complete 10 total quests.', xpReward: 150, rarity: 'Uncommon', unlocked: false, iconName: 'zap', conditionType: 'quest_count', targetValue: 10 },
  { id: '4', name: 'DEEP FOCUS', description: 'Log at least 30 minutes of focus time.', xpReward: 200, rarity: 'Rare', unlocked: false, iconName: 'target', conditionType: 'focus_mins', targetValue: 30 },
  { id: '5', name: 'ON FIRE', description: 'Maintain a 3-day streak.', xpReward: 250, rarity: 'Rare', unlocked: false, iconName: 'flame', conditionType: 'streak_days', targetValue: 3 },
  { id: '6', name: 'NO ZERO DAYS', description: 'Maintain a 7-day streak.', xpReward: 300, rarity: 'Epic', unlocked: false, iconName: 'calendar', conditionType: 'streak_days', targetValue: 7 },
  { id: '7', name: 'LEVEL UP I', description: 'Reach Level 2 overall profile.', xpReward: 100, rarity: 'Common', unlocked: false, iconName: 'trending-up', conditionType: 'level', targetValue: 2 },
  { id: '8', name: 'LEVEL UP II', description: 'Reach Level 5 overall profile.', xpReward: 250, rarity: 'Uncommon', unlocked: false, iconName: 'trending-up', conditionType: 'level', targetValue: 5 },
  { id: '9', name: 'LEVEL UP III', description: 'Reach Level 10 overall profile.', xpReward: 500, rarity: 'Epic', unlocked: false, iconName: 'award', conditionType: 'level', targetValue: 10 },
  { id: '10', name: 'SLUMBER MASTER', description: 'Log a sleep session.', xpReward: 100, rarity: 'Common', unlocked: false, iconName: 'bed', conditionType: 'sleep_log', targetValue: 1 },
  { id: '11', name: 'INTENTIONAL GAMER', description: 'Log a gaming session.', xpReward: 100, rarity: 'Common', unlocked: false, iconName: 'gamepad-2', conditionType: 'gaming_log', targetValue: 1 },
  { id: '12', name: 'HABIT BUILDER', description: 'Complete 3 daily habits.', xpReward: 150, rarity: 'Uncommon', unlocked: false, iconName: 'check-square', conditionType: 'habit_count', targetValue: 3 },

  // Milestones 13 to 100 (All locked fresh start)
  ...Array.from({ length: 88 }).map((_, i) => {
    const idNum = 13 + i;
    const isEpic = idNum % 10 === 0;
    const isLegendary = idNum % 25 === 0;
    const isRare = idNum % 5 === 0;
    return {
      id: idNum.toString(),
      name: isLegendary ? `GRAND MASTER #${idNum}` : isEpic ? `ELITE CHAMPION #${idNum}` : isRare ? `CHALLENGER #${idNum}` : `MILESTONE #${idNum}`,
      description: `Complete ${idNum * 2} tasks to unlock RPG badge #${idNum}.`,
      xpReward: 100 + idNum * 10,
      rarity: (isLegendary ? 'Legendary' : isEpic ? 'Epic' : isRare ? 'Rare' : 'Common') as Achievement['rarity'],
      unlocked: false,
      iconName: isLegendary ? 'crown' : isEpic ? 'shield' : 'sparkles',
      conditionType: 'quest_count' as const,
      targetValue: idNum * 2,
    };
  })
];
