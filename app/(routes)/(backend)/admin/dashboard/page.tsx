import DashboardCard from "@/app/_components/dashboardCard";
import { getProducts } from "@/app/_libs/firebase/products";
import Headline from "@/components/headline";
import { CATEGORY_OPTIONS } from "@/constants";
import {
  ADMIN_ORDERS_PATH,
  ADMIN_PRODUCTS_PATH,
  ADMIN_USERS_PATH,
  PRODUCTS_PATH
} from "@/routes";
import { Metadata } from "next";
import { getLoggedUser } from "@/actions/authActions";
import { User } from "@/types";
import { combine } from "@/app/_utils/combineClassnames";
import { sriracha } from "@/app/_fonts";
import Link from "@/app/_components/link";
import { Store } from "lucide-react";
import { getUsers } from "@/app/_libs/firebase/users";
import { getOrders } from "@/app/_libs/firebase/orders";
import { groupBy } from "@/app/_utils/groupBy";
import { DeliveryStatus } from "@/enums";
import OrdersChart from "@/app/_components/charts/orders";
import SalesChart from "@/app/_components/charts/sales";

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
  const products = await getProducts();
  const user = await getLoggedUser() as User;
  const users = await getUsers();
  const showingUsers = users.filter(dbUser => dbUser.id !== user.id);
  const orders = await getOrders();
  const ordersByState = groupBy(orders, "state");

  return (
    <>
      <Headline className="!text-4xl lg:text-5xl font-bold mb-8">Panel de Control</Headline>
      <p className="text-2xl lg:text-3xl mb-8">Bienvenido, {user?.username} 👋🏼</p>
      <div className="grid grid-cols-1 lg:grid-cols-2  gap-12">
        <DashboardCard
          href={ADMIN_ORDERS_PATH}
        >
          <Headline
            as="h2"
            className="!mb-0"
          >Pedidos
          </Headline>
          <OrdersChart
            orders={orders}
            isPreview
          />
          <div className="flex gap-4 justify-between w-full">
            <div className="flex gap-4 justify-between w-full">
              <div
                className="flex flex-col justify-between text-center"
              >
                <p>Pendientes</p>
                <p className="font-bold">{ordersByState[DeliveryStatus.FOR_DELIVERY]?.length ?? 0}</p>
              </div>
              <div
                className="flex flex-col justify-between text-center"
              >
                <p>En tránsito</p>
                <p className="font-bold">{ordersByState[DeliveryStatus.IN_TRANSIT]?.length ?? 0}</p>
              </div>
              <div
                className="flex flex-col justify-between text-center"
              >
                <p>Entregados</p>
                <p className="font-bold">{ordersByState[DeliveryStatus.DELIVERED]?.length ?? 0}</p>
              </div>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard
          href={ADMIN_PRODUCTS_PATH} // TODO: Change to admin sales path
          className="flex flex-col !justify-start items-center"
        >
          <Headline
            as="h2"
            className="!mb-0"
          >Ventas
          </Headline>
          <SalesChart
            orders={orders}
            isPreview
          />
        </DashboardCard>

        <DashboardCard
          href={ADMIN_PRODUCTS_PATH}
        >
          <Headline
            as="h2"
            className="!mb-0"
          >Productos
          </Headline>
          <p className={combine(sriracha.className, "text-5xl lg:text-8xl")}>{products?.length ?? 0}</p>
          <div className="flex gap-4 justify-between w-full">
            {CATEGORY_OPTIONS.filter(category => category.value !== "").map(({ value, label }) => (
              <div
                key={value}
                className="text-center"
              >
                <p>{label}</p>
                <p className="font-bold">{products?.filter(product => product?.category === value).length}</p>
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard
          href={ADMIN_USERS_PATH}
          className="flex flex-col !justify-start items-center"
        >
          <Headline
            as="h2"
            className="!mb-0"
          >Usuarios
          </Headline>
          <p className={combine(sriracha.className, "text-5xl")}>{showingUsers?.length}</p>
        </DashboardCard>

      </div>
      <Link
        href={PRODUCTS_PATH}
        target="_blank"
        className="flex items-center mt-12 w-fit"
      >
        <Store
          size={20}
          className="mr-2"
        /> Ir a la Tienda
      </Link>
    </>
  );
}