import { Metadata } from "next";

import CheckoutForm from "@/app/_components/forms/checkout";
import { stripe } from "@/app/_libs/stripe";
import Container from "@/app/_components/container";
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

export default async function CheckoutPage() {

  const calculateOrderAmount = (items) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1400;
  };

  // Create PaymentIntent as soon as the page loads
  const { client_secret: clientSecret } = await stripe.paymentIntents.create({
    amount: calculateOrderAmount([{
      id: "xl-tshirt"
    }]),
    currency:                  "eur",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true
    }
  });

  return (
    <Container>
      <p className="text-5xl mb-8">Compra Segura</p>
      {/* <Headline className="mb-8">Compra Segura</Headline> */}
      <div className="flex flex-col lg:flex-row gap-12 justify-center">
        <div className="flex-1">
          <div id="checkout">
            <CheckoutForm clientSecret={clientSecret} />
          </div>
        </div>
        <div className="flex-1">CART INFO</div>
      </div>
    </Container>
  );
}