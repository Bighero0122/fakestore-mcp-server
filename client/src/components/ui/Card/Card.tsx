import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hover = false,
}) => {
  const hoverClasses = hover
    ? "hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
    : "";

  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden ${hoverClasses} ${className}`}
    >
      {children}
    </div>
  );
};
