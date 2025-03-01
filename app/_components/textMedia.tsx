import ReactMarkdown from "react-markdown";
import Container from "./container";
import Headline, { HeadlineProps } from "./headline";
import Image from "next/image";
import React from "react";
import { combine } from "../_utils/combineClassnames";

type TextMediaProps = {
    headline: string;
    headlineAs?: HeadlineProps["as"]
    subHeadlineAs?: HeadlineProps["as"]
    subHeadline: string;
    text: string;
    cta?: React.ReactNode
    media: string;
    mediaPosition?: "right" | "left"
    mediaAspect?: "video" | "square"
    className?: string
};

export default function TextMedia({ headline, subHeadline, headlineAs = "h2", subHeadlineAs = "h5", text, cta, media, mediaPosition = "right", mediaAspect = "video", className }: TextMediaProps) {
  if (mediaPosition === "left") return (
    <Container
      as="section"
      className={combine("flex flex-col lg:flex-row items-center gap-8 lg:gap-16 px-0 lg:px-8 py-16 lg:py-8", className && className)}
    >
      <div className="w-full lg:w-1/2 grid place-content-center">
        <Image
          src={media}
          alt="media"
          width={600}
          height={600}
          className={combine("rounded-lg object-cover shadow-lg shadow-black/30", mediaAspect === "square" ? "aspect-square" : "aspect-video")}
        />
      </div>
      <div className="w-full lg:w-1/2">
        <Headline as={headlineAs}>{headline}</Headline>
        <Headline
          as={subHeadlineAs}
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
      className={combine("flex flex-col lg:flex-row items-center gap-8 lg:gap-16 px-0 lg:px-8 py-16 lg:py-8", className && className)}
    >
      <div className="w-full lg:w-1/2">
        <Headline as={headlineAs}>{headline}</Headline>
        <Headline
          as={subHeadlineAs}
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
          className={combine("rounded-lg object-cover", mediaAspect === "square" ? "aspect-square" : "aspect-video")}
        />
      </div>
    </Container>
  );
}