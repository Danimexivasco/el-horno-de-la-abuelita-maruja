
export const formatNumber = (number: number, type: "currency" | "percent" = "currency", locale: string = "es-ES" ) => new Intl.NumberFormat(locale, {
  style:    type,
  currency: "EUR"
}).format(type !== "percent" ? number : number / 100);