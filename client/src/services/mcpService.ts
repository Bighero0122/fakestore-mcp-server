import {
  LoginRequest,
  LoginResponse,
  ProductsResponse,
  CartResponse,
  AddToCartRequest,
  RemoveFromCartRequest,
  MCPResponse,
} from "../types";

class MCPService {
  private baseUrl: string;

  constructor() {
    this.baseUrl =
      process.env.REACT_APP_MCP_BRIDGE_URL || "http://localhost:8080";
  }

  private async callMCPTool<T extends MCPResponse>(
    toolName: string,
    parameters: any = {}
  ): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}/mcp/tools/${toolName}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parameters),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();

      return result as T;
    } catch (error) {
      return {
        status: "error",
        message: error instanceof Error ? error.message : "Unknown error",
      } as T;
    }
  }

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    return this.callMCPTool<LoginResponse>("login_user", {
      username: credentials.username,
      password: credentials.password,
    });
  }

  async getProducts(
    category?: string,
    limit?: number
  ): Promise<ProductsResponse> {
    const parameters: any = {};
    if (category) parameters.category = category;
    if (limit) parameters.limit = limit;

    return this.callMCPTool<ProductsResponse>("get_products", parameters);
  }

  async addToCart(request: AddToCartRequest): Promise<CartResponse> {
    const result = await this.callMCPTool<MCPResponse>("add_to_cart", {
      user_id: request.user_id,
      product_id: request.product_id,
      quantity: request.quantity || 1,
    });

    if (result.status === "success") {
      return this.getCart(request.user_id);
    }

    return result as CartResponse;
  }

  async removeFromCart(request: RemoveFromCartRequest): Promise<CartResponse> {
    const parameters: any = {
      user_id: request.user_id,
      product_id: request.product_id,
    };
    if (request.quantity !== undefined) {
      parameters.quantity = request.quantity;
    }

    const result = await this.callMCPTool<MCPResponse>(
      "remove_from_cart",
      parameters
    );

    if (result.status === "success") {
      return this.getCart(request.user_id);
    }

    return result as CartResponse;
  }

  async getCart(userId: string): Promise<CartResponse> {
    return this.callMCPTool<CartResponse>("display_cart", { user_id: userId });
  }

  async clearCart(userId: string): Promise<MCPResponse> {
    return this.callMCPTool<MCPResponse>("clear_cart", { user_id: userId });
  }

  async checkConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/health`);
      return response.ok;
    } catch {
      return false;
    }
  }
}

export default new MCPService();
