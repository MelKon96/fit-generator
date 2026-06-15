export interface CalculationResults {
  calories: number;
  proteins: number;
  fats: number;
  carbs: number;
}

type Gender = "male" | "female";

type Goal = "lose" | "maintain" | "gain";

// 2. Экспортируем саму функцию расчета
export const calculateMacros = (age: number, weight: number, height: number, activity: string, goal: Goal, gender: Gender): CalculationResults => {
  // Базовая часть формулы Миффлина — Сан Жеора
  const baseBmr = 10 * weight + 6.25 * height - 5 * age;

  // Поправка на пол: +5 для мужчин, -161 для женщин
  const bmr = gender === "male" ? baseBmr + 5 : baseBmr - 161;

  // Коэффициент активности
  const activityFactor = parseFloat(activity);

  // TDEE
  const tdee = bmr * activityFactor;

  // Корректировка калорий в зависимости от цели
  let targetCalories = tdee;
  if (goal === "lose") targetCalories = tdee * 0.85; // Дефицит 15%
  if (goal === "gain") targetCalories = tdee * 1.15; // Профицит 15%

  // Расчет БЖУ по классической схеме:

  const proteins = weight * 2;
  const fats = weight * 1;
  const proteinCalories = proteins * 4;
  const fatCalories = fats * 9;
  const carbs = (targetCalories - (proteinCalories + fatCalories)) / 4;

  return {
    calories: Math.round(targetCalories),
    proteins: Math.round(proteins),
    fats: Math.round(fats),
    carbs: Math.round(carbs > 0 ? carbs : 0),
  };
};
