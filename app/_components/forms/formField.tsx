import Select, { SelectProps } from "@/components/select";
import Input, { InputProps } from "@/components/input";
import TextArea, { TextareaProps } from "@/components/textarea";

export type FormFieldProps = {
  input: InputProps | SelectProps
  type?: string
  value?: string | number
};

export default function FormField({ input, type="input", value }: FormFieldProps) {
  if (type === "select") {
    const { label, name, options, required, onChange } = input as SelectProps;
    return <Select
      label={label}
      name={name}
      value={value as string}
      options={options}
      required={required}
      onChange={onChange}
    />;
  } else {
    const { name, type, label, placeholder="", required, pattern, options=[], onChange, className="" } = input as (InputProps & TextareaProps);
    if (type === "textarea") {
      return <TextArea
        name={name}
        label={label}
        value={value as string}
        placeholder={placeholder}
        required={required}
        onChange={onChange as TextareaProps["onChange"]}
        className={className}
      />;
    }
    return <Input
      name={name}
      type={type}
      label={label}
      value={value}
      placeholder={placeholder}
      required={required}
      pattern={pattern}
      options={options as InputProps["options"]}
      onChange={onChange as InputProps["onChange"]}
      className={className}
    />;
  }
}