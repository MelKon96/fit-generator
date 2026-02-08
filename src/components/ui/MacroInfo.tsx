import React from 'react';

interface MacroInfoProps {
  label: string;
  value: number;
  colorClass: string;
  isHigh?: boolean; // Подсветка для целей пользователя
}

const MacroInfo: React.FC<MacroInfoProps> = ({ label, value, colorClass, isHigh }) => (
  <div className={`flex flex-col items-center py-2 rounded-xl border transition-all duration-300 ${
    isHigh 
      ? 'bg-orange-500 text-white border-orange-600 shadow-md scale-105' 
      : 'bg-slate-50/50 text-slate-800 border-slate-100'
  }`}>
    <span className={`text-[9px] font-black uppercase ${isHigh ? 'text-white/80' : colorClass}`}>
      {label}
    </span>
    <span className="text-sm font-bold">{value}г</span>
  </div>
);

export default MacroInfo;