import { getLoggedUser } from "@/actions/authActions";
import CartContent from "@/app/_components/cartContent";
import Container from "@/app/_components/container";
import { getPendingOrderByCustomerId } from "@/app/_libs/firebase/orders";
import { Metadata } from "next";
import { User } from "@/types";

export const metadata: Metadata = {
  title:       "Mi cesta",
  description: "Aquí podrás ver los artículos que has anadido a tu cesta",
  openGraph:   {
    title:       "Mi cesta",
    description: "Aquí podrás ver los artículos que has anadido a tu cesta",
    url:         "https://elhornodelaabuelitamaruja.vercel.app/cart",
    siteName:    "El Horno de la Abuelita Maruja",
    locale:      "es-ES",
    type:        "website"
  }
};

function isUser(obj: any): obj is User {
  return obj !== null && typeof obj === "object" && "id" in obj;
}

export default async function CartPage() {
  const user = await getLoggedUser();
  const pendingOrder = await getPendingOrderByCustomerId(isUser(user) ? user?.id : "");

  // TODO: initialCheck with DB, check if product exist , if not delete, and if exist update the product on the localstorage
  return (
    <Container>
      <CartContent
        user={JSON.stringify(user ?? "")}
        pendingOrder={pendingOrder[0] ?? null}
      />
    </Container>
  );
}