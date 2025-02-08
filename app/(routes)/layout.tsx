import type { Metadata, Viewport } from "next";

import "@/app/globals.css";
import { Toaster } from "react-hot-toast";
import Footer from "../_components/footer";
import Header from "../_components/header";
import ThemeSwitchButton from "../_components/themeSwitchButton";
import { nunito } from "../_fonts";

// TODO: Change url when the website is on prod
export const metadata: Metadata = {
  title: {
    template: "%s - El Horno de la Abuelita Maruja",
    default:  "Inicio"
  },
  description: "Quieres probar un sabor a la vieja usanza? Prueba nuestros productos!",
  keywords:    ["Pasteles", "Maruja", "Horno"],
  authors:     [{
    name: "@danimexivasco",
    url:  "https://dcano.dev"
  }],
  openGraph: {
    title:       "El Horno de la Abuelita Maruja",
    description: "Quieres probar un sabor a la vieja usanza? Prueba nuestros productos!",
    url:         "https://elhornodelaabuelitamaruja.vercel.app/",
    siteName:    "El Horno de la Abuelita Maruja",
    locale:      "es-ES",
    type:        "website"
  }
};

export const viewport: Viewport = {
  themeColor: "#2A2009"
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html
      lang="es"
      className={nunito.className}
    >
      <body className="dark:bg-cake-900 bg-cake-100 dark:text-white text-black transition-colors scroll-mt-24 lg:scroll-mt-36">
        <Toaster position="top-center" />
        <Header />
        <main className="flex flex-col min-h-screen">
          <div className="flex-1">
            {children}
          </div>
        </main>
        <ThemeSwitchButton
          className="hidden lg:block fixed bottom-4 right-4 lg:bottom-8 lg:right-8"
        />
        <Footer />
      </body>
    </html>
  );
}
