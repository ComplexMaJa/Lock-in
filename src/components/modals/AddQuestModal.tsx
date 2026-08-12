import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { CategoryType, QuestType } from '../../types';
import { X, Plus, Sparkles } from 'lucide-react';

export const AddQuestModal: React.FC = () => {
  const { showAddQuestModal, setShowAddQuestModal, addQuest } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<CategoryType>('Development');
  const [type, setType] = useState<QuestType>('Daily');
  const [deadline, setDeadline] = useState('Today');
  const [durationMin, setDurationMin] = useState(30);
  const [xp, setXp] = useState(50);
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard' | 'Boss'>('Medium');

  if (!showAddQuestModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addQuest({
      title: title.trim(),
      category,
      type,
      deadline,
      durationMin: Number(durationMin),
      xp: Number(xp),
      difficulty,
    });

    // Reset & close
    setTitle('');
    setShowAddQuestModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-lockin-dark/40 backdrop-blur-sm animate-fadeIn select-none">
      <div className="bg-white border border-lockin-border rounded-3xl p-6 max-w-lg w-full shadow-2xl relative">
        <button
          onClick={() => setShowAddQuestModal(false)}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-lockin-secondary text-lockin-muted transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-xl bg-lockin-soft-pink/40 text-lockin-red">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-lockin-dark">Create New Quest</h3>
            <p className="text-xs text-lockin-muted">Add a new productivity objective to lock in on.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-lockin-dark uppercase tracking-wider mb-1">
              Quest Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Finish React Component, Study Physics..."
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-lockin-border focus:border-lockin-red focus:ring-1 focus:ring-lockin-red outline-none text-sm font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Category */}
            <div>
              <label className="block text-xs font-bold text-lockin-dark uppercase tracking-wider mb-1">
                Skill Category
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as CategoryType)}
                className="w-full px-3 py-2 rounded-xl border border-lockin-border focus:border-lockin-red outline-none text-xs font-bold bg-white"
              >
                <option value="Development">Development</option>
                <option value="School">School / Academics</option>
                <option value="Fitness">Fitness</option>
                <option value="Discipline">Discipline</option>
                <option value="Personal">Personal</option>
                <option value="Balance">Balance</option>
                <option value="Recovery">Recovery</option>
              </select>
            </div>

            {/* Type */}
            <div>
              <label className="block text-xs font-bold text-lockin-dark uppercase tracking-wider mb-1">
                Quest Type
              </label>
              <select
                value={type}
                onChange={e => setType(e.target.value as QuestType)}
                className="w-full px-3 py-2 rounded-xl border border-lockin-border focus:border-lockin-red outline-none text-xs font-bold bg-white"
              >
                <option value="Daily">Daily Quest</option>
                <option value="Weekly">Weekly Quest</option>
                <option value="Main">Main Quest</option>
                <option value="Side">Side Quest</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {/* Deadline */}
            <div>
              <label className="block text-xs font-bold text-lockin-dark uppercase tracking-wider mb-1">
                Deadline
              </label>
              <input
                type="text"
                placeholder="Due tomorrow"
                value={deadline}
                onChange={e => setDeadline(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-lockin-border text-xs font-medium"
              />
            </div>

            {/* Difficulty */}
            <div>
              <label className="block text-xs font-bold text-lockin-dark uppercase tracking-wider mb-1">
                Difficulty
              </label>
              <select
                value={difficulty}
                onChange={e => setDifficulty(e.target.value as 'Easy' | 'Medium' | 'Hard' | 'Boss')}
                className="w-full px-3 py-2 rounded-xl border border-lockin-border outline-none text-xs font-bold bg-white"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
                <option value="Boss">Boss Fight</option>
              </select>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-xs font-bold text-lockin-dark uppercase tracking-wider mb-1">
                Est. Time (min)
              </label>
              <input
                type="number"
                min="5"
                max="480"
                value={durationMin}
                onChange={e => {
                  const val = Number(e.target.value);
                  setDurationMin(val);
                  setXp(Math.round(val * 1.2));
                }}
                className="w-full px-3 py-2 rounded-xl border border-lockin-border text-xs font-bold"
              />
            </div>

            {/* XP Reward */}
            <div>
              <label className="block text-xs font-bold text-lockin-dark uppercase tracking-wider mb-1">
                XP Reward
              </label>
              <input
                type="number"
                min="10"
                max="1000"
                value={xp}
                onChange={e => setXp(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-lockin-border text-xs font-bold text-lockin-red"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-lockin-red text-white font-extrabold rounded-2xl shadow-pill hover:bg-[#c45a61] transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>ADD QUEST TO DASHBOARD</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
