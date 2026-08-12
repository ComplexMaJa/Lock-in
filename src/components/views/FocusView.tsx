import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Mascot } from '../common/Mascot';
import { SparkleDoodle } from '../common/Doodle';
import { Play, Pause, CheckCircle2, RotateCcw, Zap, Sparkles } from 'lucide-react';

export const FocusView: React.FC = () => {
  const { activeFocusQuest, completeFocusSession } = useApp();

  // Timer duration in seconds (Default 50 min pomodoro or quest duration)
  const initialSeconds = (activeFocusQuest?.durationMin || 50) * 60;
  const [secondsLeft, setSecondsLeft] = useState<number>(initialSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isRunning) {
      setIsRunning(false);
      setIsCompleted(true);
      completeFocusSession(activeFocusQuest?.durationMin || 50, 10);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, secondsLeft]);

  const handleToggleTimer = () => setIsRunning(!isRunning);

  const handleResetTimer = () => {
    setIsRunning(false);
    setSecondsLeft(initialSeconds);
    setIsCompleted(false);
  };

  const handleManualComplete = () => {
    setIsRunning(false);
    setIsCompleted(true);
    completeFocusSession(activeFocusQuest?.durationMin || 50, 10);
  };

  // Format MM:SS
  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Circular timer progress
  const progressPercent = ((initialSeconds - secondsLeft) / initialSeconds) * 100;
  const radius = 130;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div className="max-w-2xl mx-auto py-4 space-y-6 text-center animate-fadeIn select-none">
      {/* Top Header */}
      <div>
        <span className="text-xs font-black tracking-widest text-lockin-red uppercase bg-lockin-soft-pink/40 px-3 py-1 rounded-full border border-lockin-soft-pink">
          FOCUS MODE
        </span>
        <h2 className="text-3xl font-extrabold text-lockin-dark tracking-tight mt-3">
          {activeFocusQuest ? activeFocusQuest.title : 'Finish React Homepage'}
        </h2>
        <p className="text-xs font-bold text-lockin-muted mt-1">
          {isCompleted ? 'Quest Completed!' : isRunning ? 'Focus Session in Progress...' : 'Paused'}
        </p>
      </div>

      {/* Main Large Circular Timer Container */}
      <div className="relative inline-flex flex-col items-center justify-center my-4">
        {/* Sparkle Doodles background */}
        <div className="absolute -top-4 -left-6">
          <SparkleDoodle color="#F8E7A8" className="w-8 h-8 animate-pulse" />
        </div>
        <div className="absolute -bottom-2 -right-6">
          <SparkleDoodle color="#F7C6CE" className="w-8 h-8 animate-spin" style={{ animationDuration: '8s' }} />
        </div>

        {/* SVG Circular Timer */}
        <div className="relative" style={{ width: 300, height: 300 }}>
          <svg width={300} height={300} className="transform -rotate-90">
            {/* Background Track */}
            <circle
              cx={150}
              cy={150}
              r={radius}
              stroke="#F2EEE9"
              strokeWidth={12}
              fill="transparent"
            />
            {/* Active Pink Timer Ring */}
            <circle
              cx={150}
              cy={150}
              r={radius}
              stroke="#D96B72"
              strokeWidth={12}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-300 ease-linear"
            />
          </svg>

          {/* Center Timer Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-6xl font-black text-lockin-dark tracking-tighter">
              {formatTime(secondsLeft)}
            </span>
            <span className="text-sm font-bold text-lockin-muted mt-2">
              {activeFocusQuest?.durationMin || 50} min
            </span>
          </div>
        </div>
      </div>

      {/* Control Buttons: PAUSE/START, COMPLETE */}
      <div className="flex items-center justify-center gap-4 pt-2">
        <button
          onClick={handleResetTimer}
          className="p-3 bg-lockin-secondary hover:bg-lockin-border text-lockin-dark rounded-full font-extrabold text-xs transition-all"
          title="Reset Timer"
        >
          <RotateCcw className="w-5 h-5" />
        </button>

        <button
          onClick={handleToggleTimer}
          className={`flex items-center gap-2 px-8 py-3.5 rounded-full font-black text-sm transition-all shadow-pill transform active:scale-95 ${
            isRunning
              ? 'bg-lockin-dark text-white hover:bg-black'
              : 'bg-lockin-red text-white hover:bg-[#c45a61]'
          }`}
        >
          {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
          <span>{isRunning ? 'PAUSE' : 'START FOCUS'}</span>
        </button>

        <button
          onClick={handleManualComplete}
          className="flex items-center gap-2 px-6 py-3.5 bg-lockin-soft-pink/50 text-lockin-red border border-lockin-soft-pink rounded-full font-black text-sm hover:bg-lockin-soft-pink transition-all active:scale-95"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>COMPLETE</span>
        </button>
      </div>

      {/* Reward Pills at bottom */}
      <div className="flex items-center justify-center gap-3 pt-4">
        <div className="px-4 py-1.5 bg-lockin-soft-pink/40 text-lockin-red font-black text-xs rounded-full border border-lockin-soft-pink flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 fill-lockin-red" />
          <span>+{activeFocusQuest?.xp || 60} XP</span>
        </div>
        <div className="px-4 py-1.5 bg-lockin-cream text-[#B87A00] font-black text-xs rounded-full border border-lockin-yellow flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Focus Bonus: +10 XP</span>
        </div>
      </div>

      {/* Mascot Focus Illustration */}
      <div className="pt-6 flex justify-center">
        <Mascot expression={isRunning ? 'focused' : isCompleted ? 'cheering' : 'idle'} size={110} />
      </div>
    </div>
  );
};
