"use client";

import { combine } from "@/utils/combineClassnames";
import { sriracha } from "../_fonts";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  withIcon?: boolean
  type?: "button" | "submit"
  isRed?: boolean
  disabled?: boolean
  ariaLabel?: string
  [prop: string]: any
};

export default function Button({ children, onClick, withIcon=false, type="button", isRed, disabled, className="", ariaLabel="", ...props }: ButtonProps) {
  const redClass = isRed && "bg-red-500/90 hover:bg-red-600/90 active:bg-red-700/90";
  return (
    <button
      onClick={onClick}
      type={type}
      className={combine("button", sriracha.className, withIcon && "flex items-center gap-2", isRed && redClass, className)}
      disabled={disabled}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </button>
  );
}
