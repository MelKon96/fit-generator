import ProductCard from "./ProductCard";
import type { Product } from "../types/products";
import type { CalculationResults } from "../utils/calculations";

interface ProductGridProps {
  products: Product[];
  userMacros: CalculationResults | null;
  onAddToCart: (product: Product) => void; 
}

const ProductGrid = ({ products, userMacros, onAddToCart }:ProductGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          {...product}
          userMacros={userMacros}

          onAddToCart={() => onAddToCart(product)}
        />
      ))}
    </div>
  );
};
export default ProductGrid;
