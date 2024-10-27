import { combine } from "../_utils/combineClassnames";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function Button({ children, onClick, className="" }: ButtonProps) {
  
  return (
    <button onClick={onClick} className={combine("button", className)}>
      {children}
    </button>
  )
}
