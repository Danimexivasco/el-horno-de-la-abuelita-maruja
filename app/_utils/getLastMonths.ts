import { MONTHS } from "@/constants";

export function getLastMonths( months: number = 12): string[] {
  const currentMonthIndex = new Date().getMonth();
  const lastMonths = [];

  for (let i = months - 1 ; i >= 0; i--) {
    const index = (currentMonthIndex - i + 12) % 12;
    lastMonths.push(MONTHS[index]);
  }

  return lastMonths;
}