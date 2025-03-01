import { Order } from "@/types";

export function groupBy(items: Order[], param: string): Record<string, Order[]> {
  if (!param) throw new Error("Param is required");

  return items.reduce((acc, item) => {
    if (!acc[item[param]]) {
      acc[item[param]] = [];
    }
    acc[item[param]].push(item);
    return acc;
  }, {} as Record<string, Order[]>);
}