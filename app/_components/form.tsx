import React, { useState } from "react";
import { Input as InputType } from "@/types";
import Button from "./button";
import { useRouter } from "next/navigation";
import { showMsg } from "../_utils/showMsg";
import Input from "./input";

type FormProps = {
  inputs: InputType[],
  initialState?: Record<string, string>
  onSubmit: any
  redirectTo?: string
  submitBtnText: string
}

export default function Form({ inputs, initialState, onSubmit, redirectTo, submitBtnText="Submit" }: FormProps) {
  const router = useRouter()
  const [ formData, setFormData ] = useState(initialState ?? {})
  const [ isPending, setIsPending ] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [ name ]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsPending(true)
    try {
      await onSubmit(formData)
      if (redirectTo) {
        router.push(redirectTo)
      }
    } catch (error) {
      setIsPending(false)
      showMsg(`Error: ${error}`, "error")
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="grid gap-4 w-full lg:w-3/4">
      {inputs?.map((input: InputType) => (
        <Input
          key={input.name}
          onChange={handleChange}
          {...input}
        />
      ))}
      <Button
        type="submit"
        className="mt-4"
        disabled={isPending}
      >
        {isPending ? "Please wait..." : submitBtnText}
      </Button>
    </form>
  )
}