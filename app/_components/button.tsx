"use client"

import { combine } from "@/utils/combineClassnames";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  withIcon?: boolean
  type?: "button" | "submit"
  disabled?: boolean
}

export default function Button({ children, onClick, withIcon=false, type="button", disabled, className="" }: ButtonProps) {
  
  return (
    <button
      onClick={onClick}
      type={type}
      className={combine("button", withIcon && "flex items-center gap-2", className)}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
