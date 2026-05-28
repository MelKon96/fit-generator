import { MOCK_PRODUCTS } from "../data/products";

export const useProducts = () => {
  return { 
    products: MOCK_PRODUCTS, 
    isLoading: false, 
    isError: false 
  };
};