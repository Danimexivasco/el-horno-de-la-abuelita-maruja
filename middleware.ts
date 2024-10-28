import { type NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME } from "@/constants";
import { ROUTES } from "@/routes";

const HOME_ROUTE_PATH = ROUTES.find((route) => route.name === "Home")?.path || "/";
const LOGIN_ROUTE_PATH = ROUTES.find((route) => route.name === "SignIn")?.path || "/signIn";
const protectedRoutes = ROUTES.filter((route) => route.protected)?.map((route) => route.path);
const authRoutes = ROUTES.filter((route) => route.authRoute)?.map((route) => route.path);

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value || "";
  if (!sessionCookie  && protectedRoutes.includes(request.nextUrl.pathname)) {
    const absoluteURL = request.nextUrl.clone()
    absoluteURL.pathname = LOGIN_ROUTE_PATH
    return NextResponse.redirect(absoluteURL)
  }
  if (sessionCookie  && authRoutes.includes(request.nextUrl.pathname)) {
    const absoluteURL = request.nextUrl.clone()
    absoluteURL.pathname = HOME_ROUTE_PATH
    return NextResponse.redirect(absoluteURL)
  }
}
export const config = {
  matcher: [ "/((?!api|_next/static|_next/image|favicon.ico|opengraph-image.jpeg|sitemap.xml).*)" ],
}