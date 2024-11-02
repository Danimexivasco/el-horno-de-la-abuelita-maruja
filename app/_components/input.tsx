import { combine } from "../_utils/combineClassnames"

type InputProps = {
  name: string
  type: string
  label?: string
  placeholder: string
  required?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
}
export default function Input({ name, type, label, placeholder, required, onChange, className="" } : InputProps) {
  return (
    label ? (
      <label  className="text-base font-bold grid gap-1">
        {label}
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          required={required}
          className={combine("focus:outline-none focus:ring ring-cake-400 px-4 py-2 rounded-lg text-black placeholder:text-base", className)}
        />
      </label>
    ) :
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        className={combine("focus:outline-none focus:ring ring-cake-400 px-4 py-2 rounded-lg text-black", className)}
      />
  )
}