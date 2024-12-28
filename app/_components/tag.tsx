import { sriracha } from "../_fonts";
import { combine } from "../_utils/combineClassnames";

type TagProps = {
  text: string,
  className?: string
};

export default function Tag({ text, className="" }: TagProps) {
  return (
    <div className={combine("outline outline-1 dark:outline-cake-400 outline-cake-500 dark:text-cake-400 text-cake-500 font-bold px-2 py-1 rounded-md w-fit capitalize", sriracha.className, className)}>
      <p className="text-base">{text}</p>
    </div>
  );
}