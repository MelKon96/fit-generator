export const getStatusColor = (current: number, target: number) => {
  if (!target || current <= target) return "text-slate-900";
  const overPercent = ((current - target) / target) * 100;
  if (overPercent <= 5) return "text-yellow-500";
  if (overPercent <= 15) return "text-orange-500";
  return "text-red-600 animate-pulse";
};

export const getStatusBg = (current: number, target: number) => {
  if (!target || current <= target) return "bg-slate-900";
  const overPercent = ((current - target) / target) * 100;
  if (overPercent <= 5) return "bg-yellow-500";
  if (overPercent <= 15) return "bg-orange-500";
  return "bg-red-600 animate-pulse";
};

export const getMacroColor = (current: number, target: number, baseColor: string) => {
  if (!target || current <= target) return baseColor;
  const overPercent = ((current - target) / target) * 100;
  if (overPercent <= 5) return "bg-yellow-500";
  if (overPercent <= 15) return "bg-orange-500";
  return "bg-red-600 animate-pulse";
};
