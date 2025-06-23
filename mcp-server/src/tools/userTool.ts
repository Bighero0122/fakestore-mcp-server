import { MCPTool, MCPResponse } from "../types";
import { fakeStoreApi } from "../services/fakeStoreApi";
import { logger } from "../utils/logger";

export const getUsersTool: MCPTool = {
  name: "get_users",
  description: "Get all users (bonus functionality)",
  parameters: {
    type: "object",
    properties: {},
  },
  handler: async (): Promise<MCPResponse> => {
    try {
      const users = await fakeStoreApi.getUsers();

      logger.info(`Retrieved ${users.length} users`);

      return {
        status: "success",
        message: "Users retrieved successfully",
        data: { users },
      };
    } catch (error) {
      logger.error("Failed to get users:", error);
      return {
        status: "error",
        message: error instanceof Error ? error.message : "Failed to get users",
      };
    }
  },
};
