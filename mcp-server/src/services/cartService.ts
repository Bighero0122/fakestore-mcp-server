import { Cart, CartItem } from "../types/fakestore";
import { fakeStoreApi } from "./fakeStoreApi";
import { logger } from "../utils/logger";

class CartService {
  private carts: Map<string, Cart> = new Map();

  async getCart(userId: string): Promise<Cart> {
    if (!this.carts.has(userId)) {
      this.carts.set(userId, {
        items: [],
        total_items: 0,
        subtotal: 0,
        tax: 0,
        total: 0,
      });
    }
    return this.carts.get(userId)!;
  }

  async addToCart(
    userId: string,
    productId: number,
    quantity: number = 1
  ): Promise<Cart> {
    try {
      const product = await fakeStoreApi.getProduct(productId);
      const cart = await this.getCart(userId);

      const existingItemIndex = cart.items.findIndex(
        (item) => item.product_id === productId
      );

      if (existingItemIndex >= 0) {
        cart.items[existingItemIndex].quantity += quantity;
        cart.items[existingItemIndex].total =
          cart.items[existingItemIndex].quantity * product.price;
      } else {
        const cartItem: CartItem = {
          product_id: productId,
          title: product.title,
          price: product.price,
          quantity: quantity,
          total: product.price * quantity,
          image: product.image,
        };
        cart.items.push(cartItem);
      }

      this.updateCartTotals(cart);
      this.carts.set(userId, cart);

      logger.info(
        `Added ${quantity} of product ${productId} to cart for user ${userId}`
      );
      return cart;
    } catch (error) {
      logger.error("Failed to add to cart:", error);
      throw error;
    }
  }

  async removeFromCart(
    userId: string,
    productId: number,
    quantity?: number
  ): Promise<Cart> {
    try {
      const cart = await this.getCart(userId);
      const itemIndex = cart.items.findIndex(
        (item) => item.product_id === productId
      );

      if (itemIndex === -1) {
        throw new Error("Item not found in cart");
      }

      if (quantity && cart.items[itemIndex].quantity > quantity) {
        cart.items[itemIndex].quantity -= quantity;
        cart.items[itemIndex].total =
          cart.items[itemIndex].quantity * cart.items[itemIndex].price;
      } else {
        cart.items.splice(itemIndex, 1);
      }

      this.updateCartTotals(cart);
      this.carts.set(userId, cart);

      logger.info(`Removed from cart for user ${userId}`);
      return cart;
    } catch (error) {
      logger.error("Failed to remove from cart:", error);
      throw error;
    }
  }

  async clearCart(userId: string): Promise<void> {
    this.carts.set(userId, {
      items: [],
      total_items: 0,
      subtotal: 0,
      tax: 0,
      total: 0,
    });
    logger.info(`Cleared cart for user ${userId}`);
  }

  private updateCartTotals(cart: Cart): void {
    cart.subtotal = cart.items.reduce((sum, item) => sum + item.total, 0);
    cart.total_items = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    cart.tax = cart.subtotal * 0.08; // 8% tax
    cart.total = cart.subtotal + cart.tax;
  }
}

export const cartService = new CartService();
