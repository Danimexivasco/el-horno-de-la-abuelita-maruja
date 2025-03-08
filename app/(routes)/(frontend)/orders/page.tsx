import { Metadata } from "next";
import { cookies } from "next/headers";

import Headline from "@/app/_components/headline";
import Container from "@/app/_components/container";
import { API_ROUTES } from "@/apiRoutes";
import { Order } from "@/types";
import { getApiBaseUrl } from "@/app/_utils/getApiBaseUrl";
import { SESSION_COOKIE_NAME } from "@/constants";
import { DataType, OrderStatus } from "@/enums";
import Accordion from "@/app/_components/accordion";
import Link from "@/app/_components/link";
import { PRODUCTS_PATH } from "@/routes";

export const metadata: Metadata = {
  title:       "Mis pedidos",
  description: "Aquí podrás ver tus pedidos y sus detalles"
};

export default async function OrdersPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE_NAME)?.value ?? "";

  const usersPrommise = await fetch(`${getApiBaseUrl()}${API_ROUTES.AUTH.USER}`, {
    method: "POST",
    body:   JSON.stringify({
      token: session
    })
  });
  const user = await usersPrommise.json();

  const ordersPromise = await fetch(`${getApiBaseUrl()}${API_ROUTES.ORDERS_BY_CUSTOMER.replace(":customerId", user.id)}`, {
    method: "GET"
  });
  const { orders }: { orders: Order[] } = await ordersPromise.json();

  const completedOrders = orders.filter(order => order.state === OrderStatus.COMPLETED) ?? [];

  return (
    <Container>
      <Headline className="mb-8 lg:mb-14">Mis pedidos</Headline>
      <div className="mb-4">
        {completedOrders.length > 0 ?
          <Accordion
            items={completedOrders}
            dataType={DataType.ORDER}
          />
          :
          <div className="flex flex-col items-center gap-6">
            <p className="text-center">Todavia no hay pedidos realizados. Explora nuestros deliciosos productos 🤤</p>
            <Link
              href={PRODUCTS_PATH}
              asButton
              className="flex"
            >Ver productos
            </Link>
          </div>
        }
      </div>
    </Container>
  );
}