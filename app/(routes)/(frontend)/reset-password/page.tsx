"use client";

import Button from "@/app/_components/button";
import Container from "@/app/_components/container";
import Headline from "@/app/_components/headline";
import { sendPasswordResetEmail } from "@/app/_libs/firebase/auth";
import { validateSendResetPassword } from "@/app/_schemas/sendResetPassword";
import { showMsg } from "@/app/_utils/showMsg";
import { useActionState } from "react";

type FormState = {
  success: boolean
  errors: {
    email?: string[];
  }
  data: {
    email: string;
  }
};

const INITIAL_STATE = {
  success: false,
  errors:  {
    email: []
  },
  data: {
    email: ""
  }
};

const handleSubmit = async (_: FormState, formData: FormData) => {
  const email = (formData.get("email") as string)?.trim();

  const result = validateSendResetPassword({
    email
  });

  if (result.error) {
    showMsg("Por favor, revísa los errores y vuelve a enviar el formulario.", "error");
    return {
      success: false,
      errors:  result.error.flatten().fieldErrors,
      data:    {
        email
      }
    };
  }

  const response = await sendPasswordResetEmail(email);

  if (response.success) {
    showMsg(response.message, "success");
    return INITIAL_STATE;
  }

  showMsg(response.message, "error");
  return {
    success: false,
    errors:  {
      email: []
    },
    data: {
      email
    }
  };
};

export default function ResetPasswordPage() {
  const [actionState, submitAction, isPending] = useActionState(handleSubmit, INITIAL_STATE);

  return (
    <Container className="prose-base">
      <Headline>Cambiar la contraseña</Headline>
      <p>Indicanos el email del que quieres cambiar la contraseña, y si existe en nuestra base de datos, te enviaremos un enlace para poder cambiar la contraseña</p>
      <form
        action={submitAction}
        className="grid gap-4 mt-4"
      >
        <div className="grid gap-1">
          <label
            htmlFor="name"
            className="text-base mb-1"
          >
            Email:
          </label>
          <input
            type="text"
            name="email"
            placeholder="tuemail@gmail.com"
            autoComplete="off"
            className={"focus:outline-none focus:ring ring-cake-400 px-4 py-2 rounded-lg text-black lg:w-fit"}
            defaultValue={actionState?.data?.email}
          />
          {actionState.errors?.["email"] ?
            <small className="pl-1 text-red-600">{actionState.errors?.["email"]}</small>
            : null
          }
        </div>
        <Button
          type="submit"
          disabled={isPending}
        >{isPending ? "Enviando..." : "Enviar"}
        </Button>
      </form>
    </Container>
  );
}