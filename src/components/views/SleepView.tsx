import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Moon, Check } from 'lucide-react';

export const SleepView: React.FC = () => {
  const { sleepLog, logSleep } = useApp();

  const [bedtime, setBedtime] = useState(sleepLog.bedtime);
  const [wakeTime, setWakeTime] = useState(sleepLog.wakeTime);
  const [duration, setDuration] = useState(sleepLog.durationHours);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    logSleep({
      bedtime,
      wakeTime,
      durationHours: Number(duration),
    });
  };

  const percent = Math.min(Math.round((sleepLog.durationHours / sleepLog.targetHours) * 100), 100);

  return (
    <div className="space-y-6 pb-12 animate-fadeIn max-w-2xl mx-auto select-none">
      <div>
        <h2 className="text-2xl font-extrabold text-lockin-dark">Sleep & Recovery</h2>
        <p className="text-xs text-lockin-muted mt-0.5">
          Quality sleep recharges your daily focus energy and powers up the Recovery skill.
        </p>
      </div>

      {/* Main Sleep Card */}
      <div className="stationery-card p-6 bg-gradient-to-br from-white via-white to-lockin-blue/20 border-2 border-lockin-blue">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-lockin-blue/40 text-[#2B7A9E] rounded-2xl border border-lockin-blue">
              <Moon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-black tracking-wider text-lockin-muted uppercase">SLEEP LOGGED TODAY</span>
              <h3 className="text-3xl font-black text-lockin-dark mt-0.5">
                {sleepLog.durationHours}h / {sleepLog.targetHours}h
              </h3>
            </div>
          </div>

          <span className="text-xl font-black text-[#2B7A9E] bg-white px-3.5 py-1.5 rounded-full border border-lockin-blue">
            {percent}%
          </span>
        </div>

        <p className="text-xs font-semibold text-lockin-muted mb-4">
          Bedtime: {sleepLog.bedtime} • Wake Time: {sleepLog.wakeTime} • Quality Score: {sleepLog.qualityScore}%
        </p>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-2xl border border-lockin-border space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-lockin-dark uppercase tracking-wider mb-1">Bedtime</label>
              <input
                type="text"
                value={bedtime}
                onChange={e => setBedtime(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-lockin-border text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-lockin-dark uppercase tracking-wider mb-1">Wake Time</label>
              <input
                type="text"
                value={wakeTime}
                onChange={e => setWakeTime(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-lockin-border text-xs font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-lockin-dark uppercase tracking-wider mb-1">Duration (Hours)</label>
            <input
              type="number"
              step="0.1"
              value={duration}
              onChange={e => setDuration(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-lockin-border text-xs font-bold text-lockin-dark"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-lockin-dark text-white font-extrabold text-xs rounded-xl hover:bg-black transition-all flex items-center justify-center gap-1.5"
          >
            <Check className="w-4 h-4 text-lockin-soft-pink" />
            <span>LOG SLEEP SESSION (+30 RECOVERY XP)</span>
          </button>
        </form>
      </div>
    </div>
  );
};
