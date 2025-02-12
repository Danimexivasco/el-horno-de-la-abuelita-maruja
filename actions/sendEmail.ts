import { FormState } from "@/app/_components/forms/contactForm";
import { showMsg } from "@/app/_utils/showMsg";

export async function sendEmail(data: FormState["data"]) {
  const apiEndpoint = "/api/email";

  fetch(apiEndpoint, {
    method: "POST",
    body:   JSON.stringify(data)
  })
    .then((res) => res.json())
    .then((response) => {
      if (response.error) {
        showMsg("Ha habido un problema al enviar el mail. Por favor, intentalo de nuevo en unos minutos", "error");
        return;
      }
      showMsg(response.message, "success");
    })
    .catch((err) => {
      alert(err);
    });
}