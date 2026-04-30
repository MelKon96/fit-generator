import React from "react";
import type { LucideIcon } from "lucide-react";

interface GenderButtonProps {
  active: boolean;
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  colorClass: string;
}

const GenderButton: React.FC<GenderButtonProps> = ({ active, label, icon: Icon, onClick, colorClass }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex items-center hover:cursor-pointer justify-center gap-3 p-4 rounded-2xl border-2 transition-all duration-300 ${
      active ? "border-slate-900 bg-slate-900 text-white shadow-xl shadow-slate-200" : "border-slate-100 bg-white text-slate-400 hover:border-slate-200"
    }`}
  >
    <Icon size={18} className={active ? "text-white" : colorClass} />
    <span className="font-bold text-sm">{label}</span>
  </button>
);

export default GenderButton;