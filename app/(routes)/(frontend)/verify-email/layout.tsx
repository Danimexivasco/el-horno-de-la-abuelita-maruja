import { Metadata } from "next";

export const metadata: Metadata = {
  title:       "Verificar correo",
  description: "Verifica tu correo para disfrutar de nuestros productos!"
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}