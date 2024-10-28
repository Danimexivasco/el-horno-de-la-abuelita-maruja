import type { Metadata } from "next";
import { MoonIcon, SunIcon } from "../_icons";

export const metadata: Metadata = {
  title: {
    template: "%s - EL Horno de la Abuelita Maruja",
    default: "Sign In",
  },
  description: "Quieres probar un sabor a la vieja usanza? Prueba nuestros productos!",
  keywords: [ "Pasteles", "Maruja", "Horno" ],
  authors: [ { name: "@danimexivasco", url: "https://dcano.dev" } ],
  openGraph: {
    title: "El Horno de la Abuelita Maruja",
    description: "Quieres probar un sabor a la vieja usanza? Prueba nuestros productos!",
    url: "https://el-horno-de-la-abuelita-maruja.vercel.app/",
    siteName: "EL HORNO DE LA ABUELLITA MARUJA",
    locale: "es-ES",
    type: "website"
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <section className="grid place-content-center min-h-screen">
      <h1>AUTH LAYOUT</h1>
      <SunIcon />
      <MoonIcon />
      {children}
    </section>
  );
}
