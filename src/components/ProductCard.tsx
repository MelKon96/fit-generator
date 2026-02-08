import React from "react";
import { ShoppingCart, Star } from "lucide-react";
import type { Product } from "../types/products";
import type { CalculationResults } from "../utils/calculations";

// Импортируем наши новые кирпичики
import MacroInfo from "./ui/MacroInfo";
import PriceBadge from "./ui/PriceBadge";
import CardBadge from "./ui/CardBadge";

interface ProductCardProps extends Product {
  userMacros: CalculationResults | null;
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, price, calories, proteins, fats, carbs, image, userMacros, onAddToCart }) => {
  // Логика "умной" рекомендации
  const isHighProtein = userMacros && proteins > 20;

  return (
    <div className={`group relative bg-white rounded-[2rem] p-5 shadow-sm hover:shadow-xl transition-all duration-500 border flex flex-col h-full ${isHighProtein ? "border-orange-200 bg-orange-50/20" : "border-slate-100"}`}>
      {/* 1. Ярлык (Атом) */}
      {isHighProtein && <CardBadge label="IDEAL FOR YOU" icon={Star} />}

      {/* 2. Картинка (оставим тут, так как она уникальна для карточки) */}
      <div className="relative h-44 w-full overflow-hidden rounded-[1.5rem] bg-slate-50 mb-5">
        <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-slate-700 shadow-sm border border-white/50 uppercase">{calories} ккал</div>
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-bold text-slate-900 mb-3 leading-tight">{name}</h3>

        {/* 3. Сетка БЖУ (Используем Атомы) */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          <MacroInfo label="Белки" value={proteins} colorClass="text-orange-500" isHigh={!!isHighProtein} />
          <MacroInfo label="Жиры" value={fats} colorClass="text-amber-600" />
          <MacroInfo label="Углев." value={carbs} colorClass="text-blue-600" />
        </div>
      </div>

      {/* 4. Футер карточки */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-auto">
        <PriceBadge price={price} />

        <button onClick={onAddToCart} className="bg-slate-900 hover:bg-orange-500 text-white p-3.5 rounded-2xl transition-all active:scale-90 shadow-lg shadow-slate-200 group/btn">
          <ShoppingCart size={20} className="group-hover/btn:rotate-12 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
