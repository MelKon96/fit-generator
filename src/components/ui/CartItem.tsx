import { Trash2, Scale } from "lucide-react";

interface CartItemProps {
  name: string;
  price: number;
  weight?: number;
  onRemove: () => void;
}

const CartItem = ({ name, price, weight = 100, onRemove }: CartItemProps) => {
  // Рассчитываем итоговую цену за конкретный вес
  // Формула: (Цена за 100г * Вес) / 100
  const totalPrice = (price * weight) / 100;

  return (
    <div className="group flex hover:cursor-default  items-center justify-between p-4 mb-3 bg-slate-50 hover:bg-white border border-transparent hover:border-slate-200 rounded-2xl transition-all duration-300">
      <div className="flex-1">
        <h4 className="font-bold  cursor-pointer text-slate-900 group-hover:text-orange-600 transition-colors">{name}</h4>

        <div className="flex items-center gap-4 mt-1">
          {/* Индикатор веса */}
          <div className="flex items-center gap-1.5 text-slate-400 bg-white px-2 py-0.5 rounded-lg border border-slate-100 shadow-sm">
            <Scale size={12} className="text-orange-400" />
            <span className="text-[10px] font-black uppercase tracking-tight">{weight} г</span>
          </div>

          {/* Цена */}
          <span className="text-[10px] font-bold text-slate-400">{totalPrice} ₽</span>
        </div>
      </div>

      <button onClick={onRemove} className="p-2 hover:cursor-pointer text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all active:scale-90" title="Удалить">
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default CartItem;
