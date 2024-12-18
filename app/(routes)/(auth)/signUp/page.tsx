import { Metadata } from "next";
import AuthPageContent from "@/components/authPageContent";

export const metadata: Metadata = {
  title: "Sign Up"
};

export default function SignUpPage() {
  return (
    <AuthPageContent type="signUp"/>
  );
}