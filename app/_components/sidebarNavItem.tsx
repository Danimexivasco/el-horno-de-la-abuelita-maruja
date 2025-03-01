import Link from "./link";
import { combine } from "../_utils/combineClassnames";
import { CakeIcon, DashboardIcon } from "../_icons";
import { usePathname } from "next/navigation";
import Tooltip from "./tooltip";
import {
  ADMIN_DASHBOARD_PATH,
  ADMIN_ORDERS_PATH,
  ADMIN_PRODUCTS_PATH,
  ADMIN_SALES_PATH,
  ADMIN_USERS_PATH
} from "@/routes";
import { Euro, ShoppingBag, User } from "lucide-react";

type SidebarNavItemProps = {
  path: string
  label?: string
  classNames?: string
  onClick?: () => void
};

const getIcon = (path: string): React.ReactNode => {
  if (path === ADMIN_PRODUCTS_PATH) return <CakeIcon className="w-6 h-6 " />;
  if (path === ADMIN_DASHBOARD_PATH) return <DashboardIcon className="w-6 h-6" />;
  if (path === ADMIN_ORDERS_PATH) return <ShoppingBag />;
  if (path === ADMIN_USERS_PATH) return <User />;
  if (path === ADMIN_SALES_PATH) return <Euro />;
};

export default function SidebarNavItem({ path, label = "", classNames = "", onClick }: SidebarNavItemProps) {
  const pathname = usePathname();
  const isActive = path === pathname;

  const pillClasses = isActive ?
    "animate-grow h-10 w-1 absolute top-1/2 -translate-y-1/2 left-0 rounded-r-3xl dark:bg-cake-500 bg-cake-500"
    :
    "h-4 w-1 absolute top-1/2 -translate-y-1/2 left-0 opacity-0 rounded-r-3xl scale-0 dark:bg-cake-500 bg-cake-500 peer-hover:opacity-100 peer-hover:scale-100 peer-hover:text-cake-950 transition-all ease-linear duration-200";

  const sidebarItemClasses = isActive ?
    "w-12 h-12 flex justify-center items-center text-center rounded-3xl shadow-lg dark:bg-cake-500 bg-cake-500 !text-black rounded-xl cursor-pointer"
    :
    "w-12 h-12 flex justify-center items-center text-center rounded-3xl shadow-lg dark:bg-cake-900 dark:hover:bg-cake-500 bg-cake-100 hover:bg-cake-500 hover:!text-black hover:rounded-xl transition-all duration-200 ease-linear cursor-pointer";

  return (
    <li
      className={combine("flex justify-center relative", classNames)}
      onClick={onClick}
    >
      <Link
        href={path}
        className={combine("peer dark:text-cake-400 text-cake-500", sidebarItemClasses)}
      >
        {getIcon(path)}
      </Link>
      <div className={pillClasses}></div>
      <Tooltip
        text={label}
      />
    </li>
  );
}