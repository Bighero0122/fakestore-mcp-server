import { MCPTool, MCPResponse } from "../types";
import { cartService } from "../services/cartService";
import {
  validateRequired,
  validatePositiveNumber,
  validateString,
} from "../utils/validators";
import { logger } from "../utils/logger";

export const addToCartTool: MCPTool = {
  name: "add_to_cart",
  description: "Add a product to user cart",
  parameters: {
    type: "object",
    properties: {
      user_id: { type: "string", description: "User ID" },
      product_id: { type: "number", description: "Product ID" },
      quantity: { type: "number", description: "Quantity to add", default: 1 },
    },
    required: ["user_id", "product_id"],
  },
  handler: async (params: any): Promise<MCPResponse> => {
    try {
      validateRequired(params.user_id, "user_id");
      validateRequired(params.product_id, "product_id");
      validateString(params.user_id, "user_id");
      validatePositiveNumber(params.product_id, "product_id");

      const quantity = params.quantity || 1;
      validatePositiveNumber(quantity, "quantity");

      const cart = await cartService.addToCart(
        params.user_id,
        params.product_id,
        quantity
      );

      return {
        status: "success",
        message: "Product added to cart successfully",
        data: { cart },
      };
    } catch (error) {
      logger.error("Failed to add to cart:", error);
      return {
        status: "error",
        message:
          error instanceof Error ? error.message : "Failed to add to cart",
      };
    }
  },
};

export const removeFromCartTool: MCPTool = {
  name: "remove_from_cart",
  description: "Remove a product from user cart",
  parameters: {
    type: "object",
    properties: {
      user_id: { type: "string", description: "User ID" },
      product_id: { type: "number", description: "Product ID" },
      quantity: {
        type: "number",
        description:
          "Quantity to remove (optional - removes all if not specified)",
      },
    },
    required: ["user_id", "product_id"],
  },
  handler: async (params: any): Promise<MCPResponse> => {
    try {
      validateRequired(params.user_id, "user_id");
      validateRequired(params.product_id, "product_id");
      validateString(params.user_id, "user_id");
      validatePositiveNumber(params.product_id, "product_id");

      if (params.quantity !== undefined) {
        validatePositiveNumber(params.quantity, "quantity");
      }

      const cart = await cartService.removeFromCart(
        params.user_id,
        params.product_id,
        params.quantity
      );

      return {
        status: "success",
        message: "Product removed from cart successfully",
        data: { cart },
      };
    } catch (error) {
      logger.error("Failed to remove from cart:", error);
      return {
        status: "error",
        message:
          error instanceof Error ? error.message : "Failed to remove from cart",
      };
    }
  },
};

export const displayCartTool: MCPTool = {
  name: "display_cart",
  description: "Display user cart with itemized breakdown",
  parameters: {
    type: "object",
    properties: {
      user_id: { type: "string", description: "User ID" },
    },
    required: ["user_id"],
  },
  handler: async (params: any): Promise<MCPResponse> => {
    try {
      validateRequired(params.user_id, "user_id");
      validateString(params.user_id, "user_id");

      const cart = await cartService.getCart(params.user_id);

      return {
        status: "success",
        message: "Cart retrieved successfully",
        cart,
      } as MCPResponse;
    } catch (error) {
      logger.error("Failed to get cart:", error);
      return {
        status: "error",
        message: error instanceof Error ? error.message : "Failed to get cart",
      };
    }
  },
};

export const clearCartTool: MCPTool = {
  name: "clear_cart",
  description: "Clear all items from user cart",
  parameters: {
    type: "object",
    properties: {
      user_id: { type: "string", description: "User ID" },
    },
    required: ["user_id"],
  },
  handler: async (params: any): Promise<MCPResponse> => {
    try {
      validateRequired(params.user_id, "user_id");
      validateString(params.user_id, "user_id");

      await cartService.clearCart(params.user_id);

      return {
        status: "success",
        message: "Cart cleared successfully",
      };
    } catch (error) {
      logger.error("Failed to clear cart:", error);
      return {
        status: "error",
        message:
          error instanceof Error ? error.message : "Failed to clear cart",
      };
    }
  },
};
