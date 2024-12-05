"use client";

import { LogoIcon } from "@/app/_icons";
import {
  createProduct,
  deleteProduct as _deleteProduct,
  updateProduct
} from "@/app/_libs/firebase/products";
import { getDiscountPrice } from "@/app/_utils/getDiscountPrice";
import Button from "@/components/button";
import FormField, { FormFieldProps } from "@/components/forms/formField";
import { Input as InputType, Product, Select as SelectType } from "@/types";
import { combine } from "@/utils/combineClassnames";
import { showMsg } from "@/utils/showMsg";
import { uploadImage } from "@/utils/uploadImage";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Spinner from "../spinner";
import Headline from "../headline";
import { ADMIN_PRODUCTS_PATH } from "@/routes";

type ProductFormProps = {
  headline: string
  inputs: (InputType | SelectType)[],
  initialState: Omit<Product, "createdAt">
  redirectTo?: string
  submitBtnText: string
  outterClassName?: string
  fieldsContainerClassName?: string
  fullWidthBtn?: boolean
};

export default function ProductForm({ headline, inputs, initialState, redirectTo, submitBtnText="Crear", outterClassName="", fieldsContainerClassName="", fullWidthBtn = false }: ProductFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<Omit<Product, "createdAt">>({
    ...initialState,
    offerType: initialState.offerType !== "" ? initialState.offerType : "percentage"
  });

  const [isPending, setIsPending] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      setLoadingImage(true);
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const url = await uploadImage(file as File);
        setFormData({
          ...formData,
          [e.target.name]: url
        });
      }
      return setLoadingImage(false);
    }
    return setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleOffers = (data: Product): Product => {
    if (data.onOffer === "no") {
      return {
        ...data,
        offerType:          "",
        discountPercentage: 0,
        multiplierAmount:   ""
      };
    }
    return data;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    try {
      const _formData = await handleOffers(formData);
      if (_formData.id) {
        await updateProduct(_formData.id, _formData);
      } else {
        await createProduct({
          ..._formData,
          createdAt: new Date()
        });
      }
      if (redirectTo) {
        router.push(redirectTo);
      }
    } catch (error) {
      setIsPending(false);
      showMsg(`Error: ${error}`, "error");
    }
  };

  const renderImage = (image?: string) => {
    if (loadingImage) return <Spinner />;
    if (image) {
      return <Image
        src={image as string}
        alt="Product-image"
        width="500"
        height="500"
        quality={100}
        className="w-full h-full object-cover aspect-square"
      />;
    } else {
      return <LogoIcon className="w-1/4 h-auto opacity-60"/>;
    };
  };

  const deleteProduct = async () => {
    try {
      await _deleteProduct(formData.id);
      router.push(ADMIN_PRODUCTS_PATH);
    } catch (error) {
      showMsg(`Error: ${error}`, "error");
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <Headline className="font-bold">{headline}</Headline>
        {formData.id &&
          <Button
            onClick={deleteProduct}
            className="dark:bg-red-500 bg-red-600 dark:hover:bg-red-600 hover:bg-red-700"
          >Eliminar
          </Button>
        }
      </div>
      <form
        onSubmit={handleSubmit}
        className={combine("grid gap-12 max-w-7xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10", outterClassName)}
        encType="multipart/form-data"
      >
        <div className="w-1/2">
          <div
            className={
              combine(
                "w-full h-3/4 min-h-96 max-h-3/4 aspect-square overflow-hidden flex items-center justify-center rounded-lg dark:bg-cake-100 bg-cake-900 transition-colors duration-100 ease-linear"
              )
            }
          >
            {renderImage(formData?.image as string)}
          </div>
          {!formData?.image &&
          <small className="block italic mt-2">*Esta será la imagen por defecto si no se selecciona otra</small>
          }
        </div>
        <div className={combine("grid gap-4", fieldsContainerClassName)}>
          {inputs?.map((input: InputType | SelectType) =>
            <FormField
              key={input.name}
              type={input.type as FormFieldProps["type"]}
              value={formData[input.name as keyof typeof formData]}
              input={{
                ...input,
                onChange: handleChange
              }}
            />
          )}
          {formData?.onOffer === "yes" &&
          <FormField
            value={formData.offerType}
            input={{
              name:    "offerType",
              type:    "radio",
              label:   "Tipo de Oferta",
              options: [
                {
                  value:   "percentage",
                  label:   "Porcentage",
                  checked: formData.offerType ==="percentage" || true
                },
                {
                  value:   "multiplier",
                  label:   "2x1",
                  checked: formData.offerType ==="multiplier" || false
                }
              ]
              ,
              onChange: handleChange
            }}
          />
          }
          {formData?.onOffer === "yes" && formData?.offerType === "percentage" && (
            <div>
              <FormField
                value={formData.discountPercentage}
                input={{
                  name:        "discountPercentage",
                  type:        "number",
                  label:       "Porcentaje de descuento",
                  required:    formData?.onOffer === "yes",
                  placeholder: "Inserta un porcentaje de descuento. Ejemplo: 15",
                  onChange:    handleChange
                }}
              />
              <small className="block italic mt-2">El precio final sería {getDiscountPrice(formData.price, formData?.discountPercentage ?? 0)} €</small>
            </div>
          )
          }
          {formData?.onOffer === "yes" && formData?.offerType === "multiplier" && (
            <FormField
              value= {formData.multiplierAmount}
              input={{
                name:        "multiplierAmount",
                type:        "text",
                label:       "Tipo de descuento 2X1",
                required:    formData?.onOffer === "yes",
                placeholder: "Ejemplos válidos: 2x1, 3x2, 4x3, 5x4...",
                onChange:    handleChange,
                //eslint-disable-next-line
              pattern:     "^\\d[xX]\\d$",
              }}
            />
          )
          }
          <Button
            type="submit"
            className={combine("mt-4", fullWidthBtn && "w-full")}
            disabled={isPending}
          >
            {isPending ? "Please wait..." : submitBtnText}
          </Button>
        </div>
      </form>
    </>
  );
}