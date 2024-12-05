import { combine } from "@/utils/combineClassnames";

export type TextareaProps = {
  name: string
  label?: string
  value?: string
  placeholder: string
  required?: boolean
  onChange: (_e: React.ChangeEvent<HTMLTextAreaElement>) => void
  className?: string
};

export default function TextArea({ name, label, value, placeholder="", required, onChange, className="" }: TextareaProps) {
  return (
    label ? (
      <label className="text-base grid gap-2">
        {label}
        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          rows={4}
          onChange={onChange}
          required={required}
          className={combine(
            "focus:outline-none focus:ring ring-cake-400 px-4 py-2 rounded-lg text-black placeholder:text-base min-h-28 max-h-52",
            className
          )}
        />
      </label>
    ) :
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        rows={4}
        onChange={onChange}
        required={required}
        className={combine(
          "focus:outline-none focus:ring ring-cake-400 px-4 py-2 rounded-lg text-black min-h-28 max-h-52",
          className
        )}
      />
  );
}