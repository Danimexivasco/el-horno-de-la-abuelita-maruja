import Image from "next/image";
import ReactMarkdown from "react-markdown";
import Container from "./container";
import Headline from "./headline";
import { combine } from "../_utils/combineClassnames";
import { isValidElement } from "react";

type HighLightProps = {
    boxPosition?: "left" | "right"
    headline: string
    text: string
    image: string | React.ReactNode
    boxTopHeadline?: string
    boxBottomHeadline?: string
    className?: string
};

export default function Highlight({ boxPosition="right", headline, text, image, boxTopHeadline, boxBottomHeadline, className }: HighLightProps) {

  const boxOnLeft = boxPosition === "left";

  return (
    <Container
      as="section"
      className={combine("px-0 lg:px-8", className)}
    >
      <div className={combine("flex flex-col-reverse items-center gap-0 lg:gap-16 px-8 py-4 lg:!px:12 dark:bg-cake-700/50 bg-cake-200 rounded-lg shadow-lg", boxOnLeft ? "lg:flex-row-reverse" : "lg:flex-row")}>
        <div className="w-full lg:w-1/2">
          <Headline as="h2">{headline}</Headline>
          <ReactMarkdown className={combine(Boolean(boxBottomHeadline) && "mb-8")}>{text}</ReactMarkdown>
        </div>
        <div className="w-full lg:w-1/2 flex gap-2 lg:gap-4 flex-col items-center p-4 lg:p-6 -translate-y-16 lg:-translate-y-20 dark:bg-cake-700 bg-cake-300 rounded-lg shadow-xl">
          {boxTopHeadline ?
            <Headline
              as="h2"
              className="!text-3xl lg:text-5xl"
              empathized
            >
              {boxTopHeadline}
            </Headline>
            :
            null
          }
          {isValidElement(image) ? image : null}
          {typeof image === "string" ?
            <Image
              src={image}
              alt="image"
              width={400}
              height={600}
              className="w-1/2 h-auto rounded-lg aspect-square object-cover"
            />
            :
            null
          }
          {boxBottomHeadline ?
            <Headline
              as="h2"
              className="!text-3xl lg:text-5xl"
              empathized
            >
              {boxBottomHeadline}
            </Headline>
            :
            null
          }
        </div>
      </div>
    </Container>
  );
}