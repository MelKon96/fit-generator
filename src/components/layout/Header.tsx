import { Search, ShoppingBag, CheckCircle2, LogIn } from "lucide-react";
import { getStatusColor } from "../../utils/uiHelpers";
import type { CalculationResults } from "../../utils/calculations";
import type { SortField, SortOrder } from "../../types/products";

interface HeaderProps {
  searchQuery: string;
  filterVeggie: boolean;
  filterDiabetes: boolean;
  userMacros: CalculationResults | null;
  cartCalories: number;
  cartLength: number;
  sortBy: SortField;
  sortOrder: SortOrder;
  user: string | null;
  setSearchQuery: (query: string) => void;
  setFilterVeggie: (val: boolean) => void;
  onOpenCart: () => void;
  setFilterDiabetes: (val: boolean) => void;
  onSort: (field: SortField) => void;
  onOpenLogin: () => void;
  onLogout: () => void;
}

const Header = ({ searchQuery, user, onOpenLogin, onLogout, setSearchQuery, filterVeggie, setFilterVeggie, filterDiabetes, setFilterDiabetes, userMacros, cartCalories, cartLength, onOpenCart, sortBy, sortOrder, onSort }: HeaderProps) => {
  return (
    <header className="flex flex-col gap-8 mb-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex-1 max-w-2xl w-full space-y-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-orange-500 transition-colors" size={20} />
            <input type="text" placeholder="Найти продукт..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-6 py-4 bg-white border-none rounded-[1.5rem] shadow-sm outline-none font-medium transition-all" />
          </div>

          <div className="flex gap-3">
            <button onClick={() => setFilterVeggie(!filterVeggie)} className={`flex hover:cursor-pointer items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filterVeggie ? "bg-green-500 text-white shadow-md" : "bg-white text-slate-400 hover:bg-slate-50"}`}>
              {filterVeggie && <CheckCircle2 size={12} />} Вегетарианское
            </button>
            <button onClick={() => setFilterDiabetes(!filterDiabetes)} className={`flex hover:cursor-pointer items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filterDiabetes ? "bg-blue-500 text-white shadow-md" : "bg-white text-slate-400 hover:bg-slate-50"}`}>
              {filterDiabetes && <CheckCircle2 size={12} />} Диабет-friendly
            </button>
          </div>
        </div>

        <div className="flex flex-col items-end gap-3">
          {user ? (
            <button onClick={onLogout} className="relative p-4 bg-orange-500 text-white rounded-2xl cursor-pointer hover:bg-red-500 transition-all shadow-lg active:scale-90">
              <span className="text-[11px] font-black uppercase">{user.split("@")[0]}</span>
            </button>
          ) : (
            <button onClick={onOpenLogin} className="relative p-4 bg-slate-900 text-white rounded-2xl cursor-pointer hover:bg-orange-500 transition-all shadow-lg active:scale-90">
              <LogIn size={24} />
            </button>
          )}
          <div className="flex items-center gap-3">
            {userMacros && (
              <div className="text-right hidden sm:block">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Лимит</p>
                <p className={`text-lg font-black transition-colors duration-500 ${getStatusColor(cartCalories, userMacros.calories)}`}>
                  {cartCalories.toFixed(0)} / {userMacros.calories} ккал
                </p>
              </div>
            )}
            <div onClick={onOpenCart} className="relative p-4 bg-slate-900 text-white rounded-2xl cursor-pointer hover:bg-orange-500 transition-all shadow-lg active:scale-90">
              <ShoppingBag size={24} />
              <span className="absolute -top-2 -right-2 bg-orange-500 text-[11px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">{cartLength}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 pb-4 border-b border-slate-100">
        {(["proteins", "fats", "carbs", "calories", "price"] as SortField[]).map((field) => (
          <button key={field} onClick={() => onSort(field)} className={`px-4 py-2 hover:cursor-pointer rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${sortBy === field ? "bg-slate-900 text-white shadow-lg" : "bg-white text-slate-400 hover:bg-slate-50"}`}>
            {field === "proteins" ? "Белки" : field === "fats" ? "Жиры" : field === "carbs" ? "Углеводы" : field === "calories" ? "Ккал" : "Цена"}
            {sortBy === field && (sortOrder === "asc" ? " ↑" : " ↓")}
          </button>
        ))}
      </div>
    </header>
  );
};

export default Header;
