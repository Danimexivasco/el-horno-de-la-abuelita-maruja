import { Product } from "@/types";
import Headline from "./headline";
import Image from "next/image";
import { combine } from "../_utils/combineClassnames";
import { LogoIcon } from "../_icons";
import Tag from "./tag";
import { getDiscountPrice } from "../_utils/getDiscountPrice";
import getCheapestVariant from "../_utils/getCheapestVariant";
import Button from "./button";
import { formatPrice } from "../_utils/formatPrice";

type CardProps = Omit<Product, "id" | "createdAt"> & {
  showBuyBtn?: boolean
  className?: string,
};

export default function Card({ name, description, category, price, multiPrice, variants=[], image, onOffer, offerType, discountPercentage, multiplierAmount, showBuyBtn=false, className="" }: CardProps) {
  const {
    price: variantPrice,
    onOffer: variantOnOffer,
    offerType: variantOfferType,
    discount: variantDiscount,
    multiplierAmount: variantMultiplierAmount
  } = getCheapestVariant(variants);

  const isMultiPrice = multiPrice === "yes";

  return (
    <li
      className={
        combine(
          "relative flex flex-col gap-4 h-full w-full rounded-md glass shadow-xl overflow-hidden transition-shadow",
          className
        )
      }
    >
      {isMultiPrice ?
        (variantOnOffer === "yes" &&
          <div className="absolute -top-1 -right-0.5 rotate-45 translate-x-1/4 translate-y-1/3 px-2 py-1 bg-cake-500 w-32 flex items-center justify-center">
            <p className="text-2xl font-bold text-black">{variantOfferType === "percentage" ?
              `${variantDiscount}%`
              : variantMultiplierAmount}
            </p>
          </div>
        ) :
        (onOffer === "yes" &&
          <div className="absolute -top-1 -right-0.5 rotate-45 translate-x-1/4 translate-y-1/3 px-2 py-1 bg-cake-500 w-32 flex items-center justify-center">
            <p className="text-2xl font-bold text-black">{offerType === "percentage" ?
              `${discountPercentage}%`
              : multiplierAmount}
            </p>
          </div>
        )
      }
      <div
        className={
          combine(
            "w-full h-60 lg:h-64 aspect-video overflow-hidden flex items-center justify-center dark:bg-cake-100 bg-cake-900 transition-colors duration-100 ease-linear"
          )
        }
      >
        {image ?
          <Image
            src={image}
            alt={name}
            width={420}
            height={250}
            quality={100}
            className="w-full h-full object-cover aspect-video"
          />
          :
          <LogoIcon className="w-1/4 h-auto opacity-60"/>
        }
      </div>
      <div className="flex flex-col justify-between px-6 pb-6 pt-2 flex-1">
        <div>
          <Tag
            text={category}
            className="mb-4"
          />
          <Headline as="h2">{name}</Headline>
          <p className="line-clamp-2">{description}</p>
        </div>
        <div className="flex items-center justify-between gap-4 mt-8">
          <div className="grid">
            <div className="flex gap-2 items-center font-bold text-xl">
              {isMultiPrice ? (
                variantOnOffer === "yes" && variantOfferType === "percentage"
                  ?
                  <div className="flex gap-4 items-start">
                    <div>
                      <p className="text-lg font-normal">Desde:</p>
                      <span className="text-3xl">
                        {formatPrice(getDiscountPrice(variantPrice ?? 0, variantDiscount ?? 0))}
                      </span>
                    </div>
                    <div className="text-center dark:text-red-400 text-red-500 transition-colors">
                      <span className="text-md font-normal">Antes</span>
                      <span className="block text-xl font-normal ">{formatPrice(variantPrice)}</span>
                    </div>
                  </div>
                  :
                  <p className="text-2xl">{formatPrice(variantPrice)}</p>
              ) : (
                onOffer === "yes" && offerType === "percentage" ?
                  <div className="flex gap-4 items-center">
                    <span className="text-3xl">
                      {formatPrice(getDiscountPrice(price ?? 0, discountPercentage ?? 0))}
                    </span>
                    <div className="text-center dark:text-red-400 text-red-500 transition-colors">
                      <span className="text-md font-normal">Antes</span>
                      <span className="block text-xl font-normal ">{formatPrice(price)}</span>
                    </div>
                  </div>
                  :
                  <p className="text-2xl">{formatPrice(price)}</p>
              )}
            </div>
          </div>
          {showBuyBtn ?
            <Button>
              Ver
            </Button>
            : null
          }
        </div>
      </div>
    </li>
  );
}