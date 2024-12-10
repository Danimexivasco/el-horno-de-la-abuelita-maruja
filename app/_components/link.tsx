import { default as NextLink } from "next/link";
import { combine } from "../_utils/combineClassnames";

type LinkProps = {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  asButton?: boolean;
  className?: string;
  props?: any
};

export default function Link({ href, children, external, asButton=false, className="", ...props }: LinkProps) {
  const buttonClasses = asButton ? "button" : "underline";

  if (external) return (
    <a
      href={href}
      className={combine("dark:text-cake-400 dark:active:text-cake-600 text-cake-600 active:text-cake-700", className, buttonClasses)}
      target="_blank"
      rel="noreferrer"
      {...props}
    >
      {children}
    </a>
  );
  return (
    <NextLink
      href={href}
      className={combine("dark:text-cake-400 dark:active:text-cake-600 text-cake-600 active:text-cake-700", className, buttonClasses)}
      {...props}
    >
      {children}
    </NextLink>
  );
}