"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/app/_components/shadcn/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/app/_components/shadcn/chart";
import { Order } from "@/types";
import { getLastMonths } from "@/app/_utils/getLastMonths";
import { groupOrdersByMonth } from "@/app/_utils/groupOrdersByMonth";
import { combine } from "@/app/_utils/combineClassnames";

const chartConfig = {
  "for_delivery": {
    label: "Para entregar",
    color: "hsl(var(--chart-1))"
  },
  "in_transit": {
    label: "En tránsito",
    color: "hsl(var(--chart-2))"
  },
  "delivered": {
    label: "Entregados",
    color: "hsl(var(--cake))"
  }
} satisfies ChartConfig;

type OrdersChartProps = {
  orders: Order[]
  isPreview?: boolean
  className?: string
};

export default function OrdersChart({ orders, isPreview = false, className }: OrdersChartProps) {
  const lastMonths = getLastMonths(isPreview ? 6 : 12);
  const chartData = groupOrdersByMonth(orders, isPreview ? 6 : 12);

  return (
    <Card className={combine("w-full shadow-lg", className)}>
      <CardHeader>
        <CardTitle>
          Pedidos
        </CardTitle>
        <CardDescription>{lastMonths[0]} - {lastMonths[lastMonths.length - 1]} {new Date().getFullYear()}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20
            }}
          >
            <CartesianGrid vertical={false} />
            {isPreview ? null :
              <YAxis
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value}
              />
            }
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Bar
              dataKey="orders.for_delivery"
              fill="var(--color-for_delivery)"
              radius={8}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
            <Bar
              dataKey="orders.in_transit"
              fill="var(--color-in_transit)"
              radius={8}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
            <Bar
              dataKey="orders.delivered"
              fill="var(--color-delivered)"
              radius={8}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
