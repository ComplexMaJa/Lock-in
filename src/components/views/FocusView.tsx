import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { SparkleDoodle } from '../common/Doodle';
import lockInImg from '../../assets/lock_in.png';
import type { Quest } from '../../types';
import {
  Play,
  Pause,
  CheckCircle2,
  XCircle,
  Sparkles,
  Award,
  History,
  Target,
  Search,
  ChevronDown,
  Check,
  X
} from 'lucide-react';

export const FocusView: React.FC = () => {
  const {
    focusSession,
    focusHistory,
    quests,
    activeFocusQuest,
    setActiveFocusQuest,
    startFocusSession,
    pauseFocusSession,
    resumeFocusSession,
    cancelFocusSession,
    finishFocusSession,
    claimFocusReward,
  } = useApp();

  // Local state for quest selection before session starts
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(() => {
    return activeFocusQuest || quests.find(q => !q.completed) || quests[0] || null;
  });

  // Dropdown & Search state
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
  const [now, setNow] = useState<number>(Date.now());

  // Keep selectedQuest in sync with activeFocusQuest
  useEffect(() => {
    if (activeFocusQuest) {
      setSelectedQuest(activeFocusQuest);
    }
  }, [activeFocusQuest]);

  // Close dropdown on outside click or ESC key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsDropdownOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Timestamp-based Timer ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Handler when user selects a quest
  const handleSelectQuest = (q: Quest) => {
    if (focusSession && (focusSession.state === 'RUNNING' || focusSession.state === 'PAUSED')) return;
    setSelectedQuest(q);
    setActiveFocusQuest(q);
    setIsDropdownOpen(false);
    setSearchQuery('');
  };

  // Filtered quests based on search query
  const filteredQuests = quests.filter(q =>
    q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate dynamic timer variables
  let displayMinutes = selectedQuest?.durationMin || 25;
  let displayTitle = selectedQuest?.title || 'General Focus Session';
  let displayXp = selectedQuest?.xp || 50;

  let elapsedMs = 0;
  let remainingSeconds = displayMinutes * 60;
  let totalDurationMs = displayMinutes * 60 * 1000;

  if (focusSession) {
    displayTitle = focusSession.questTitle;
    displayMinutes = focusSession.plannedDurationMin;
    displayXp = focusSession.rewardXp;
    totalDurationMs = focusSession.plannedDurationMin * 60 * 1000;

    if (focusSession.state === 'RUNNING') {
      elapsedMs = Math.max(0, now - focusSession.startedAt - focusSession.totalPausedMs);
    } else if (focusSession.state === 'PAUSED' && focusSession.pausedAt) {
      elapsedMs = Math.max(0, focusSession.pausedAt - focusSession.startedAt - focusSession.totalPausedMs);
    } else if (focusSession.state === 'READY_TO_CLAIM' || focusSession.state === 'COMPLETED') {
      elapsedMs = totalDurationMs;
    }

    const remainingMs = Math.max(0, totalDurationMs - elapsedMs);
    remainingSeconds = Math.ceil(remainingMs / 1000);

    if (remainingSeconds <= 0 && focusSession.state === 'RUNNING') {
      finishFocusSession();
    }
  }

  // Format MM:SS
  const mins = Math.floor(remainingSeconds / 60);
  const secs = remainingSeconds % 60;
  const timeString = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  const progressPercent = totalDurationMs > 0 ? Math.min(100, Math.round((elapsedMs / totalDurationMs) * 100)) : 0;

  // Mascot message
  const getMascotMessage = () => {
    if (!focusSession) return "Let's lock in.";
    switch (focusSession.state) {
      case 'RUNNING':
        return 'Stay with it.';
      case 'PAUSED':
        return 'Take a breather.';
      case 'READY_TO_CLAIM':
        return 'Quest complete!';
      default:
        return "Let's lock in.";
    }
  };

  const isSessionRunningOrPaused = focusSession && (focusSession.state === 'RUNNING' || focusSession.state === 'PAUSED');

  return (
    <div className="space-y-6 pb-8 animate-page-pop select-none max-w-2xl mx-auto">
      
      {/* 1. TOP HEADER & DYNAMIC QUEST TITLE */}
      <div className="text-center space-y-2 animate-card-pop stagger-1">
        {/* FOCUS MODE Pill */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1 bg-lockin-soft-pink/40 text-lockin-red font-black text-xs rounded-full border border-lockin-soft-pink">
          <span className="uppercase tracking-widest text-[11px]">FOCUS MODE</span>
        </div>

        {/* Dynamic Title (Updates immediately based on selected quest) */}
        <h2 className="text-3xl sm:text-4xl font-black text-lockin-dark tracking-tight">
          {displayTitle}
        </h2>

        {/* Subtitle Status */}
        <p className="text-xs font-bold text-lockin-muted">
          {focusSession?.state === 'RUNNING'
            ? 'Running'
            : focusSession?.state === 'PAUSED'
            ? 'Paused'
            : focusSession?.state === 'READY_TO_CLAIM'
            ? 'Completed'
            : 'Select a quest below to adjust focus duration'}
        </p>
      </div>

      {/* 2. COMPACT SEARCHABLE DROPDOWN QUEST SELECTOR */}
      {!isSessionRunningOrPaused && (
        <div className="relative max-w-md mx-auto animate-card-pop stagger-2" ref={dropdownRef}>
          {/* Dropdown Toggle Button */}
          <button
            onClick={() => setIsDropdownOpen(prev => !prev)}
            className="w-full stationery-card px-4 py-3 bg-white hover:border-lockin-soft-pink transition-all flex items-center justify-between shadow-sm group transform active:scale-[0.99]"
          >
            <div className="flex items-center gap-2.5 min-w-0 pr-2">
              <div className="p-1.5 bg-lockin-soft-pink/30 text-lockin-red rounded-xl shrink-0">
                <Target className="w-4 h-4" />
              </div>
              <div className="text-left min-w-0">
                <span className="text-[10px] font-black text-lockin-muted uppercase tracking-wider block">TARGET QUEST</span>
                <p className="text-xs font-extrabold text-lockin-dark truncate">
                  {selectedQuest ? selectedQuest.title : 'Select a Quest...'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {selectedQuest && (
                <span className="text-[11px] font-bold text-lockin-muted bg-lockin-secondary px-2 py-0.5 rounded-full border border-lockin-border">
                  ⏱ {selectedQuest.durationMin} min
                </span>
              )}
              <ChevronDown className={`w-4 h-4 text-lockin-dark/70 transition-transform duration-200 ${isDropdownOpen ? 'transform rotate-180 text-lockin-red' : ''}`} />
            </div>
          </button>

          {/* Dropdown Popup Menu with Search Bar */}
          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 z-40 bg-white rounded-3xl p-3 shadow-2xl border-2 border-lockin-soft-pink space-y-2 animate-scaleUp">
              {/* Search Bar Input */}
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-lockin-muted absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search quests by title or category..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full pl-9 pr-8 py-2 bg-lockin-secondary/60 rounded-xl border border-lockin-border text-xs font-bold text-lockin-dark placeholder-lockin-muted focus:outline-none focus:border-lockin-soft-pink transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 p-1 rounded-full text-lockin-muted hover:text-lockin-dark"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Scrollable Quest List */}
              <div className="max-h-60 overflow-y-auto space-y-1.5 pr-1 scrollbar-thin">
                {filteredQuests.length === 0 ? (
                  <p className="text-xs font-bold text-lockin-muted text-center py-4">No quests match your search.</p>
                ) : (
                  filteredQuests.map(q => {
                    const isSelected = selectedQuest?.id === q.id;
                    return (
                      <button
                        key={q.id}
                        onClick={() => handleSelectQuest(q)}
                        className={`w-full p-2.5 rounded-2xl text-left transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-lockin-soft-pink/30 text-lockin-dark border border-lockin-soft-pink font-extrabold'
                            : 'hover:bg-lockin-secondary/70 text-lockin-dark/80 font-semibold'
                        }`}
                      >
                        <div className="min-w-0 pr-2">
                          <div className="flex items-center gap-1.5">
                            {isSelected && <Check className="w-3.5 h-3.5 text-lockin-red shrink-0" />}
                            <p className="text-xs truncate">{q.title}</p>
                          </div>
                          <span className="text-[10px] text-lockin-muted font-bold block mt-0.5">
                            {q.category} • ⏱ {q.durationMin} min
                          </span>
                        </div>

                        <span className="text-[11px] font-black text-lockin-red bg-white px-2 py-0.5 rounded-full border border-lockin-border shrink-0">
                          +{q.xp} XP
                        </span>
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. CENTER CIRCULAR PROGRESS TIMER RING */}
      <div className="relative flex items-center justify-center my-2 animate-card-pop stagger-3">
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background Circle Track */}
            <circle
              cx="50"
              cy="50"
              r="44"
              className="stroke-lockin-secondary"
              strokeWidth="6"
              fill="transparent"
            />
            {/* Progress Stroke */}
            <circle
              cx="50"
              cy="50"
              r="44"
              className={`transition-all duration-500 ${
                focusSession?.state === 'READY_TO_CLAIM'
                  ? 'stroke-emerald-500'
                  : 'stroke-lockin-red'
              }`}
              strokeWidth="6"
              strokeDasharray="276.46"
              strokeDashoffset={276.46 - (276.46 * progressPercent) / 100}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          {/* Time & Duration inside Ring */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-5xl sm:text-6xl font-black text-lockin-dark tracking-tighter font-mono">
              {timeString}
            </span>
            <span className="text-xs font-extrabold text-lockin-muted mt-1">
              {displayMinutes} min
            </span>
          </div>
        </div>

        {/* Decorative Sparkles around Timer */}
        <SparkleDoodle color="#F8E7A8" className="absolute top-2 right-12 w-6 h-6 animate-pulse" />
        <SparkleDoodle color="#F7C6CE" className="absolute bottom-4 left-12 w-5 h-5 animate-bounce-gentle" />
      </div>

      {/* 4. BUTTONS ROW & XP REWARD PILLS */}
      <div className="space-y-4 animate-card-pop stagger-4">
        <div className="flex items-center justify-center gap-3 max-w-sm mx-auto">
          {/* Cancel Session "X" Button with Pop-up Confirmation Indicator */}
          <button
            onClick={() => {
              if (focusSession) {
                setShowCancelModal(true);
              }
            }}
            disabled={!focusSession}
            className="p-3 bg-white hover:bg-lockin-soft-pink/30 border border-lockin-border rounded-full text-lockin-dark/70 hover:text-lockin-red transition-all transform active:scale-95 disabled:opacity-40 shadow-sm"
            title="Cancel Focus Session"
            aria-label="Cancel Focus Session"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Main CTA Button: START / PAUSE / RESUME */}
          {!focusSession ? (
            <button
              onClick={() => startFocusSession(selectedQuest || undefined, displayMinutes)}
              className="flex-1 py-3.5 px-6 bg-lockin-red text-white font-black text-xs rounded-full shadow-pill hover:bg-[#c45a61] transition-all transform active:scale-95 flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>START FOCUS</span>
            </button>
          ) : focusSession.state === 'RUNNING' ? (
            <button
              onClick={pauseFocusSession}
              className="flex-1 py-3.5 px-6 bg-lockin-dark text-white font-black text-xs rounded-full shadow-card hover:bg-black transition-all transform active:scale-95 flex items-center justify-center gap-2"
            >
              <Pause className="w-4 h-4 fill-white" />
              <span>PAUSE FOCUS</span>
            </button>
          ) : focusSession.state === 'PAUSED' ? (
            <button
              onClick={resumeFocusSession}
              className="flex-1 py-3.5 px-6 bg-lockin-red text-white font-black text-xs rounded-full shadow-pill hover:bg-[#c45a61] transition-all transform active:scale-95 flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>RESUME FOCUS</span>
            </button>
          ) : (
            <button
              onClick={claimFocusReward}
              className="flex-1 py-3.5 px-6 bg-emerald-500 text-white font-black text-xs rounded-full shadow-pill hover:bg-emerald-600 transition-all transform active:scale-95 flex items-center justify-center gap-2 animate-bounce-gentle"
            >
              <Award className="w-4 h-4" />
              <span>CLAIM REWARD</span>
            </button>
          )}

          {/* Complete Button (Disabled until finished or ready) */}
          <button
            onClick={() => {
              if (focusSession?.state === 'READY_TO_CLAIM') {
                claimFocusReward();
              } else if (focusSession) {
                setShowCancelModal(true);
              }
            }}
            disabled={!focusSession}
            className={`py-3.5 px-5 rounded-full border text-xs font-bold transition-all flex items-center gap-1.5 ${
              focusSession?.state === 'READY_TO_CLAIM'
                ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm'
                : 'bg-lockin-soft-pink/30 text-lockin-red/60 border-lockin-soft-pink opacity-60 cursor-not-allowed'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>COMPLETE</span>
          </button>
        </div>

        {/* 5. XP REWARD PILLS */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <span className="text-xs font-extrabold text-lockin-red bg-lockin-soft-pink/30 px-3.5 py-1 rounded-full border border-lockin-soft-pink">
            ⚡ +{displayXp} XP
          </span>
          <span className="text-xs font-extrabold text-[#B87A00] bg-lockin-cream px-3.5 py-1 rounded-full border border-lockin-yellow flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 fill-lockin-yellow" />
            <span>Focus Bonus: +10 XP</span>
          </span>
        </div>
      </div>

      {/* 6. MASCOT ILLUSTRATION BELOW WITH SPEECH BUBBLE */}
      <div className="flex justify-center pt-2 animate-card-pop stagger-5">
        <div className="relative flex flex-col items-center">
          {/* Speech Bubble */}
          <div className="mb-2 px-4 py-1.5 bg-lockin-card border border-lockin-border rounded-2xl shadow-sm text-xs font-extrabold text-lockin-dark relative">
            <span>{getMascotMessage()}</span>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-lockin-card border-r border-b border-lockin-border transform rotate-45" />
          </div>

          {/* Mascot Asset */}
          <img
            src={lockInImg}
            alt="Mascot"
            className="w-24 sm:w-28 h-auto object-contain drop-shadow-md transform hover:scale-105 transition-transform"
          />
        </div>
      </div>

      {/* 7. FOCUS HISTORY SECTION (Horizontal Scrollable Row) */}
      <div className="stationery-card p-5 space-y-3 animate-card-pop stagger-6">
        <div className="flex items-center justify-between border-b border-lockin-border/60 pb-2.5">
          <h3 className="text-xs font-black tracking-wider text-lockin-muted uppercase flex items-center gap-2">
            <History className="w-4 h-4 text-lockin-red" />
            <span>FOCUS HISTORY</span>
          </h3>
          <span className="text-[11px] font-bold text-lockin-muted">
            {focusHistory.length} Sessions Logged
          </span>
        </div>

        {focusHistory.length === 0 ? (
          <p className="text-xs text-lockin-muted font-medium py-3 text-center">
            No focus sessions recorded yet. Start your first session above!
          </p>
        ) : (
          <div className="flex items-stretch gap-3 overflow-x-auto pb-2 pt-1 scrollbar-thin">
            {focusHistory.map((session, index) => (
              <div
                key={session.id || index}
                className="min-w-[220px] sm:min-w-[240px] max-w-[250px] shrink-0 p-3 rounded-2xl border border-lockin-border bg-lockin-card hover:border-lockin-soft-pink transition-all flex flex-col justify-between shadow-sm space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-extrabold text-lockin-dark truncate" title={session.questTitle}>
                      {session.questTitle}
                    </p>
                    <p className="text-[10px] font-bold text-lockin-muted mt-0.5">
                      ⏱ {session.plannedDurationMin} min • {session.completedAt ? new Date(session.completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Earlier'}
                    </p>
                  </div>

                  <div
                    className={`p-1.5 rounded-xl border shrink-0 ${
                      session.state === 'COMPLETED'
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                        : 'bg-rose-50 dark:bg-rose-950/40 text-rose-500 dark:text-rose-400 border-rose-200 dark:border-rose-800'
                    }`}
                  >
                    {session.state === 'COMPLETED' ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5" />
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-lockin-border/40 text-[10px]">
                  <span
                    className={`font-bold px-2 py-0.5 rounded-full ${
                      session.state === 'COMPLETED'
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                        : 'bg-rose-50 dark:bg-rose-950/40 text-rose-500 dark:text-rose-400 border border-rose-200 dark:border-rose-800'
                    }`}
                  >
                    {session.state === 'COMPLETED' ? 'Completed' : 'Cancelled'}
                  </span>

                  <span
                    className={`font-black text-xs ${
                      session.state === 'COMPLETED' ? 'text-lockin-red' : 'text-lockin-muted'
                    }`}
                  >
                    {session.state === 'COMPLETED'
                      ? `+${session.rewardXp + session.bonusXp} XP`
                      : '0 XP'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-lockin-dark/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border-2 border-lockin-border text-center space-y-4 animate-scaleUp">
            <h3 className="text-lg font-black text-lockin-dark tracking-tight">
              CANCEL FOCUS SESSION?
            </h3>

            <div className="bg-lockin-secondary/60 p-3 rounded-2xl text-xs font-semibold text-lockin-muted text-left space-y-1">
              <p>You've focused for: <span className="font-extrabold text-lockin-dark">{Math.floor(elapsedMs / 60000)}m {Math.floor((elapsedMs % 60000) / 1000)}s</span></p>
              <p>Your current focus session will be cancelled.</p>
              <p className="text-lockin-red font-bold">No XP will be awarded.</p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => setShowCancelModal(false)}
                className="w-full py-3 bg-lockin-red text-white font-black text-xs rounded-2xl shadow-pill hover:bg-[#c45a61] transition-all transform active:scale-95"
              >
                KEEP FOCUSING
              </button>

              <button
                onClick={() => {
                  setShowCancelModal(false);
                  cancelFocusSession();
                }}
                className="w-full py-2.5 text-xs font-bold text-lockin-muted hover:text-lockin-dark hover:bg-lockin-secondary rounded-xl transition-all"
              >
                CANCEL SESSION
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
