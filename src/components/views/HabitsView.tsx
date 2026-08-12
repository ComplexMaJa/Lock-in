import React from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { CheckCircle2, Circle, Flame } from 'lucide-react';

export const HabitsView: React.FC = () => {
  const { habits, toggleHabit } = useApp();

  return (
    <div className="space-y-6 pb-12 animate-fadeIn select-none">
      <div>
        <h2 className="text-2xl font-extrabold text-lockin-dark">Daily Habits</h2>
        <p className="text-xs text-lockin-muted mt-0.5">
          Build long-term RPG discipline by keeping your habit streaks alive.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {habits.map(habit => (
          <div
            key={habit.id}
            className={`stationery-card p-5 flex items-center justify-between gap-4 transition-all ${
              habit.completedToday ? 'bg-lockin-secondary/60 opacity-80' : 'hover:border-lockin-soft-pink'
            }`}
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleHabit(habit.id)}
                className="shrink-0 transition-transform active:scale-90"
              >
                {habit.completedToday ? (
                  <CheckCircle2 className="w-6 h-6 text-lockin-red fill-lockin-soft-pink/40" />
                ) : (
                  <Circle className="w-6 h-6 text-lockin-muted hover:text-lockin-red" />
                )}
              </button>

              <div>
                <p className={`text-sm font-extrabold ${habit.completedToday ? 'line-through text-lockin-muted' : 'text-lockin-dark'}`}>
                  {habit.title}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-bold text-lockin-red flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 fill-lockin-red" />
                    {habit.streakDays} day streak
                  </span>
                  <span className="text-xs text-lockin-muted">•</span>
                  <span className="text-xs font-semibold text-lockin-muted">{habit.weeklyAdherence}% this week</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge category={habit.category} size="sm">{habit.category}</Badge>
              <span className="text-xs font-extrabold text-lockin-red">+{habit.xpReward} XP</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
