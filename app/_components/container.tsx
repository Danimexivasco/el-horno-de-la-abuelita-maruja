import { combine } from "../_utils/combineClassnames";

type AllowedElements = "div" | "section" | "nav";
type ContainerProps = {
  children: React.ReactNode,
  as?: AllowedElements,
  className?: string
};
export default function Container({ children, as: As = "div", className = "" }: ContainerProps) {
  return (
    <As className={combine("w-full max-w-8xl sm:mx-auto p-8", className && className)}>
      {children}
    </As>
  );
}