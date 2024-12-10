import { combine } from "../_utils/combineClassnames";

type TooltipProps = {
  text: string
  className?: string
};

// To use the tooltip component add the "peer" class to the sibling element
export default function Tooltip({ text, className="" }: TooltipProps) {
  return (
    <div
      className={combine(
        "hidden sm:block absolute w-fit whitespace-nowrap bg-black/95 rounded-lg px-2 py-1.5 top-1/2 -translate-y-1/2 left-[110%] opacity-0 peer-hover:opacity-100 transition-all ease-linear duration-100 text-white shadow-md shadow-black/30",
        className
      )}
    >
      <div className="w-2 h-2 absolute top-1/2 -translate-y-1/2 left-[-3px] rotate-45 bg-black/95"></div>
      <span>{text}</span>
    </div>
  );
}