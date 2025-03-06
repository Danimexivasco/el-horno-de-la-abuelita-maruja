"use server";

import { cookies } from "next/headers";

import { HOME_PATH } from "@/routes";
import { ONE_DAY, SESSION_COOKIE_NAME } from "@/constants";
import { getApiBaseUrl } from "@/app/_utils/getApiBaseUrl";
import { API_ROUTES } from "@/apiRoutes";

export async function createSessionCookie(token: string) {
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure:   process.env.NODE_ENV === "production",
    sameSite: "strict",
    path:     HOME_PATH,
    maxAge:   ONE_DAY
  });

  return {
    success: true
  };
}

export async function removeSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);

  return {
    success: true
  };
}

export async function getLoggedUser (client = false) {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME);

  const res = await fetch(`${getApiBaseUrl()}${API_ROUTES.AUTH.USER}`, {
    method:  "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body:        JSON.stringify({
      token: token?.value
    })
  });

  if (!res.ok) {
    return null;
  }

  const user = await res.json();

  if (user) {
    return client ? JSON.stringify(user) : user;
  }

  return null;
};