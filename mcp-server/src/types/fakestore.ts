export interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  name: {
    firstname: string;
    lastname: string;
  };
  address: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
    geolocation: {
      lat: string;
      long: string;
    };
  };
  phone: string;
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

export interface LoginCredentials {
  username: string;
  password: string;
}
