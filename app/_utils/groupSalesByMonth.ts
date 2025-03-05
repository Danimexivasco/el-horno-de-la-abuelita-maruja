import { Order } from "@/types";
import { getLastMonths } from "./getLastMonths";
import { MONTHS } from "@/constants";
import { OrderStatus } from "@/enums";

export function groupSalesByMonth(orders: Order[], months: number = 12) {
  const lastMonths = getLastMonths(months);

  const monthlySales: { [key: string]: number } = {};

  orders?.forEach(order => {
    const date = new Date(order.createdAt);
    const monthName = MONTHS[date.getMonth()];

    if (!lastMonths.includes(monthName)) return;

    const totalOrderValue = order.state === OrderStatus.COMPLETED ? order.products.reduce((sum, product) => sum + product.priceToPay, 0) : 0;

    if (!monthlySales[monthName]) {
      monthlySales[monthName] = 0;
    }

    monthlySales[monthName] += totalOrderValue;
  });

  return lastMonths.map(month => ({
    month,
    totalSales: monthlySales[month] ?? 0
  }));
}