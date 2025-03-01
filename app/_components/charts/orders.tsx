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
const chartData = [
  {
    month:   "January",
    desktop: 186
  },
  {
    month:   "February",
    desktop: 305,
    mobile:  100
  },
  {
    month:   "March",
    desktop: 237
  },
  {
    month:   "April",
    desktop: 73
  },
  {
    month:   "May",
    desktop: 209
  },
  {
    month:   "June",
    desktop: 214
  }
];

const chartConfig = {
  desktop: {
    label: "Pedidos",
    color: "hsl(var(--cake))"

  }
} satisfies ChartConfig;

type OrdersChartProps = {
  orders: Order[]
  isPreview?: boolean
};

export default function OrdersChart({ orders, isPreview = false }: OrdersChartProps) {
  // TODO: Set correct chartData
  // TODO: remove log, just to avoid TS error
  console.log("orders", orders);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          Pedidos
        </CardTitle>
        <CardDescription>January - June 2024</CardDescription>
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
              dataKey="desktop"
              fill="var(--color-desktop)"
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
