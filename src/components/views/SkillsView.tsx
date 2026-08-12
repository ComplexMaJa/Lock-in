import React from 'react';
import { useApp } from '../../context/AppContext';
import { XPProgressBar } from '../common/XPProgressBar';
import { Mascot } from '../common/Mascot';
import { Code, BookOpen, Sparkles, Activity, Scale, Moon, Award, Check } from 'lucide-react';

const SKILL_ICONS: Record<string, React.ReactNode> = {
  Development: <Code className="w-5 h-5" />,
  Academics: <BookOpen className="w-5 h-5" />,
  Discipline: <Sparkles className="w-5 h-5" />,
  Fitness: <Activity className="w-5 h-5" />,
  Balance: <Scale className="w-5 h-5" />,
  Recovery: <Moon className="w-5 h-5" />,
};

export const SkillsView: React.FC = () => {
  const { skills } = useApp();

  return (
    <div className="space-y-6 pb-12 animate-page-pop select-none">
      <div className="animate-card-pop stagger-1">
        <h2 className="text-2xl font-extrabold text-lockin-dark">Skill Tree</h2>
        <p className="text-xs text-lockin-muted mt-0.5">
          Level up your real-life attributes through focused quest completion.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-card-pop stagger-2">
        {skills.map(skill => (
          <div key={skill.id} className="stationery-card p-6 relative overflow-hidden">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div
                  className="p-3 rounded-2xl border"
                  style={{ backgroundColor: skill.bgColor, borderColor: skill.color, color: skill.color }}
                >
                  {SKILL_ICONS[skill.name] || <Award className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-lockin-dark">{skill.name}</h3>
                  <span className="text-xs font-bold text-lockin-muted">Lv. {skill.level}</span>
                </div>
              </div>

              <span className="text-sm font-black text-lockin-dark">{skill.progressPercent}%</span>
            </div>

            <XPProgressBar progressPercent={skill.progressPercent} barColor="bg-lockin-red" height={10} />

            {/* Perks unlocked */}
            <div className="mt-4 pt-3 border-t border-lockin-border/60">
              <span className="text-[11px] font-bold text-lockin-muted uppercase tracking-wider block mb-2">UNLOCKED PERKS</span>
              <div className="flex flex-wrap gap-1.5">
                {skill.perksUnlocked.map((perk, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1 text-[11px] font-bold bg-white px-2.5 py-1 rounded-full border border-lockin-border text-lockin-dark">
                    <Check className="w-3 h-3 text-lockin-red" />
                    <span>{perk}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="stationery-card p-6 bg-gradient-to-r from-white to-lockin-soft-pink/10 flex items-center justify-between">
        <div>
          <h4 className="text-sm font-extrabold text-lockin-dark">Keep grinding to unlock S-Tier Perks</h4>
          <p className="text-xs text-lockin-muted mt-0.5">Every 5 skill levels unlocks specialized passive bonuses.</p>
        </div>
        <Mascot expression="idle" size={80} />
      </div>
    </div>
  );
};
