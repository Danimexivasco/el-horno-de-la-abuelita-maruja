import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s - El Horno de la Abuelita Maruja",
    default:  "Iniciar sesión"
  },
  description: "Regístrate o inicia sesión para disfrutar de nuestros productos!",
  keywords:    ["galletas", "bizcochos", "tartas", "pastel", "maruja", "horno", "iniciar sesión", "registrarse"],
  authors:     [{
    name: "@danimexivasco",
    url:  "https://dcano.dev"
  }],
  openGraph: {
    title:       "El Horno de la Abuelita Maruja",
    description: "Regístrate o inicia sesión para disfrutar de nuestros productos!",
    url:         "https://elhornodelaabuelitamaruja.vercel.app/",
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
