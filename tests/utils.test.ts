import { describe, expect, it } from "vitest";
import { getAverage } from "@/app/_utils/getAverage";
import { Review } from "@/types";

const mockReviews: Review[] = [
  {
    id:       "S7azdDVyVLzR3YHgdRZg",
    reviewer: {
      id:       "reviewer-id-1",
      username: "oneUserToRuleThemAll"
    },
    variant:   "xs",
    rating:    5,
    comment:   "Unas galletas super ricas",
    createdAt: 1738154020874
  },
  {
    id:       "S7azdDVyVLzR3YHgdRZg",
    reviewer: {
      id:       "reviewer-id-1",
      username: "oneUserToRuleThemAll"
    },
    variant:   "xs",
    rating:    2,
    comment:   "Unas galletas super ricas",
    createdAt: 1738154020874
  }
];

describe("getAverage.ts", () => {
  it("shuould be a function", () => {
    expect(typeof getAverage).toBe("function");
  });

  it("should throw an error if there are no reviews", () => {
    expect(() => getAverage([])).toThrowError("No hay reviews");
  });

  it ("should return a number", () => {
    expect(getAverage(mockReviews)).toBeTypeOf("number");
  });

  it("should return the rounded average rating", () => {
    expect(getAverage(mockReviews)).toBe(4);
  });
});