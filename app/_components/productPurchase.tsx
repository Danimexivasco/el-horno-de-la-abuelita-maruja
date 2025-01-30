"use client";

import { Allergens, Product, ProductVariant, User } from "@/types";
import Headline from "./headline";
import { formatNumber } from "../_utils/formatNumber";
import Button from "./button";
import { useEffect, useState } from "react";
import Input from "./input";
import { MAXIMUM_PRODUCTS_PURCHASE } from "@/constants";
import {
  EggsIcon,
  GlutenIcon,
  LogoIcon,
  MilkIcon,
  NutsIcon,
  PeanutsIcon,
  SesameIcon,
  SoyIcon
} from "../_icons";
import Image from "next/image";
import Rating from "./rating";
import Select from "./select";
import Link from "./link";
import Tooltip from "./tooltip";
import { getLoggedUser } from "@/actions/authActions";
import TextArea from "./textarea";
import { updateProduct } from "../_libs/firebase/products";
import { generateId } from "../_utils/generateId";
import { getAverage } from "../_utils/getAverage";

type ProductPruchaseProps = {
    product: Product
};

export const ALLERGENS_MAPPED_ICONS = {
  "gluten":       <GlutenIcon className="peer w-12 h-12" />,
  "lactosa":      <MilkIcon className="peer w-12 h-12" />,
  "frutos secos": <NutsIcon className="peer w-12 h-12" />,
  "cacahuetes":   <PeanutsIcon className="peer w-12 h-12" />,
  "huevo":        <EggsIcon className="peer w-12 h-12" />,
  "soja":         <SoyIcon className="peer w-12 h-12" />,
  "sésamo":       <SesameIcon className="peer w-12 h-12" />
};

export default function ProductPurchase({ product }: ProductPruchaseProps) {
  const [userRating, setUserRating] = useState<null | number>(null);
  const [quantity, setQuantity] = useState(1);
  const [variant, setVariant] = useState(product.variants?.[0] ?? null);
  const [reviewComment, setReviewComment] = useState("");
  const [user, setUser] = useState<User | null>(null);

  const { name, description, image, multiPrice, price, variants, onOffer, offerType, discountPercentage, multiplierAmount, allergens, new: isNew, reviews } = product;

  useEffect(() => {
    const getUser = async () => {
      const user = await getLoggedUser(true);
      if (user && typeof user === "string") {
        setUser(JSON.parse(user));
      }
    };
    getUser();
  }, []);

  const handleReview = async () => {
    try {
      await updateProduct(product.id, {
        ...product,
        reviews: [...(product.reviews ?? []), {
          id:       generateId(),
          rating:   userRating,
          reviewer: {
            id:       user?.id ?? "",
            username: user?.email ?? "Usuario anónimo" // TODO: add username and not use email
          },
          ...(variant && {
            variant
          }),
          comment:   reviewComment,
          createdAt: product.createdAt ?? Date.now()
        }]
      });
    } catch {
      throw new Error("Algo fue mal añadiendo la opinión. Inténtalo de nuevo en unos minutos");
    }
  };

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
              {discountPercentage && formatNumber(price - (price * discountPercentage) / 100)}
            </Headline>
            <span className="italic text-2xl text-cake-500 font-extrabold">
              -{discountPercentage && formatNumber(discountPercentage, "percent")}
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
              {variant?.offerData?.discountPercentage && formatNumber(
                variant?.value - (variant?.value * variant?.offerData?.discountPercentage) / 100
              )}
            </Headline>
            <span className="italic text-2xl text-cake-500 font-extrabold">
              -{variant?.offerData?.discountPercentage && formatNumber(variant?.offerData?.discountPercentage, "percent")}
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
            {reviews && reviews.length > 0 ? (
              <div className="flex items-center gap-4">
                <Rating rating={getAverage(reviews)}/>
                <Link href="#opiniones">Ver opiniones</Link>
              </div>

            ) : null}
          </div>
          <div className="flex justify-between lg:justify-start gap-4 lg:gap-20">
            {multiPrice === "yes" && variants && variants.length > 0 &&
              <Select
                name="variant"
                label="Opciones"
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
              <div className="flex gap-2">
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
            <Button
              type="submit"
              className="!w-full lg:!w-fit"
            >Añadir al carrito
            </Button>
            <Button
              type="submit"
              className="!w-full lg:!w-fit"
            >Comprar
            </Button>
          </div>
        </form>
      </div>
      <div className="grid gap-12">
        <section>
          <Headline as="h3">
            Sobre el producto
          </Headline>
          <p className="mb-4">{description}</p>
          {allergens && allergens?.length > 0 ?
            <>
              <Headline
                as="h4"
                className="!mb-2"
              >
                Alérgenos:
              </Headline>
              <ul className="flex flex-wrap gap-6 lg:gap-2">
                {allergens?.map((allergen: Allergens) => {
                  return (
                    <li
                      key={allergen}
                      className="relative"
                    >
                      <div className="peer grid place-items-center dark:text-cake-400 text-cake-500">
                        {ALLERGENS_MAPPED_ICONS[allergen]}
                        <p className="block lg:hidden capitalize text-black">{allergen}</p>
                      </div>
                      <Tooltip
                        text={allergen}
                        position="top"
                        className="capitalize"
                      />
                    </li>
                  );
                })}
              </ul>
            </>
            : null
          }
        </section>
        <section
          id="opiniones"
          className="scroll-mt-4"
        >
          <Headline
            as="h3"
          >
            Opiniones
          </Headline>
          {user ? (
            <div className="grid gap-3">
              {reviews && reviews?.length > 0? (
                <p>Añade tu opinión</p>
              ) : (
                <p>Todavía no hay opiniones, sé el primero en opinar</p>
              )}
              <Rating
                rating={userRating ?? 0}
                setRating={setUserRating}
              />
              <TextArea
                name="reviewComment"
                value={reviewComment}
                placeholder="Que te ha parecido? Danos tu opinión para que podamos seguir mejorando 😊"
                className="lg:w-2/3 min-h-52 lg:min-h-40"
                onChange={(e) => setReviewComment(e.target.value)}
              />
              <Button onClick={handleReview}>Enviar</Button>
            </div>
          ) : null}
          {reviews && reviews?.length > 0 ? (
            <div className="mt-8 grid gap-8">
              {reviews.map(review => {
                const { id, reviewer, variant, rating, comment, createdAt } = review;

                return (
                  <div
                    key={id}
                    className="grid gap-4 py-4 px-8 bg-cake-200/90 dark:bg-cake-700 p-4 rounded-3xl"
                  >
                    <div className="flex justify-between items-center">
                      <div className="grid lg:flex items-center gap-4">
                        <div className="flex items-center gap-4 mr-8">
                          <div className="rounded-full bg-cake-500 w-12 h-12 flex items-center justify-center">FOTO</div>
                          <div className="grid gap-1">
                            <p>{reviewer?.username}</p>
                            <small className="italic">{new Date(createdAt).toLocaleDateString()}</small>
                          </div>
                          {variant && <p>Variante: {variant}</p>}
                        </div>
                        <Rating rating={rating}/>
                      </div>
                    </div>
                    {comment && <p className="pl-14">{comment}</p>}
                  </div>
                );
              })}
            </div>
          ) : null}
        </section>
      </div>
    </>

  );
}