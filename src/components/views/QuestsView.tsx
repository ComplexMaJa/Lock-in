import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { QuestType } from '../../types';
import { Badge } from '../common/Badge';
import { XPProgressBar } from '../common/XPProgressBar';
import {
  Plus,
  Trash2,
  Target,
  Clock,
  Zap
} from 'lucide-react';

export const QuestsView: React.FC = () => {
  const { quests, deleteQuest, setShowAddQuestModal, startFocusSession } = useApp();
  const [activeTypeTab, setActiveTypeTab] = useState<QuestType>('Daily');

  const filteredQuests = quests.filter(q => q.type === activeTypeTab);
  const completedCount = filteredQuests.filter(q => q.completed).length;

  return (
    <div className="space-y-6 pb-12 animate-page-pop select-none">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-card-pop stagger-1">
        <div>
          <h2 className="text-2xl font-extrabold text-lockin-dark">Quest Board</h2>
          <p className="text-xs text-lockin-muted mt-0.5">
            Manage your daily objectives, weekly goals, and main storyline quests.
          </p>
        </div>

        <button
          onClick={() => setShowAddQuestModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-lockin-red text-white font-extrabold text-xs rounded-full shadow-pill hover:bg-[#c45a61] transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>NEW QUEST</span>
        </button>
      </div>

      {/* Category Tabs: Daily, Weekly, Main, Side */}
      <div className="flex items-center gap-2 p-1 bg-lockin-secondary rounded-full border border-lockin-border max-w-md animate-card-pop stagger-2">
        {(['Daily', 'Weekly', 'Main', 'Side'] as QuestType[]).map(tab => {
          const isActive = activeTypeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTypeTab(tab)}
              className={`flex-1 py-2 text-xs font-bold rounded-full transition-all ${
                isActive
                  ? 'bg-lockin-red text-white shadow-sm'
                  : 'text-lockin-muted hover:text-lockin-dark'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Quest Progress summary bar */}
      <div className="stationery-card p-4 flex items-center justify-between animate-card-pop stagger-3">
        <div className="flex items-center gap-3">
          <Target className="w-5 h-5 text-lockin-red" />
          <div>
            <p className="text-xs font-extrabold text-lockin-dark">
              {completedCount} / {filteredQuests.length} {activeTypeTab.toUpperCase()} QUESTS COMPLETED
            </p>
            <p className="text-[11px] text-lockin-muted">Earn XP to power up your RPG character skills</p>
          </div>
        </div>

        <div className="w-32 hidden sm:block">
          <XPProgressBar
            progressPercent={filteredQuests.length > 0 ? (completedCount / filteredQuests.length) * 100 : 0}
            barColor="bg-lockin-red"
            height={8}
          />
        </div>
      </div>

      {/* Main Quest Highlight Section if tab is Main */}
      {activeTypeTab === 'Main' && (
        <div className="space-y-4">
          <h4 className="text-xs font-black tracking-wider text-lockin-muted uppercase">MAIN QUEST STORYLINE</h4>
          {quests.filter(q => q.type === 'Main').map(mq => (
            <div key={mq.id} className="stationery-card p-6 bg-gradient-to-r from-white via-white to-lockin-cream/30 border-2 border-lockin-yellow">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge category={mq.category} size="sm">{mq.category}</Badge>
                    <span className="text-xs font-bold text-lockin-muted">• Reward: +{mq.xp} XP</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-lockin-dark mt-1">{mq.title}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-lockin-red">{mq.progressPercent || 0}%</span>
                  <button
                    onClick={() => startFocusSession(mq)}
                    className="px-4 py-2 bg-lockin-dark text-white font-bold text-xs rounded-full hover:bg-black transition-all flex items-center gap-1.5"
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>FOCUS QUEST</span>
                  </button>
                </div>
              </div>

              <XPProgressBar progressPercent={mq.progressPercent || 0} barColor="bg-lockin-red" height={10} />

              {/* Milestones checklist */}
              {mq.milestones && mq.milestones.length > 0 && (
                <div className="mt-5 pt-4 border-t border-lockin-border/60">
                  <span className="text-[11px] font-bold text-lockin-muted uppercase tracking-wider block mb-2">MILESTONES</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {mq.milestones.map(m => (
                      <div key={m.id} className="flex items-center gap-2 text-xs font-medium text-lockin-dark">
                        <span className={m.completed ? 'text-lockin-red font-bold' : 'text-lockin-muted'}>
                          {m.completed ? '✓' : '○'}
                        </span>
                        <span className={m.completed ? 'line-through text-lockin-muted' : ''}>{m.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Quest Cards Grid */}
      <div className="space-y-3">
        <h4 className="text-xs font-black tracking-wider text-lockin-muted uppercase">ACTIVE QUESTS</h4>

        {filteredQuests.length === 0 ? (
          <div className="stationery-card p-8 text-center">
            <p className="text-sm font-bold text-lockin-dark">No quests found in this category.</p>
            <p className="text-xs text-lockin-muted mt-1">Suspiciously peaceful! Add one to keep your streak alive.</p>
          </div>
        ) : (
          filteredQuests.map(quest => (
            <div
              key={quest.id}
              className={`stationery-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                quest.completed ? 'bg-lockin-secondary/50 opacity-80' : 'hover:border-lockin-soft-pink'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-lockin-soft-pink/30 text-lockin-red rounded-xl shrink-0">
                  <Target className="w-5 h-5" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <p className={`text-sm font-extrabold ${quest.completed ? 'line-through text-lockin-muted' : 'text-lockin-dark'}`}>
                      {quest.title}
                    </p>
                    <Badge category={quest.category} size="sm">{quest.category}</Badge>
                  </div>
                  <p className="text-xs text-lockin-muted mt-0.5">
                    {quest.deadline || 'Today'} • {quest.durationMin} min • Difficulty: {quest.difficulty || 'Medium'}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-0 border-lockin-border">
                <span className="text-xs font-extrabold text-lockin-red bg-lockin-soft-pink/30 px-3 py-1 rounded-full border border-lockin-soft-pink">
                  +{quest.xp} XP
                </span>

                <button
                  onClick={() => startFocusSession(quest)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-lockin-red text-white font-black text-xs rounded-full shadow-pill hover:bg-[#c45a61] transition-all transform active:scale-95 shrink-0"
                  title="Start Focus Session"
                >
                  <Zap className="w-3.5 h-3.5 fill-white" />
                  <span>FOCUS</span>
                </button>

                <button
                  onClick={() => deleteQuest(quest.id)}
                  className="p-2 text-lockin-muted hover:text-lockin-red transition-all"
                  title="Delete Quest"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
