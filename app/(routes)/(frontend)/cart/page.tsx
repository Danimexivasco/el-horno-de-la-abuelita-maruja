import { Metadata } from "next";

export const metadata: Metadata = {
  title:       "Carrito",
  description: "Carrito",
  openGraph:   {
    title:       "Carrito",
    description: "Carrito",
    url:         "https://elhornodelaabuelitamaruja.vercel.app/cart",
    siteName:    "El Horno de la Abuelita Maruja",
    locale:      "es-ES",
    type:        "website"
  }
};

export default function CartPage() {

  // TODO: initialCheck with DB, check if product exist , if not delete, and if exist update the product on the localstorage
  return (
    <h1>Cart</h1>
  );
}