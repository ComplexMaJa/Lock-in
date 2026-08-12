import React from 'react';

export const SparkleDoodle: React.FC<{ className?: string; color?: string; style?: React.CSSProperties }> = ({ className = '', color = '#F8E7A8', style }) => (
  <svg className={`inline-block ${className}`} style={style} viewBox="0 0 24 24" fill={color} width="20" height="20">
    <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
  </svg>
);

export const CatDoodle: React.FC<{ className?: string; stroke?: string; style?: React.CSSProperties }> = ({ className = '', stroke = '#777777', style }) => (
  <svg className={`inline-block ${className}`} style={style} viewBox="0 0 80 60" fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="60" height="45">
    <path d="M 15 35 Q 10 20 20 15 L 30 25 Q 40 20 50 25 L 60 15 Q 70 20 65 35 Q 72 45 60 52 Q 40 56 20 52 Q 8 45 15 35 Z" />
    <circle cx="32" cy="36" r="2.5" fill={stroke} />
    <circle cx="48" cy="36" r="2.5" fill={stroke} />
    <path d="M 40 40 L 40 43 M 34 42 L 20 40 M 34 44 L 20 46 M 46 42 L 60 40 M 46 44 L 60 46" />
  </svg>
);

export const StarDoodle: React.FC<{ className?: string; color?: string; style?: React.CSSProperties }> = ({ className = '', color = '#F7C6CE', style }) => (
  <svg className={`inline-block ${className}`} style={style} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
