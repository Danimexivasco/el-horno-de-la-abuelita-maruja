import ProductForm from "@/app/_components/forms/product";
import Link from "@/app/_components/link";
import { BackIcon } from "@/app/_icons";
import { getProduct } from "@/app/_libs/firebase/products";
import { NEW_PRODUCT_FORM_INPUTS } from "@/constants";
import { ADMIN_PRODUCTS_PATH } from "@/routes";
import { Metadata } from "next";

type ProductDetailProps = {
  params: {
    id: string
  }
};

export async function generateMetadata(
  { params }: ProductDetailProps
): Promise<Metadata> {

  const id = (await params).id;
  const product = await getProduct(id);

  return {
    title:       product?.name ?? "Product",
    description: product?.description ?? "Delicioso como todos nuestros productos"
  };
}

export default async function ProductDetail({ params }: ProductDetailProps) {

  const { id } = await params;
  const { name, description, category, price, image="", onOffer, offerType, discountPercentage, multiplierAmount, new: isNew } = await getProduct(id);

  return (
    <>
      <Link
        href={ADMIN_PRODUCTS_PATH}
        className="mb-10 flex w-fit items-center gap-2 no-underline"
      >
        <BackIcon className="w-6 h-6"/> {"Volver a los productos"}
      </Link>
      <ProductForm
        headline={name ?? "Editar producto"}
        inputs={NEW_PRODUCT_FORM_INPUTS}
        submitBtnText="Guardar Cambios"
        redirectTo={ADMIN_PRODUCTS_PATH}
        initialState={{
          id,
          name:               name,
          description:        description,
          category:           category,
          image:              image,
          // sizes?: Record<string, number>[] // Array of type: [{tamaño: "grande", precio: 14}]
          price:              price, // Maybe we need to remove it and pass to sizes
          onOffer:            onOffer,
          offerType:          offerType,
          discountPercentage: discountPercentage,
          multiplierAmount:   multiplierAmount,
          new:                isNew
        }}
        outterClassName="!flex"
        fieldsContainerClassName="w-1/2 gap-8"
      />
    </>
  );
}