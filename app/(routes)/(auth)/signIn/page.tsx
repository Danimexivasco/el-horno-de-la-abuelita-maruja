import { Metadata } from "next";
import AuthPageContent from "@/components/authPageContent";

export const metadata: Metadata = {
  title:     "Iniciar Sesión",
  openGraph: {
    title:       "El Horno de la Abuelita Maruja",
    description: "Inicia sesión para disfrutar de nuestros productos!",
    url:         "https://elhornodelaabuelitamaruja.vercel.app/signIn",
    siteName:    "El Horno de la Abuelita Maruja",
    locale:      "es-ES",
    type:        "website"
  }
};

export default function SignInPage() {
  return (
    <AuthPageContent type="signIn"/>
  );
}