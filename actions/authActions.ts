"use server";

import { cookies  } from "next/headers";

import { HOME_PATH } from "@/routes";
import { ONE_DAY, SESSION_COOKIE_NAME, USER_CHECKED_COOKIE_NAME } from "@/constants";

export async function createSession(uid: string) {
  const cookieStore = await cookies();
  cookieStore.set({
    name: SESSION_COOKIE_NAME,
    value: uid,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: ONE_DAY,
    path: HOME_PATH,
    sameSite: "lax",
  });

  return { success: true };
}

export async function removeSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);

  return { success: true };
}

export async function setAdminUserCheck() {
  const cookieStore = await cookies();
  cookieStore.set({
    name: USER_CHECKED_COOKIE_NAME,
    value: "true",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: ONE_DAY,
    path: HOME_PATH,
    sameSite: "lax",
  });

  return { success: true };
}

export async function removeAdminUserCheck() {
  const cookieStore = await cookies();
  cookieStore.delete(USER_CHECKED_COOKIE_NAME);

  return { success: true }
}