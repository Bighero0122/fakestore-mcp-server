import { useState, useEffect } from "react";
import { CartItem } from "../types";
import mcpService from "../services/mcpService";

export const useCart = (userId?: number) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      loadCart();
    } else {
      setCart([]);
    }
  }, [userId]);

  const loadCart = async () => {
    if (!userId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await mcpService.getCart(userId.toString());

      if (response.status === "success" && response.cart) {
        setCart(response.cart.items || []);
      } else {
        setError(response.message || "Failed to load cart");
        setCart([]);
      }
    } catch (err) {
      setError("Failed to connect to server");
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: number, quantity: number = 1) => {
    if (!userId) {
      throw new Error("User not authenticated");
    }

    setLoading(true);
    setError(null);

    try {
      const response = await mcpService.addToCart({
        user_id: userId.toString(),
        product_id: productId,
        quantity: quantity,
      });

      if (response.status === "success" && response.cart) {
        setCart(response.cart.items || []);
      } else {
        throw new Error(response.message || "Failed to add to cart");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to add to cart";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId: number, quantity?: number) => {
    if (!userId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await mcpService.removeFromCart({
        user_id: userId.toString(),
        product_id: productId,
        quantity: quantity,
      });

      if (response.status === "success" && response.cart) {
        setCart(response.cart.items || []);
      } else {
        setError(response.message || "Failed to remove from cart");
      }
    } catch (err) {
      setError("Failed to remove from cart");
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId: number, newQuantity: number) => {
    if (!userId || newQuantity < 0) return;

    const currentItem = cart.find((item) => item.product_id === productId);
    if (!currentItem) return;

    if (newQuantity === 0) {
      await removeFromCart(productId);
      return;
    }

    const difference = newQuantity - currentItem.quantity;

    if (difference > 0) {
      await addToCart(productId, difference);
    } else if (difference < 0) {
      await removeFromCart(productId, Math.abs(difference));
    }
  };

  const clearCart = async () => {
    if (!userId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await mcpService.clearCart(userId.toString());

      if (response.status === "success") {
        setCart([]);
      } else {
        setError(response.message || "Failed to clear cart");
      }
    } catch (err) {
      setError("Failed to clear cart");
    } finally {
      setLoading(false);
    }
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.total, 0);

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartTotal,
    loading,
    error,
    refreshCart: loadCart,
  };
};
