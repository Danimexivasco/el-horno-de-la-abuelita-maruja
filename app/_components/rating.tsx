import { combine } from "../_utils/combineClassnames";

type RatingProps = {
    rating: number;
    setRating?: React.Dispatch<React.SetStateAction<number | null>> | (() => void)
    size?: "small" | "big"
    className?: string
};

export default function Rating({ rating, setRating, size = "big", className }: RatingProps) {
  return (
    <div className={combine("flex gap-1", className)}>
      {[1, 2, 3, 4, 5].map((star) => {
        return (
          <span
            key={star}
            className={combine(size === "small" ? "text-2xl" : "text-4xl", rating >= star ? "text-cake-400" : "text-gray-400", setRating && "cursor-pointer")}
            onClick={ setRating ? () => {
              setRating(star);
            } : () => {}}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}