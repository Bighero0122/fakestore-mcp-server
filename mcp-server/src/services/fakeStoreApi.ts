import axios from "axios";
import { User, Product, LoginCredentials } from "../types/fakestore";
import { logger } from "../utils/logger";

class FakeStoreApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.FAKESTORE_API_URL || "https://fakestoreapi.com";
  }

  async login(
    credentials: LoginCredentials
  ): Promise<{ token: string; user: User }> {
    try {
      const response = await axios.post(`${this.baseUrl}/auth/login`, {
        username: credentials.username,
        password: credentials.password,
      });

      // Get user details
      const users = await this.getUsers();
      const user = users.find((u) => u.username === credentials.username);

      if (!user) {
        throw new Error("User not found");
      }

      return {
        token: response.data.token,
        user,
      };
    } catch (error) {
      logger.error("Login failed:", error);
      throw new Error("Invalid credentials");
    }
  }

  async getUsers(): Promise<User[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/users`);
      return response.data;
    } catch (error) {
      logger.error("Failed to fetch users:", error);
      throw new Error("Failed to fetch users");
    }
  }

  async getProducts(category?: string, limit?: number): Promise<Product[]> {
    try {
      let url = `${this.baseUrl}/products`;

      if (category) {
        url += `/category/${category}`;
      }

      if (limit) {
        url += `?limit=${limit}`;
      }

      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      logger.error("Failed to fetch products:", error);
      throw new Error("Failed to fetch products");
    }
  }

  async getProduct(id: number): Promise<Product> {
    try {
      const response = await axios.get(`${this.baseUrl}/products/${id}`);
      return response.data;
    } catch (error) {
      logger.error(`Failed to fetch product ${id}:`, error);
      throw new Error("Product not found");
    }
  }

  async getCategories(): Promise<string[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/products/categories`);
      return response.data;
    } catch (error) {
      logger.error("Failed to fetch categories:", error);
      throw new Error("Failed to fetch categories");
    }
  }
}

export const fakeStoreApi = new FakeStoreApiService();
