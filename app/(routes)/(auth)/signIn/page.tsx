import { Metadata } from "next";
import AuthPageContent from "@/components/authPageContent";

export const metadata: Metadata = {
  title: "Sign In"
};

export default function SignInPage() {
  return (
    <AuthPageContent type="signIn"/>
  );
}