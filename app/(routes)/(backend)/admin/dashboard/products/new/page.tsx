"use client";

import ProductForm from "@/app/_components/forms/product";
import Link from "@/app/_components/link";
import { BackIcon } from "@/app/_icons";
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
      <ProductForm
        headline="Nuevo Producto"
        inputs={NEW_PRODUCT_FORM_INPUTS}
        submitBtnText="Crear Producto"
        redirectTo={ADMIN_PRODUCTS_PATH}
        initialState={NEW_PRODUCT_FORM_INITIAL_STATE}
      />
    </>
  );
}