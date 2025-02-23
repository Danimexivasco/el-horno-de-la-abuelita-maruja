import type { Metadata, Viewport } from "next";

import "@/app/globals.css";
import { Toaster } from "react-hot-toast";
import Footer from "../_components/footer";
import Header from "../_components/header";
import ThemeSwitchButton from "../_components/themeSwitchButton";
import { nunito } from "../_fonts";
import { getLoggedUser } from "@/actions/authActions";

// TODO: Change url when the website is on prod
export const metadata: Metadata = {
  metadataBase: new URL("https://elhornodelaabuelitamaruja.vercel.app/"),
  title:        {
    template: "%s - El Horno de la Abuelita Maruja",
    default:  "Inicio"
  },
  description: "Quieres probar un sabor a la vieja usanza? Prueba nuestros productos!",
  keywords:    ["galletas", "bizcochos", "tartas", "pastel", "maruja", "horno"],
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
  },
  icons: {
    icon:     "/icon.png",
    shortcut: "/favicon.ico",
    apple:    "/apple-icon.png"
  },
  robots: {
    index:     true,
    follow:    true,
    nocache:   false,
    googleBot: {
      index:               true,
      follow:              true,
      noimageindex:        false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet":       -1
    }
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
  const user = await getLoggedUser();

  return (
    <html
      lang="es"
      className={nunito.className}
    >
      <body className="flex flex-col min-h-screen dark:bg-cake-900 bg-cake-100 dark:text-white text-black transition-colors">
        <Toaster position="top-center" />
        <Header user={JSON.stringify(user ?? "")}/>
        <main className="flex-1 grid">
          {children}
        </main>
        <ThemeSwitchButton
          className="hidden lg:block fixed bottom-4 right-4 lg:bottom-8 lg:right-8"
        />
        <Footer />
      </body>
    </html>
  );
}
