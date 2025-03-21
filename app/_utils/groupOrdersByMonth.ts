import { Order } from "@/types";
import { getLastMonths } from "./getLastMonths";
import { MONTHS } from "@/constants";
import { DeliveryStatus } from "@/enums";

export function groupOrdersByMonth(orders: Order[], months: number = 12) {
  const lastMonths = getLastMonths(months);

  const monthlyOrders: { [key: string]: { [key: string]: number } } = {};

  MONTHS.forEach(month => {
    monthlyOrders[month] = {
      [DeliveryStatus.FOR_DELIVERY.replace(" ", "_")]: 0,
      [DeliveryStatus.IN_TRANSIT.replace(" ", "_")]:   0,
      [DeliveryStatus.DELIVERED.replace(" ", "_")]:    0
    };
  });

  orders?.forEach(order => {
    const date = new Date(order.createdAt);
    const monthName = MONTHS[date.getMonth()];
    const deliveryStatus = order.deliveryStatus?.replace(" ", "_");

    if (!lastMonths.includes(monthName)) return;

    if (monthlyOrders[monthName]) {
      monthlyOrders[monthName] = {
        ...monthlyOrders[monthName],
        ...(order.deliveryStatus && {
          [deliveryStatus]: monthlyOrders[monthName][deliveryStatus] + 1
        })
      };
    }
  });

  return lastMonths.map(month => ({
    month,
    orders: monthlyOrders[month]
  }));
}