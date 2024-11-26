"use client"

import { signOut } from "@/libs/firebase/auth";
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import { SIGN_IN_PATH } from "@/routes";

export default function Home() {
  const router = useRouter()
  const handleSignOut = async () => {
    await signOut()
    router.push(SIGN_IN_PATH)
  }
  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center sm:items-start">
        <h1 className="text-4xl">HOME</h1>
        <Button onClick={handleSignOut}>Sign out</Button>
      </main>
      <footer >
      </footer>
    </div>
  );
}