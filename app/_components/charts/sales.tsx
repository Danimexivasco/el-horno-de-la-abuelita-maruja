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
import { groupSalesByMonth } from "@/app/_utils/groupSalesByMonth";

const chartConfig = {
  totalSales: {
    label: "Ventas",
    color: "hsl(var(--cake))"
  }
} satisfies ChartConfig;

type OrdersChartProps = {
  orders: Order[]
  isPreview?: boolean
};

export default function SalesChart({ orders, isPreview = false }: OrdersChartProps) {
  const lastSixMonths = getLastMonths(isPreview ? 6 : 12);
  const chartData = groupSalesByMonth(orders, isPreview ? 6 : 12);

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle>
          Ventas
        </CardTitle>
        <CardDescription>{lastSixMonths[0]} - {lastSixMonths[lastSixMonths.length - 1]} {new Date().getFullYear()}</CardDescription>
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
              dataKey="totalSales"
              fill="var(--color-totalSales)"
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
