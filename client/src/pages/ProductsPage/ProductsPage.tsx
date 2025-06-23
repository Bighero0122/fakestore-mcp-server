import React, { useState } from "react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { useProducts } from "../../hooks/useProducts";
import { Product } from "../../types";

interface ProductsPageProps {
  onAddToCart: (productId: number) => Promise<void>;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ onAddToCart }) => {
  const { products, categories, loading, loadProducts } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    loadProducts(category || undefined);
  };

  const handleAddToCart = async (productId: number) => {
    try {
      await onAddToCart(productId);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-500 text-lg">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Products</h1>

        <select
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product: Product) => (
          <Card key={product.id} hover className="flex flex-col">
            <div className="h-48 p-4 bg-gray-50 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.title}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                {product.title}
              </h3>
              <p className="text-sm text-gray-500 capitalize mb-2">
                {product.category}
              </p>
              <div className="text-sm text-yellow-500 mb-3">
                ⭐ {product.rating.rate} ({product.rating.count})
              </div>
              <div className="text-2xl font-bold text-red-600 mb-4">
                ${product.price}
              </div>

              <div className="mt-auto">
                <Button
                  onClick={() => handleAddToCart(product.id)}
                  fullWidth
                  variant="success"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
