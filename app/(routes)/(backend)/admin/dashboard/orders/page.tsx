import OrdersChart from "@/app/_components/charts/orders";
import SalesChart from "@/app/_components/charts/sales";
import OrdersDataTable from "@/app/_components/dataTable/orders";
import { ordersColumns } from "@/app/_components/dataTable/orders/columns";
import Headline from "@/app/_components/headline";
import { getOrders } from "@/app/_libs/firebase/orders";
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

  const ordersWithTotals = orders?.map(order => {
    const totals = order.products.reduce((acc, product) => {
      acc.units += product.quantity;
      acc.price += product.priceToPay;

      return acc;
    }, {
      units: 0,
      price: 0
    } as Record<string, number>);

    return {
      ...order,
      totals
    };
  });

  return (
    <>
      <Headline>Pedidos</Headline>
      <div className="grid lg:flex items-center mb-16 mt-8 gap-16">
        <OrdersChart
          orders={orders}
        />
        <SalesChart
          orders={orders}
        />
      </div>
      <OrdersDataTable
        data={ordersWithTotals}
        columns={ordersColumns}
      />
    </>
  );
}