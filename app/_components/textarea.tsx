import { combine } from "@/utils/combineClassnames";

export type TextareaProps = {
  name: string
  label?: string
  placeholder: string
  required?: boolean
  onChange: (_e: React.ChangeEvent<HTMLTextAreaElement>) => void
  className?: string
};

export default function TextArea({ name, label, placeholder="", required, onChange, className="" }: TextareaProps) {
  return (
    label ? (
      <label className="text-base grid gap-2">
        {label}
        <textarea
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          required={required}
          className={combine(
            "focus:outline-none focus:ring ring-cake-400 px-4 py-2 rounded-lg text-black placeholder:text-base",
            className
          )}
        />
      </label>
    ) :
      <textarea
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        className={combine(
          "focus:outline-none focus:ring ring-cake-400 px-4 py-2 rounded-lg text-black",
          className
        )}
      />
  );
}