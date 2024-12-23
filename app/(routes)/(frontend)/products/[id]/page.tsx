import { getProduct } from "@/app/_libs/firebase/products";
import { Metadata } from "next";

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
  const product = await getProduct(id);

  return (
    <h1>{product.name}</h1>
  );
}