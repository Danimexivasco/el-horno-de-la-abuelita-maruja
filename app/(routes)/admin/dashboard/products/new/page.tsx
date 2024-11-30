"use client";

import NewProductForm from "@/app/_components/forms/newProduct";
import Link from "@/app/_components/link";
import { BackIcon } from "@/app/_icons";
import { createProduct } from "@/app/_libs/firebase/products";
import Headline from "@/components/headline";
import {
  NEW_PRODUCT_FORM_INITIAL_STATE,
  NEW_PRODUCT_FORM_INPUTS
} from "@/constants";
import { ADMIN_PRODUCTS_PATH } from "@/routes";

export default function NewProduct() {
  return (
    <>
      <Link
        href={ADMIN_PRODUCTS_PATH}
        className="mb-10 flex w-fit items-center gap-2 no-underline"
      >
        <BackIcon className="w-6 h-6"/> {"Volver a los productos"}
      </Link>
      <Headline className="font-bold mb-8">Nuevo Producto</Headline>
      <NewProductForm
        inputs={NEW_PRODUCT_FORM_INPUTS}
        onSubmit={createProduct}
        submitBtnText="Crear Producto"
        redirectTo={ADMIN_PRODUCTS_PATH}
        initialState={NEW_PRODUCT_FORM_INITIAL_STATE}
        outterClassName="!flex"
        fieldsContainerClassName="w-1/2 gap-8"
      />
    </>
  );
}