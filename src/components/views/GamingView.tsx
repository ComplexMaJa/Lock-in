import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { GamingLogEntry } from '../../types';
import { Gamepad2, Plus } from 'lucide-react';

export const GamingView: React.FC = () => {
  const { gamingLog, addGamingEntry } = useApp();

  const [game, setGame] = useState('');
  const [duration, setDuration] = useState(45);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!game.trim()) return;
    addGamingEntry(game.trim(), Number(duration));
    setGame('');
  };

  const formatHrsMins = (totalMins: number) => {
    const hrs = Math.floor(totalMins / 60);
    const mins = totalMins % 60;
    if (hrs === 0) return `${mins}m`;
    return `${hrs}h ${mins}m`;
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn max-w-2xl mx-auto select-none">
      <div>
        <h2 className="text-2xl font-extrabold text-lockin-dark">Intentional Gaming Tracker</h2>
        <p className="text-xs text-lockin-muted mt-0.5">
          "Intentional gaming, not eliminating gaming." Enjoy gaming guilt-free by staying in balance.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="stationery-card p-4 text-center">
          <span className="text-[10px] font-black tracking-wider text-lockin-muted uppercase">GAMING TODAY</span>
          <p className="text-xl font-extrabold text-lockin-dark mt-1">{formatHrsMins(gamingLog.todayTotalMinutes)}</p>
        </div>

        <div className="stationery-card p-4 text-center">
          <span className="text-[10px] font-black tracking-wider text-lockin-muted uppercase">PLANNED GAMING</span>
          <p className="text-xl font-extrabold text-lockin-muted mt-1">{formatHrsMins(gamingLog.plannedMinutes)}</p>
        </div>

        <div className="stationery-card p-4 text-center bg-gradient-to-br from-white to-lockin-lavender/30 border border-lockin-lavender">
          <span className="text-[10px] font-black tracking-wider text-lockin-muted uppercase">BALANCE SCORE</span>
          <p className="text-xl font-black text-[#6A4EA0] mt-1">{gamingLog.balanceScore}%</p>
        </div>
      </div>

      {/* Log New Game Form */}
      <form onSubmit={handleAdd} className="stationery-card p-5 space-y-3">
        <h4 className="text-xs font-black tracking-wider text-lockin-muted uppercase">LOG GAMING SESSION</h4>

        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2">
            <input
              type="text"
              placeholder="Game Title (e.g. osu!, Persona 5...)"
              value={game}
              onChange={e => setGame(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-lockin-border text-xs font-medium"
            />
          </div>

          <div>
            <input
              type="number"
              min="5"
              max="600"
              value={duration}
              onChange={e => setDuration(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-lockin-border text-xs font-bold"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2.5 bg-lockin-red text-white font-extrabold text-xs rounded-xl shadow-pill hover:bg-[#c45a61] transition-all flex items-center justify-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>LOG GAMING SESSION (+20 BALANCE XP)</span>
        </button>
      </form>

      {/* Entries List */}
      <div className="space-y-2">
        <h4 className="text-xs font-black tracking-wider text-lockin-muted uppercase">TODAY'S LOGGED GAMES</h4>
        {gamingLog.entries.map((entry: GamingLogEntry) => (
          <div key={entry.id} className="stationery-card p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Gamepad2 className="w-4 h-4 text-lockin-red" />
              <span className="text-xs font-extrabold text-lockin-dark">{entry.game}</span>
            </div>
            <span className="text-xs font-bold text-lockin-muted">{formatHrsMins(entry.durationMinutes)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
