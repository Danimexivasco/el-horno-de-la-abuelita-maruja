import { sriracha } from "../_fonts";
import { combine } from "../_utils/combineClassnames";

type HeadlineProps = {
  children: React.ReactNode
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  className?: string
};

export default function Headline({ children, as = "h1", className="" }: HeadlineProps) {

  const generateClasses = (as: HeadlineProps["as"]): string => {
    if (as === "h2") return "text-3xl mb-4";
    if (as === "h3") return "text-2xl mb-4";
    if (as === "h4") return "text-xl mb-4";
    if (as === "h5") return "text-lg mb-4";
    if (as === "h6") return "text-md mb-4";
    return "text-4xl mb-4";
  };

  const defaultClasses = generateClasses(as);
  const HeadlineType = as;

  return (
    <HeadlineType className={combine(sriracha.className, defaultClasses, className)}>{children}</HeadlineType>
  );
}