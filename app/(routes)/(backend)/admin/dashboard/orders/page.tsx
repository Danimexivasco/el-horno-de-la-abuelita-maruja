import OrdersChart from "@/app/_components/charts/orders";
import Headline from "@/app/_components/headline";
import { getOrders } from "@/app/_libs/firebase/orders";
import { formatNumber } from "@/app/_utils/formatNumber";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:       "Pedidos",
  description: "Pedidos",
  openGraph:   {
    title:       "Pedidos",
    description: "Pedidos",
    url:         "https://elhornodelaabuelitamaruja.vercel.app/admin/dashboard/orders",
    siteName:    "El Horno de la Abuelita Maruja",
    locale:      "es-ES",
    type:        "website"
  }
};

export default async function OrdersDashboardPage() {
  const orders = await getOrders();

  return (
    <>
      <Headline>Pedidos</Headline>
      <OrdersChart
        orders={orders}
        className="lg:w-2/3 mb-16 mt-8"
      />
      <div>
        PEDIDOS LIST
        TODO: Filtros (fecha, estado, precio) usar tanstack table?
        <div className="grid gap-12">
          {orders?.map(order => {
            const totals = order.products.reduce((acc, product) => {
              acc.units += product.quantity;
              acc.price += product.priceToPay;

              return acc;
            }, {
              units: 0,
              price: 0
            } as Record<string, number>);

            return (
              <div
                key={order.id}
                className="w-full flex gap-6 flex-wrap  dark:bg-cake-800 bg-cake-200 rounded-lg p-6 hyphens-auto break-all"
              >
                <p>Id de la orden: {order.id}</p>
                <p>Id del cliente: {order.customerId}</p>
                <p>Estado: {order.state}</p>
                <p>Estado del envío: {order.deliveryStatus ?? "Desconocido"}</p>
                <p>Realizado el {Intl.DateTimeFormat().format(order.createdAt)}</p>
                <p>Unidades totales: {totals.units}</p>
                <p>Precio total a pagar: {formatNumber(totals.price)}</p>
                {order.products.map(product => {
                  return (
                    <div
                      key={product.id}
                      className="w-full grid gap-4 border border-cake-500 dark:bg-cake-800 bg-cake-200 rounded-lg p-6 hyphens-auto break-all"
                    >
                      <p>Id del producto: {product.id}</p>
                      <p>Cantidad: {product.quantity}</p>
                      <p>Precio a pagar: {formatNumber(product.priceToPay)} {product.quantity > 1 && `(${formatNumber(product.unitPrice)} / unidad)`}</p>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}