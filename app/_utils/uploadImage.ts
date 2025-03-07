import { API_ROUTES } from "@/apiRoutes";
import { convertToBase64 } from "./convertToBase64";

export const uploadImage = async (file: File) => {
  try {
    const base64File = await convertToBase64(file as File);

    const response = await fetch(API_ROUTES.IMAGE, {
      method:  "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        file: base64File
      })
    });

    if (!response.ok) {
      throw new Error(`Image upload failed: ${response.statusText}`);
    }

    const { url }: { url: string } = await response.json();

    return url;

  } catch {
    throw new Error("Error uploading image");
  }
};