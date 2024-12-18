import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s - El Horno de la Abuelita Maruja",
    default:  "Sign In"
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

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <section className="flex items-center justify-center min-h-screen">
      {children}
    </section>
  );
}
