"use client";

import { createSession } from "@/actions/authActions";
import Button from "@/components/button";
import Form from "@/components/forms/form";
import Headline from "@/components/headline";
import {
  AUTHENTICATION_FORM_INITIAL_STATE,
  AUTHENTICATION_FORM_INPUTS
} from "@/constants";
import { GoogleIcon } from "@/icons/index";
import {
  signInWithEmailAndPassword,
  signInWithGoogle,
  signUpWithEmailAndPassword
} from "@/libs/firebase/auth";
import {
  ADMIN_DASHBOARD_PATH,
  HOME_PATH,
  SIGN_IN_PATH,
  SIGN_UP_PATH
} from "@/routes";
import { AuthenticationPages } from "@/types";
import { showMsg } from "@/utils/showMsg";
import { useRouter } from "next/navigation";
import Link from "./link";

type AuthenticationCardProps = {
  type: AuthenticationPages
};

export default function AuthenticationCard({ type }: AuthenticationCardProps) {
  const router = useRouter();

  const _signInWithGoogle = async () => {
    try {
      const user = await signInWithGoogle();
      if (user) {
        const { id, isAdmin } = user;
        if (id) {
          await createSession(id);
        }
        router.push(isAdmin ? ADMIN_DASHBOARD_PATH : HOME_PATH);
      }
    } catch (error) {
      showMsg("Failed to sign in with Google", "error");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-cake-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 shadow-xl p-6">
      <Headline
        as="h1"
        className="text-center uppercase"
      >
        {type === "signUp" ? "Sign Up" : "Sign In"}
      </Headline>
      <Form
        inputs={AUTHENTICATION_FORM_INPUTS}
        initialState={AUTHENTICATION_FORM_INITIAL_STATE}
        onSubmit={type === "signUp" ? signUpWithEmailAndPassword : signInWithEmailAndPassword}
        submitBtnText={type === "signUp" ? "Sign Up" : "Sign In"}
        redirectTo={HOME_PATH}
        outterClassName="lg:w-3/4"
        fullWidthBtn
      />
      <Headline
        as="h4"
        className="text-center mt-4"
      >
        OR
      </Headline>
      <Button
        withIcon
        onClick={_signInWithGoogle}
        className="bg-blue-400 hover:bg-blue-500 active:bg-blue-600 font-semibold text-white"
      >
        <div className="bg-white p-1.5 rounded-full">
          <GoogleIcon className="w-5"/>
        </div>
        {type === "signUp" ? "Sign Up with Google" : "Sign In with Google"}
      </Button>
      <p className="flex flex-col sm:flex-row items-center sm:gap-2 mt-6">
        {type === "signUp" ? "You already have an account?" : "You don't have an account yet?"}
        <Link
          href={type === "signUp" ? SIGN_IN_PATH : SIGN_UP_PATH}
        >
          {type === "signUp" ? "Sign In" : "Sign Up"}
        </Link>
      </p>
    </div>
  );
}