export const getDiscountPrice = (price: number, discountPercentage: number) => {
  const intPrice = Number(price);
  const intDiscountPercentage = Number(discountPercentage);
  if (typeof intPrice !== "number" || typeof intDiscountPercentage !== "number") return NaN;
  const discountAmount = intPrice * (intDiscountPercentage / 100);
  const discountedPrice = intPrice - discountAmount;
  return Math.round(discountedPrice * 100) / 100;
};