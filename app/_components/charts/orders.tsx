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

const mockChartData = [
  {
    "month":        "Abril",
    "for_delivery": 5,
    "in_transit":   3,
    "delivered":    10
  },
  {
    "month":        "Mayo",
    "for_delivery": 2,
    "in_transit":   7,
    "delivered":    5
  },
  {
    "month":        "Junio",
    "for_delivery": 8,
    "in_transit":   1,
    "delivered":    12
  },
  {
    "month":        "Julio",
    "for_delivery": 4,
    "in_transit":   9,
    "delivered":    6
  },
  {
    "month":        "Agosto",
    "for_delivery": 1,
    "in_transit":   6,
    "delivered":    11
  },
  {
    "month":        "Septiembre",
    "for_delivery": 9,
    "in_transit":   2,
    "delivered":    8
  },
  {
    "month":        "Octubre",
    "for_delivery": 6,
    "in_transit":   10,
    "delivered":    4
  },
  {
    "month":        "Noviembre",
    "for_delivery": 3,
    "in_transit":   5,
    "delivered":    9
  },
  {
    "month":        "Diciembre",
    "for_delivery": 11,
    "in_transit":   8,
    "delivered":    2
  },
  {
    "month":        "Enero",
    "for_delivery": 7,
    "in_transit":   4,
    "delivered":    1
  },
  {
    "month":        "Febrero",
    "for_delivery": 10,
    "in_transit":   12,
    "delivered":    3
  },
  {
    "month":        "Marzo",
    "for_delivery": 12,
    "in_transit":   11,
    "delivered":    7
  }
];

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
  // TODO: Set correct chartData
  const lastMonths = getLastMonths(isPreview ? 6 : 12);
  const chartData = groupOrdersByMonth(orders, isPreview ? 6 : 12);
  // TODO: remove logs, just to avoid TS error
  console.log("chartData", chartData);

  return (
    <Card className={combine("w-full shadow-lg", className)}>
      <CardHeader>
        <CardTitle>
          Pedidos (mockData)
        </CardTitle>
        <CardDescription>{lastMonths[0]} - {lastMonths[lastMonths.length - 1]} {new Date().getFullYear()}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={mockChartData}
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
              dataKey="for_delivery"
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
              dataKey="in_transit"
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
              dataKey="delivered"
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
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          {isPreview ? "Datos de los últimos 6 meses" : "Datos del ultimo año"}
        </div>
      </CardFooter> */}
    </Card>
  );
}
