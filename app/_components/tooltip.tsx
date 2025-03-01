import { combine } from "../_utils/combineClassnames";

type TooltipProps = {
  text: string
  position?: "right" | "top"
  className?: string
};

// To use the tooltip component add the "peer" class to the sibling element
export default function Tooltip({ text, position = "right", className = "" }: TooltipProps) {
  const rightPositionedContainerClasses = "top-1/2 -translate-y-1/2 left-[110%]";
  const rightPositionedArrow = "top-1/2 -translate-y-1/2 -left-[3px]";
  const topPositionedContainerClasses = "-top-[100%] left-1/2 -translate-x-1/2";
  const topPositionedArrow = "left-1/2 -translate-x-1/2 -bottom-[3px]";

  return (
    <div
      className={combine(
        "hidden sm:block absolute w-fit whitespace-nowrap dark:bg-cake-400 dark:text-black bg-black/95 rounded-lg px-2 py-1.5 opacity-0 peer-hover:opacity-100 transition-all ease-linear duration-100 text-white shadow-md shadow-black/30",
        position === "top" ? topPositionedContainerClasses : rightPositionedContainerClasses,
        className
      )}
    >
      <div
        className={combine(
          "w-2 h-2 absolute rotate-45 dark:bg-cake-400 bg-black/95",
          position === "top" ? topPositionedArrow : rightPositionedArrow
        )}
      >
      </div>
      <span>{text}</span>
    </div>
  );
}