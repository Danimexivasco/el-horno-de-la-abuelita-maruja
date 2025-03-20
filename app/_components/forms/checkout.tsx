"use client";

import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  Elements,
  AddressElement
  // ExpressCheckoutElement
} from "@stripe/react-stripe-js";
import {
  Appearance,
  loadStripe,
  StripePaymentElementOptions
} from "@stripe/stripe-js";
import Button from "../button";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "");

// TODO: WIP, finish it when payment logic is discussed with Rocio
function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return null;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // TODO: change this to payment completion page
        return_url: "http://localhost:3000/checkout/success"
      }
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message ?? "An error ocurred.");
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: "accordion"
  };

  return (
    <form
      id="payment-form"
      onSubmit={handleSubmit}
      className="grid gap-6"
    >
      <PaymentElement
        id="payment-element"
        options={paymentElementOptions}
      />
      {!isLoading && stripe && elements ?
        <Button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          type="submit"
          ariaLabel="Realizar pago"
          className="w-full"
        >
          <span id="button-text">
            {isLoading ? <div
              className="spinner"
              id="spinner"
            >
            </div> : "Realizar pago"}
          </span>
        </Button> : null
      }
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}

export default function CheckoutForm({ clientSecret }: { clientSecret: string }) {
  const appearance: Appearance = {
    theme:     "stripe",
    variables: {
      colorPrimary: "#7A5C19"
    }
  };

  return (
    <Elements
      stripe={stripePromise}
      options={{
        appearance,
        clientSecret
      }}
    >
      <div className="grid gap-12">
        <div>
          <p className="text-2xl mb-4">Datos de facturación</p>
          <AddressElement
            options = {{
              mode:             "shipping",
              allowedCountries: ["ES"]
            } }
          />
        </div>
        <div>
          <p className="text-2xl mb-4">Método de pago</p>
          <PaymentForm />
          {/* <div className="relative flex pt-5 pb-3 items-center w-full">
            <div className="flex-1 border-1 border-t border-cake-400"></div>
            <p className="text-base text-center mx-4 mb-0">
              o paga directamente con
            </p>
            <div className="flex-1 border-1 border-t border-cake-400"></div>
          </div> */}
          {/* <div className="min-h-14">
            <ExpressCheckoutElement
              onConfirm={({ payment_method }) => console.log(payment_method)}
            />
          </div> */}
        </div>
      </div>
    </Elements>
  );
}