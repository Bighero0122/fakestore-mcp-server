const MCP_BRIDGE_URL = "http://localhost:8000/api";

interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
    name: {
      firstname: string;
      lastname: string;
    };
    email: string;
  };
}

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface CartItem {
  productId: number;
  quantity: number;
  product: Product;
}

interface Cart {
  items: CartItem[];
  total: number;
  count: number;
}

class APIError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = "APIError";
  }
}

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new APIError(error || "Request failed", response.status);
  }
  return response.json();
};

export const api = {
  auth: {
    login: async (
      username: string,
      password: string
    ): Promise<LoginResponse> => {
      const response = await fetch(`${MCP_BRIDGE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      return handleResponse(response);
    },
  },

  products: {
    getAll: async (category?: string, limit?: number): Promise<Product[]> => {
      const params = new URLSearchParams();
      if (category) params.append("category", category);
      if (limit) params.append("limit", limit.toString());

      const url = `${MCP_BRIDGE_URL}/products${
        params.toString() ? "?" + params.toString() : ""
      }`;
      const response = await fetch(url);
      return handleResponse(response);
    },

    getCategories: async (): Promise<string[]> => {
      // This will be handled by the MCP server's get_products with categories=true
      const response = await fetch(
        `${MCP_BRIDGE_URL}/products?categories=true`
      );
      return handleResponse(response);
    },
  },

  cart: {
    get: async (userId: string): Promise<Cart> => {
      const response = await fetch(`${MCP_BRIDGE_URL}/cart/${userId}`);
      return handleResponse(response);
    },

    add: async (
      userId: string,
      productId: number,
      quantity: number = 1
    ): Promise<Cart> => {
      const response = await fetch(`${MCP_BRIDGE_URL}/cart/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          product_id: productId,
          quantity,
        }),
      });
      return handleResponse(response);
    },

    remove: async (
      userId: string,
      productId: number,
      quantity: number = 1
    ): Promise<Cart> => {
      const response = await fetch(`${MCP_BRIDGE_URL}/cart/remove`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          product_id: productId,
          quantity,
        }),
      });
      return handleResponse(response);
    },

    clear: async (userId: string): Promise<void> => {
      const response = await fetch(`${MCP_BRIDGE_URL}/cart/${userId}`, {
        method: "DELETE",
      });
      return handleResponse(response);
    },
  },
};
