"use client";

import { createSession } from "@/actions/authActions";
import Button from "@/components/button";
import Form from "@/components/forms/form";
import Headline from "@/components/headline";
import {
  SIGN_IN_FORM_INITIAL_STATE,
  SIGN_IN_FORM_INPUTS,
  SIGN_UP_FORM_INITIAL_STATE,
  SIGN_UP_FORM_INPUTS
} from "@/constants";
import { GoogleIcon } from "@/icons/index";
import {
  signInWithEmailAndPassword,
  signInWithGoogle,
  signUpWithEmailAndPassword
} from "@/libs/firebase/auth";
import { ADMIN_DASHBOARD_PATH, SIGN_IN_PATH, SIGN_UP_PATH } from "@/routes";
import { AuthenticationPages } from "@/types";
import { showMsg } from "@/utils/showMsg";
import { useRouter } from "next/navigation";
import Link from "./link";
import { useState } from "react";

type AuthenticationCardProps = {
  type: AuthenticationPages
};

export default function AuthenticationCard({ type }: AuthenticationCardProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const _signInWithGoogle = async () => {
    try {
      setLoading(true);
      const user = await signInWithGoogle();
      if (user) {
        const { id, isAdmin } = user;
        if (id) {
          await createSession(id);
        }
        if(isAdmin) {
          router.push(ADMIN_DASHBOARD_PATH);
        } else {
          router.back();
        }
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      showMsg("Failed to sign in with Google", "error");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full  p-6 max-w-md bg-cake-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 shadow-xl">
      <Headline
        as="h1"
        className="text-center uppercase !text-4xl mb-6"
      >
        {type === "signUp" ? "Crear cuenta" : "Iniciar Sesión"}
      </Headline>
      <Button
        withIcon
        onClick={_signInWithGoogle}
        className="bg-blue-400 hover:bg-blue-500 active:bg-blue-600"
      >
        <div className="bg-white p-1.5 rounded-full">
          <GoogleIcon className="w-4"/>
        </div>
        {loading ?
          type === "signUp"
            ? "Registrando usuario..."
            : "Iniciando Sesión..."
          : null}
        {!loading ?
          "Continuar con Google"
          : null}
      </Button>
      <div className="relative flex pt-5 pb-3 items-center w-full">
        <div className="flex-1 border-1 border-t border-cake-400"></div>
        <p className="text-base text-center mx-4 mb-0">
          o utiliza tu Email
        </p>
        <div className="flex-1 border-1 border-t border-cake-400"></div>
      </div>
      <Form
        inputs={type === "signUp" ? SIGN_UP_FORM_INPUTS : SIGN_IN_FORM_INPUTS}
        initialState={type === "signUp" ? SIGN_UP_FORM_INITIAL_STATE : SIGN_IN_FORM_INITIAL_STATE}
        onSubmit={type === "signUp" ? signUpWithEmailAndPassword : signInWithEmailAndPassword}
        submitBtnText={type === "signUp" ? "Regístrarse" : "Iniciar Sesión"}
        fullWidthBtn
      />
      <p className="flex flex-col sm:flex-row items-center sm:gap-2 mt-6">
        {type === "signUp" ? "Tienes una cuenta?" : "Todavía no tienes una cuenta?"}
        <Link
          href={type === "signUp" ? SIGN_IN_PATH : SIGN_UP_PATH}
        >
          {type === "signUp" ? "Inicia Sesión" : "Regístrate"}
        </Link>
      </p>
    </div>
  );
}