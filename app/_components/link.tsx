import { default as NextLink } from "next/link";
import { combine } from "../_utils/combineClassnames";
import { sriracha } from "../_fonts";

type LinkProps = {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  asButton?: boolean;
  className?: string;
  [prop: string]: any
};

export default function Link({ href, children, external, asButton=false, className="", ...props }: LinkProps) {
  const buttonClasses = asButton ? "button" : "underline";

  if (external) return (
    <a
      href={href}
      className={combine("inline-block dark:text-cake-400 dark:hover:text-cake-500 dark:active:text-cake-600 text-cake-600 hover:text-cake-700 active:text-cake-800", className, buttonClasses, asButton && sriracha.className)}
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
      className={combine("inline-block dark:text-cake-400 dark:hover:text-cake-500 dark:active:text-cake-600 text-cake-600 hover:text-cake-700 active:text-cake-800", className, buttonClasses, asButton && sriracha.className)}
      {...props}
    >
      {children}
    </NextLink>
  );
}