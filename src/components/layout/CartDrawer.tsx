import React from "react";
import Overlay from "../ui/Overlay";
import CartItem from "../ui/CartItem";
import ProgressBar from "../ui/ProgressBar";
import { getStatusColor, getStatusBg, getMacroColor } from "../../utils/uiHelpers";

import type { Product } from "../../types/products";
import type { CalculationResults } from "../../utils/calculations";
import type { GeneratedDietItem } from "../../utils/dietGenerator";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: (Product | GeneratedDietItem)[];
  cartTotals: {
    calories: number;
    proteins: number;
    fats: number;
    carbs: number;
  };
  userMacros: CalculationResults | null;
  onRemoveItem: (index: number) => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, cart, cartTotals, userMacros, onRemoveItem, onCheckout }) => {
  return (
    <>
      <Overlay isOpen={isOpen} onClick={onClose} />
      <aside className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transition-transform duration-500 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-8 h-full flex flex-col">
          {/* Заголовок */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl hover:cursor-default font-black text-slate-900">Ваша корзина</h2>
            <button onClick={onClose} className="text-[10px] font-black hover:cursor-pointer uppercase text-slate-400 hover:text-slate-900 transition-colors">
              Закрыть
            </button>
          </div>

          <div className="flex-1 overflow-y-auto mb-6 pr-2">{cart.length === 0 ? <div className="text-center py-20 text-slate-400 italic font-medium">Корзина пуста...</div> : cart.map((item, index) => <CartItem key={`${item.id}-${index}`} name={item.name} price={item.price} weight={(item as GeneratedDietItem).weight} onRemove={() => onRemoveItem(index)} />)}</div>

          {/* Прогресс нутриентов */}
          {userMacros && (
            <div className="bg-slate-50 p-6 rounded-[2rem] mb-6 space-y-4 shadow-inner">
              <ProgressBar label="Белки" current={Number(cartTotals.proteins.toFixed(1))} target={userMacros.proteins} color={getMacroColor(cartTotals.proteins, userMacros.proteins, "bg-orange-500")} />
              <ProgressBar label="Жиры" current={Number(cartTotals.fats.toFixed(1))} target={userMacros.fats} color={getMacroColor(cartTotals.fats, userMacros.fats, "bg-amber-500")} />
              <ProgressBar label="Углеводы" current={Number(cartTotals.carbs.toFixed(1))} target={userMacros.carbs} color={getMacroColor(cartTotals.carbs, userMacros.carbs, "bg-blue-500")} />
            </div>
          )}

          <div className="pt-6 border-t border-slate-100 mt-auto">
            <div className="flex justify-between items-end mb-6">
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Итого калорий</p>
                <p className={`text-3xl font-black transition-colors duration-500 ${getStatusColor(cartTotals.calories, userMacros?.calories || 0)}`}>{cartTotals.calories.toFixed(0)} ккал</p>
              </div>
              <p className="text-xs font-bold text-slate-400">Лимит: {userMacros?.calories || 0}</p>
            </div>
            <button onClick={onCheckout} className={`w-full hover:cursor-pointer text-white py-5 rounded-3xl font-black uppercase tracking-widest shadow-xl transition-all duration-500 ${userMacros ? getStatusBg(cartTotals.calories, userMacros.calories) : "bg-slate-900"}`}>
              Оформить заказ
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default CartDrawer;
