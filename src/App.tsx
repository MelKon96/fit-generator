import React, { useState, useMemo } from "react";

import { useProducts } from "./hooks/useProducts";
import { generateGeneticDiet } from "./utils/dietGenerator";
import { useLocalStorage } from "./hooks/useLocalStorage";

import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import CartDrawer from "./components/layout/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import ProductGrid from "./components/ProductGrid";
import AuthModal from "./components/AuthModal";

import type { Product, SortField, SortOrder } from "./types/products";
import type { CalculationResults } from "./utils/calculations";
import type { GeneratedDietItem, DietPlan } from "./utils/dietGenerator";
import Spinner from "./components/ui/Spinner";
import ErrorScreen from "./components/ui/ErrorScreen";

const App: React.FC = () => {
  const [userMacros, setUserMacros] = useLocalStorage<CalculationResults | null>("user_macros", null);
  const [cart, setCart] = useLocalStorage<(Product | GeneratedDietItem)[]>("fitfuel_cart", []);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortField>("calories");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [filterVeggie, setFilterVeggie] = useState(false);
  const [filterDiabetes, setFilterDiabetes] = useState(false);

  // Аутентификация
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  const { products, isLoading, isError } = useProducts();

  const handleMagicGenerate = () => {
    if (!userMacros) return alert("Сначала рассчитайте свои нормы!");
    const result: DietPlan = generateGeneticDiet(userMacros, products);
    setCart(result.combo);
  };

  const handleSort = (field: SortField) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  const processedProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesVeggie = filterVeggie ? product.isVeggie : true;
        const matchesDiabetes = filterDiabetes ? product.isDiabetesFriendly : true;
        return matchesSearch && matchesVeggie && matchesDiabetes;
      })
      .sort((a, b) => {
        const factor = sortOrder === "asc" ? 1 : -1;
        return ((a[sortBy] as number) - (b[sortBy] as number)) * factor;
      });
  }, [searchQuery, sortBy, sortOrder, filterVeggie, filterDiabetes, products]);

  const cartTotals = useMemo(() => {
    return cart.reduce(
      (acc, item) => {
        const w = (item as GeneratedDietItem).weight || 100;
        return {
          calories: acc.calories + (item.calories * w) / 100,
          proteins: acc.proteins + (item.proteins * w) / 100,
          fats: acc.fats + (item.fats * w) / 100,
          carbs: acc.carbs + (item.carbs * w) / 100,
        };
      },
      { calories: 0, proteins: 0, fats: 0, carbs: 0 },
    );
  }, [cart]);

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorScreen />;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row font-sans">
      <Sidebar
        onCalculate={(res) => {
          setUserMacros(res);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onMagicGenerate={handleMagicGenerate}
      />

      <main className="flex-1 p-4 lg:p-12">
        <Header searchQuery={searchQuery} onLogout={() => setUser(null)} user={user} onOpenLogin={() => setIsLoginOpen(true)} setSearchQuery={setSearchQuery} filterVeggie={filterVeggie} setFilterVeggie={setFilterVeggie} filterDiabetes={filterDiabetes} setFilterDiabetes={setFilterDiabetes} userMacros={userMacros} cartCalories={cartTotals.calories} cartLength={cart.length} onOpenCart={() => setIsCartOpen(true)} sortBy={sortBy} sortOrder={sortOrder} onSort={handleSort} />
        <ProductGrid products={processedProducts} userMacros={userMacros} onAddToCart={(p) => setCart([...cart, { ...p, weight: 100 }])} />
      </main>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        cartTotals={cartTotals}
        userMacros={userMacros}
        onRemoveItem={(idx) => setCart(cart.filter((_, i) => i !== idx))}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} total={cartTotals.calories * 0.45} />
      <AuthModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onLogin={(email) => setUser(email)} />
    </div>
  );
};

export default App;
