import { useEffect, useState } from "react";
import type { Product } from "../types/products";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetch("http://64.227.16.230:3001/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  return { products, isLoading, isError };
};
