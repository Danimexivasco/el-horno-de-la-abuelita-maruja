import Container from "@/app/_components/container";
import Filters from "@/app/_components/filters";
import ProductList from "@/app/_components/productList";
import Search from "@/app/_components/search";
import { getProducts } from "@/app/_libs/firebase/products";
import { getFiltersFromProducts } from "@/app/_utils/getFilters";
import { Metadata } from "next";
import { Suspense } from "react";
import Loading from "../../(backend)/admin/dashboard/loading";

export const metadata: Metadata = {
  title:       "Productos",
  description: "Productos",
  openGraph:   {
    title:       "Productos",
    description: "Productos",
    url:         "https://elhornodelaabuelitamaruja.vercel.app/products",
    siteName:    "El Horno de la Abuelita Maruja",
    locale:      "es-ES",
    type:        "website"
  }
};

export default async function ProductsPage() {
  const products = await getProducts();
  const filters = getFiltersFromProducts(products);

  return (
    <Suspense fallback={<Loading />}>
      <Search />
      <Filters availableFilters={filters}/>
      <Container>
        <ProductList products={products}/>
      </Container>
    </Suspense>
  );
}