import { Order } from "@/types";
import { getLastMonths } from "./getLastMonths";
import { MONTHS } from "@/constants";
import { DeliveryStatus } from "@/enums";

/*TODO: adapt to return structured data as below
{
    "month":        "Marzo",
    "for_delivery": 12,
    "in_transit":   11,
    "delivered":    7
  }
*/
export function groupOrdersByMonth(orders: Order[], months: number = 12) {
  const lastMonths = getLastMonths(months);

  const monthlyOrders: { [key: string]: { [key: string]: number } } = {};

  MONTHS.forEach(month => {
    monthlyOrders[month] = {
      [DeliveryStatus.FOR_DELIVERY]: 0,
      [DeliveryStatus.IN_TRANSIT]:   0,
      [DeliveryStatus.DELIVERED]:    0
    };
  });

  orders?.forEach(order => {
    const date = new Date(order.createdAt);
    const monthName = MONTHS[date.getMonth()];

    if (!lastMonths.includes(monthName)) return;

    if (monthlyOrders[monthName]) {
      monthlyOrders[monthName] = {
        ...monthlyOrders[monthName],
        ...(order.deliveryStatus && {
          [order.deliveryStatus]: monthlyOrders[monthName][order.deliveryStatus] + 1
        })
      };
    }
  });

  return lastMonths.map(month => ({
    month,
    orders: monthlyOrders[month]
  }));
}