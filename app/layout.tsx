import type { Metadata } from "next";
// import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import "./globals.css";

// TODO: Check fonts
// TODO: Change url when the website is on prod
export const metadata: Metadata = {
  title: {
    template: "%s - EL Horno de la Abuelita Maruja",
    default: "Inicio",
  },
  description: "Quieres probar un sabor a la vieja usanza? Prueba nuestros productos!",
  keywords: [ "Pasteles", "Maruja", "Horno" ],
  authors: [ { name: "@danimexivasco", url: "https://dcano.dev" } ],
  themeColor: "#2A2009",
  openGraph: {
    title: "El Horno de la Abuelita Maruja",
    description: "Quieres probar un sabor a la vieja usanza? Prueba nuestros productos!",
    url: "https://el-horno-de-la-abuelita-maruja.vercel.app/",
    siteName: "EL Horno de la Abuelita Maruja",
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
    <html lang="es" className="dark">
      <body className="dark:bg-cake-950 bg-cake-200 dark:text-white transition-colors">
        <main className="min-h-screen">
          <Toaster position="top-center" />
          {children}
        </main>
      </body>
    </html>
  );
}
