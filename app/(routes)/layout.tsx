import type { Metadata, Viewport } from "next";
// import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import "@/app/globals.css";


// TODO: Check fonts
// TODO: Change url when the website is on prod
export const metadata: Metadata = {
  title: {
    template: "%s - El Horno de la Abuelita Maruja",
    default: "Inicio",
  },
  description: "Quieres probar un sabor a la vieja usanza? Prueba nuestros productos!",
  keywords: [ "Pasteles", "Maruja", "Horno" ],
  authors: [ { name: "@danimexivasco", url: "https://dcano.dev" } ],
  openGraph: {
    title: "El Horno de la Abuelita Maruja",
    description: "Quieres probar un sabor a la vieja usanza? Prueba nuestros productos!",
    url: "https://el-horno-de-la-abuelita-maruja.vercel.app/",
    siteName: "El Horno de la Abuelita Maruja",
    locale: "es-ES",
    type: "website"
  }
};
export const viewport: Viewport = {
  themeColor: "#2A2009",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="es" className="dark">
      <body className="dark:bg-cake-900 bg-cake-100 dark:text-white transition-colors">
        <main className="min-h-screen">
          <Toaster position="top-center" />
          {children}
        </main>
      </body>
    </html>
  );
}
