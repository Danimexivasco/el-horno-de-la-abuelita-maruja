import { Metadata } from "next";
import AuthPageContent from "@/components/authPageContent";

export const metadata: Metadata = {
  title:     "Crear cuenta",
  openGraph: {
    title:       "El Horno de la Abuelita Maruja",
    description: "Create una cuenta para disfrutar de nuestros productos!",
    url:         "https://elhornodelaabuelitamaruja.vercel.app/signUp",
    siteName:    "El Horno de la Abuelita Maruja",
    locale:      "es-ES",
    type:        "website"
  }
};

export default function SignUpPage() {
  return (
    <AuthPageContent type="signUp"/>
  );
}