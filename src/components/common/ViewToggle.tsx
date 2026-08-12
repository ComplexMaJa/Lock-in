import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Volume2, VolumeX, Plus, FileText, X, Sparkles, Check, Clock } from 'lucide-react';

export const ViewToggle: React.FC = () => {
  const { soundEnabled, setSoundEnabled, setShowAddQuestModal } = useApp();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const [notesText, setNotesText] = useState<string>(() => {
    return localStorage.getItem('lockin_quick_notes') || '';
  });
  const [isSaved, setIsSaved] = useState<boolean>(false);

  // Live real-time clock state (HH:MM:SS)
  const [timeStr, setTimeStr] = useState<string>(() => {
    return new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
  });

  // Clock Ticker (updates every 1000ms)
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeStr(new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-save notes to localStorage
  useEffect(() => {
    localStorage.setItem('lockin_quick_notes', notesText);
    setIsSaved(true);
    const timeout = setTimeout(() => setIsSaved(false), 1500);
    return () => clearTimeout(timeout);
  }, [notesText]);

  // Handle open/close with pop animation
  const toggleNotes = () => {
    if (isOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsClosing(false);
      }, 220); // match pop-out animation duration
    } else {
      setIsOpen(true);
      setIsClosing(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end select-none">
      {/* Expandable Notes Panel with Spring Pop In / Pop Out Animation */}
      {(isOpen || isClosing) && (
        <div
          className={`mb-3 w-80 sm:w-96 bg-white/95 backdrop-blur-md rounded-3xl p-4 shadow-2xl border-2 border-lockin-soft-pink space-y-3 ${
            isClosing ? 'animate-pop-out' : 'animate-pop-in'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-lockin-border pb-2.5">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-lockin-soft-pink/40 text-lockin-red rounded-xl animate-bounce-gentle">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-black tracking-wider text-lockin-dark uppercase">QUICK NOTES</h4>
                <p className="text-[10px] font-bold text-lockin-muted">Scratchpad & Reminders</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isSaved && (
                <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800 flex items-center gap-1 animate-fadeIn">
                  <Check className="w-3 h-3" /> Saved
                </span>
              )}
              <button
                onClick={toggleNotes}
                className="p-1.5 text-lockin-muted hover:text-lockin-dark hover:bg-lockin-secondary rounded-full transition-all transform active:scale-90"
                title="Close Notes"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Textarea Scratchpad */}
          <textarea
            value={notesText}
            onChange={(e) => setNotesText(e.target.value)}
            placeholder="Write down your focus thoughts, key tasks, or ideas here..."
            className="w-full h-44 p-3 bg-lockin-secondary/50 rounded-2xl border border-lockin-border text-xs font-medium text-lockin-dark placeholder-lockin-muted/70 focus:outline-none focus:border-lockin-soft-pink focus:bg-white transition-all resize-none leading-relaxed"
          />

          {/* Footer note info */}
          <div className="flex items-center justify-between text-[10px] text-lockin-muted font-bold pt-1">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-lockin-yellow fill-lockin-yellow" />
              <span>Auto-saved to device</span>
            </span>
            <button
              onClick={() => setNotesText('')}
              className="text-lockin-muted hover:text-lockin-red transition-colors"
            >
              Clear Note
            </button>
          </div>
        </div>
      )}

      {/* Persistent Bottom Right Bar with Spring Hover Animation */}
      <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md p-1.5 rounded-full border border-lockin-border shadow-2xl transition-all duration-300 hover:border-lockin-soft-pink hover:shadow-soft-hover transform hover:-translate-y-0.5">
        {/* Quick Add Quest Button */}
        <button
          onClick={() => setShowAddQuestModal(true)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-lockin-red text-white text-xs font-black rounded-full hover:bg-[#c45a61] transition-all shadow-pill transform active:scale-95 hover:scale-105"
          title="Add New Quest"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Quest</span>
        </button>

        <div className="w-[1px] h-5 bg-lockin-border mx-0.5" />

        {/* Audio Mute/Unmute */}
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`p-2 rounded-full text-xs font-bold transition-all transform active:scale-90 ${
            soundEnabled ? 'bg-lockin-soft-pink/30 text-lockin-red' : 'bg-lockin-secondary text-lockin-muted hover:text-lockin-dark'
          }`}
          title={soundEnabled ? 'Sound On' : 'Sound Muted'}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        <div className="w-[1px] h-5 bg-lockin-border mx-0.5" />

        {/* Real-Time Live Clock Widget (HH:MM:SS in LOCK-IN Red) */}
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 bg-lockin-soft-pink/30 text-lockin-red border border-lockin-soft-pink/50 rounded-full text-xs font-mono font-black shadow-sm"
          title="Current Time"
        >
          <Clock className="w-3.5 h-3.5 text-lockin-red shrink-0" />
          <span>{timeStr}</span>
        </div>

        <div className="w-[1px] h-5 bg-lockin-border mx-0.5" />

        {/* Expandable Notes Button */}
        <button
          onClick={toggleNotes}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black transition-all transform active:scale-95 ${
            isOpen
              ? 'bg-lockin-dark text-white shadow-card scale-105'
              : 'bg-lockin-soft-pink/30 text-lockin-red hover:bg-lockin-soft-pink/50 hover:scale-105'
          }`}
          title="Toggle Quick Notes"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Notes</span>
        </button>
      </div>
    </div>
  );
};
