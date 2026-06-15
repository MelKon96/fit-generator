import type { LucideIcon } from "lucide-react";

interface CardBadgeProps {
  label: string;
  icon: LucideIcon;
}

const CardBadge = ({ label, icon: Icon }: CardBadgeProps) => (
  <div className="absolute -top-3 left-6 z-10  bg-orange-500 text-white text-[10px] font-black px-3 py-1 rounded-full flex items-center gap-1 shadow-lg animate-in zoom-in duration-500">
    <Icon size={10} fill="currentColor" />
    {label}
  </div>
);

export default CardBadge;
