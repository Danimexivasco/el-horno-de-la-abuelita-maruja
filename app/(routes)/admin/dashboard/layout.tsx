import Container from "@/app/_components/container";
import Sidebar from "@/app/_components/sidebar";
import { Logo } from "@/app/_icons/logo";
import { ROUTES } from "@/routes";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s - El Horno de la Abuelita Maruja",
    default:  "Dashboard"
  }
};

export default async function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <section className="flex">
      <Sidebar
        routes={ROUTES.filter(route => route.isNavRoute)}
        className="z-10 hover:z-20"
      />
      <Container className="p-12 z-10 hover:z-20 relative">
        {children}
        <Logo className="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 -z-10 opacity-30 w-48 h-auto"/>
      </Container>
    </section>
  );
}