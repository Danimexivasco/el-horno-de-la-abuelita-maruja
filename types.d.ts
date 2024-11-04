import { Timestamp } from "firebase/firestore";

export type Theme = "light" | "dark";
export type AuthenticationPages = "signIn" | "signUp";
export type Input = {
  name: string,
  type: string,
  label?: string,
  placeholder: string,
  required?: boolean
}
export type User = {
  id: string,
  email: string
  username?: string
  createdAt: Date | Timestamp
  photoURL?: string
  emailVerified?: boolean
  role?: "customer" | "admin"
}