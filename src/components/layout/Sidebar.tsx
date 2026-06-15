import { Zap } from "lucide-react";
import CalculatorForm from "../CalculatorForm";
import type { CalculationResults } from "../../utils/calculations";

interface SidebarProps {
  onCalculate: (results: CalculationResults) => void;
  onMagicGenerate: () => void;
}

const Sidebar = ({ onCalculate, onMagicGenerate }: SidebarProps) => {
  return (
    // lg:overflow-y-auto - Доп скролл
    <aside className="w-full lg:w-[400px] bg-white border-r border-slate-100  p-8 lg:h-screen lg:overflow-y-auto lg:sticky lg:top-0 z-20 shadow-xl lg:shadow-none">
      {/* Логотип и Брендинг */}
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-200">
          <Zap size={20} fill="currentColor" />
        </div>
        <h1 className="text-2xl font-black tracking-tighter text-slate-900 uppercase hover:cursor-default">
          Fit<span className="text-orange-500">Fuel</span>
        </h1>
      </div>

      <CalculatorForm onCalculate={onCalculate} />

      <button onClick={onMagicGenerate} className="w-full hover:cursor-pointer mt-6 bg-gradient-to-r from-orange-500 to-amber-500 text-white py-5 rounded-[2rem] font-black uppercase tracking-widest shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2">
        ✨ Сгенерировать рацион
      </button>
    </aside>
  );
};

export default Sidebar;
