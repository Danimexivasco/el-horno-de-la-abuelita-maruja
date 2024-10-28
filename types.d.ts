export type Theme = "light" | "dark";
export type AuthenticationPages = "signIn" | "signUp";
export type Input = {
  name: string,
  type: string,
  label?: string,
  placeholder: string,
  required?: boolean
}