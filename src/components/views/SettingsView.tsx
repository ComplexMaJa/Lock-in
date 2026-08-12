import React from 'react';
import { useApp } from '../../context/AppContext';
import { Volume2, VolumeX, RotateCcw, Sparkles } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { soundEnabled, setSoundEnabled, resetToDefaultState } = useApp();

  return (
    <div className="space-y-6 pb-12 animate-fadeIn max-w-2xl mx-auto select-none">
      <div>
        <h2 className="text-2xl font-extrabold text-lockin-dark">App Settings</h2>
        <p className="text-xs text-lockin-muted mt-0.5">
          Configure application preferences, audio sound effects, and data storage.
        </p>
      </div>

      {/* Sound Effects Card */}
      <div className="stationery-card p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-lockin-soft-pink/30 text-lockin-red rounded-2xl border border-lockin-soft-pink">
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-lockin-dark">RPG Sound Effects</h4>
            <p className="text-xs text-lockin-muted">Web Audio API synthesized chimes for level up & quests</p>
          </div>
        </div>

        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
            soundEnabled ? 'bg-lockin-red text-white shadow-pill' : 'bg-gray-100 text-lockin-muted'
          }`}
        >
          {soundEnabled ? 'ENABLED' : 'MUTED'}
        </button>
      </div>

      {/* Reset State to V1 Demo */}
      <div className="stationery-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-2 border-lockin-soft-pink/60">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-lockin-secondary text-lockin-dark rounded-2xl border border-lockin-border">
            <RotateCcw className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-lockin-dark">Reset to Initial V1 Demo State</h4>
            <p className="text-xs text-lockin-muted">Restores Level 14, Rank A, 43 achievements, and initial quests</p>
          </div>
        </div>

        <button
          onClick={() => {
            if (window.confirm('Reset app data to initial demo state?')) {
              resetToDefaultState();
            }
          }}
          className="px-5 py-2.5 bg-lockin-secondary hover:bg-lockin-soft-pink/40 text-lockin-red border border-lockin-border text-xs font-extrabold rounded-full transition-all shrink-0"
        >
          RESET DATA
        </button>
      </div>

      {/* App Info Footer */}
      <div className="stationery-card p-6 text-center text-xs text-lockin-muted space-y-1">
        <div className="flex items-center justify-center gap-1 text-lockin-dark font-extrabold">
          <Sparkles className="w-4 h-4 text-lockin-red" />
          <span>LOCK-IN V1.0 • Get your life together.</span>
        </div>
        <p>Built with React, TypeScript, Vite & Tailwind CSS</p>
      </div>
    </div>
  );
};
