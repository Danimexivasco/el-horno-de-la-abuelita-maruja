import { MONTHS } from "@/constants";

export function getLastSixMonths(): string[] {
  const currentMonthIndex = new Date().getMonth();
  const lastSixMonths: string[] = [];

  for (let i = 5; i >= 0; i--) {
    const index = (currentMonthIndex - i + 12) % 12;
    lastSixMonths.push(MONTHS[index]);
  }

  return lastSixMonths;
}