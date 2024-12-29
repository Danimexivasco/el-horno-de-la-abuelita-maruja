"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  default as ReactMasonry,
  ResponsiveMasonry
} from "react-responsive-masonry";
import Container from "./container";

type MasonryProps = {
    items: any[]
    cta?: React.ReactNode
};

export default function Masonry({ items = [], cta }: MasonryProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Container className="px-0 lg:px-8 grid gap-12">
      <ResponsiveMasonry
        columnsCountBreakPoints={{
          750: 2,
          900: 3
        }}
      >
        <ReactMasonry
          gutter="clamp(0.5rem, 2vw, 2rem)"
        >
          {items.slice(0, 9)?.map((item, idx) => {
            // TODO: add alt text and change key to id
            return (
              <Image
                key={`${item}-${idx}`}
                src={item}
                alt="item"
                width={600}
                height={400}
                className="rounded-lg shadow-md"
              />
            );
          })}
        </ReactMasonry>
      </ResponsiveMasonry>
      {cta ? cta : null}
    </Container>
  );
}