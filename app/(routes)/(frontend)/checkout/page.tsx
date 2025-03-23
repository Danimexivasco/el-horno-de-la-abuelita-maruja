import { Metadata } from "next";

import CheckoutForm from "@/app/_components/forms/checkout";
import { stripe } from "@/app/_libs/stripe";
import Container from "@/app/_components/container";
import CheckoutOrderSummary from "@/app/_components/checkoutOrderSummary";
import { Order } from "@/types";
import { getApiBaseUrl } from "@/app/_utils/getApiBaseUrl";
import { API_ROUTES } from "@/apiRoutes";
import { TriangleAlert } from "lucide-react";
import Link from "@/app/_components/link";
import { CONTACT_PATH } from "@/routes";
import { roundNumber } from "@/app/_utils/roundNumber";

export const metadata: Metadata = {
  title:       "Comprar",
  description: "Estás a un paso de saborear lo bueno",
  openGraph:   {
    title:       "Comprar",
    description: "Estás a un paso de saborear lo bueno",
    url:         "https://elhornodelaabuelitamaruja.vercel.app/checkout",
    siteName:    "El Horno de la Abuelita Maruja",
    locale:      "es-ES",
    type:        "website"
  }
};

type CheckoutPageProps = {
  searchParams: Promise<{
    id: string
  }>
};

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {

  const { id } = await searchParams;

  const orderPromise = await fetch(`${getApiBaseUrl()}${API_ROUTES.ORDER.replace(":id", id)}`, {
    method: "GET"
  });

  const order = await orderPromise.json();

  const calculateOrderAmount = (items: Order["products"]) => {
    if (!items) return 0;

    const amount = items.reduce((acc, item) => acc + item.priceToPay, 0);

    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return roundNumber(amount * 100);
  };

  // Create PaymentIntent as soon as the page loads
  const { client_secret: clientSecret } = await stripe.paymentIntents.create({
    amount:                    calculateOrderAmount(order.data.products),
    // amount: calculateOrderAmount([{
    //   id: "xl-tshirt"
    // }]),
    currency:                  "eur",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true
    }
  });

  return clientSecret ? (
    <Container>
      <div className="p-6 rounded-md bg-yellow-400 mb-8 prose-base text-black">
        <p className="flex items-center gap-2 font-bold"><TriangleAlert /> ¡ATENCIÓN! </p>
        <p>¡Nos gustaría agradecerte mucho el que hayas llegado hasta aquí! 🚀</p>
        <p>Actualmente estamos empezando nuestro proyecto y estamos en fase de desarrollo para poder formalizar los pagos de acuerdo con la normativa vigente. Es por ello que hasta que esto no esté terminado, no podremos aceptar pagos. Para cualquier otra cosa, no dudes en ponerte en contacto con nosotros en nuestra <Link
          href={CONTACT_PATH}
          className="!text-black font-bold"
        >página de contacto
        </Link>
        </p>
        <small>* El formulario se ha dejado a modo de demostración. La validación está desactivada y no es posible realizar ningún tipo de transacción desde el mismo.</small>
      </div>
      <p className="text-4xl lg:text-5xl mb-8">Compra Segura</p>
      <div className="grid lg:flex gap-12 lg:gap-40 lg:justify-center items-start">
        <div className="lg:flex-1">
          <div id="checkout">
            <CheckoutForm clientSecret={clientSecret} />
          </div>
        </div>
        <CheckoutOrderSummary />
      </div>
    </Container>
  ) : null;
}