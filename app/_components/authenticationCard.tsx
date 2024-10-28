"use client"

import { useRouter } from "next/navigation"
import { AuthenticationPages } from "@/types"
import { signInWithEmailAndPassword, signInWithGoogle, signUpWithEmailAndPassword } from "@/libs/firebase/auth"
import { createSession } from "@/actions/authActions"
import { AUTHENTICATION_FORM_INITIAL_STATE, AUTHENTICATION_FORM_INPUTS } from "@/constants"
import { showMsg } from "@/utils/showMsg"
import { getPath } from "@/utils/getPath"
import { GoogleIcon } from "@/icons/index"
import Headline from "@/components/headline"
import Button from "@/components/button"
import Form from "@/components/form"
import Link from "./link"

type AuthenticationCardProps = {
  type: AuthenticationPages
}

export default function AuthenticationCard({ type }: AuthenticationCardProps) {
  const router = useRouter()
  const _signInWithGoogle = async () => {
    try {
      const userUid = await signInWithGoogle()
      if (userUid) {
        await createSession(userUid);
      }
      router.push(getPath("Home"))
    } catch (error) {
      showMsg("Failed to sign in with Google", "error")
      console.error(error)
    }
  }
  
  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-cake-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-cake-100/80 p-6">
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
        redirectTo={getPath("Home")}
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
          href={type === "signUp" ? getPath("SignIn") : getPath("SignUp")}
        >
          {type === "signUp" ? "Sign In" : "Sign Up"}
        </Link>
      </p>
    </div>
  )
}