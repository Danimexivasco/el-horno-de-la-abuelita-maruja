import { default as NextLink }  from "next/link";
import { getPath } from "@/utils/getPath";
import { combine } from "../_utils/combineClassnames";

type LinkProps = {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  asButton?: boolean;
  className?: string;
}

export default function Link({ href, children, external, asButton=false, className="" }: LinkProps) {
  const buttonClasses = asButton ? "button" : "underline"
  
  if (external) return (<a href={href} className={combine("dark:text-cake-400 dark:active:text-cake-600 text-cake-600 active:text-cake-700", className, buttonClasses)} target="_blank">{children}</a>)
  return (
    <NextLink
      href={getPath(href) ?? "/"}
      className={combine("dark:text-cake-400 dark:active:text-cake-600 text-cake-600 active:text-cake-700", className, buttonClasses)}
    >
      {children}
    </NextLink>
  )
}