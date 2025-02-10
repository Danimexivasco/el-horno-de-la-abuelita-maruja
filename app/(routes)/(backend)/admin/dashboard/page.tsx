import Details from "@/app/_components/details";
import DashboardCard from "@/app/_components/dashboardCard";
import { getProducts } from "@/app/_libs/firebase/products";
import Headline from "@/components/headline";
import { CATEGORY_OPTIONS } from "@/constants";
import { ADMIN_PRODUCTS_PATH, HOME_PATH } from "@/routes";
import { Metadata } from "next";
import { getLoggedUser } from "@/actions/authActions";
import { User } from "@/types";

export const metadata: Metadata = {
  title:       "Panel de Control",
  description: "Panel de Control",
  openGraph:   {
    title:       "Panel de Control",
    description: "Panel de Control",
    url:         "https://elhornodelaabuelitamaruja.vercel.app/admin/dashboard",
    siteName:    "El Horno de la Abuelita Maruja",
    locale:      "es-ES",
    type:        "website"
  }
};

export default async function Dashboard() {
// TODO: Implement Ventas page
  const products = await getProducts();
  const user = await getLoggedUser() as User;

  return (
    <>
      <Headline className="font-bold mb-8">Panel de Control</Headline>
      <Headline className="mb-8">Bienvenido, {user?.username} 👋🏼</Headline>
      <ul className="grid grid-cols-auto-fill gap-12">
        <DashboardCard
          href={ADMIN_PRODUCTS_PATH}
        >
          <Headline as="h2">Productos</Headline>
          <p>Accede a la sección de productos. Desde la que podrás ver los productos existentes, editarlos, así como crear nuevos productos</p>
          <p>Total de productos: {products?.length ?? 0}</p>
          <Details
            headline="Ver desglose"
          >
            <ul className="list-disc pl-8">
              {CATEGORY_OPTIONS.filter(category => category.value !== "").map(({ value, label }) => (
                <li key={value}>
                  {label}: {products?.filter(product => product?.category === value).length}
                </li>
              ))}
            </ul>
          </Details>
        </DashboardCard>
        {/* <li>Ventas</li> */}
        {/* <li>Usuarios</li> */}
        <DashboardCard
          href={HOME_PATH}
          centered
        >
          <Headline as="h2">Ir a la Tienda 🏪</Headline>
        </DashboardCard>
      </ul>
    </>
  );
}