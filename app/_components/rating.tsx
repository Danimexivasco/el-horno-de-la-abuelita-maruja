import { combine } from "../_utils/combineClassnames";

type RatingProps = {
    rating: number;
    setRating?: React.Dispatch<React.SetStateAction<number>> | (() => void)
};

export default function Rating({ rating, setRating }: RatingProps) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        return (
          <span
            key={star}
            className={combine("text-4xl", rating >= star ? "text-cake-400" : "text-gray-400", setRating && "cursor-pointer")}
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