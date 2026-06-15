interface GoalButtonProps {
  active: boolean;
  label: string;
  onClick: () => void;
}

const GoalButton = ({ active, label, onClick }: GoalButtonProps) => (
  <button type="button" onClick={onClick} className={`flex items-center justify-between hover:cursor-pointer p-4 rounded-2xl border-2 transition-all duration-300 ${active ? "border-orange-500 bg-orange-50/50" : "border-slate-50 hover:border-slate-200 bg-white"}`}>
    <span className={`text-sm font-bold ${active ? "text-orange-600" : "text-slate-700"}`}>{label}</span>
    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${active ? "border-orange-500 bg-orange-500" : "border-slate-200"}`}>{active && <div className="w-1.5 h-1.5 rounded-full bg-white" />}</div>
  </button>
);

export default GoalButton;
