import { Metadata } from "next";
import Container from "@/app/_components/container";
import ContactForm from "@/app/_components/forms/contactForm";
import Headline from "@/app/_components/headline";
import Map from "@/app/_components/map";
import { MarkerIcon } from "@/app/_icons";
import { FAQS_PATH } from "@/routes";
import Link from "@/app/_components/link";

export const metadata: Metadata = {
  title:       "Contacto",
  description: "Contacta con nosotros",
  openGraph:   {
    title:       "Contacta con nosotros",
    description: "Contacta con nosotros",
    url:         "https://elhornodelaabuelitamaruja.vercel.app/contact",
    siteName:    "El Horno de la Abuelita Maruja",
    locale:      "es-ES",
    type:        "website"
  }
};

export default function ContactPage() {
  return (
    <Container className="prose-base">
      <Headline>Contacta con nosotros</Headline>
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
        <ContactForm />
        <div className="flex-1">
          <div>
            <Map />
            <div className="flex gap-2 items-center mt-4">
              <MarkerIcon className="w-8 h-8 dark:text-cake-400 text-cake-600"/>
              <span>Calle la Luz, 02434, Letur</span>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-16 text-center">O si lo prefieres, puedes echar un vistazo a nuestas <Link href={FAQS_PATH}>preguntas frecuentes</Link></p>
    </Container>
  );
}