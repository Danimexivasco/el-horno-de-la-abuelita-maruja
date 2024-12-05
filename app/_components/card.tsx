import { Product } from "@/types";
import Headline from "./headline";
import Image from "next/image";
import { combine } from "../_utils/combineClassnames";
import { LogoIcon } from "../_icons";
import Tag from "./tag";
import { getDiscountPrice } from "../_utils/getDiscountPrice";

type CardProps = Omit<Product, "id" | "createdAt"> & {
  className?: string,
};

export default function Card({ name, description, category, price, image, onOffer, offerType, discountPercentage, multiplierAmount, className="" }: CardProps) {
  return (
    <li
      className={
        combine(
          "relative flex flex-col gap-4 h-full w-full bg-cake-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 shadow-xl overflow-hidden",
          className
        )
      }
    >
      {onOffer === "yes" &&
        <div className="absolute -top-1 -right-0.5 rotate-45 translate-x-1/4 translate-y-1/3 px-2 py-1 bg-cake-500 w-32 flex items-center justify-center">
          <p className="text-2xl font-bold text-black">{offerType === "percentage" ? `${discountPercentage}%` : multiplierAmount}</p>
        </div>
      }
      <div
        className={
          combine(
            "w-full h-3/4 min-h-60 max-h-3/4 aspect-video overflow-hidden flex items-center justify-center dark:bg-cake-100 bg-cake-900 transition-colors duration-100 ease-linear"
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
      <div className="px-6 pb-6 pt-2">
        <Tag
          text={category}
          className="mb-4"
        />
        <Headline as="h2">{name}</Headline>
        <p className="line-clamp-1">{description}</p>
        <p className="flex gap-2 items-center font-bold mt-4 text-xl">
          {onOffer === "yes" && offerType === "percentage" ?
            <>
              <span className="text-3xl">{getDiscountPrice(price, discountPercentage ?? 0)}€</span>
              <span className="font-normal line-through dark:text-red-400 text-red-500 transition-colors">{price}€</span>
            </>
            :
            `${price}€`
          }
        </p>
      </div>
    </li>
  );
}