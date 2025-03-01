import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title:       "Mis pedidos",
  description: "Aquí podrás ver tus pedidos y sus detalles"
};

export default async function Layout({ children }: {children: React.ReactNode}) {
  return children;
}
