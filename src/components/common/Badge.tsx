import React from 'react';
import type { CategoryType } from '../../types';

interface BadgeProps {
  category?: CategoryType | string;
  variant?: 'category' | 'xp' | 'streak' | 'priority' | 'new' | 'type';
  children?: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md';
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  School: { bg: 'bg-lockin-cream', text: 'text-[#B87A00] dark:text-[#F8E7A8]', border: 'border-lockin-yellow' },
  Academics: { bg: 'bg-lockin-cream', text: 'text-[#B87A00] dark:text-[#F8E7A8]', border: 'border-lockin-yellow' },
  Development: { bg: 'bg-lockin-soft-pink/40', text: 'text-lockin-red', border: 'border-lockin-soft-pink' },
  Fitness: { bg: 'bg-lockin-blue/50', text: 'text-[#2B7A9E] dark:text-[#C7E4F5]', border: 'border-lockin-blue' },
  Personal: { bg: 'bg-lockin-lavender/50', text: 'text-[#6A4EA0] dark:text-[#C9B9E8]', border: 'border-lockin-lavender' },
  Balance: { bg: 'bg-lockin-cream', text: 'text-[#8C6D23] dark:text-[#F8E7A8]', border: 'border-lockin-yellow' },
  Recovery: { bg: 'bg-lockin-blue/50', text: 'text-[#2B7A9E] dark:text-[#C7E4F5]', border: 'border-lockin-blue' },
  Discipline: { bg: 'bg-lockin-cream', text: 'text-[#8C6D23] dark:text-[#F8E7A8]', border: 'border-lockin-yellow' },
};

export const Badge: React.FC<BadgeProps> = ({
  category,
  variant = 'category',
  children,
  className = '',
  size = 'md',
}) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs';

  if (variant === 'xp') {
    return (
      <span className={`inline-flex items-center gap-1 rounded-full font-bold bg-lockin-soft-pink/40 text-lockin-red border border-lockin-soft-pink ${sizeClasses} ${className}`}>
        {children || category}
      </span>
    );
  }

  if (variant === 'streak') {
    return (
      <span className={`inline-flex items-center gap-1 rounded-full font-bold bg-lockin-cream text-lockin-red border border-lockin-yellow ${sizeClasses} ${className}`}>
        🔥 {children || category}
      </span>
    );
  }

  if (variant === 'priority') {
    return (
      <span className={`inline-flex items-center gap-1 rounded-full font-extrabold bg-[#D96B72] text-white shadow-pill ${sizeClasses} ${className}`}>
        {children || 'Highest Priority'}
      </span>
    );
  }

  if (variant === 'new') {
    return (
      <span className={`inline-flex items-center gap-1 rounded-full font-extrabold bg-[#D96B72] text-white uppercase tracking-wider text-[9px] px-2 py-0.5 ${className}`}>
        NEW!
      </span>
    );
  }

  const catStyle = category ? CATEGORY_COLORS[category] || CATEGORY_COLORS.Personal : CATEGORY_COLORS.Personal;

  return (
    <span className={`inline-flex items-center rounded-full font-semibold border ${catStyle.bg} ${catStyle.text} ${catStyle.border} ${sizeClasses} ${className}`}>
      {children || category}
    </span>
  );
};
