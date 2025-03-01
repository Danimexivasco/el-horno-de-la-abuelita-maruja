import { Order } from "@/types";
import { getLastSixMonths } from "./getLastSixMonths";
import { MONTHS } from "@/constants";
import { OrderStatus } from "@/enums";

export function groupOrdersByMonth(orders: Order[]) {
  const lastSixMonths = getLastSixMonths();

  const monthlySales: { [key: string]: number } = {};

  orders?.forEach(order => {
    const date = new Date(order.createdAt);
    const monthName = MONTHS[date.getMonth()];

    if (!lastSixMonths.includes(monthName)) return;

    const totalOrderValue = order.state === OrderStatus.COMPLETED ? order.products.reduce((sum, product) => sum + product.priceToPay, 0) : 0;

    if (!monthlySales[monthName]) {
      monthlySales[monthName] = 0;
    }

    monthlySales[monthName] += totalOrderValue;
  });

  // TODO: adapt the return depending on the needs
  return lastSixMonths.map(month => ({
    month,
    totalSales: monthlySales[month] ?? 0
  }));
}