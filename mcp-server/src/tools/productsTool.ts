import { MCPTool, MCPResponse } from "../types";
import { fakeStoreApi } from "../services/fakeStoreApi";
import { logger } from "../utils/logger";

export const getProductsTool: MCPTool = {
  name: "get_products",
  description:
    "Get products from the store with optional category and limit filters",
  parameters: {
    type: "object",
    properties: {
      category: { type: "string", description: "Product category filter" },
      limit: {
        type: "number",
        description: "Maximum number of products to return",
      },
    },
  },
  handler: async (params: any): Promise<MCPResponse> => {
    try {
      const products = await fakeStoreApi.getProducts(
        params.category,
        params.limit
      );

      logger.info(`Retrieved ${products.length} products`);

      return {
        status: "success",
        message: "Products retrieved successfully",
        products,
        count: products.length,
      } as MCPResponse;
    } catch (error) {
      logger.error("Failed to get products:", error);
      return {
        status: "error",
        message:
          error instanceof Error ? error.message : "Failed to get products",
      };
    }
  },
};

export const getCategoresTool: MCPTool = {
  name: "get_categories",
  description: "Get all available product categories",
  parameters: {
    type: "object",
    properties: {},
  },
  handler: async (): Promise<MCPResponse> => {
    try {
      const categories = await fakeStoreApi.getCategories();

      logger.info(`Retrieved ${categories.length} categories`);

      return {
        status: "success",
        message: "Categories retrieved successfully",
        categories,
      } as MCPResponse;
    } catch (error) {
      logger.error("Failed to get categories:", error);
      return {
        status: "error",
        message:
          error instanceof Error ? error.message : "Failed to get categories",
      };
    }
  },
};
