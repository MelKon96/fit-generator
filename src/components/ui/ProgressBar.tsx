
interface ProgressBarProps {
  label: string;
  current: number;
  target: number;
  color: string;
}

const ProgressBar = ({ label, current, target, color }:ProgressBarProps) => {
  const percentage = Math.min((current / target) * 100, 100);

  const displayPercentage = ((current / target) * 100).toFixed(0);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-end">
        <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{label}</span>
        <span className="text-[10px] font-bold text-slate-600">
          {current} / {target} г ({displayPercentage}%)
        </span>
      </div>

      <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
        <div className={`h-full ${color} transition-all duration-700 ease-out`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
};

export default ProgressBar;
