import Headline from "@/app/_components/headline";
import { getApiBaseUrl } from "@/app/_utils/getApiBaseUrl";
import { Metadata } from "next";

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
  const order = await response.json();
  const { id: orderId } = order.data;

  return (
    <>
      <Headline>Detalles del pedido</Headline>
      <p>Id de la orden {orderId}</p>
    </>
  );
}