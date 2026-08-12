import type { Quest } from '../types';

export function calculateQuestPriority(quest: Quest): number {
  let score = quest.priorityScore || 0;

  // Deadline weight
  if (quest.deadline) {
    const d = quest.deadline.toLowerCase();
    if (d.includes('due tomorrow') || d.includes('today')) {
      score += 50;
    } else if (d.includes('urgent')) {
      score += 40;
    } else if (d.includes('this week')) {
      score += 20;
    }
  }

  // Difficulty weight
  if (quest.difficulty === 'Boss') score += 45;
  if (quest.difficulty === 'Hard') score += 30;
  if (quest.difficulty === 'Medium') score += 15;

  // XP weight
  score += Math.min(quest.xp / 2, 40);

  // Type weight
  if (quest.type === 'Main') score += 35;
  if (quest.type === 'Daily') score += 10;

  return score;
}

export function getFocusNowQuest(quests: Quest[]): Quest | null {
  const uncompleted = quests.filter(q => !q.completed);
  if (uncompleted.length === 0) return null;

  // Explicitly check for marked highest priority or sort by priority score
  const highestExplicit = uncompleted.find(q => q.isHighestPriority);
  if (highestExplicit) return highestExplicit;

  return uncompleted.sort((a, b) => calculateQuestPriority(b) - calculateQuestPriority(a))[0];
}
