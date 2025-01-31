"use server";

export const revalidateCache = async () => {
  const baseUrl = process.env.NODE_ENV === "production" ?
    process.env.API_BASE_URL_PROD
    :
    process.env.API_BASE_URL_DEV;
  try {
    await fetch(`${baseUrl}/api/revalidate`, {
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