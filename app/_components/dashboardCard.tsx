import { combine } from "../_utils/combineClassnames";
import Link from "./link";

type DashboardCardProps = {
    href: string;
    children: React.ReactNode;
    className?: string
};

export default function DashboardCard({ href, children, className }: DashboardCardProps) {
  return (
    <Link
      href={href}
      className={combine("flex flex-col justify-between gap-4 items-center p-6 bg-cake-200 dark:bg-cake-800 rounded-md shadow-lg dark:shadow-cake-500/40 transition-all hover:shadow-xl hover:dark:shadow-cake-500/40 !text-black dark:!text-white no-underline", className)}
    >
      {children}
    </Link>
  );
}