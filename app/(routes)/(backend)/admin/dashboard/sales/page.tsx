import Headline from "@/app/_components/headline";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:       "Ventas",
  description: "Ventas acumuladas en el sitio",
  openGraph:   {
    title:       "Ventas",
    description: "Ventas acumuladas en el sitio",
    url:         "https://elhornodelaabuelitamaruja.vercel.app/admin/dashboard/sales",
    siteName:    "El Horno de la Abuelita Maruja",
    locale:      "es-ES",
    type:        "website"
  }
};

export default function AdminSalesPage() {
  return (
    <Headline>Ventas</Headline>
  );
}