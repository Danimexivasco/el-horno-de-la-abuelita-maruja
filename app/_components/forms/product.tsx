"use client";

import { LogoIcon, TrashIcon } from "@/app/_icons";
import {
  deleteProduct as _deleteProduct,
  createProduct,
  updateProduct
} from "@/app/_libs/firebase/products";
import { generateId } from "@/app/_utils/generateId";
import { getDiscountPrice } from "@/app/_utils/getDiscountPrice";
import Button from "@/components/button";
import FormField, { FormFieldProps } from "@/components/forms/formField";
import { ADMIN_PRODUCTS_PATH } from "@/routes";
import { Input as InputType, Product, Select as SelectType } from "@/types";
import { combine } from "@/utils/combineClassnames";
import { showMsg } from "@/utils/showMsg";
import { uploadImage } from "@/utils/uploadImage";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Headline from "../headline";
import { removeZeroValue } from "../input";
import Spinner from "../spinner";
import ProductVariantField from "./productVariantFields";

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
    offerType: initialState.offerType !== "" ? initialState.offerType : "percentage",
    variants:  initialState.variants?.map(variant => {
      if (variant.offerData.onOffer === "no" && variant.offerData.offerType === "") {
        return {
          ...variant,
          offerData: {
            ...variant.offerData,
            offerType: "percentage"
          }
        };
      }
      return variant;
    })
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

  useEffect(() => {
    if (formData.multiPrice === "yes" && formData.variants?.length === 0) {
      handleAddSize();
    }
  }, [formData.multiPrice]);

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

  const removeImage = () => {
    (document.querySelector("input[name=image]") as HTMLInputElement).value = "";
    setFormData({
      ...formData,
      image: ""
    });
  };

  const handleVariantChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, name, value, dataset } = e.target;
    setFormData({
      ...formData,
      variants: formData.variants?.map((variant) => {
        if (variant.id === id) {
          if (name === "name") {
            return {
              ...variant,
              name: value
            };
          } else if (name === "price") {
            return {
              ...variant,
              value: value === "" ? 0 : Number(value)
            };
          }
          return {
            ...variant,
            offerData: {
              ...variant.offerData,
              [dataset.name as string]: value
            }
          };
        }
        return variant;
      })
    });
  };

  const removeVariant = (id: string) => {
    setFormData({
      ...formData,
      variants: formData.variants?.filter((variant) => variant.id !== id)
    });
  };

  const handleAddSize = () => {
    if (formData.variants) {
      setFormData({
        ...formData,
        variants: [...formData.variants, {
          id:        generateId(),
          name:      "",
          value:     formData.price && formData.variants?.length === 0 ? Number(formData.price) : 0,
          offerData: {
            onOffer:            "no",
            offerType:          "percentage",
            discountPercentage: 0,
            multiplierAmount:   ""
          }
        }]
      });
    } else {
      setFormData({
        ...formData,
        variants: [{
          id:        generateId(),
          name:      "",
          value:     formData.price ? Number(formData.price) : 0,
          offerData: {
            onOffer:            "no",
            offerType:          "",
            discountPercentage: 0,
            multiplierAmount:   ""
          }
        }]
      });
    }
  };

  const handleProductData = (data: Product): Product => {
    let _data = data;
    if (_data?.onOffer === "no") {
      _data = {
        ...data,
        offerType:          "",
        discountPercentage: 0,
        multiplierAmount:   ""
      };
    }
    if (_data?.multiPrice === "no") {
      _data = {
        ..._data,
        variants: []
      };
    } else {
      _data = {
        ..._data,
        price:    0,
        variants: _data?.variants?.map((variant) => {
          if (variant.offerData?.onOffer === "no") {
            return {
              ...variant,
              offerData: {
                ...variant.offerData,
                offerType:          "",
                discountPercentage: 0,
                multiplierAmount:   ""
              }
            };
          }
          return variant;
        })
      };
    }
    return _data;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    try {
      const _formData = await handleProductData(formData);
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

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <Headline className="font-bold">{headline}</Headline>
        {formData.id &&
          <Button
            onClick={deleteProduct}
            withIcon
            isRed
          ><TrashIcon className="w-5 h-5"/> Eliminar
          </Button>
        }
      </div>
      <form
        onSubmit={handleSubmit}
        className={combine("grid lg:flex gap-12 max-w-7xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10", outterClassName)}
        encType="multipart/form-data"
      >
        <div className="flex flex-col flex-1">
          <div
            className={
              combine(
                "w-full md:min-h-96 max-h-96 lg:max-h-none aspect-square overflow-hidden flex items-center justify-center rounded-lg dark:bg-cake-100 bg-cake-900 transition-colors duration-100 ease-linear"
              )
            }
          >
            {renderImage(formData?.image as string)}
          </div>
          {formData?.image &&
            <p
              className="text-sm dark:text-red-500 text-red-600 dark:hover:text-red-600 hover:text-red-700 dark:active:text-red-900 active:text-red-800 cursor-pointer flex gap-1 w-fit mt-2"
              onClick={removeImage}
            ><TrashIcon className="w-5 h-5"/><span>Eliminar imagen</span>
            </p>
          }
          {!formData?.image &&
          <small className="block italic mt-2">*Esta será la imagen por defecto si no se selecciona otra</small>
          }
        </div>
        <div className={combine("grid flex-1 gap-8", fieldsContainerClassName)}>
          {inputs?.map((input: InputType | SelectType) =>
            <FormField
              key={input.name}
              type={input.type as FormFieldProps["type"]}
              value={formData[input.name as keyof typeof formData] as string | number}
              input={{
                ...input,
                onChange: handleChange
              }}
            />
          )}
          <FormField
            value={formData.multiPrice}
            input={{
              name:    "multiPrice",
              type:    "radio",
              label:   "Varios formatos disponibles",
              options: [
                {
                  value:   "yes",
                  label:   "Si",
                  checked: false
                },
                {
                  value:   "no",
                  label:   "No",
                  checked: true
                }
              ],
              onChange: handleChange
            }}
          />
          {formData.multiPrice === "yes" ? (
            <div className="grid gap-4 dark:bg-cake-600/40 bg-cake-600/40 p-6 rounded-md">
              <Button
                onClick={handleAddSize}
              >Añadir variante
              </Button>
              { formData?.variants && formData.variants.length > 0 &&
                formData.variants.map((variant, index) => (
                  <div
                    key={variant.id}
                    className="grid"
                  >
                    <Headline as="h3" className="!mb-2 mt-4">Variante {index + 1}</Headline>
                    <ProductVariantField
                      key={variant.id}
                      handleChange={handleVariantChange}
                      removeVariant={() => removeVariant(variant.id)}
                      {...variant}
                    />
                  </div>
                ))
              }
            </div>
          ) : (
            <>
              <FormField
                value={formData.price}
                input={{
                  name:        "price",
                  type:        "number",
                  label:       "Precio",
                  placeholder: "Inserta un precio para tu producto. Ejemplo: 9.99",
                  required:    true,
                  onChange:    handleChange
                }}
                onClick={removeZeroValue}
              />
              <FormField
                value={formData.onOffer}
                input={{
                  name:    "onOffer",
                  type:    "radio",
                  label:   "En oferta?",
                  options: [
                    {
                      value:   "yes",
                      label:   "Si",
                      checked: false
                    },
                    {
                      value:   "no",
                      label:   "No",
                      checked: true
                    }
                  ],
                  onChange: handleChange
                }}
              />
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
                    onClick={removeZeroValue}
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
            </>
          )}
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