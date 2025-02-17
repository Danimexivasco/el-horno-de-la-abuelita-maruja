import * as RadixAccordion from "@radix-ui/react-accordion";
import { RightArrowIcon } from "@/app/_icons";
import styles from "./accordion.module.css";
import { combine } from "../_utils/combineClassnames";
import { FAQ } from "../(routes)/(frontend)/faqs/page";

type AccordionProps = {
  items: FAQ[]
};

export default function Accordion({ items }: AccordionProps) {
  return (
    <RadixAccordion.Root
      type="single"
      defaultValue="item-1"
      collapsible
      className={combine("text-black text-left dark:bg-cake-700 bg-cake-300 rounded-xl", styles.Container)}
    >
      {items?.map(({ id, answer, question }) => {
        return (
          <RadixAccordion.Item
            key={id}
            value={`item-${id}`}
            className={styles.Item}
          >
            <RadixAccordion.Header className={styles.Header}>
              <RadixAccordion.Trigger className={styles.Trigger}>
                <span>{question}</span>
                <RightArrowIcon
                  aria-hidden
                  className={combine("min-w-5 min-h-5 h-5 w-5 rotate-90", styles.Icon)}
                />
              </RadixAccordion.Trigger>
            </RadixAccordion.Header>
            <RadixAccordion.Content className={combine(styles.Content, "dark:text-white")}>
              <p>{answer}</p>
            </RadixAccordion.Content>
          </RadixAccordion.Item>
        );
      })}
    </RadixAccordion.Root>
  );
}