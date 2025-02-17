import { Metadata } from "next";
import { Product } from "@/types";
import { PRODUCTS_PATH } from "@/routes";
import { getProduct, getProducts } from "@/app/_libs/firebase/products";
import Carousel from "@/app/_components/carousel";
import Container from "@/app/_components/container";
import Headline from "@/app/_components/headline";
import Link from "@/app/_components/link";
import ProductPurchase from "@/app/_components/productPurchase";
import { shuffleArray } from "@/app/_utils/shuffleArray";
import { getLoggedUser } from "@/actions/authActions";
import { cookies } from "next/headers";

type ProductDetailPageprops = {
  params: Promise<{
    id: string
  }>;
};

export async function generateMetadata(
  { params }: ProductDetailPageprops
): Promise<Metadata> {

  const id = (await params).id;
  const product = await getProduct(id);

  return {
    title:       product?.name ?? "Product",
    description: product?.description ?? "Delicioso como todos nuestros productos"
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageprops) {
  const { id } = await params;

  const products = await getProducts();
  const product = products.find(product => product.id === id);
  const shuffleredProducts = shuffleArray(products.filter(_product => (_product.category === product?.category) && product?.id !== _product.id)).slice(0, 4);

  const user = await getLoggedUser();

  const cookieStore = await cookies();
  const prevPath = cookieStore.get("actualPrevPath")?.value || "None";

  return (
    <Container className="!py-12">
      <ProductPurchase
        product={product as Product}
        user={JSON.stringify(user)}
        fromProductsPage={prevPath === PRODUCTS_PATH}
      />
      <section className="mt-12">
        <Headline
          as="h3"
          className="!mb-0"
        >
          Productos similares
        </Headline>
        <Carousel
          items={shuffleredProducts}
          className="!pt-0"
        />
      </section>
      <div className="grid place-items-center">
        <Link
          href={PRODUCTS_PATH}
          asButton
        >VOLVER A LOS PRODUCTOS
        </Link>
      </div>
    </Container>
  );
}