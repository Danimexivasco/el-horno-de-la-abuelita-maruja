import { Metadata } from "next";

export const metadata: Metadata = {
  title:       "Mi perfil",
  description: "Aquí podrás ver tu perfil y editar tus datos"
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}