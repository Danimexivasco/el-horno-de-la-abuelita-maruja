import { HOME_PATH } from "@/routes";
import { combine } from "../_utils/combineClassnames";
import Link from "./link";

type DashboardCardProps = {
    href: string;
    children: React.ReactNode;
    centered?: boolean
    className?: string
};

export default function DashboardCard({ href, children, centered, className }: DashboardCardProps) {
  return (
    <li>
      <Link
        href={href}
        external={href === HOME_PATH}
        noExternalIcon
        className={combine(
          "relative flex flex-col justify-center gap-4 p-6 h-full w-full bg-cake-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 shadow-xl overflow-hidden no-underline dark:!text-white !text-black transition-colors group-hover:shadow-lg dark:hover:shadow-cake-500/40 hover:shadow-black/30",
          centered && "items-center",
          className
        )}
      >
        {children}
      </Link>
    </li>
  );
}