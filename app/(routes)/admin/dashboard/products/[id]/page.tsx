import { Metadata } from "next";
import Headline from "@/app/_components/headline";
import { getProduct } from "@/app/_libs/firebase/products";
import Image from "next/image";
import Link from "@/app/_components/link";
import { ADMIN_PRODUCTS_PATH } from "@/routes";
import { BackIcon } from "@/app/_icons";

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
  const { name, description, category, price, image="", createdAt } = await getProduct(id);

  return (
    <>
      <Link
        href={ADMIN_PRODUCTS_PATH}
        className="mb-12 flex w-fit items-center gap-2 no-underline"
      >
        <BackIcon className="w-6 h-6"/> {"Volver a los productos"}
      </Link>
      {image &&
        <Image
          src={image}
          alt={name}
          width="500"
          height="500"
          quality={100}
          className="w-1/2 h-auto aspect-video object-cover rounded-lg mb-4"
        />
      }
      <Headline className="font-bold mb-8">{name}</Headline>
      <ul className="grid gap-4">
        {description &&
          <li>
            <p className="font-bold">Descripción:</p>
            <p>{description}</p>
          </li>
        }
        {category &&
          <li>
            <p className="font-bold">Categoría:</p>
            <p>{category}</p>
          </li>
        }
        {price &&
          <li>
            <p className="font-bold">Precio:</p>
            <p>{price} €</p>
          </li>
        }
      </ul>
      {/* <p>{createdAt}</p> */}
    </>
  );
}