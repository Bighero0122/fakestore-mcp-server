import { useState, useEffect } from "react";
import { Product } from "../types";
import mcpService from "../services/mcpService";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = async (category?: string, limit?: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await mcpService.getProducts(category, limit);

      if (response.status === "success" && response.products) {
        setProducts(response.products);

        if (!category) {
          const uniqueCategories = Array.from(
            new Set(response.products.map((p) => p.category))
          );
          setCategories(uniqueCategories);
        }
      } else {
        setError(response.message || "Failed to load products");
        setProducts([]);
      }
    } catch (err: any) {
      setError(err.message || "Failed to connect to server");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return {
    products,
    categories,
    loading,
    error,
    loadProducts,
  };
};
