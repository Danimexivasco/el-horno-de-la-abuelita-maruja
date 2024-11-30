import Headline from "@/components/headline";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:       "Dashboard",
  description: "Dashboard",
  openGraph:   {
    title:       "Dashboard",
    description: "Dashboard",
    url:         "https://el-horno-de-la-abuelita-maruja.vercel.app/admin/dashboard",
    siteName:    "El Horno de la Abuelita Maruja",
    locale:      "es-ES",
    type:        "website"
  }
};

export default function Dashboard() {
  return (
    <>
      <Headline className="font-bold">Panel de Control</Headline>
      <ul>
        <li>Productos</li>
        <li>Ventas</li>
        <li>Visitar la tienda</li>
      </ul>
    </>
  );
}