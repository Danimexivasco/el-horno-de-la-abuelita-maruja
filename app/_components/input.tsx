import { combine } from "../_utils/combineClassnames";

type InputProps = {
  name: string
  type: string
  label?: string
  placeholder: string
  required?: boolean
  onChange: (_e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
};

export default function Input({ name, type, label, placeholder="", required, onChange, className="" }: InputProps) {
  const fileClassNames = "focus:outline-none !p-0 dark:text-white transition-colors";
  return (
    label ? (
      <label className="text-base grid gap-2">
        {label}
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          required={required}
          step=".01"
          min="0"
          className={combine("focus:outline-none focus:ring ring-cake-400 px-4 py-2 rounded-lg text-black placeholder:text-base", type === "file" && fileClassNames, className)}
        />
      </label>
    ) :
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        step=".01"
        min="0"
        className={combine("focus:outline-none focus:ring ring-cake-400 px-4 py-2 rounded-lg text-black", type === "file" && fileClassNames, className)}
      />
  );
}