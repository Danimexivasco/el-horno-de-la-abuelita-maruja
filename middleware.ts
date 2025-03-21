import { SESSION_COOKIE_NAME } from "@/constants";
import {
  ADMIN_PRODUCT_DETAIL_PATH,
  HOME_PATH,
  ORDERS_PATH,
  RESET_PASSWORD_PATH,
  ROUTES,
  SIGN_IN_PATH,
  USER_PROFILE_PATH,
  VERIFY_EMAIL_PATH
} from "@/routes";
import { type NextRequest, NextResponse } from "next/server";
import { getApiBaseUrl } from "./app/_utils/getApiBaseUrl";
import { API_ROUTES } from "./apiRoutes";

const authRoutes = ROUTES.filter((route) => route.authRoute)?.map((route) => route.path);

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value ?? "";
  const protectedRoutes = ROUTES.filter((route) => route.protected)?.map((route) => route.path);
  const requiredSignInRoutes = [VERIFY_EMAIL_PATH, RESET_PASSWORD_PATH, USER_PROFILE_PATH, ORDERS_PATH];

  const currentPathname = request.nextUrl.pathname;

  if (!sessionCookie && (protectedRoutes.includes(currentPathname) || currentPathname === ADMIN_PRODUCT_DETAIL_PATH.replace(":id", currentPathname.split("/").pop() ?? ""))) {
    return NextResponse.redirect(new URL(HOME_PATH, request.url));
  }

  if (sessionCookie && (requiredSignInRoutes.includes(currentPathname))) {
    try {
      const userPromise = await fetch(`${getApiBaseUrl()}${API_ROUTES.AUTH.USER}`, {
        method:  "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token: sessionCookie
        })
      });

      const user = await userPromise.json();

      if (user.error) {
        const response = NextResponse.redirect(new URL(HOME_PATH, request.url));
        response.cookies.set(SESSION_COOKIE_NAME, "", {
          path:     HOME_PATH,
          expires:  new Date(0),
          httpOnly: true
        });
        return response;
      }

    } catch {
      const response = NextResponse.redirect(new URL(HOME_PATH, request.url));
      response.cookies.set(SESSION_COOKIE_NAME, "", {
        path:     HOME_PATH,
        expires:  new Date(0),
        httpOnly: true
      });
      return response;
    }
  }

  if (!sessionCookie && (requiredSignInRoutes.includes(currentPathname))) {
    return NextResponse.redirect(new URL(HOME_PATH, request.url));
  }

  if (sessionCookie && authRoutes.includes(currentPathname)) {
    return NextResponse.redirect(new URL(HOME_PATH, request.url));
  }

  if (sessionCookie && (protectedRoutes.includes(currentPathname) || currentPathname === ADMIN_PRODUCT_DETAIL_PATH.replace(":id", currentPathname.split("/").pop() ?? ""))) {
    try {
      const userPromise = await fetch(`${getApiBaseUrl()}${API_ROUTES.AUTH.USER}`, {
        method:  "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token: sessionCookie
        })
      });

      const user = await userPromise.json();

      if (user.error) {
        const response = NextResponse.redirect(new URL(HOME_PATH, request.url));
        response.cookies.set(SESSION_COOKIE_NAME, "", {
          path:     HOME_PATH,
          expires:  new Date(0),
          httpOnly: true
        });
        return response;
      }

    } catch {
      const response = NextResponse.redirect(new URL(HOME_PATH, request.url));
      response.cookies.set(SESSION_COOKIE_NAME, "", {
        path:     HOME_PATH,
        expires:  new Date(0),
        httpOnly: true
      });
      return response;
    }

    try {
      const res = await fetch(`${getApiBaseUrl()}${API_ROUTES.AUTH.USER_ROLE}`, {
        method:  "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token: sessionCookie
        })
      });

      if (!res.ok) {
        return NextResponse.redirect(new URL(SIGN_IN_PATH, request.url));
      }

      const { success, role } = await res.json();

      if (!success) return NextResponse.redirect(new URL(HOME_PATH, request.url));

      if (role !== "admin") {
        return NextResponse.redirect(new URL(HOME_PATH, request.url));
      }

      return NextResponse.next();

    } catch {
      return NextResponse.json(
        {
          error: "Internal Server Error"
        },
        {
          status: 500
        }
      );
    }
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|opengraph-image.jpeg|sitemap.xml).*)"]
};