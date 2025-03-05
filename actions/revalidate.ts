"use server";

import { getApiBaseUrl } from "@/app/_utils/getApiBaseUrl";

export const revalidateCache = async () => {
  try {
    await fetch(`${getApiBaseUrl()}/api/revalidate`, {
      method:  "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        secret: process.env.REVALIDATE_SECRET
      })
    });

  } catch {
    throw new Error("Error revalidando la cache");
  }
};