import { Metadata } from "next";

export const metadata: Metadata = {
  title:       "Carrito",
  description: "Carrito",
  openGraph:   {
    title:       "Carrito",
    description: "Carrito",
    url:         "https://el-horno-de-la-abuelita-maruja.vercel.app/cart",
    siteName:    "El Horno de la Abuelita Maruja",
    locale:      "es-ES",
    type:        "website"
  }
};

export default function CartPage() {
  return (
    <h1>Cart</h1>
  );
}