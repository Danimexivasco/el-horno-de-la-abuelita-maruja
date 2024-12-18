"use client";

import { combine } from "@/utils/combineClassnames";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  withIcon?: boolean
  type?: "button" | "submit"
  isRed?: boolean
  disabled?: boolean
  ariaLabel?: string
};

export default function Button({ children, onClick, withIcon=false, type="button", isRed, disabled, className="", ariaLabel="" }: ButtonProps) {
  const redClass = isRed && "dark:bg-red-500 bg-red-600 dark:hover:bg-red-600 hover:bg-red-700 dark:active:bg-red-900 active:bg-red-800";
  return (
    <button
      onClick={onClick}
      type={type}
      className={combine("button", withIcon && "flex items-center gap-2", isRed && redClass, className)}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
