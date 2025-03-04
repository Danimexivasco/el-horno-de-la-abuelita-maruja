"use client";

import { ColumnDef } from "@tanstack/react-table";

import Button from "@/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/shadcn/dropdown-menu";
import { ArrowUpDown, Edit, MoreHorizontal } from "lucide-react";
import { Order } from "@/types";
import { getFormatedDate } from "@/app/_utils/getFormatedDate";
import { showMsg } from "@/app/_utils/showMsg";
import { formatNumber } from "@/app/_utils/formatNumber";
import Link from "../../link";
import { ADMIN_ORDER_DETAIL_PATH } from "@/routes";

export const ordersColumns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header:      "Id de la orden",
    cell:        ({ row }) => row.original.id.slice(0, 10).concat("...")
  },
  {
    accessorKey: "customerId",
    header:      "Id del cliente",
    cell:        ({ row }) => row.original.id.slice(0, 10).concat("...")
  },
  {
    accessorKey: "state",
    header:      "Estado"
  },
  {
    accessorKey: "deliveryStatus",
    header:      "Estado del envío",
    cell:        ({ row }) => row.original?.deliveryStatus ?? "Desconocido"
  },
  {
    accessorKey: "createdAt",
    cell:        ({ row }) => getFormatedDate(row.original.createdAt),
    header:      ({ column }) => {
      return (
        <div
          className="flex hover:bg-cake-200 hover:dark:bg-cake-800 px-2 py-1 rounded-md w-fit select-none -translate-x-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          role="button"
        >
          <p>Creado</p>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    }
  },
  {
    accessorKey: "totals.units",
    header:      "Artículos totales"
  },
  {
    accessorKey: "totals.price",
    header:      ({ column }) => {
      return (
        <div
          className="flex hover:bg-cake-200 hover:dark:bg-cake-800 px-2 py-1 rounded-md w-fit select-none -translate-x-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          role="button"
        >
          <p>Precio total</p>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => formatNumber(row.original.totals.price)
  },
  {
    id:           "actions",
    enableHiding: false,
    cell:         ({ row }) => {
      const order = row.original;

      // TODO: Add delete order action
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              title="Desplegar acciones"
              transparent
              className="h-8 w-8 p-0 grid place-items-center"
            >
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(order.id);
                showMsg("ID de la orden copiado", "success");
              }}
            >
              Copiar ID de la orden
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(order.customerId);
                showMsg("ID del cliente copiado", "success");
              }}
            >
              Copiar ID del cliente
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="dark:bg-cake-600 hover:dark!bg-cake-700 bg-cake-400 hover:!bg-cake-500 hover:cursor-pointer p-0">
              <Link
                href={ADMIN_ORDER_DETAIL_PATH.replace(":id", order.id)}
                className="no-underline dark:!text-white !text-black flex items-center gap-2 px-2 py-1.5 w-full"
              >
                <Edit size={16}/> Editar orden
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];
