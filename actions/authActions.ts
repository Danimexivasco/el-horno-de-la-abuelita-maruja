"use server";

import { NextResponse } from "next/server";
import { cookies  } from "next/headers";
import { redirect } from "next/navigation";

import { ROUTES } from "@/routes";
import { ONE_DAY, SESSION_COOKIE_NAME } from "@/constants";

const HOME_ROUTE_PATH = ROUTES.find((route) => route.path === "/")?.path || "/";
export async function createSession(uid: string) {
  const response = NextResponse.redirect(HOME_ROUTE_PATH);
  response.cookies.set(SESSION_COOKIE_NAME, uid, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: ONE_DAY,
    path: HOME_ROUTE_PATH,
  });

  return response;
}

export async function removeSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);

  redirect(HOME_ROUTE_PATH);
}