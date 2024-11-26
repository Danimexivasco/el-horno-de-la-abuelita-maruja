import { Timestamp } from "firebase/firestore";

export type Theme = "light" | "dark";

export type AuthenticationPages = "signIn" | "signUp";

export type Input = {
  name: string,
  type: string,
  label?: string,
  placeholder: string,
  required?: boolean
};

export type Select = {
  name: string,
  type: string,
  label?: string,
  options: {value: string, label: string}[],
  required?: boolean
};

export type User = {
  id: string,
  email: string
  username?: string
  createdAt: Date | Timestamp
  photoURL?: string
  emailVerified?: boolean
  role?: "customer" | "admin"
};

type Categories = "tartas" | "galletas" | "bizcochos";

export type Product = {
  id: string,
  name: string,
  description: string,
  category: Categories
  price: number,
  image?: string,
  createdAt: Date | Timestamp
};