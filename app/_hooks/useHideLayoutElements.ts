import { usePathname } from "next/navigation";
import {
  ADMIN_DASHBOARD_PATH,
  ADMIN_NEW_PRODUCT_PATH,
  ADMIN_ORDERS_PATH,
  ADMIN_PRODUCT_DETAIL_PATH,
  ADMIN_PRODUCTS_PATH,
  ADMIN_USERS_PATH,
  SIGN_IN_PATH,
  SIGN_UP_PATH
} from "@/routes";

export default function useHideLayoutElements() {
  const pathname = usePathname();

  const pathsWithoutElements = [
    SIGN_IN_PATH,
    SIGN_UP_PATH,
    ADMIN_DASHBOARD_PATH,
    ADMIN_PRODUCTS_PATH,
    ADMIN_NEW_PRODUCT_PATH,
    ADMIN_PRODUCT_DETAIL_PATH.replace(":id", pathname.split("/").pop() ?? ""),
    ADMIN_ORDERS_PATH,
    ADMIN_USERS_PATH
  ];

  const hideElements = pathsWithoutElements.includes(pathname);
  return hideElements;
}