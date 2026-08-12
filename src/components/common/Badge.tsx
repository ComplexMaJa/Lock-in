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
  School: { bg: 'bg-[#FFF1D6]', text: 'text-[#B87A00]', border: 'border-[#F8E7A8]' },
  Academics: { bg: 'bg-[#FFF1D6]', text: 'text-[#B87A00]', border: 'border-[#F8E7A8]' },
  Development: { bg: 'bg-[#F7C6CE]/30', text: 'text-[#D96B72]', border: 'border-[#F7C6CE]' },
  Fitness: { bg: 'bg-[#C7E4F5]/40', text: 'text-[#2B7A9E]', border: 'border-[#C7E4F5]' },
  Personal: { bg: 'bg-[#DDD2F4]/40', text: 'text-[#6A4EA0]', border: 'border-[#DDD2F4]' },
  Balance: { bg: 'bg-[#FFF1D6]', text: 'text-[#8C6D23]', border: 'border-[#F8E7A8]' },
  Recovery: { bg: 'bg-[#C7E4F5]/50', text: 'text-[#2B7A9E]', border: 'border-[#C7E4F5]' },
  Discipline: { bg: 'bg-[#F8E7A8]/50', text: 'text-[#8C6D23]', border: 'border-[#F8E7A8]' },
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
      <span className={`inline-flex items-center gap-1 rounded-full font-bold bg-[#F7C6CE]/30 text-[#D96B72] border border-[#F7C6CE] ${sizeClasses} ${className}`}>
        {children || category}
      </span>
    );
  }

  if (variant === 'streak') {
    return (
      <span className={`inline-flex items-center gap-1 rounded-full font-bold bg-[#FFF1D6] text-[#D96B72] border border-[#F8E7A8] ${sizeClasses} ${className}`}>
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
