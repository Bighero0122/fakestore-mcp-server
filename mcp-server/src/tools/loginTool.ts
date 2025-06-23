import { MCPTool, MCPResponse } from "../types";
import { fakeStoreApi } from "../services/fakeStoreApi";
import { validateRequired, validateString } from "../utils/validators";
import { logger } from "../utils/logger";

export const loginTool: MCPTool = {
  name: "login_user",
  description: "Authenticate user with username and password",
  parameters: {
    type: "object",
    properties: {
      username: { type: "string", description: "Username" },
      password: { type: "string", description: "Password" },
    },
    required: ["username", "password"],
  },
  handler: async (params: any): Promise<MCPResponse> => {
    try {
      validateRequired(params.username, "username");
      validateRequired(params.password, "password");
      validateString(params.username, "username");
      validateString(params.password, "password");

      const result = await fakeStoreApi.login({
        username: params.username,
        password: params.password,
      });

      logger.info(`User ${params.username} logged in successfully`);

      return {
        status: "success",
        message: "Login successful",
        user: result.user,
        token: result.token,
      } as MCPResponse;
    } catch (error) {
      logger.error("Login failed:", error);
      return {
        status: "error",
        message: error instanceof Error ? error.message : "Login failed",
      };
    }
  },
};
