import { Metadata } from "next";
import { getApiBaseUrl } from "@/app/_utils/getApiBaseUrl";
import Headline from "@/app/_components/headline";
import { Order, OrderProduct } from "@/types";
import Link from "@/app/_components/link";
import { BackIcon } from "@/app/_icons";
import { ADMIN_ORDERS_PATH } from "@/routes";
import { formatNumber } from "@/app/_utils/formatNumber";
import { getFormatedDate } from "@/app/_utils/getFormatedDate";
import OrderActions from "@/app/_components/orderActions";
import OrderProductsDataTable from "@/app/_components/dataTable/orderProducts";
import {
  orderProductsColumn
} from "@/app/_components/dataTable/orderProducts/columns";

type OrderDetailProps = {
  params: Promise<{
    id: string
  }>
};

export const metadata: Metadata = {
  title:       "Detalle del pedido",
  description: "Detalle del pedido",
  openGraph:   {
    title:       "Detalle del pedido",
    description: "Detalle del pedido",
    url:         "https://elhornodelaabuelitamaruja.vercel.app/admin/dashboard/orders",
    siteName:    "El Horno de la Abuelita Maruja",
    locale:      "es-ES",
    type:        "website"
  }
};

export default async function OrderDetailPage({ params }: OrderDetailProps) {
  const { id } = await params;

  const response = await fetch(`${getApiBaseUrl()}/api/order/${id}`);
  const { data } = await response.json();

  const totals = data.products.reduce((acc: Record<string, number>, product: OrderProduct) => {
    acc.units += product.quantity;
    acc.price += product.priceToPay;

    return acc;
  }, {
    units: 0,
    price: 0
  } as Record<string, number>);

  const { id: orderId, customerId, state, createdAt, products, updatedAt } = data as Order;

  return (
    <>
      <Link
        href={ADMIN_ORDERS_PATH}
        className="mb-10 flex w-fit items-center gap-2 no-underline"
      >
        <BackIcon className="w-6 h-6"/> {"Volver a los pedidos"}
      </Link>
      <div className="flex flex-wrap gap-4 justify-between items-center mb-16 lg:mb-8">
        <Headline>Detalles del pedido</Headline>
        <OrderActions orderId={orderId}/>
      </div>
      <div className="prose-base">
        <p><span className="font-bold">ID del pedido:</span> {orderId}</p>
        <p><span className="font-bold">Estado:</span> {state}</p>
        <p><span className="font-bold">Fecha de creación:</span> {getFormatedDate(createdAt)}</p>
        {updatedAt ?
          <p><span className="font-bold">Fecha de actualización:</span> {getFormatedDate(updatedAt)}</p>
          : null
        }
        <p><span className="font-bold">Id del cliente:</span> {customerId}</p>
        <p><span className="font-bold">Cantidad total a pagar:</span> {formatNumber(totals.price)}</p>
        <p><span className="font-bold">Articulos totales:</span> {totals.units}</p>
        <Headline as="h2">Productos:</Headline>
        <OrderProductsDataTable
          data={products}
          columns={orderProductsColumn}
        />
      </div>
    </>
  );
}
