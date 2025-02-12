"use client";

import { validateContactForm } from "@/app/_schemas/contactForm";
import { showMsg } from "@/app/_utils/showMsg";
import { useActionState } from "react";
import Button from "../button";
import { sendEmail } from "@/actions/sendEmail";

export type FormState = {
  success: boolean
  message: string
  errors: {
    name?: string[];
    email?: string[];
    message?: string[];
  }
  data: {
    name: string;
    email: string;
    message: string;
  }
};

const INITIAL_STATE: FormState = {
  success: false,
  message: "",
  errors:  {},
  data:    {
    name:    "",
    email:   "",
    message: ""
  }
};

const handleSubmit = async (_: FormState, formData: FormData) => {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const message = (formData.get("message") as string)?.trim();

  const inputs = {
    name,
    email,
    message
  };

  const result = validateContactForm(inputs);

  if (result.error) {
    showMsg("Por favor, revísa los errores y vuelve a enviar el formulario.", "error");
    return {
      success: false,
      message: "Por favor, revísa los errores y vuelve a enviar el formulario.",
      errors:  result.error.flatten().fieldErrors,
      data:    {
        ...inputs
      }
    };
  };

  await sendEmail(inputs);

  return {
    success: true,
    message: "El formulario se envió con éxito, gracias por escribirnos 🥳",
    errors:  {},
    data:    {
      name:    "",
      email:   "",
      message: ""
    }
  };
};

export default function ContactForm() {
  const [actionState, submitAction, isPending] = useActionState(handleSubmit, INITIAL_STATE);
  // TODO: Add telephone/whatsapp number

  return (
    <form
      action={submitAction}
      className="grid gap-4 w-full lg:w-1/2"
    >
      <div className="grid gap-1">
        <label
          htmlFor="name"
          className="text-base mb-1"
        >
          Nombre:
        </label>
        <input
          type="text"
          name="name"
          placeholder="Daniel"
          autoComplete="off"
          className={"focus:outline-none focus:ring ring-cake-400 px-4 py-2 rounded-lg text-black"}
          defaultValue={actionState?.data?.name}
        />
        {actionState.errors?.["name"] ?
          <small className="pl-1 text-red-600">{actionState.errors?.["name"]}</small>
          : null
        }
      </div>
      <div className="grid gap-1">
        <label
          htmlFor="email"
          className="text-base mb-1"
        >
          Email:
        </label>
        <input
          type="text"
          name="email"
          placeholder="tuemail@gmail.com"
          autoComplete="off"
          className={"focus:outline-none focus:ring ring-cake-400 px-4 py-2 rounded-lg text-black"}
          defaultValue={actionState?.data?.email}
        />
        {actionState.errors?.["email"] ?
          <small className="pl-1 text-red-600">{actionState.errors?.["email"]}</small>
          : null
        }
      </div>
      <div className="grid gap-1">
        <label
          htmlFor="message"
          className="text-base mb-1"
        >
          Mensaje:
        </label>
        <textarea
          name="message"
          placeholder="¿En que podemos ayudarte?"
          className= "focus:outline-none focus:ring ring-cake-400 px-4 py-2 rounded-lg text-black placeholder:text-base min-h-28 max-h-52"
          defaultValue={actionState?.data?.message}
        />
        {actionState.errors?.["message"] ?
          <small className="pl-1 text-red-600">{actionState.errors?.["message"]}</small>
          : null
        }
      </div>
      <Button
        type="submit"
        ariaLabel="Botón para enviar formulario"
        disabled={isPending}
        className="w-full lg:w-fit"
      >{isPending ? "Enviando..." : "Enviar"}
      </Button>
    </form>
  );
}