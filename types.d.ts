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

type Allergens = "gluten" | "lactosa" | "frutos secos" | "huevo" | "soja" | "sésamo" | "cacahuetes";

type Review = {
  id: string
  reviewer: {
    id: User["id"]
    username: User["username"]
    photoURL: User["photoURL"]
  }
  variant?: string
  rating: number
  comment: string
  createdAt: number
  updatedAt?: number
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
  multiplierAmount?: strings
  allergens?: Allergens[]
  createdAt?: Date | number
  new?: "no" | "yes"
  rating?: number[]
  reviews?: Review[]
};

export type MinOrder = {
  minOrder: number
};

type CartItem = {
  id: Product["id"] | ProductVariant["id"]
  quantity: number
  variant?: Productvariant["name"]
  price: {
    base: number,
    offer?: number,
    discount?: string
  }
  product: Product
  addedAt: number
};

type Cart = CartItem[];