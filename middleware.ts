import { type NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME } from "@/constants";
import { ROUTES } from "@/routes";


export function middleware(request: NextRequest) {
  const HOME_ROUTE_PATH = ROUTES.find((route) => route.name === "Home")?.path || "/";
  const LOGIN_ROUTE_PATH = ROUTES.find((route) => route.name === "Login")?.path || "/login";
  const protectedRoutes = [ HOME_ROUTE_PATH ];
  
  const session = request.cookies.get(SESSION_COOKIE_NAME)?.value || "";
  
  if (!session && protectedRoutes.includes(request.nextUrl.pathname)) {
    const absoluteURL = request.nextUrl.clone()
    absoluteURL.pathname = LOGIN_ROUTE_PATH
    return NextResponse.redirect(absoluteURL)
  }
}
export const config = {
  matcher: [ "/((?!api|_next/static|_next/image|favicon.ico|opengraph-image.jpeg|sitemap.xml).*)" ],
}