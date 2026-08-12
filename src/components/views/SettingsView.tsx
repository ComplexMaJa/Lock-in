import React from 'react';
import { useApp } from '../../context/AppContext';
import { Volume2, VolumeX, RotateCcw, Sparkles, Sun, Moon } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { soundEnabled, setSoundEnabled, resetToDefaultState, theme, setTheme } = useApp();

  return (
    <div className="space-y-6 pb-12 animate-page-pop max-w-2xl mx-auto select-none">
      <div className="animate-card-pop stagger-1">
        <h2 className="text-2xl font-extrabold text-lockin-dark">App Settings</h2>
        <p className="text-xs text-lockin-muted mt-0.5">
          Configure application preferences, theme appearance, audio sound effects, and data storage.
        </p>
      </div>

      {/* Theme Mode Card */}
      <div className="stationery-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-card-pop stagger-2">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-lockin-soft-pink/30 text-lockin-red rounded-2xl border border-lockin-soft-pink">
            {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-lockin-dark">Appearance Theme</h4>
            <p className="text-xs text-lockin-muted">Switch between Cozy Light Mode and Dark Pastel Anime RPG Theme</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-lockin-secondary p-1 rounded-full border border-lockin-border">
          <button
            onClick={() => setTheme('light')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-extrabold transition-all ${
              theme === 'light'
                ? 'bg-white text-lockin-dark shadow-card'
                : 'text-lockin-muted hover:text-lockin-dark'
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            LIGHT
          </button>
          <button
            onClick={() => setTheme('dark')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-extrabold transition-all ${
              theme === 'dark'
                ? 'bg-lockin-red text-white shadow-pill'
                : 'text-lockin-muted hover:text-lockin-dark'
            }`}
          >
            <Moon className="w-3.5 h-3.5 text-white fill-white" />
            DARK
          </button>
        </div>
      </div>

      {/* Sound Effects Card */}
      <div className="stationery-card p-6 flex items-center justify-between animate-card-pop stagger-3">
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
