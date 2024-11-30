"use client";

import { Input as InputType, Product, Select as SelectType } from "@/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { combine } from "@/utils/combineClassnames";
import { showMsg } from "@/utils/showMsg";
import { uploadImage } from "@/utils/uploadImage";
import Button from "@/components/button";
import FormField, { FormFieldProps } from "@/components/forms/formField";
import Image from "next/image";
import { LogoIcon } from "@/app/_icons";
import Spinner from "../spinner";

type FormProps = {
  inputs: (InputType | SelectType)[],
  initialState: Omit<Product, "id"| "createdAt">
  onSubmit: any
  redirectTo?: string
  submitBtnText: string
  outterClassName?: string
  fieldsContainerClassName?: string
  fullWidthBtn?: boolean
};

export default function NewProductForm({ inputs, initialState, onSubmit, redirectTo, submitBtnText="Submit", outterClassName="", fieldsContainerClassName="", fullWidthBtn = false }: FormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState(initialState ?? {});
  const [isPending, setIsPending] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);

  useEffect(() => {
    console.log("formData", formData);
  }, [formData]);

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

  const handleOffers = (data: Product) => {
    if (data.onOffer === "no") {
      return {
        ...data,
        offerType:          "",
        discountPercentage: "",
        "2x1Amount":        ""
      };
    }
    return data;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    try {
      const _formData = await handleOffers(formData);
      await onSubmit(_formData);
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
        alt="Product"
        width="500"
        height="500"
        quality={100}
        className="w-full h-full object-cover aspect-square"
      />;
    } else {
      return <LogoIcon className="w-1/4 h-auto opacity-60"/>;
    };
  };

  return (
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
            input={{
              ...input,
              onChange: handleChange
            }}
          />
        )}
        {formData?.onOffer === "yes" &&
          <FormField
            input={{
              name:    "offerType",
              type:    "radio",
              label:   "Tipo de Oferta",
              options: [
                {
                  value:   "percentage",
                  label:   "Porcentage",
                  checked: true
                },
                {
                  value:   "2x1",
                  label:   "2x1",
                  checked: false
                }
              ]
              ,
              onChange: handleChange
            }}
          />
        }
        {formData?.onOffer === "yes" && formData?.offerType === "percentage" && (
          <FormField
            input={{
              name:        "discountPercentage",
              type:        "number",
              label:       "Porcentaje de descuento",
              placeholder: "Inserta un porcentaje de descuento. Ejemplo: 15"
              ,
              onChange: handleChange
            }}
          />
        )
        }
        {formData?.onOffer === "yes" && formData?.offerType === "2x1" && (
          <FormField
            input={{
              name:        "2x1Amount",
              type:        "text",
              label:       "Tipo de descuento 2X1",
              //eslint-disable-next-line
              pattern:     "^\d[xX]\d$",
              placeholder: "Ejemplos válidos: 2x1, 3x2, 4x3, 5x4..."
              ,
              onChange: handleChange
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
  );
}