import { MAXIMUM_PRODUCTS_PURCHASE } from "@/constants";
import Button from "./button";
import Input from "./input";

type CounterProps = {
  value: number
  setValue: (_n: number) => void
};

export default function Counter({ value, setValue }: CounterProps) {

  return (
    <div className="flex rounded-lg overflow-hidden">
      <Button
        type="button"
        onClick={() => setValue(Math.max(1, value - 1))}
        className="rounded-none"
      >-
      </Button>
      <Input
        name="quantity"
        value={Number(value).toString()}
        type="number"
        step={1}
        max={MAXIMUM_PRODUCTS_PURCHASE}
        onChange={(e) => setValue(Number(e.target.value))}
        className="text-center !w-fit rounded-none ring-0 focus:ring-0"
      />
      <Button
        type="button"
        onClick={() => setValue(Math.min(value + 1, MAXIMUM_PRODUCTS_PURCHASE))}
        className="rounded-none"
      >+
      </Button>
    </div>
  );
}