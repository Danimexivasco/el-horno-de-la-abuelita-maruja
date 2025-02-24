import { combine } from "@/utils/combineClassnames";

export type InputProps = {
  name: string
  type: string
  label?: string
  value?: string | number
  placeholder?: string
  required?: boolean
  pattern?: string
  options?: {value: string, label: string, checked?: boolean, capitalized?: boolean}[]
  onChange: (_e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  [prop: string]: any
};

export const removeZeroValue = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.value === "0") {
    e.target.value = "";
  }
};

export default function Input({ name, type, label, value, placeholder="", required, pattern, options, onChange, className="", ...props }: InputProps) {
  if (type === "file") return (
    <div className="grid gap-2">
      <p>{label}</p>
      <label
        htmlFor="uploadFile"
        className="dark:text-cake-100 text-cake-800 font-semibold text-base rounded w-full max-w-xl h-52 justify-self-start flex flex-col items-center justify-center cursor-pointer border-2 dark:border-cake-100 border-cake-800 text-cake-800 border-dashed font-[sans-serif] transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-11 mb-2 dark:fill-cake-100 fill-cake-text-cake-800 transition-colors"
          viewBox="0 0 32 32"
        >
          <path
            d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
          />
          <path
            d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
          />
        </svg>
        {placeholder}
        <input
          type="file"
          id='uploadFile'
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          className="hidden"
        />
        <p className="text-xs font-medium dark:text-cake-100 text-cake-800 mt-2 transition-colors">PNG, JPG SVG, WEBP o GIF.</p>
      </label>
    </div>
  );
  if (type === "radio") return (
    <div className="text-base grid gap-2 w-fit">
      {label}
      <div className="flex items-center gap-4 w-fit">
        {options?.map((option) => (
          <div
            key={option.value}
            className="flex items-center gap-2"
          >
            <input
              id={`${name}-${option.value}`}
              type="radio"
              name={name}
              value={option.value}
              onChange={onChange}
              required={required}
              checked={value ? value === option.value : option.checked}
              className="w-4 h-4 appearance-none  bg-white rounded-full border dark:border-white border-black checked:ring-2 ring-cake-400 checked:bg-cake-400 checked:border-2 checked:border-white peer"
              {...props}

            />
            <label
              htmlFor={`${name}-${option.value}`}
              className="text-sm font-medium dark:peer-checked:text-cake-400 peer-checked:text-cake-700"
            >{option.label}
            </label>
          </div>
        )
        )}
      </div>
    </div>
  );
  if (type === "checkbox") return (
    <div className="text-base grid gap-2 w-fit">
      {label}
      <div className="flex flex-wrap items-center gap-4 w-fit">
        {options?.map((option) => {
          return (
            <div
              key={option.value}
              className="flex items-center gap-1.5"
            >
              <input
                id={`${name}-${option.value}`}
                type="checkbox"
                name={name}
                value={option.value}
                onChange={onChange}
                required={required}
                checked={value ? (value as string)?.includes(option.value) : option.checked}
                className="cursor-pointer w-4 h-4 p-2.5 appearance-none border dark:border-transparent border-black bg-white rounded-md peer checked:bg-cake-400 checked:border-cake-400 checked:before:content-['✔'] checked:before:text-white checked:before:absolute checked:before:inset-0 checked:before:flex checked:before:items-center checked:before:justify-center relative"
                {...props}
              />
              <label
                htmlFor={`${name}-${option.value}`}
                className={combine("cursor-pointer text-sm font-medium dark:peer-checked:text-cake-400 peer-checked:text-cake-700", option.capitalized && "capitalize")}
              >{option.label}
              </label>
            </div>
          );
        }
        )}
      </div>
    </div>
  );
  return (
    label ? (
      <label className="text-base grid gap-2">
        {label}
        <input
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          required={required}
          step=".01"
          min="1"
          onWheel={type === "number" ? (e) => (e.target as HTMLElement).blur() : () => {}}
          pattern={pattern}
          className={combine(
            "focus:outline-none focus:ring ring-cake-400 px-4 py-2 rounded-lg text-black placeholder:text-base",
            className
          )}
          {...props}
        />
      </label>
    ) :
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        step=".01"
        min="1"
        onWheel={type === "number" ? (e) => (e.target as HTMLElement).blur() : () => {}}
        pattern={pattern}
        className={combine(
          "focus:outline-none focus:ring ring-cake-400 px-4 py-2 rounded-lg text-black",
          className
        )}
        {...props}
      />
  );
}