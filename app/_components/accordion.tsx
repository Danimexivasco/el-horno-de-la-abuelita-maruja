import * as RadixAccordion from "@radix-ui/react-accordion";
import { RightArrowIcon } from "@/app/_icons";
import styles from "./accordion.module.css";
import { combine } from "../_utils/combineClassnames";
import { FAQ } from "../(routes)/(frontend)/faqs/page";
import { Order } from "@/types";
import { DataType } from "@/enums";
import { getFormatedDate } from "../_utils/getFormatedDate";
import { formatNumber } from "../_utils/formatNumber";

type AccordionProps = {
  items: FAQ[] | Order[]
  dataType: DataType
};

export default function Accordion({ items, dataType }: AccordionProps) {

  if (dataType === DataType.FAQ) {
    return (
      <RadixAccordion.Root
        type={"single"}
        defaultValue={`item-${items[0]?.id}`}
        collapsible={items.length > 1}
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

  // TODO: Update products view when order structure is changed
  if (dataType === DataType.ORDER) {
    return (
      <RadixAccordion.Root
        type={"single"}
        defaultValue={`item-${items[0]?.id}`}
        collapsible={items.length > 1}
        className={combine("text-black text-left dark:bg-cake-700 bg-cake-300 rounded-xl", styles.Container)}
      >
        {items?.map(item => {
          const { id, createdAt, deliveryStatus, products } = item as Order;
          return (
            <RadixAccordion.Item
              key={id}
              value={`item-${id}`}
              className={styles.Item}
            >
              <RadixAccordion.Header className={styles.Header}>
                <RadixAccordion.Trigger className={styles.Trigger}>
                  <span>{getFormatedDate(createdAt)}</span>
                  <RightArrowIcon
                    aria-hidden
                    className={combine("min-w-5 min-h-5 h-5 w-5 rotate-90", styles.Icon)}
                  />
                </RadixAccordion.Trigger>
              </RadixAccordion.Header>
              <RadixAccordion.Content className={combine(styles.Content, "dark:text-white")}>
                <div className="px-4 !py-6">
                  <div className="flex flex-wrap gap-4 justify-between mb-4">
                    <div>
                      <p className="font-bold">ID de la orden:</p>
                      <p>{id}</p>
                    </div>
                    <div>
                      <p className="font-bold">Estado del envío:</p>
                      <p>{deliveryStatus}</p>
                    </div>
                  </div>
                  <p className="text-2xl">Productos:</p>
                  <div className="flex flex-wrap gap-8 px-4 justify-center lg:justify-start">
                    {products?.map(product => (
                      <div
                        key={product.id}
                        className="bg-white rounded-md"
                      >
                        <p><span className="font-bold">ID:</span> {product.id}</p>
                        <p><span className="font-bold">Cantidad:</span> {product.quantity}</p>
                        <p><span className="font-bold">Precio unitario:</span> {formatNumber(product.unitPrice)}</p>
                        <p><span className="font-bold">Pagado:</span> {formatNumber(product.priceToPay)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </RadixAccordion.Content>
            </RadixAccordion.Item>
          );
        })}
      </RadixAccordion.Root>
    );
  }

}