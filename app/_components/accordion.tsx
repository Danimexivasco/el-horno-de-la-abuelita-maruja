import * as RadixAccordion from "@radix-ui/react-accordion";
import { LogoIcon, RightArrowIcon } from "@/app/_icons";
import styles from "./accordion.module.css";
import { combine } from "../_utils/combineClassnames";
import { FAQ } from "../(routes)/(frontend)/faqs/page";
import { Order } from "@/types";
import { DataType } from "@/enums";
import { getFormatedDate } from "../_utils/getFormatedDate";
import { formatNumber } from "../_utils/formatNumber";
import { PRODUCT_DETAIL_PATH } from "@/routes";
import Link from "./link";
import Image from "next/image";

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
                      <p className="text-xl font-bold">Estado del envío:</p>
                      <p className="capitalize">{deliveryStatus ?? "Desconocido"}</p>
                    </div>
                  </div>
                  <p className="text-2xl">Productos:</p>
                  <div className="grid grid-cols-auto-fill-sm gap-4 px-4 py-2">
                    {products?.map(product => {
                      const { id, name, image, variantId, variantName, quantity, unitPrice, priceToPay } = product;

                      return (
                        <Link
                          key={variantId ?? product.id}
                          href={variantName ? `${PRODUCT_DETAIL_PATH.replace(":id", id)}?var=${variantName}` : `${PRODUCT_DETAIL_PATH.replace(":id", id)}`}
                          className="bg-white rounded-md p-6 no-underline !text-black hover:shadow-lg transition"
                        >
                          <div className="flex items-center mb-4">
                            {image ?
                              <Image
                                src={image}
                                alt={name}
                                width={80}
                                height={80}
                                quality={90}
                                loading="lazy"
                                className="w-20 h-20 object-cover aspect-square rounded-lg"
                              />
                              :
                              <LogoIcon className="w-20 h-20 "/>
                            }
                            <p className="text-lg font-bold">{name}</p>
                          </div>
                          <div><span className="font-bold">Precio unitario:</span> {formatNumber(unitPrice)}</div>
                          {variantName ?
                            <div><span className="font-bold">Opción:</span> {variantName}</div>
                            : null
                          }
                          <div className="mb-4"><span className="font-bold">Cantidad:</span> {quantity}</div>
                          <div><span className="font-bold">Pagado:</span> {formatNumber(priceToPay)}</div>
                        </Link>
                      );
                    })}
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