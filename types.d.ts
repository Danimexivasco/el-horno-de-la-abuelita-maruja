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

type UserRoles = "customer" | "admin";

export type User = {
  id: string,
  email: string
  username?: string
  createdAt: Date | Timestamp
  photoURL?: string
  emailVerified?: boolean
  role?: UserRoles
  cart?: Cart
};

type Categories = "tartas" | "galletas" | "bizcochos";

type OfferTypes = "percentage" | "multiplier" | "";

export type ProductVariant = {
  id: string
  name: string,
  value: number
  offerData: {
    onOffer: "yes" | "no",
    offerType?: OfferTypes
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
    photoURL?: User["photoURL"]
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
  onOffer: "yes" | "no"
  offerType?: OfferTypes
  discountPercentage?: number
  multiplierAmount?: string
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
  variantId?: ProductVariant["id"]
  variantName?: ProductVariant["name"]
  price: {
    base: number,
    offer?: number,
    discount?: {
      type: OfferTypes
      label: string
    }
  }
  product: Product
  addedAt: number
};

type Cart = CartItem[];

type OrderProduct = {
  id: Product["id"],
  name: Product["name"],
  image?: Product["image"],
  variantId?: ProductVariant["id"]
  variantName?: ProductVariant["name"]
  quantity: number
  unitPrice: number
  priceToPay: number
  // TODO: Replace priceToPay and unitPrice with price
  // price: {
  //   base: number,
  //   offer?: number,
  //   discount?: {
  //     type: OfferTypes
  //     label: string
  //   }
  // }
};

type Order = {
  id: string,
  customerId: User["id"]
  products: OrderProduct[]
  state: OrderStatus
  deliveryStatus: DeliveryStatus
  paidAt?: number
  customerEmail: string
  createdAt: number
  updatedAt?: number
  trackingNumber?: string
  customerEmail: User["email"]
  [key: string]: any
};

type NewOrder = Omit<Order, "id">;