export type SelectProps = {
  label?: string
  name?: string
  value?: string
  options: {value: string, label: string}[]
  required?: boolean
  onChange: (_e: React.ChangeEvent<HTMLSelectElement>) => void
};

export default function Select({ label, name, value, options, required, onChange }: SelectProps) {
  return (
    label ? (
      <label className="text-base grid gap-2">
        {label}
        <select
          className="w-fit focus:outline-none focus:ring ring-cake-400 px-4 py-2 rounded-lg text-black border-r-8 border-r-transparent"
          name={name}
          value={value}
          required={required}
          onChange={onChange}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </label>
    ) :
      <select
        className="w-fit focus:outline-none focus:ring ring-cake-400 px-4 py-2 rounded-lg text-black border-r-8 border-r-transparent"
        name={name}
        value={value}
        required={required}
        onChange={onChange}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
  );
}