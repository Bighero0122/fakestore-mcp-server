export interface User {
  id: number;
  email: string;
  username: string;
  name: {
    firstname: string;
    lastname: string;
  };
  address?: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
    geolocation: {
      lat: string;
      long: string;
    };
  };
  phone?: string;
}

export interface Product {
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

export interface CartItem {
  product_id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  image: string;
}

export interface Cart {
  items: CartItem[];
  total_items: number;
  subtotal: number;
  tax: number;
  total: number;
}

// MCP Service Types
export interface MCPResponse {
  status: "success" | "error";
  message: string;
  [key: string]: any;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse extends MCPResponse {
  user?: User;
  token?: string;
}

export interface ProductsResponse extends MCPResponse {
  products?: Product[];
  count?: number;
}

export interface CartResponse extends MCPResponse {
  cart?: Cart;
}

export interface AddToCartRequest {
  user_id: string;
  product_id: number;
  quantity: number;
}

export interface RemoveFromCartRequest {
  user_id: string;
  product_id: number;
  quantity?: number;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (productId: number) => Promise<void>;
  removeFromCart: (productId: number, quantity?: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}
