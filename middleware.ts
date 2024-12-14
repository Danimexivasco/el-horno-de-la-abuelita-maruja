import { SESSION_COOKIE_NAME, USER_CHECKED_COOKIE_NAME } from "@/constants";
import { HOME_PATH, ROUTES } from "@/routes";
import { type NextRequest, NextResponse } from "next/server";
import { setAdminUserCheck } from "./actions/authActions";

const protectedRoutes = ROUTES.filter((route) => route.protected)?.map((route) => route.path);
const authRoutes = ROUTES.filter((route) => route.authRoute)?.map((route) => route.path);

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value || "";
  const userCheckedCookie = request.cookies.get(USER_CHECKED_COOKIE_NAME)?.value || "";

  if (!sessionCookie && protectedRoutes.includes(request.nextUrl.pathname)) {
    const absoluteURL = request.nextUrl.clone();
    absoluteURL.pathname = HOME_PATH;
    return NextResponse.redirect(absoluteURL);
  }

  if (sessionCookie && authRoutes.includes(request.nextUrl.pathname)) {
    const absoluteURL = request.nextUrl.clone();
    absoluteURL.pathname = HOME_PATH;
    return NextResponse.redirect(absoluteURL);
  }

  if (sessionCookie && protectedRoutes.includes(request.nextUrl.pathname)) {
    if (userCheckedCookie !== "true") {
      const baseUrl = process.env.NODE_ENV === "production" ?
        process.env.API_BASE_URL_PROD
        :
        process.env.API_BASE_URL_DEV;

      const url = `${baseUrl}/api/user?userId=${sessionCookie}`;

      try {
        const apiResponse = await fetch(url, {
          method:  "GET",
          headers: {
            "Content-Type": "application/json"
          },
          next: {
            revalidate: 60
          }
        });

        if (!apiResponse.ok) {
          return NextResponse.json(
            {
              error: "Failed to fetch user"
            },
            {
              status: apiResponse.status
            }
          );
        }

        const userData = await apiResponse.json();
        const { role } = userData.data;
        const notAuthorized = role !== "admin";

        if (notAuthorized) {
          const absoluteURL = request.nextUrl.clone();
          absoluteURL.pathname = HOME_PATH;
          return NextResponse.redirect(absoluteURL);
        }

        await setAdminUserCheck();

        return NextResponse.next();

      } catch (error) {
        console.error("Error in middleware:", error);
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
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|opengraph-image.jpeg|sitemap.xml).*)"]
};