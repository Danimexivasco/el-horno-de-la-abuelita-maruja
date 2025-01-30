import { Review } from "@/types";

export const getAverage = (reviews: Review[]) => {
  if (reviews.length <= 0) throw new Error("No hay reviews");

  let output = 0;
  reviews.forEach(review => output += review.rating);

  return Math.round(output / reviews.length);
};