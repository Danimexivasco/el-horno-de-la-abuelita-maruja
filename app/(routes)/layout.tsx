import type { Metadata, Viewport } from "next";
// import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import "@/app/globals.css";
import Header from "../_components/header";
import Footer from "../_components/footer";
import { headers } from "next/headers";
import {
  SIGN_IN_PATH,
  SIGN_UP_PATH,
  ADMIN_DASHBOARD_PATH,
  ADMIN_PRODUCTS_PATH,
  ADMIN_NEW_PRODUCT_PATH,
  ADMIN_PRODUCT_DETAIL_PATH
} from "@/routes";

// TODO: Check fonts
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
    url:         "https://el-horno-de-la-abuelita-maruja.vercel.app/",
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

  const backendLayoutPaths = [
    SIGN_IN_PATH,
    SIGN_UP_PATH,
    ADMIN_DASHBOARD_PATH,
    ADMIN_PRODUCTS_PATH,
    ADMIN_NEW_PRODUCT_PATH,
    ADMIN_PRODUCT_DETAIL_PATH
  ];

  const headersList = await headers();
  const currentPath = headersList.get("x-current-path") ?? "";
  const isBackendLayout = backendLayoutPaths.includes(currentPath);

  return (
    <html lang="es" className="dark">
      <body className="dark:bg-cake-900 bg-cake-100 dark:text-white transition-colors">
        <main className="min-h-screen">
          {isBackendLayout ? (
            <>
              <Toaster position="top-center" />
              {children}
            </>
          ) : (
            <>
              <Header />
              <Toaster position="top-center" />
              {children}
              <Footer />
            </>
          )}
        </main>
      </body>
    </html>
  );
}
