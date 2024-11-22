import { combine } from "../_utils/combineClassnames"

type TagProps = {
  text: string,
  className?: string
}

export default function Tag({ text, className="" } : TagProps) {
  return (
    <div className={combine("dark:bg-cake-400 bg-cake-500 text-black font-bold px-2 py-1 rounded-md w-fit", className)}>
      <p className="text-base">{text}</p>
    </div>
  )
}