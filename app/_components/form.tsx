"use client";

import React, { useState } from "react";
import { Input as InputType, Select as SelectType } from "@/types";
import Button from "./button";
import { useRouter } from "next/navigation";
import { showMsg } from "../_utils/showMsg";
import Input from "./input";
import { combine } from "../_utils/combineClassnames";
import Select from "./select";
import { uploadImage } from "../_utils/uploadImage";

type FormProps = {
  inputs: (InputType | SelectType)[],
  initialState: Record<string, string | File | undefined>
  onSubmit: any
  redirectTo?: string
  submitBtnText: string
  outterClassName?: string
  fieldsContainerClassName?: string
  fullWidthBtn?: boolean
};

export default function Form({ inputs, initialState, onSubmit, redirectTo, submitBtnText="Submit", outterClassName="", fieldsContainerClassName="", fullWidthBtn = false }: FormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState(initialState ?? {});
  const [isPending, setIsPending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleInputFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    setFormData({
      ...formData,
      [e.target.name]: file
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    try {
      const _formData = {
        ...formData
      };
      if (_formData.image) {
        const url = await uploadImage(_formData.image as File);
        _formData.image = url;
      }
      await onSubmit(_formData);
      if (redirectTo) {
        router.push(redirectTo);
      }
    } catch (error) {
      setIsPending(false);
      showMsg(`Error: ${error}`, "error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={combine("grid gap-4 w-full", outterClassName)}
      encType="multipart/form-data"
    >
      <div className={combine("grid gap-4", fieldsContainerClassName)}>
        {inputs?.map((input: InputType | SelectType) => {
          if (input.type === "select") return (
            <Select
              key={input.name}
              onChange={handleChange}
              options={(input as SelectType).options}
              {...input}
            />
          );
          if (input.type === "file") return (
            <Input
              key={input.name}
              onChange={handleInputFileChange}
              placeholder={(input as InputType).placeholder}
              {...input}
            />
          );
          return (
            <Input
              key={input.name}
              onChange={handleChange}
              placeholder={(input as InputType).placeholder}
              {...input}
            />
          );
        })}
      </div>
      <Button
        type="submit"
        className={combine("mt-4", fullWidthBtn && "w-full")}
        disabled={isPending}
      >
        {isPending ? "Please wait..." : submitBtnText}
      </Button>
    </form>
  );
}