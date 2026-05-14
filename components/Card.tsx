import React from "react";

interface CardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function Card({
  title,
  description,
  children,
  className = "",
}: CardProps) {
  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg shadow-sm p-6 ${className}`}
    >
      {title && <h3 className="font-semibold text-lg mb-2">{title}</h3>}
      {description && (
        <p className="text-gray-600 text-sm mb-4">{description}</p>
      )}
      {children}
    </div>
  );
}
