import { FormState } from "@/app/_components/forms/contactForm";

export async function sendEmail(data: FormState["data"]): Promise<{success: boolean, message: string}> {
  const apiEndpoint = "/api/email";

  try {
    const response = await fetch(apiEndpoint, {
      method:  "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error("Error al enviar el correo");
    }

    return await response.json();
  } catch {
    return {
      success: false,
      message: "Error al enviar el correo.Por favor, intentalo de nuevo en unos minutos"
    };
  }
}