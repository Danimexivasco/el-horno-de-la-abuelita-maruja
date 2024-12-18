"use client";

import {
  ADMIN_DASHBOARD_PATH,
  ADMIN_NEW_PRODUCT_PATH,
  ADMIN_PRODUCT_DETAIL_PATH,
  ADMIN_PRODUCTS_PATH,
  LEGAL_ROUTES,
  Route,
  SIGN_IN_PATH,
  SIGN_UP_PATH
} from "@/routes";
import { usePathname } from "next/navigation";
import { combine } from "../_utils/combineClassnames";
import Container from "./container";
import FullLogo from "./fullLogo";
import Link from "./link";
import Headline from "./headline";
import { InstagramIcon, YoutubeIcon } from "../_icons";

export default function Footer() {
  const pathname = usePathname();
  const pathsWithoutFooter = [
    SIGN_IN_PATH,
    SIGN_UP_PATH,
    ADMIN_DASHBOARD_PATH,
    ADMIN_PRODUCTS_PATH,
    ADMIN_NEW_PRODUCT_PATH,
    ADMIN_PRODUCT_DETAIL_PATH
  ];
  const hideFooter = pathsWithoutFooter.includes(pathname);
  return (
    <footer className={combine("dark:bg-cake-950 bg-cake-200 border-t-2 border-cake-500 transition-colors", hideFooter && "hidden")}>
      <Container className="flex flex-col lg:flex-row gap-12 justify-between items-center lg:p-12">
        <FullLogo className="w-80"/>
        <nav className="flex flex-col sm:flex-row gap-12 justify-center sm:justify-between text-center sm:text-left">
          <div>
            <Headline
              as="h5"
              className="mb-4"
            >LEGAL
            </Headline>
            <ul className="grid gap-4">
              {LEGAL_ROUTES.map((route: Route) => (
                <li
                  key={route.path}
                  className="text-lg font-bold no-underline dark:text-cake-400 text-cake-600"
                >
                  <Link
                    href={route.path}
                    className="no-underline"
                  >
                    {route.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Headline
              as="h5"
              className="mb-4"
            >SOCIAL MEDIA
            </Headline>
            <ul className="flex gap-4 justify-center sm:justify-start">
              <li>
                <Link
                  href="https://dcano.dev"
                  external
                >
                  <InstagramIcon className="w-10 h-10"/>
                </Link>
              </li>
              <li>
                <Link
                  href="https://dcano.dev"
                  external
                >
                  <YoutubeIcon className="w-10 h-10"/>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </Container>
      <div className="flex justify-center mt-4">
        <Headline as="h6">Hecho con 💙 por{" "}
          <Link
            href="https://dcano.dev"
            external
            className="no-underline"
          >@Danimexivasco
          </Link>
        </Headline>
      </div>
    </footer>
  );
}