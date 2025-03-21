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
import { ArrowUpDown, MoreHorizontal, Trash } from "lucide-react";
import { User, UserRoles } from "@/types";
import { getFormatedDate } from "@/app/_utils/getFormatedDate";
import { showMsg } from "@/app/_utils/showMsg";
import Select from "../../select";
import { deleteUser, updateUser } from "@/app/_libs/firebase/users";
import Alert from "../../alert";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setUserRole } from "@/app/_libs/firebase/auth";

// TODO: refactor this as service in app\_libs\firebase\users.ts
const updateDbUser = async (id: string, data: {role: string}) => {
  try {
    await updateUser(id, data, true);
  } catch {
    throw new Error("Hubo un error actualizando al usuario");
  }
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "username",
    header:      "Nombre de usuario"
  },
  {
    accessorKey: "email",
    header:      ({ column }) => {
      return (
        <div
          className="flex hover:bg-cake-200 hover:dark:bg-cake-800 px-2 py-1 rounded-md w-fit select-none -translate-x-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          role="button"
        >
          <p>Email</p>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    }
  },
  {
    accessorKey: "emailVerified",
    header:      "Email verificado",
    cell:        ({ row }) => row.original.emailVerified ? "✅" : "❌"
  },
  {
    accessorKey: "role",
    header:      "Rol",
    cell:        ({ row }) => {
      const user = row.original;
      const [role, setRole] = useState(user.role);
      return <Select
        options={
          [
            {
              value: "admin",
              label: "Admin"
            },
            {
              value: "customer",
              label: "Customer"
            }
          ]}
        value={role}
        onChange={async (e) => {
          const newState = e.currentTarget.value;

          await setUserRole(user.id, newState === "admin" ? "admin" : "customer");

          await updateDbUser(user.id, {
            role: newState
          });

          setRole(newState as UserRoles);
        }}
      />;
    }
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
    accessorKey: "id",
    header:      "Id",
    cell:        ({ row }) => row.original.id.slice(0, 10).concat("...")
  },
  {
    id:   "actions",
    cell: ({ row }) => {
      const user = row.original;
      const router = useRouter();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              title="Desplegar acciones"
              transparent
              className="h-8 w-8 p-0 grid place-items-center"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(user.email);
                showMsg("Email copiado", "success");
              }}
            >
              Copiar email
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(user.id);
                showMsg("Id copiado", "success");
              }}
            >
              Copiar id del usuario
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="dark:bg-red-600 hover:dark!bg-red-700 dark:text-white bg-red-400 hover:!bg-red-500"
            >
              <Alert
                title="Eliminar usuario"
                description="¿Seguro que deseas eliminar el usuario? Esta acción no se puede deshacer."
                triggerElement={
                  <p
                    className="flex items-center justify-center gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Trash size={16}/> Eliminar usuario
                  </p>}
                cancelElement={<Button>Cancelar</Button>}
                actionElement={
                  <Button
                    isRed
                    onClick={async () => {
                      await deleteUser(user.id);
                      router.refresh();
                    }}
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
