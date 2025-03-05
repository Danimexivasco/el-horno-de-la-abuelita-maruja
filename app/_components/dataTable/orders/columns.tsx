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
import { ArrowUpDown, Eye, MoreHorizontal, Trash } from "lucide-react";
import { Order } from "@/types";
import { getFormatedDate } from "@/app/_utils/getFormatedDate";
import { showMsg } from "@/app/_utils/showMsg";
import { formatNumber } from "@/app/_utils/formatNumber";
import Link from "../../link";
import { ADMIN_ORDER_DETAIL_PATH } from "@/routes";
import Select from "../../select";
import { DeliveryStatus, OrderStatus } from "@/enums";
import { useState } from "react";
import Alert from "../../alert";
import { deleteOrder, updateOrder } from "@/app/_libs/firebase/orders";
import { useRouter } from "next/navigation";

export const ordersColumns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header:      "Id del pedido",
    cell:        ({ row }) => row.original.id.slice(0, 10).concat("...")
  },
  {
    accessorKey: "customerId",
    header:      "Id del cliente",
    cell:        ({ row }) => row.original.customerId.slice(0, 10).concat("...")
  },
  {
    accessorKey: "state",
    header:      "Estado",
    cell:        ({ row }) => {
      const order = row.original;
      const [status, setStatus] = useState(order.state);
      const router = useRouter();

      return <Select
        options={
          [
            {
              value: OrderStatus.PENDING,
              label: OrderStatus.PENDING
            },
            {
              value: OrderStatus.COMPLETED,
              label: OrderStatus.COMPLETED
            }
          ]}
        value={status}
        onChange={async (e) => {
          const newState = e.currentTarget.value;
          await updateOrder(order.id, {
            state: newState
          });
          setStatus(newState);
          router.refresh();
        }
        }
      />;
    }
  },
  {
    accessorKey: "deliveryStatus",
    header:      "Estado del envío",
    cell:        ({ row }) => {
      const order = row.original;
      const [deliveryStatus, setDeliveryStatus] = useState(order.deliveryStatus ?? "Desconocido");
      const router = useRouter();

      return <Select
        options={
          [
            {
              value: DeliveryStatus.FOR_DELIVERY,
              label: DeliveryStatus.FOR_DELIVERY
            },
            {
              value: DeliveryStatus.IN_TRANSIT,
              label: DeliveryStatus.IN_TRANSIT
            },
            {
              value: DeliveryStatus.DELIVERED,
              label: DeliveryStatus.DELIVERED
            }
          ]}
        value={deliveryStatus}
        onChange={async (e) => {
          const newState = e.currentTarget.value;
          await updateOrder(order.id, {
            deliveryStatus: newState
          });
          setDeliveryStatus(newState);
          router.refresh();
        }
        }
      />;
    }
  },
  {
    accessorKey: "createdAt",
    cell:        ({ row }) => getFormatedDate(row.original.createdAt),
    header:      ({ column }) => {
      return (
        <div
          className="flex items-center gap-2 hover:bg-cake-200 hover:dark:bg-cake-800 px-2 py-1 rounded-md w-fit select-none -translate-x-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          role="button"
        >
          <p>Creado</p>
          <ArrowUpDown
            size={16}
            className="h-4 min-w-4"
          />
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
          className="flex items-center gap-2 hover:bg-cake-200 hover:dark:bg-cake-800 px-2 py-1 rounded-md w-fit select-none -translate-x-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          role="button"
        >
          <p>Precio total</p>
          <ArrowUpDown
            size={16}
            className="h-4 min-w-4"
          />
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
                showMsg("ID del pedido copiado", "success");
              }}
            >
              Copiar ID del pedido
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
                <Eye size={16}/> Ver detalles
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="dark:bg-red-600 hover:dark!bg-red-700 dark:text-white bg-red-400 hover:!bg-red-500"
            >
              <Alert
                title="Eliminar pedido"
                description="¿Seguro que deseas eliminar el pedido? Esta acción no se puede deshacer."
                triggerElement={
                  <p
                    className="flex items-center justify-center gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Trash size={16}/> Eliminar pedido
                  </p>}
                cancelElement={<Button>Cancelar</Button>}
                actionElement={
                  <Button
                    isRed
                    onClick={() => deleteOrder(order.id)}
                  >Sí, eliminar
                  </Button>
                }
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];
