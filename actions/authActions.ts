"use server";

import { cookies  } from "next/headers";

import { ROUTES } from "@/routes";
import { ONE_DAY, SESSION_COOKIE_NAME } from "@/constants";

const HOME_ROUTE_PATH = ROUTES.find((route) => route.path === "/")?.path || "/";
export async function createSession(uid: string) {
  const cookieStore = await cookies();
  cookieStore.set({
    name: SESSION_COOKIE_NAME,
    value: uid,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: ONE_DAY,
    path: HOME_ROUTE_PATH,
    sameSite: "lax",
  });

  return { success: true };
}

export async function removeSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);

  return { success: true };
}