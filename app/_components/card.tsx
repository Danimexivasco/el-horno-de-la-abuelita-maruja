import { Product } from "@/types";
import Headline from "./headline";
import Image from "next/image";
import { combine } from "../_utils/combineClassnames";
import { LogoIcon } from "../_icons";
import Tag from "./tag";

type CardProps = Omit<Product, "id" | "createdAt"> & {
  className?: string,
};

export default function Card({ name, description, category, price, image, className="" }: CardProps) {
  return (
    <li
      className={
        combine(
          "flex flex-col gap-4 h-full w-full bg-cake-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border-2 dark:border-cake-400/80 border-cake-500/80 overflow-hidden",
          className
        )
      }
    >
      <div
        className={
          combine(
            "w-full h-3/4 min-h-3/4 overflow-hidden min-h-60 flex items-center justify-center dark:bg-cake-100 bg-cake-900 transition-colors duration-100 ease-linear"
          )
        }
      >
        {image ?
          <Image
            src={image}
            alt={name}
            width={420}
            height={250}
            className="w-full h-full object-cover"
          />
          :
          <LogoIcon className="w-1/4 h-auto opacity-60"/>
        }
      </div>
      <div className="text-center px-6 pb-6 pt-2">
        <Tag
          text={category}
          className="mb-4"
        />
        <Headline as="h2">{name}</Headline>
        <p>{description}</p>
        <p className="font-bold mt-4 text-xl">{price} €</p>
      </div>
    </li>
  );
}