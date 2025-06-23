import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { LoginPage } from "./pages/LoginPage";
import { ProductsPage } from "./pages/ProductsPage";
import { CartPage } from "./pages/CartPage";
import { useAuth } from "./hooks/useAuth";
import { useCart } from "./hooks/useCart";

function AppContent() {
  const { user, login, logout, loading } = useAuth();
  const navigate = useNavigate();
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
  } = useCart(user?.id);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleLogin = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      const success = await login(username, password);
      if (!success) {
        setError("Invalid credentials");
      }
      return success;
    } catch (err) {
      setError("Login failed");
      return false;
    }
  };

  const handleAddToCart = async (productId: number) => {
    try {
      await addToCart(productId);
    } catch (err) {
      setError("Failed to add to cart");
    }
  };

  return (
    <Layout user={user} cartCount={cartCount} onLogout={handleLogout}>
      {error && (
        <div className="error-banner">
          <span>{error}</span>
          <button
            onClick={() => setError(null)}
            className="hover:bg-red-600 rounded p-1"
          >
            ×
          </button>
        </div>
      )}

      <Routes>
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/products" replace />
            ) : (
              <LoginPage onLogin={handleLogin} loading={loading} />
            )
          }
        />

        <Route
          path="/products"
          element={<ProductsPage onAddToCart={handleAddToCart} />}
        />

        <Route
          path="/cart"
          element={
            user ? (
              <CartPage
                items={cart}
                onRemove={removeFromCart}
                onUpdateQuantity={updateQuantity}
                onClear={clearCart}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/"
          element={<Navigate to={user ? "/products" : "/login"} replace />}
        />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
