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
import { Eye, MoreHorizontal } from "lucide-react";
import { OrderProduct } from "@/types";
import { showMsg } from "@/app/_utils/showMsg";
import { formatNumber } from "@/app/_utils/formatNumber";
import Link from "../../link";
import { PRODUCT_DETAIL_PATH } from "@/routes";

export const orderProductsColumn: ColumnDef<OrderProduct>[] = [
  {
    accessorKey: "id",
    header:      "Id",
    cell:        ({ row }) => row.original.id.slice(0, 10).concat("...")
  },
  {
    accessorKey: "name",
    header:      "Nombre"
  },
  {
    accessorKey: "quantity",
    header:      "Cantidad"
  },
  {
    accessorKey: "unitPrice",
    header:      "Precio unitario",
    cell:        ({ row }) => formatNumber(row.original.unitPrice)
  },
  {
    accessorKey: "priceToPay",
    header:      "Precio total",
    cell:        ({ row }) => formatNumber(row.original.priceToPay)
  },
  {
    id:           "actions",
    enableHiding: false,
    cell:         ({ row }) => {
      const product = row.original;
      // TODO: FIX Ver producto link, the coming id is not correct
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
                navigator.clipboard.writeText(product.id);
                showMsg("ID de la orden copiado", "success");
              }}
            >
              Copiar ID del producto
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="dark:bg-cake-600 hover:dark!bg-cake-700 bg-cake-400 hover:!bg-cake-500 hover:cursor-pointer p-0">
              <Link
                href={PRODUCT_DETAIL_PATH.replace(":id", product.id)}
                className="no-underline dark:!text-white !text-black flex items-center gap-2 px-2 py-1.5 w-full"
              >
                <Eye size={16}/> Ver producto
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];
