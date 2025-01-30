import ReactMarkdown from "react-markdown";
import Container from "./container";
import Headline from "./headline";
import Image from "next/image";
import React from "react";
import { combine } from "../_utils/combineClassnames";

type TextMediaProps = {
    headline: string;
    subHeadline: string;
    text: string;
    cta?: React.ReactNode
    media: string;
    mediaPosition?: "right" | "left"
};

export default function TextMedia({ headline, subHeadline, text, cta, media, mediaPosition="right" }: TextMediaProps) {
  if (mediaPosition === "left") return (
    <Container
      as="section"
      className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 px-0 lg:px-8 py-16 lg:py-8"
    >
      <div className="w-full lg:w-1/2 grid place-content-center">
        <Image
          src={media}
          alt="media"
          width={600}
          height={600}
          className="rounded-lg aspect-video object-cover shadow-lg shadow-black/30"
        />
      </div>
      <div className="w-full lg:w-1/2">
        <Headline as="h2">{headline}</Headline>
        <Headline
          as="h5"
          empathized
          className="mb-6"
        >
          {subHeadline}
        </Headline>
        <ReactMarkdown className={combine(Boolean(cta) && "mb-8 prose-base")}>{text}</ReactMarkdown>
        <div>
          {cta && cta}
        </div>
      </div>
    </Container>
  );

  return (
    <Container
      as="section"
      className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 px-0 lg:px-8 py-16 lg:py-8"
    >
      <div className="w-full lg:w-1/2">
        <Headline as="h2">{headline}</Headline>
        <Headline
          as="h5"
          empathized
          className="mb-6"
        >
          {subHeadline}
        </Headline>
        <ReactMarkdown className={combine(Boolean(cta) && "mb-8 prose-base")}>{text}</ReactMarkdown>
        <div>
          {cta && cta}
        </div>
      </div>
      <div className="w-full lg:w-1/2 grid place-content-center">
        <Image
          src={media}
          alt="media"
          width={600}
          height={600}
          className="rounded-lg aspect-video object-cover"
        />
      </div>
    </Container>
  );
}