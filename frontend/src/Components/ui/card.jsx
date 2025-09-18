import React from "react";

// Outer wrapper
export function Card({ className = "", children, ...props }) {
  return (
    <div
      className={`rounded-2xl bg-gray-900 shadow p-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

// Inner content wrapper
export function CardContent({ className = "", children, ...props }) {
  return (
    <div className={`text-white ${className}`} {...props}>
      {children}
    </div>
  );
}
