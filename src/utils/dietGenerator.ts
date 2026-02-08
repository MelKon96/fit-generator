import type { Product } from "../types/products";
import type { CalculationResults } from "./calculations";

export interface GeneratedDietItem extends Product {
  weight: number;
}

export interface DietPlan {
  combo: GeneratedDietItem[];
  totalCalories: number;
}

// Константы эволюции: баланс между скоростью и качеством
const POPULATION_SIZE = 120;
const GENERATIONS = 200;
const MUTATION_RATE = 0.3;

export const generateGeneticDiet = (
  targets: CalculationResults,
  products: Product[]
): DietPlan => {
  // 1. Создаем начальную популяцию, используя норму калорий для адекватных стартовых весов
  let population = Array.from({ length: POPULATION_SIZE }, () => 
    createRandomPlan(products, targets.calories)
  );

  for (let g = 0; g < GENERATIONS; g++) {
    const scoredPopulation = population.map(plan => ({
      plan,
      score: calculateFitness(plan, targets)
    }));

    // Сортировка по силе (fitness)
    scoredPopulation.sort((a, b) => b.score - a.score);

    // Элитизм: 20 лучших планов проходят дальше без изменений
    const survivors = scoredPopulation.slice(0, 20).map(s => s.plan);

    const nextGeneration = [...survivors];
    while (nextGeneration.length < POPULATION_SIZE) {
      const parentA = survivors[Math.floor(Math.random() * survivors.length)];
      const parentB = survivors[Math.floor(Math.random() * survivors.length)];
      let child = crossover(parentA, parentB);
      
      if (Math.random() < MUTATION_RATE) {
        child = mutate(child, products);
      }
      nextGeneration.push(child);
    }
    population = nextGeneration;
  }

  // Возвращаем абсолютного победителя эволюции
  const bestPlan = population[0];
  return {
    combo: bestPlan,
    totalCalories: calculateTotal(bestPlan, "calories")
  };
};

// Вспомогательный расчет суммы по полю
const calculateTotal = (plan: GeneratedDietItem[], field: keyof Product): number => {
  return plan.reduce((sum, p) => sum + ((p[field] as number) * p.weight) / 100, 0);
};

// Создание случайного плана с учетом целевых калорий
function createRandomPlan(products: Product[], targetCal: number): GeneratedDietItem[] {
  // Выбираем от 6 до 10 случайных продуктов для разнообразия
  const count = Math.floor(Math.random() * 5) + 6;
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  
  // Рассчитываем примерный вес порции, чтобы сразу быть близко к цели
  const avgCalPerProduct = targetCal / count;
  
  return shuffled.slice(0, count).map(p => {
    // Базовый вес: сколько нужно этого продукта, чтобы закрыть его долю калорий
    const baseWeight = (avgCalPerProduct / (p.calories || 100)) * 100;
    
    return {
      ...p,
      // Ограничиваем вес разумными рамками 50-250г с шагом 10г
      weight: Math.min(250, Math.max(50, Math.floor(baseWeight / 10) * 10))
    };
  });
}



function calculateFitness(plan: GeneratedDietItem[], targets: CalculationResults): number {
  const totalCal = calculateTotal(plan, "calories");
  const totalProt = calculateTotal(plan, "proteins");
  const totalFat = calculateTotal(plan, "fats");
  const totalCarb = calculateTotal(plan, "carbs");

  // Штраф за превышение калорий: чем выше перебор, тем сильнее "бьем" по рейтингу
  let caloriePenalty = 1;
  if (totalCal > targets.calories) {
    caloriePenalty = Math.pow((totalCal - targets.calories) / 10 + 1, 3);
  }

  // Относительные отклонения (в процентах) — ключевой момент для баланса БЖУ
  const protDiff = Math.abs(targets.proteins - totalProt) / (targets.proteins || 1);
  const fatDiff = Math.abs(targets.fats - totalFat) / (targets.fats || 1);
  const carbDiff = Math.abs(targets.carbs - totalCarb) / (targets.carbs || 1);
  const calDiff = Math.abs(targets.calories - totalCal) / targets.calories;

  // Веса приоритетов: Углеводы обычно сложнее всего набрать, даем им х20
  const totalDeviation = 
    (calDiff * 15) + 
    (protDiff * 10) + 
    (fatDiff * 15) + 
    (carbDiff * 20); 

  // Штраф за "пустые" макросы — план без жиров или углеводов нам не подходит
  const zeroPenalty = (totalProt < 5 || totalFat < 5 || totalCarb < 5) ? 100 : 1;

  return 1000000 / (totalDeviation * caloriePenalty * zeroPenalty + 1);
}

function crossover(a: GeneratedDietItem[], b: GeneratedDietItem[]): GeneratedDietItem[] {
  const midpoint = Math.floor(Math.random() * a.length);
  const child = [...a.slice(0, midpoint), ...b.slice(midpoint)];
  // Убираем дубликаты продуктов через Map
  return Array.from(new Map(child.map(p => [p.id, p])).values());
}

function mutate(plan: GeneratedDietItem[], allProducts: Product[]): GeneratedDietItem[] {
  // Глубокое копирование, чтобы не мутировать состояние React напрямую
  const newPlan: GeneratedDietItem[] = JSON.parse(JSON.stringify(plan));
  const action = Math.random();

  if (action < 0.5) {
    // Мутация веса (шаг 10г)
    const idx = Math.floor(Math.random() * newPlan.length);
    const change = Math.random() > 0.5 ? 10 : -10;
    newPlan[idx].weight = Math.max(10, newPlan[idx].weight + change);
  } else if (action < 0.8 && newPlan.length < 12) {
    // Добавление нового продукта
    const randomProduct = allProducts[Math.floor(Math.random() * allProducts.length)];
    if (!newPlan.find(p => p.id === randomProduct.id)) {
      newPlan.push({ ...randomProduct, weight: 100 });
    }
  } else if (newPlan.length > 4) {
    // Удаление лишнего продукта
    newPlan.splice(Math.floor(Math.random() * newPlan.length), 1);
  }
  return newPlan;
}