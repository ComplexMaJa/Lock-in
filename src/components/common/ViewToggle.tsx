import React from 'react';
import { useApp } from '../../context/AppContext';
import { Monitor, Smartphone, Volume2, VolumeX, Plus } from 'lucide-react';

export const ViewToggle: React.FC = () => {
  const { viewportMode, setViewportMode, soundEnabled, setSoundEnabled, setShowAddQuestModal } = useApp();

  return (
    <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2 bg-white/90 backdrop-blur-md p-1.5 rounded-full border border-lockin-border shadow-soft">
      {/* Quick Add Quest Button */}
      <button
        onClick={() => setShowAddQuestModal(true)}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-lockin-red text-white text-xs font-bold rounded-full hover:bg-[#c45a61] transition-all shadow-sm"
        title="Add New Quest"
      >
        <Plus className="w-3.5 h-3.5" />
        <span>New Quest</span>
      </button>

      <div className="w-[1px] h-5 bg-lockin-border mx-0.5" />

      {/* Audio Mute/Unmute */}
      <button
        onClick={() => setSoundEnabled(!soundEnabled)}
        className={`p-2 rounded-full text-xs font-semibold transition-all ${
          soundEnabled ? 'bg-lockin-soft-pink/30 text-lockin-red' : 'bg-gray-100 text-lockin-muted'
        }`}
        title={soundEnabled ? 'Sound On' : 'Sound Muted'}
      >
        {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
      </button>

      <div className="w-[1px] h-5 bg-lockin-border mx-0.5" />

      {/* Desktop View */}
      <button
        onClick={() => setViewportMode('desktop')}
        className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-bold transition-all ${
          viewportMode === 'desktop' ? 'bg-lockin-dark text-white' : 'text-lockin-muted hover:text-lockin-dark'
        }`}
      >
        <Monitor className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Desktop</span>
      </button>

      {/* Mobile View */}
      <button
        onClick={() => setViewportMode('mobile-preview')}
        className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-bold transition-all ${
          viewportMode === 'mobile-preview' ? 'bg-lockin-dark text-white' : 'text-lockin-muted hover:text-lockin-dark'
        }`}
      >
        <Smartphone className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Mobile View</span>
      </button>
    </div>
  );
};
