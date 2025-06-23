import React from "react";
import { Link, useLocation } from "react-router-dom";
import { User } from "../../../types";
import { Button } from "../../ui/Button";

interface HeaderProps {
  user: User | null;
  cartCount: number;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  cartCount,
  onLogout,
}) => {
  const location = useLocation();

  return (
    <header className="bg-slate-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="text-xl font-bold text-white hover:text-gray-200 transition-colors"
          >
            Fake Store
          </Link>

          <nav className="flex items-center space-x-6">
            {user ? (
              <>
                <Link
                  to="/products"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === "/products"
                      ? "bg-slate-700 text-white"
                      : "text-gray-300 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  Products
                </Link>
                <Link
                  to="/cart"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === "/cart"
                      ? "bg-slate-700 text-white"
                      : "text-gray-300 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  Cart ({cartCount})
                </Link>
                <span className="text-sm text-gray-300">
                  Hello, {user.name.firstname}
                </span>
                <Button variant="danger" size="sm" onClick={onLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Link
                to="/login"
                className="text-gray-300 hover:bg-slate-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
