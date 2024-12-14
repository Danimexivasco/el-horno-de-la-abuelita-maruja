import { Metadata } from "next";

export const metadata: Metadata = {
  title:       "Nuevo Producto",
  description: "Añade un nuevo producto al catálogo"
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}