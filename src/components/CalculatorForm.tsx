import React from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Target, Activity, ArrowRight, Flame, Venus, Mars } from "lucide-react";
import { calculateMacros, type CalculationResults } from "../utils/calculations";

import FormField from "./ui/FormField";
import GenderButton from "./ui/GenderButton";
import GoalButton from "./ui/GoalButton";

interface CalculatorFormProps {
  onCalculate: (results: CalculationResults) => void;
}

interface FormState {
  gender: "male" | "female";
  age: string;
  weight: string;
  height: string;
  activity: string;
  goal: "lose" | "maintain" | "gain";
}

const CalculatorForm = ({ onCalculate }: CalculatorFormProps) => {
  const [formData, setFormData] = useLocalStorage<FormState>("calculator_input_data", {
    gender: "male",
    age: "",
    weight: "",
    height: "",
    activity: "1.2",
    goal: "maintain",
  });

  const [results, setResults] = useLocalStorage<CalculationResults | null>("calculator_results", null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCalculate = () => {
    const { age, weight, height, activity, goal, gender } = formData;
    if (!age || !weight || !height) return alert("Заполните все данные!");

    const res = calculateMacros(Number(age), Number(weight), Number(height), activity, goal, gender);
    setResults(res);
    onCalculate(res);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
      {!results ? (
        <>
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Ваш пол</label>
            <div className="grid grid-cols-2 gap-3">
              <GenderButton label="Мужчина" icon={Mars} colorClass="text-blue-500" active={formData.gender === "male"} onClick={() => setFormData((p) => ({ ...p, gender: "male" }))} />
              <GenderButton label="Женщина" icon={Venus} colorClass="text-pink-500" active={formData.gender === "female"} onClick={() => setFormData((p) => ({ ...p, gender: "female" }))} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <FormField label="Возраст" name="age" type="number" value={formData.age} min="6" max="120" onChange={handleChange} placeholder="25" />
            <FormField label="Вес (кг)" name="weight" type="number" value={formData.weight} min="30" max="200" onChange={handleChange} placeholder="70" />
            <FormField label="Рост (см)" name="height" type="number" value={formData.height} min="110" max="260" onChange={handleChange} placeholder="180" />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Активность</label>
            <div className="relative">
              <Activity className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <select name="activity" value={formData.activity} onChange={handleChange} className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold appearance-none cursor-pointer">
                <option value="1.2">Сидячий</option>
                <option value="1.375">Легкая</option>
                <option value="1.55">Средняя</option>
                <option value="1.725">Высокая</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 ml-1">
              <Target className="text-orange-500" size={16} />
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Ваша цель</label>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <GoalButton label="Похудение" active={formData.goal === "lose"} onClick={() => setFormData((p) => ({ ...p, goal: "lose" }))} />
              <GoalButton label="Удержание" active={formData.goal === "maintain"} onClick={() => setFormData((p) => ({ ...p, goal: "maintain" }))} />
              <GoalButton label="Набор массы" active={formData.goal === "gain"} onClick={() => setFormData((p) => ({ ...p, goal: "gain" }))} />
            </div>
          </div>

          <button onClick={handleCalculate} className="w-full bg-slate-900 hover:cursor-pointer text-white py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] hover:bg-orange-600 transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95">
            Рассчитать <ArrowRight size={20} />
          </button>
        </>
      ) : (
        <div className="space-y-6 animate-in zoom-in duration-500 text-center">
          <div className="bg-orange-500 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
            <Flame className="absolute -right-4 -top-4 w-32 h-32 text-white/10" />
            <p className="text-orange-100 font-bold uppercase text-[10px] tracking-widest mb-2">Ваша норма</p>
            <h2 className="text-6xl font-black">{results.calories}</h2>
            <p className="font-bold opacity-80 mt-1 uppercase text-xs">ккал / день</p>
          </div>
          <button onClick={() => setResults(null)} className="w-full py-4 cursor-pointer text-slate-400 font-bold hover:text-orange-500 transition-colors text-sm">
            ← Назад к расчету
          </button>
        </div>
      )}
    </div>
  );
};

export default CalculatorForm;
