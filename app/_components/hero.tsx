"use client";

import Image from "next/image";
import Headline from "./headline";
import Button from "./button";
import { MobileMenuArrow } from "../_icons";
import { combine } from "../_utils/combineClassnames";
import { playwrite } from "../_fonts";

type HeroProps = {
    bottomText?: string
    image: string;
};

export default function Hero({ bottomText, image }: HeroProps) {

  const scrollDown = () => {
    const windowHeight = window?.innerHeight;
    window?.scroll({
      top:      windowHeight,
      behavior: "smooth"
    });
  };

  return (
    <section className="min-h-[calc(100vh-96px)] lg:min-h-[calc(100vh-144px)]">
      <Image
        src={image}
        alt="Hero-img"
        width={1200}
        height={1200}
        className="absolute top-0 left-0 object-cover w-full h-screen"
      />
      <div className="absolute z-10 top-0 left-0 w-full h-screen bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      <div className="absolute z-20 bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-4 w-full">
        {bottomText &&
          <Headline
            as="h2"
            className={combine(playwrite.className, "text-white text-center")}
          >
            {bottomText}
          </Headline>
        }
        <Button
          onClick={scrollDown}
          className="animate-bounce rounded-full p-3"
        >
          <MobileMenuArrow className="w-6 h-6 rotate-90"/>
        </Button>
      </div>
    </section>
  );
}