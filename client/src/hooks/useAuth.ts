import { useState, useEffect } from "react";
import { User } from "../types";
import mcpService from "../services/mcpService";
import { storage } from "../utils/storage";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedUser = storage.get<User>("user");
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    setLoading(true);

    try {
      const response = await mcpService.login({ username, password });

      if (response.status === "success" && response.user) {
        setUser(response.user);
        storage.set("user", response.user);
        storage.set("token", response.token || "");
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    storage.remove("user");
    storage.remove("token");
    if (user) {
      storage.remove(`cart_${user.id}`);
    }
  };

  return { user, login, logout, loading };
};
