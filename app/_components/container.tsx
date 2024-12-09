import { combine } from "../_utils/combineClassnames";

type AllowedElements = "div" | "section";
type ContainerProps = {
  children: React.ReactNode,
  as?: AllowedElements,
  className?: string
};
export default function Container({ children, as: As = "div", className = "" }: ContainerProps) {
  return (
    <As className={combine("w-full max-w-7xl sm:mx-auto p-4", className && className)}>
      {children}
    </As>
  );
}