import Select, { SelectProps } from "./select";
import Input, { InputProps } from "./input";
import TextArea, { TextareaProps } from "@/components/textarea";

export type FormFieldProps = {
  input: InputProps | SelectProps
  type: "input" | "select" | "textarea"
};

export default function FormField({ input, type }: FormFieldProps) {

  if (type === "select") {
    const { label, name, options, required, onChange } = input as SelectProps;
    return <Select
      label={label}
      name={name}
      options={options}
      required={required}
      onChange={onChange}
    />;
  } else {
    const { name, label, placeholder="", required, onChange, className="" } = input as (InputProps | TextareaProps);
    if (type === "textarea") {
      return <TextArea
        name={name}
        label={label}
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
      placeholder={placeholder}
      required={required}
      onChange={onChange as InputProps["onChange"]}
      className={className}
    />;
  }
}