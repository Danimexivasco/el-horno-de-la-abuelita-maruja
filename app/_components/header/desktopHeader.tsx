import { combine } from "@/app/_utils/combineClassnames";
import { HOME_PATH, Route } from "@/routes";
import Container from "../container";
import FullLogo from "../fullLogo";
import UserActions from "./userActions";
import { User } from "@/types";
import Link from "../link";

type DesktopHeaderProps = {
    navRoutes: Route[]
    activePathname?: string
    user: User
    className?: string
};

export default function DesktopHeader({ navRoutes=[], activePathname, user, className }: DesktopHeaderProps) {

  return (
    <Container
      as="nav"
      className={combine(
        "grid grid-cols-3 place-items-center items-center text-center !p-0 dark:text-cake-400 text-cake-600",
        className
      )}
    >
      <ul className="flex gap-8 justify-self-end">
        {navRoutes.slice(0, Math.round(navRoutes.length/2))?.map((route: Route) => (
          <Link
            href={route.path}
            key={route.path}
            className={combine(
              "text-lg font-bold no-underline dark:active:text-cake-600 active:text-cake-700",
              activePathname === route.path && "dark:text-cake-600 text-cake-700"
            )}
          >{route.label}
          </Link>
        ))}
      </ul>
      <Link
        href={HOME_PATH}
      >
        <FullLogo className="w-36"/>
      </Link>
      <div className="justify-self-start flex items-center justify-between gap-12">
        <ul className="flex items-center gap-8">
          {navRoutes.slice(Math.round(navRoutes.length/2), navRoutes.length)?.map((route) => (
            <Link
              href={route.path}
              key={route.path}
              className={combine(
                "text-lg font-bold no-underline dark:active:text-cake-600 active:text-cake-700",
                activePathname === route.path && "dark:text-cake-600 text-cake-700"
              )}
            >{route.label}
            </Link>
          ))}
        </ul>
        <UserActions
          user={user}
        />
      </div>
    </Container>
  );
}