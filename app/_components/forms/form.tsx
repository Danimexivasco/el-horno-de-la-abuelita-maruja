"use client";

import { Input as InputType, Select as SelectType } from "@/types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { combine } from "@/utils/combineClassnames";
import { showMsg } from "@/utils/showMsg";
import { uploadImage } from "@/utils/uploadImage";
import Button from "@/components/button";
import FormField, { FormFieldProps } from "@/components/forms/formField";

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

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      const file = (e.target as HTMLInputElement).files?.[0];
      const url = await uploadImage(file as File);
      return setFormData({
        ...formData,
        [e.target.name]: url
      });
    }
    return setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    try {
      await onSubmit(formData);
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
        {inputs?.map((input: InputType | SelectType) =>
          <FormField
            key={input.name}
            type={input.type as FormFieldProps["type"]}
            input={{
              ...input,
              onChange: handleChange
            }}
          />
        )}
      </div>
      <Button
        type="submit"
        className={combine("mt-4", fullWidthBtn && "w-full")}
        disabled={isPending}
      >
        {isPending ? "Espera por favor..." : submitBtnText}
      </Button>
    </form>
  );
}