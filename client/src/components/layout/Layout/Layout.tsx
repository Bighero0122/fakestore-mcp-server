import React from "react";
import { Header } from "../Header";
import { User } from "../../../types";

interface LayoutProps {
  children: React.ReactNode;
  user: User | null;
  cartCount: number;
  onLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  user,
  cartCount,
  onLogout,
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header user={user} cartCount={cartCount} onLogout={onLogout} />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {children}
      </main>
    </div>
  );
};
