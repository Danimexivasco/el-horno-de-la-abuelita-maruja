import { TrashIcon } from "@/app/_icons";
import Button from "../button";
import FormField from "./formField";
import { removeZeroValue } from "../input";
import { getDiscountPrice } from "@/app/_utils/getDiscountPrice";

type ProductVariantFieldProps = {
  id: string
  name: string;
  value: number;
  offerData: {
    onOffer: "yes" | "no",
    offerType?: "percentage" | "multiplier" | ""
    discountPercentage?: number
    multiplierAmount?: string
  }
  handleChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  removeVariant: () => void;
};

export default function ProductVariantField({ id, name, value, offerData, handleChange, removeVariant }: ProductVariantFieldProps) {
  return (
    <>
      <div className="grid lg:grid-cols-2 gap-4">
        <FormField
          id={id}
          value={name}
          input={{
            name:        "name",
            type:        "text",
            label:       "Nombre",
            required:    true,
            placeholder: "Pequeño, Mediano, ...",
            onChange:    handleChange
          }}
        />
        <FormField
          id={id}
          value={value}
          type="text"
          input={{
            name:        "price",
            type:        "number",
            label:       "Precio",
            placeholder: "Ejemplo: 9.99",
            required:    true,
            onChange:    handleChange
          }}
          onClick={removeZeroValue}
        />
        <FormField
          id={id}
          value={offerData?.onOffer}
          data-name="onOffer"
          input={{
            name:    `onOffer-${id}`,
            type:    "radio",
            label:   "En oferta?",
            options: [
              {
                value:   "yes",
                label:   "Si",
                checked: false
              },
              {
                value:   "no",
                label:   "No",
                checked: true
              }
            ],
            onChange: handleChange
          }}
        />
        {offerData?.onOffer === "yes" &&
          <FormField
            id={id}
            value={offerData?.offerType}
            data-name="offerType"
            input={{
              name:    `offerType-${id}`,
              type:    "radio",
              label:   "Tipo de Oferta",
              options: [
                {
                  value:   "percentage",
                  label:   "Porcentage",
                  checked: offerData?.offerType === "percentage" || true
                },
                {
                  value:   "multiplier",
                  label:   "2x1",
                  checked: offerData?.offerType === "multiplier" || false
                }
              ]
              ,
              onChange: handleChange
            }}
          />
        }
        {offerData?.onOffer === "yes" && offerData?.offerType === "percentage" && (
          <div>
            <FormField
              id={id}
              value={offerData?.discountPercentage}
              data-name="discountPercentage"
              input={{
                name:        `discountPercentage-${id}`,
                type:        "number",
                label:       "Porcentaje de descuento",
                required:    offerData?.onOffer === "yes",
                placeholder: "Inserta un porcentaje de descuento. Ejemplo: 15",
                onChange:    handleChange
              }}
              onClick={removeZeroValue}
            />
            <small className="block italic mt-2">El precio final sería {getDiscountPrice(value, offerData?.discountPercentage ?? 0)} €</small>
          </div>
        )
        }
        {offerData?.onOffer === "yes" && offerData?.offerType === "multiplier" && (
          <FormField
            id={id}
            value= {offerData?.multiplierAmount}
            data-name="multiplierAmount"
            input={{
              name:        `multiplierAmount-${id}`,
              type:        "text",
              label:       "Tipo de descuento 2X1",
              required:    offerData?.onOffer === "yes",
              placeholder: "Ejemplos válidos: 2x1, 3x2, 4x3, 5x4...",
              onChange:    handleChange,
              //eslint-disable-next-line
              pattern:     "^\\d[xX]\\d$",
            }}
          />
        )
        }
      </div>
      <Button
        isRed
        withIcon
        onClick={removeVariant}
        className="mt-4"
      ><TrashIcon className="w-6 h-6"/> Eliminar
      </Button>
    </>
  );
}