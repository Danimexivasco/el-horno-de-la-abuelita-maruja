
export const formatPrice = (price: number, locale: string = "es-ES") => new Intl.NumberFormat(locale, {
  style:    "currency",
  currency: "EUR"
}).format(price);