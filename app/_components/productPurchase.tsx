"use client";

import { Allergens, Product, ProductVariant } from "@/types";
import Headline from "./headline";
import { formatNumber } from "../_utils/formatNumber";
import Button from "./button";
import { useState } from "react";
import Input from "./input";
import { MAXIMUM_PRODUCTS_PURCHASE } from "@/constants";
import { LogoIcon } from "../_icons";
import Image from "next/image";
import Rating from "./rating";
import Select from "./select";
import Link from "./link";

type ProductPruchaseProps = {
    product: Product

};
export default function ProductPurchase({ product }: ProductPruchaseProps) {
  const [rating, setRating] = useState(4);
  const [quantity, setQuantity] = useState(1);
  const [variant, setVariant] = useState(product.variants?.[0] ?? null);
  const { name, description, category, image, multiPrice, price, variants, onOffer, offerType, discountPercentage, multiplierAmount, allergens, new: isNew } = product;

  const renderPricing = () => {
    if ((multiPrice !== "yes" || !multiPrice) && onOffer !== "yes") {
      return (
        <Headline
          as="h2"
          className="!mb-0"
        >
          {formatNumber(price)}
        </Headline>
      );
    }

    if ((multiPrice !== "yes" || !multiPrice) && onOffer === "yes" && offerType === "percentage") {
      return (
        <>
          <div className="flex gap-4 items-center">
            <Headline
              as="h2"
              className="!mb-0"
            >
              {formatNumber(price - (price * discountPercentage) / 100)}
            </Headline>
            <span className="italic text-2xl text-cake-500 font-extrabold">
              -{formatNumber(discountPercentage, "percent")}
            </span>
          </div>
          <p className="block mt-1 dark:text-red-400 text-red-500 transition-colors line-through">
            Antes: <span className="line-through">{formatNumber(price ?? 0)}</span>
          </p>
        </>
      );
    }
    if (multiPrice !== "yes" && onOffer === "yes" && offerType === "multiplier") {
      const [before, after] = multiplierAmount?.split("x") ?? [];
      const multiplier = Number(after) / Number(before);
      return (
        <>
          <div className="flex gap-4 items-center">
            <Headline
              as="h2"
              className="!mb-0"
            >
              {formatNumber(price)}
            </Headline>
            <span className="italic text-2xl text-cake-500 font-extrabold">
              {multiplierAmount}
            </span>
          </div>
          <p className="text-sm block mt-1">
            Llevándote {multiplierAmount?.split("x")[0]}, la unidad te sale a {formatNumber(price * multiplier)}
          </p>
        </>
      );
    }

    if (multiPrice === "yes" && variants && variants.length > 0 && variant?.offerData?.onOffer !== "yes") {
      return (
        <Headline
          as="h2"
          className="!mb-0"
        >
          {formatNumber(variant?.value ?? 0)}
        </Headline>
      );
    }

    if (multiPrice === "yes" && variant?.offerData?.onOffer === "yes" && variant?.offerData?.offerType === "percentage") {
      return (
        <>
          <div className="flex gap-4 items-center">
            <Headline
              as="h2"
              className="!mb-0"
            >
              {formatNumber(
                variant?.value - (variant?.value * variant?.offerData?.discountPercentage) / 100
              )}
            </Headline>
            <span className="italic text-2xl text-cake-500 font-extrabold">
              -{formatNumber(variant?.offerData?.discountPercentage, "percent")}
            </span>
          </div>
          <p className="block mt-1 dark:text-red-400 text-red-500 transition-colors">
            Antes: <span className="line-through">{formatNumber(variant?.value ?? 0)}</span>
          </p>
        </>
      );
    }
    if (multiPrice === "yes" && variant?.offerData?.onOffer === "yes" && variant?.offerData?.offerType === "multiplier") {
      const [before, after] = variant?.offerData?.multiplierAmount?.split("x") ?? [];
      const multiplier = Number(after) / Number(before);
      return (
        <>
          <div className="flex gap-4 items-center">
            <Headline
              as="h2"
              className="!mb-0"
            >
              {formatNumber(variant.value)}
            </Headline>
            <span className="italic text-2xl text-cake-500 font-extrabold">
              {variant?.offerData?.multiplierAmount}
            </span>
          </div>
          <p className="text-sm block mt-1">
            Llevándote {variant?.offerData?.multiplierAmount?.split("x")[0]}, la unidad te sale a {formatNumber(variant.value * multiplier)}
          </p>
        </>
      );
    }

    return null;
  };

  return (
    <>
      <div className="grid md:grid-cols-2 gap-12 md:gap-24 mb-24">
        {image ?
          <Image
            src={image}
            alt={name}
            width={600}
            height={600}
            quality={100}
            className="rounded-lg aspect-square object-cover shadow-md shadow-black/30"
          />
          :
          <div
            className={
              "w-full aspect-square overflow-hidden rounded-lg flex items-center justify-center dark:bg-cake-100 bg-cake-900 transition-colors duration-100 ease-linear"
            }
          >
            <LogoIcon className="w-1/4 h-auto opacity-60"/>
          </div>
        }
        <form onSubmit={(e) => e.preventDefault()}>
          {isNew ? <p className="text-2xl text-cake-500 font-extrabold">¡Nuevo!</p> : null}
          <Headline>{name}</Headline>
          <div className="grid gap-3 mb-8">
            <div>
              {renderPricing()}
            </div>
            <div className="flex items-center gap-4">
              <Rating rating={rating}/>
              <Link href="#opiniones">Ver opiniones</Link>
            </div>
          </div>
          <div className="grid gap-4">
            {multiPrice === "yes" && variants && variants.length > 0 &&
              <Select
                name="variant"
                label="Opciones de compra"
                value={variant?.name ?? ""}
                onChange={(e) => {
                  setVariant(variants.find(variant => variant.name === e.target.value) as ProductVariant);
                }}
                options={variants.map(variant => {
                  return {
                    label: variant.name,
                    value: variant.name
                  };
                })}
              />
            }
            <div>
              <p className="mb-2">Cantidad</p>
              <div className="flex gap-4">
                <Button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >-
                </Button>
                <Input
                  name="quantity"
                  value={Number(quantity).toString()}
                  type="number"
                  step={1}
                  max={MAXIMUM_PRODUCTS_PURCHASE}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="text-center !w-fit"
                />
                <Button
                  type="button"
                  onClick={() => setQuantity(Math.min(quantity + 1, MAXIMUM_PRODUCTS_PURCHASE))}
                >+
                </Button>
              </div>
            </div>
          </div>

          <div className="grid gap-4 mt-8">
            <Button type="submit">Añadir al carrito</Button>
            <Button type="submit">Comprar</Button>
          </div>
        </form>
      </div>
      <div>
        <Headline as="h3">
          Sobre el producto
        </Headline>
        <p>{description}</p>
        {allergens && allergens?.length > 0 ?
          <>
            <Headline as="h4">
              Lista de alérgenos:
            </Headline>
            <ul className="flex gap-4">
              {allergens?.map((allergen: Allergens) => {
                return (
                  <p key={allergen}>{allergen}</p>
                );
              })}
            </ul>
          </>
          : null
        }
        <section
          id="opiniones"
          className="scroll-mt-4"
        >
          <Headline
            as="h3"
          >
            Opiniones
          </Headline>

        </section>
        TODO: Añadir funcionalidad de opiniones

      </div>
    </>

  );
}