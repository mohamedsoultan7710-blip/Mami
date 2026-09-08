"use client";

import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "success" | "danger" | "ghost";

const variants: Record<Variant, string> = {
  primary: "bg-sky text-white hover:bg-deepsky",
  secondary: "bg-white text-deepsky border-2 border-sky hover:bg-sky/10",
  success: "bg-leaf text-white hover:brightness-95",
  danger: "bg-berry text-white hover:brightness-95",
  ghost: "bg-transparent text-deepsky hover:bg-deepsky/5",
};

export default function BigButton({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      className={`px-6 py-4 rounded-2xl font-extrabold text-lg md:text-xl shadow-md transition-all active:scale-95 disabled:opacity-40 disabled:pointer-events-none ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
