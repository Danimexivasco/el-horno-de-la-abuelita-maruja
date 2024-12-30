import { useEffect, useRef, useState } from "react";
import ReactSlider from "react-slider";
import Input from "./input";
import { useSearchParams } from "next/navigation";

type PriceRangeSliderProps = {
    label?: string;
    priceFrom: number
    priceTo: number
    onChange: (_minPrice: number, _maxPrice: number) => void
};

export default function PriceRangeSlider({ label, priceFrom, priceTo, onChange }: PriceRangeSliderProps) {
  const hackRef = useRef(null);
  const searchParams = useSearchParams();
  const [value, setValue] = useState<[number, number]>([priceFrom, priceTo]);

  useEffect(() => {
    setValue([Number(searchParams.get("priceFrom")) || priceFrom, Number(searchParams.get("priceTo")) || priceTo]);
  }, [searchParams]);

  useEffect(() => {
    if (value) {
      onChange(value[0], value[1]);
    }
  }, [value]);

  const handleInput = (newValue: [number, number]) => {
    if (Array.isArray(newValue)) {
      setValue(newValue);
    }
  };

  return (
    <div className="grid gap-2  w-full max-w-1/3">
      {label ? <label className="align-self-bottom">{label}</label> : null}
      <ReactSlider
        className="mb-3"
        thumbClassName="w-6 h-6 bg-cake-400 rounded-full -translate-y-1.5 focus-visible:outline-none shadow-md ring-2 ring-cake-500/60"
        trackClassName="h-3 bg-white rounded-xl track"
        min={priceFrom}
        max={priceTo}
        defaultValue={value}
        value={value}
        ariaLabel={["Lower thumb", "Upper thumb"]}
        ariaValuetext={(state: any) => `Thumb value ${state.valueNow}`}
        onChange={handleInput}
        pearling
        minDistance={4}
        withTracks
      />
      <div className="flex justify-between mt-4">
        <label
          htmlFor="price-min"
          className="flex gap-2 items-center text-sm font-bold w-fit"
        >
          Min. €
          <Input
            id="price-min"
            type="number"
            name="price-min"
            value={Number(value[0]).toString()}
            min={priceFrom}
            max={priceTo}
            onChange={(e) => handleInput([parseInt(e.target.value) > 0 ? parseInt(e.target.value) : 0, value[1]])}
            className="w-1/2 lg:w-1/4 !min-w-16 text-center"
          />
        </label>
        <label
          htmlFor="price-max"
          className="flex gap-2 items-center justify-end text-sm font-bold"
        >
          Max. €
          <Input
            id="price-max"
            type="number"
            name="price-max"
            value={Number(value[1]).toString()}
            min={priceFrom}
            max={priceTo}
            onChange={(e) => handleInput([value[0], parseInt(e.target.value) > 0 ? parseInt(e.target.value) : 0])}
            className="w-1/2 lg:w-1/4 !min-w-16 text-center"
            ref={hackRef}
          />
        </label>
      </div>
    </div>
  );
}