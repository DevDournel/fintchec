import React from 'react';
import * as Icons from 'lucide-react';

type IconProps = {
  name: string;
  size?: number;
  className?: string;
  color?: string;
};

export function Icon({ name, size = 24, className = '', color }: IconProps) {
  const LucideIcon = (Icons as Record<string, React.ComponentType<{ size?: number; className?: string; color?: string }>>)[name];
  if (!LucideIcon) return null;
  return <LucideIcon size={size} className={className} color={color} />;
}

export const colorMap: Record<string, { bg: string; text: string; border: string; ring: string; gradient: string }> = {
  blue: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', ring: 'ring-blue-200', gradient: 'from-blue-500 to-blue-700' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', ring: 'ring-emerald-200', gradient: 'from-emerald-500 to-emerald-700' },
  orange: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', ring: 'ring-orange-200', gradient: 'from-orange-400 to-orange-600' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', ring: 'ring-purple-200', gradient: 'from-purple-500 to-purple-700' },
  pink: { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-200', ring: 'ring-pink-200', gradient: 'from-pink-500 to-pink-700' },
  red: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', ring: 'ring-red-200', gradient: 'from-red-500 to-red-700' },
  teal: { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200', ring: 'ring-teal-200', gradient: 'from-teal-500 to-teal-700' },
  slate: { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-200', ring: 'ring-slate-200', gradient: 'from-slate-500 to-slate-700' },
};
