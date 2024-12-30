"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";

import Container from "./container";
import Headline from "./headline";
import { Product } from "@/types";
import MinimalistCard from "./minimalistCard";
import { combine } from "../_utils/combineClassnames";

type CarouselProps = {
    headline?: string
    items: string | Product[]
    className?: string
};

export default function Carousel({ headline, items = [], className }: CarouselProps) {

  const _items = Array.isArray(items) ? items : JSON.parse(items);

  return (
    <Container
      as="section"
      className={combine("overflow-hidden px-0 pb-12", className)}
    >
      {headline ? <Headline
        as="h2"
        className="text-center"
      >{headline}
      </Headline> : null}
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1}
        loop={true}
        coverflowEffect={{
          rotate:       50,
          stretch:      0,
          depth:        100,
          modifier:     1,
          slideShadows: true
        }}
        autoplay={{
          delay:                3000,
          disableOnInteraction: false
        }}
        breakpoints={{
          1024: {
            slidesPerView: 3,
            spaceBetween:  30
          }
        }}
        navigation={true}
        modules={[EffectCoverflow, Autoplay]}
        className="!px-4 lg:!px-0"
      >
        {_items?.map((item: Product) => {
          return (
            <SwiperSlide
              key={item.id}
              className="my-12 w-11/12 lg:w-full" // Hack for the shadows
            >
              <MinimalistCard
                id={item.id}
                name={item.name}
                price={item.price}
                multiPrice={item.multiPrice}
                variants={item.variants}
                image={item.image}
                onOffer={item.onOffer}
                offerType={item.offerType}
                discountPercentage={item.discountPercentage}
                multiplierAmount={item.multiplierAmount}
                className="select-none"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Container>
  );
}