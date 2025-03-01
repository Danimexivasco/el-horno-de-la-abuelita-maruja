"use client";

import {
  Allergens,
  Cart,
  OfferTypes,
  Product,
  ProductVariant,
  Review
} from "@/types";
import Headline from "./headline";
import { formatNumber } from "../_utils/formatNumber";
import Button from "./button";
import { useEffect, useState } from "react";
import {
  EggsIcon,
  GlutenIcon,
  LogoIcon,
  MilkIcon,
  NutsIcon,
  PeanutsIcon,
  RightArrowIcon,
  SesameIcon,
  SoyIcon
} from "../_icons";
import Image from "next/image";
import Rating from "./rating";
import Select from "./select";
import Link from "./link";
import Tooltip from "./tooltip";
import TextArea from "./textarea";
import { updateProduct } from "../_libs/firebase/products";
import { generateId } from "../_utils/generateId";
import { getAverage } from "../_utils/getAverage";
import { useRouter, useSearchParams } from "next/navigation";
import { PRODUCTS_PATH, SIGN_IN_PATH } from "@/routes";
import { combine } from "../_utils/combineClassnames";
import ReactMarkdown from "react-markdown";
import { showMsg } from "../_utils/showMsg";
import { useLocalStorage, useSessionStorage } from "usehooks-ts";
import { getPrices } from "../_utils/getPrices";
import { updateUser } from "../_libs/firebase/users";
import Counter from "./counter";

type ProductPruchaseProps = {
    product: Product
    user: string
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

export default function ProductPurchase({ product, user }: ProductPruchaseProps) {
  const searchParams = useSearchParams();
  const [userRating, setUserRating] = useState<null | number>(null);
  const [quantity, setQuantity] = useState(1);
  const [variant, setVariant] = useState<ProductVariant | null>(product.variants?.[0] ?? null);
  const [reviewComment, setReviewComment] = useState("");
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [linkWithPrevSearch, setLinkWithPrevSearch] = useState("");
  const router = useRouter();
  // eslint-disable-next-line
  const [_items, setItems] = useLocalStorage<Cart>("cart", []);
  // eslint-disable-next-line
  const [activeSearchStorage, _setActiveSearchStorage, removeActiveFiltersStorage] = useSessionStorage("active-search", "");

  useEffect(() => {
    const fromProductQuarySearch = searchParams.get("ws");
    if (fromProductQuarySearch && activeSearchStorage) {
      setLinkWithPrevSearch(`${PRODUCTS_PATH}?search=${activeSearchStorage}`);
    }
    removeActiveFiltersStorage();
  }, []);

  useEffect(() => {
    if (searchParams.get("var")) {
      const targetVariant = product.variants?.find((variant) => variant.name === searchParams.get("var"));
      if (targetVariant) {
        setVariant(targetVariant);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    if (variant) {
      const currentParams = new URLSearchParams(searchParams.toString());
      currentParams.set("var", variant.name);

      window.history.pushState(null, "", `?${currentParams.toString()}`);
    }

  }, [variant]);

  const parsedUser = JSON.parse(user);

  const { name, description, image, multiPrice, price, variants, onOffer, offerType, discountPercentage, multiplierAmount, allergens, new: isNew, reviews } = product;

  const handleReview = async () => {
    try {
      if(editingReview) {
        await updateProduct(product.id, {
          ...product,
          reviews: reviews?.map(review => {
            if (review.id === editingReview.id) {
              return {
                ...review,
                rating:  userRating,
                comment: reviewComment
              };
            }
            return review;
          })
        }, "updateReview");

        setEditingReview(null);
        setUserRating(null);
        setReviewComment("");

        router.refresh();

        return;
      }
      await updateProduct(product.id, {
        ...product,
        reviews: [...(product.reviews ?? []), {
          id:       generateId(),
          rating:   userRating,
          reviewer: {
            id:       parsedUser?.id ?? "",
            username: parsedUser?.username ?? "Usuario anónimo",
            ...(parsedUser?.photoURL && {
              photoURL: parsedUser.photoURL
            })
          },
          ...(variant && {
            variant: variant.name
          }),
          comment:   reviewComment,
          createdAt: product.createdAt ?? Date.now()
        }]
      }, "createReview");

      setUserRating(null);
      setReviewComment("");

      router.refresh();
    } catch {
      showMsg("Algo fue mal añadiendo la opinión. Inténtalo de nuevo en unos minutos", "error");
      throw new Error("Algo fue mal añadiendo la opinión. Inténtalo de nuevo en unos minutos");
    }
  };

  const handleEditingReview = (review: Review) => () => {
    setEditingReview(review);
    setReviewComment(review.comment);
    setUserRating(review.rating);
  };

  const handleDeleteReview = (id: Review["id"]) => async () => {
    try {
      await updateProduct(product.id, {
        ...product,
        reviews: product.reviews?.filter(review => review.id !== id)
      }, "deleteReview");

      router.refresh();
    } catch {
      showMsg("Algo fue mal eliminando la opinión. Inténtalo de nuevo en unos minutos", "error");
      throw new Error("Algo fue mal eliminando la opinión. Inténtalo de nuevo en unos minutos");
    }
  };

  const handleAddToCart = async () => {
    try {
      const { base, offer, discount } = getPrices(product, quantity, variant);

      setItems(prevItems => {
        let updatedCart = prevItems ?? [];

        if (prevItems?.some(item => item.id === product.id || item.id === variant?.id)) {
          updatedCart = updatedCart.map(item => {

            if (item.id === product.id || item.id === variant?.id) {
              return {
                ...item,
                quantity: item.quantity + quantity
              };
            }

            return item;
          });
        } else {
          updatedCart = [...updatedCart, {
            id:      variant?.id ?? product.id,
            quantity,
            variant: variant?.name ?? null,
            price:   {
              base: base ?? 0,
              ...(offer && {
                offer: offer
              }),
              ...(discount && {
                discount: {
                  type:  discount.type as OfferTypes,
                  label: discount.label
                }
              })
            },
            product: product,
            addedAt: Date.now()
          }];
        }

        if (parsedUser) {
          updateUser(parsedUser?.id ?? "", {
            ...parsedUser,
            cart: updatedCart
          }, false);
        }

        return updatedCart;
      });

      showMsg("Producto agregado a la cesta", "success");
    } catch {
      showMsg("Algo ha ido mal", "error");
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
      {linkWithPrevSearch ?
        <Link
          href={linkWithPrevSearch}
          className="flex gap-2 items-center no-underline mb-12 w-fit"
        >
          <RightArrowIcon className="w-4 h-4 rotate-180"/> Volver a los productos
        </Link>
        :
        <Link
          href={PRODUCTS_PATH}
          className="flex gap-2 items-center no-underline mb-12 w-fit"
        >
          <RightArrowIcon className="w-4 h-4 rotate-180"/> Volver a los productos
        </Link>
      }
      <div className="grid md:grid-cols-2 gap-12 md:gap-24 mb-16 lg:mb-24">
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
                <Link href="#opiniones">{reviews.length === 1 ? "Ver 1 opinión" : `Ver ${reviews.length} opiniones`}</Link>
              </div>

            ) : null}
          </div>
          <div className="flex flex-wrap justify-between lg:justify-start gap-4 lg:gap-20">
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
              <Counter
                value={quantity}
                setValue={setQuantity}
              />
            </div>
          </div>

          <Button
            type="button"
            onClick={handleAddToCart}
            className="!w-full lg:!w-fit mt-12"
          >Añadir a la cesta
          </Button>
        </form>
      </div>
      <div className="grid gap-12">
        <section>
          <Headline as="h3">
            Sobre el producto
          </Headline>
          <ReactMarkdown className="mb-4 prose-base">{description}</ReactMarkdown>
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
          className="scroll-mt-20 lg:scroll-mt-40 lg:w-1/2"
        >
          <Headline
            as="h3"
          >
            Opiniones
          </Headline>
          {(parsedUser && !reviews?.find(review => review.reviewer?.id === parsedUser?.id) || editingReview) ? (
            <div className="grid gap-3">
              {reviews && reviews?.length > 0 ? (
                <p>Comparte tu opinión con otros clientes</p>
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
                className="h-52"
                onChange={(e) => setReviewComment(e.target.value)}
              />
              <div className="mt-1 grid lg:flex items-center gap-4">
                <Button
                  onClick={handleReview}
                  className="w-full lg:w-fit"
                > {editingReview ? "Actualizar" : "Enviar"}
                </Button>
                <p>Puedes usar <Link
                  external
                  href="https://www.markdownguide.org/cheat-sheet/"
                >Markdown
                </Link> para darle formato al mensaje
                </p>
              </div>
            </div>
          ) : null}
          {reviews && reviews?.length > 0 ? (
            <div className="mt-8 grid gap-8">
              {reviews.sort((a, b) => b.createdAt - a.createdAt).map(review => {
                const { id, reviewer, variant, rating, comment, createdAt } = review;

                return (
                  <div
                    key={id}
                    className={combine("grid gap-4 py-4 px-8 bg-cake-200/90 dark:bg-cake-700 p-4 rounded-3xl", editingReview?.id === id && "opacity-50")}
                  >
                    <div className="flex justify-between items-center">
                      <div className="grid lg:flex items-center gap-4">
                        <div className="flex flex-wrap gap-4 mr-8">
                          {reviewer?.photoURL ? (
                            <Image
                              src={reviewer.photoURL}
                              alt={"reviewer-profile-image"}
                              width={48}
                              height={48}
                              className="rounded-full w-12 h-12"
                            />
                          ) : (
                            <div className="rounded-full bg-cake-400 w-12 h-12 flex items-center justify-center">
                              <LogoIcon className="w-8 h-8"/>
                            </div>
                          )}
                          <div className="grid gap-1">
                            <strong>{reviewer?.username}</strong>
                            <small className="italic">{new Date(createdAt).toLocaleDateString()}</small>
                            {variant && <p>Opción: <i>{variant}</i></p>}
                          </div>
                          <Rating
                            rating={rating}
                            size="small"
                            className="-mt-1"
                          />
                        </div>
                      </div>
                    </div>
                    {comment &&
                    <ReactMarkdown
                      className="prose-base"
                      disallowedElements={["a"]}
                    >{comment}
                    </ReactMarkdown>}
                    <div className="flex items-center gap-4 ml-auto text-sm mt-2 lg:mt-0 w-full lg:w-fit">
                      {reviewer.id === parsedUser?.id &&
                      <Button
                        onClick={handleEditingReview(review)}
                        className="w-full lg:w-fit text-sm"
                      >Editar opinión
                      </Button>}
                      {parsedUser && parsedUser.role === "admin" &&
                      <Button
                        onClick={handleDeleteReview(review.id)}
                        className="w-full lg:w-fit text-sm"
                        isRed
                      >
                        Eliminar Opinión
                      </Button>}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}
          {!reviews && !parsedUser ? (
            <p>Todavía no hay opiniones. <Link href={SIGN_IN_PATH}>Inicia sesión</Link> y sé el primero en opinar</p>
          ) : null}
        </section>
      </div>
    </>
  );
}