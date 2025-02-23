import { Metadata } from "next";

import CheckoutForm from "@/app/_components/forms/checkout";
import { stripe } from "@/app/_libs/stripe";
import Container from "@/app/_components/container";
import CheckoutOrderSummary from "@/app/_components/checkoutOrderSummary";
import { getOrder } from "@/app/_libs/firebase/orders";
import { Order } from "@/types";
// import Headline from "@/app/_components/headline";

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
  searchParams: {
    id: string
  }
};

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {

  // const { id } = await params;
  const { id } = await searchParams;

  const order = await getOrder(id);

  const calculateOrderAmount = (items: Order["products"]) => {
    if (!items) return 0;

    const amount = items.reduce((acc, item) => acc + item.priceToPay, 0);

    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return amount * 100;
  };

  // Create PaymentIntent as soon as the page loads
  const { client_secret: clientSecret } = await stripe.paymentIntents.create({
    amount:                    calculateOrderAmount(order.products),
    // amount: calculateOrderAmount([{
    //   id: "xl-tshirt"
    // }]),
    currency:                  "eur",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true
    }
  });

  return (
    <Container>
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
  );
}