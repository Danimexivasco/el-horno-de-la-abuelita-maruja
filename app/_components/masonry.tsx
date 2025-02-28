"use client";

import Image from "next/image";
import {
  default as ReactMasonry,
  ResponsiveMasonry
} from "react-responsive-masonry";
import Container from "./container";
import { WithIsClientCheck } from "../_hocs/WithIsClientCheck";

type MasonryProps = {
    items: any[]
    cta?: React.ReactNode
};

function Masonry({ items = [], cta }: MasonryProps) {
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

export default WithIsClientCheck(Masonry);