import Accordion from "@/app/_components/accordion";
import Container from "@/app/_components/container";
import Headline from "@/app/_components/headline";
import { DataType } from "@/enums";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:       "Preguntas frequentes",
  description: "Aquí podrás resolver algunas de las preguntas más habituales, hechas por nuestros clientes",
  openGraph:   {
    title:       "Preguntas frequentes",
    description: "Aquí podrás resolver algunas de las preguntas más habituales, hechas por nuestros clientes",
    url:         "https://elhornodelaabuelitamaruja.vercel.app/faqs",
    siteName:    "El Horno de la Abuelita Maruja",
    locale:      "es-ES",
    type:        "website"
  }
};

export type FAQ = {
  id: number;
  question: string;
  answer: string;
};

const FAQS: FAQ[] = [
  {
    id:       1,
    question: "¿Cuáles son los postres más populares que venden?",
    answer:   "Nuestros postres más vendidos son el tiramisú, las galletas artesanales y los cheesecakes en distintos sabores."
  },
  {
    id:       2,
    question: "¿Ofrecen opciones sin azúcar o sin gluten?",
    answer:   "Sí, tenemos opciones sin azúcar y sin gluten en algunos de nuestros productos. Consulta con nosotros para conocer la disponibilidad."
  },
  {
    id:       3,
    question: "¿Puedo hacer un pedido personalizado de tiramisú o cheesecake?",
    answer:   "¡Por supuesto! Aceptamos pedidos personalizados para tiramisús y cheesecakes, ideales para eventos especiales."
  },
  {
    id:       4,
    question: "¿Cuánto tiempo duran los postres y cómo debo almacenarlos?",
    answer:   "El tiramisú y el cheesecake deben mantenerse refrigerados y consumirse en un máximo de 3-5 días. Las galletas pueden durar hasta una semana en un recipiente hermético."
  },
  {
    id:       5,
    question: "¿Realizan envíos a domicilio?",
    answer:   "Sí, ofrecemos servicio de entrega a domicilio en la zona. Puedes hacer tu pedido con anticipación para coordinar la entrega."
  },
  {
    id:       6,
    question: "¿Cuáles son los sabores de cheesecake disponibles?",
    answer:   "Tenemos una variedad de sabores como clásico, frutos rojos, chocolate y dulce de leche. También aceptamos pedidos especiales."
  }
];

export default async function FAQSPage() {

  return (
    <Container className="text-center">
      <Headline>Preguntas Frequentes</Headline>
      <p className="mb-8 lg:mb-12">A continuación podrás resolver algunas de las preguntas más habituales, hechas por nuestros clientes</p>
      <section className="lg:w-2/3 mx-auto">
        <Accordion
          items={FAQS}
          dataType={DataType.FAQ}
        />
      </section>
    </Container>
  );
}