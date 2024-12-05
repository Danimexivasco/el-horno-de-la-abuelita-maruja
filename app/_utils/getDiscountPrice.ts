export const getDiscountPrice = (price: number, discountPercentage: number) => {
  const discountAmount = price * (discountPercentage / 100);
  const discountedPrice = price - discountAmount;
  return Math.round(discountedPrice * 100) / 100;
};