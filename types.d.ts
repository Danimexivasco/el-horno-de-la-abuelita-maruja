export type Theme = "light" | "dark";

export type AuthenticationPages = "signIn" | "signUp";

export type Input = {
  name: string,
  type: string,
  label?: string,
  value?: string,
  placeholder: string,
  options?: {value: string, label: string}[],
  required?: boolean
};

export type Select = {
  name: string,
  type: string,
  label?: string,
  value?: string,
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

export type ProductVariant = {
  id: string
  name: string,
  value: number
  offerData: {
    onOffer: "yes" | "no",
    offerType?: "percentage" | "multiplier" | ""
    discountPercentage?: number
    multiplierAmount?: string
  }
};

type Allergens = "gluten" | "lactosa" | "frutos secos" | "huevos" | "soja" | "sésamo";

type Review = {
  id: string
    reviewer: Pick<User, "id" | "username">
    variant?: string
    rating: number
    comment: string
};

export type Product = {
  id: string,
  name: string,
  description: string,
  category: Categories | ""
  image?: string,
  multiPrice: "no" | "yes",
  price: number,
  variants?: ProductVariant[]
  onOffer: string
  offerType?: "percentage" | "multiplier" | ""
  discountPercentage?: number
  multiplierAmount?: string
  allergens?: Allergens[]
  createdAt?: Date
  new?: "no" | "yes"
  rating?: number[]
  reviews?: Review[]
};

export type MinOrder = {
  minOrder: number
};