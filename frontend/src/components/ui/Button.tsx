import React from "react";
import { Loader2 } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
  variant?: "primary" | "secondary" | "danger" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      isLoading = false,
      loadingText,
      variant = "primary",
      size = "md",
      disabled,
      icon,
      type = "button",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-amber-500/50 disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none rounded-lg shadow-sm";

    const variants = {
      primary:
        "bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white shadow-amber-900/10",
      secondary:
        "bg-slate-800 hover:bg-slate-900 active:bg-black text-white",
      danger:
        "bg-red-600 hover:bg-red-700 active:bg-red-800 text-white shadow-red-900/10",
      outline:
        "border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 active:bg-slate-100",
      ghost:
        "bg-transparent hover:bg-slate-100 text-slate-700 active:bg-slate-200 shadow-none",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs gap-1.5",
      md: "px-4 py-2 text-sm gap-2",
      lg: "px-6 py-3 text-base gap-2.5",
    };

    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin shrink-0" />
            <span>{loadingText || children}</span>
          </>
        ) : (
          <>
            {icon && <span className="shrink-0">{icon}</span>}
            <span>{children}</span>
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
