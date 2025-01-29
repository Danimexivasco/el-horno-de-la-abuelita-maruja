import { Product } from "@/types";
import Headline from "./headline";
import Image from "next/image";
import { combine } from "../_utils/combineClassnames";
import { LogoIcon } from "../_icons";
import { getDiscountPrice } from "../_utils/getDiscountPrice";
import getCheapestVariant from "../_utils/getCheapestVariant";
import Link from "./link";
import { PRODUCT_DETAIL_PATH } from "@/routes";
import { formatNumber } from "../_utils/formatNumber";

type MinimalistCardProps = Partial<Product> & {
  className?: string,
};

export default function MinimalistCard({ id, name, price, multiPrice, variants=[], image, onOffer, offerType, discountPercentage, multiplierAmount, className="" }: MinimalistCardProps) {
  const {
    price: variantPrice,
    onOffer: variantOnOffer,
    offerType: variantOfferType,
    discount: variantDiscount,
    multiplierAmount: variantMultiplierAmount
  } = getCheapestVariant(variants);

  return (
    <li
      className={
        combine(
          "relative flex flex-col gap-4 h-full w-full dark:bg-cake-800 bg-cake-200 rounded-md shadow-xl overflow-hidden",
          className
        )
      }
    >
      {multiPrice ?
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
            alt={name ?? "imagen-producto"}
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
          <Headline as="h4">{name}</Headline>
        </div>
        <div className="flex gap-4 justify-between items-center">
          <div className="grid mt-4">
            {multiPrice === "yes" &&
                <p className="text-lg font-normal">Desde:</p>
            }
            <div className="grid items-center font-bold text-xl">
              {multiPrice === "yes" ? (
                variantOnOffer === "yes" && variantOfferType === "percentage"
                  ?
                  <>
                    <small className="font-normal line-through dark:text-red-400 text-red-500 transition-colors">{formatNumber(variantPrice)}</small>
                    <span className="text-3xl">
                      {formatNumber(getDiscountPrice(variantPrice ?? 0, variantDiscount ?? 0))}
                    </span>
                  </>
                  :
                  <p className="text-2xl">{formatNumber(variantPrice)}</p>
              ) : (
                onOffer === "yes" && offerType === "percentage" ?
                  <>
                    <small className="font-normal line-through dark:text-red-400 text-red-500 transition-colors">{price && formatNumber(price)}</small>
                    <span className="text-3xl">
                      {formatNumber(getDiscountPrice(price ?? 0, discountPercentage ?? 0))}
                    </span>
                  </>
                  :
                  <p className="text-2xl">{price && formatNumber(price)}</p>
              )}
            </div>
          </div>
          {id ?
            <Link
              asButton
              href={PRODUCT_DETAIL_PATH.replace(":id", id)}
              className="mt-4 self-end"
            >Descubrir
            </Link>
            :
            null
          }
        </div>
      </div>
    </li>
  );
}