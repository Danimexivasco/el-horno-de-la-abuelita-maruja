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
  CardFooter,
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
  const lastSixMonths = getLastMonths(6);
  const chartData = groupOrdersByMonth(orders, 6);

  return (
    <Card className="w-full">
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
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {/* <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div> */}
        <div className="leading-none text-muted-foreground">
          Datos de los últimos 6 meses
        </div>
      </CardFooter>
    </Card>
  );
}
