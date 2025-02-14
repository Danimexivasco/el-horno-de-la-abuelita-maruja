import CartContent from "@/app/_components/cartContent";
import Container from "@/app/_components/container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:       "Mi cesta",
  description: "Aquí podrás ver los artículos que has anadido a tu cesta",
  openGraph:   {
    title:       "Mi cesta",
    description: "Aquí podrás ver los artículos que has anadido a tu cesta",
    url:         "https://elhornodelaabuelitamaruja.vercel.app/cart",
    siteName:    "El Horno de la Abuelita Maruja",
    locale:      "es-ES",
    type:        "website"
  }
};

export default function CartPage() {

  // TODO: initialCheck with DB, check if product exist , if not delete, and if exist update the product on the localstorage
  return (
    <Container>
      <CartContent />
    </Container>
  );
}