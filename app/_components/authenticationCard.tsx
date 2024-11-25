"use client";

import { useRouter } from "next/navigation";
import { AuthenticationPages } from "@/types";
import { signInWithEmailAndPassword, signInWithGoogle, signUpWithEmailAndPassword } from "@/libs/firebase/auth";
import { createSession } from "@/actions/authActions";
import { AUTHENTICATION_FORM_INITIAL_STATE, AUTHENTICATION_FORM_INPUTS } from "@/constants";
import { showMsg } from "@/utils/showMsg";
import { GoogleIcon } from "@/icons/index";
import Headline from "@/components/headline";
import Button from "@/components/button";
import Form from "@/components/form";
import Link from "./link";
import { useState } from "react";
import { HOME_PATH, SIGN_IN_PATH, SIGN_UP_PATH } from "@/routes";

type AuthenticationCardProps = {
  type: AuthenticationPages
};

export default function AuthenticationCard({ type }: AuthenticationCardProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const _signInWithGoogle = async () => {
    setLoading(true);
    try {
      const userUid = await signInWithGoogle();
      if (userUid) {
        await createSession(userUid);
      }
      router.push(HOME_PATH);
    } catch (error) {
      showMsg("Failed to sign in with Google", "error");
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-cake-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border dark:border-cake-400/80 border-cake-500/80 p-6">
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
        {loading ?
          "Loading..."
          :
          type === "signUp" ? "Sign Up with Google" : "Sign In with Google"
        }
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