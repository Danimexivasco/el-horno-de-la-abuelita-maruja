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
import { User } from "@/types";
import { getFormatedDate } from "@/app/_utils/getFormatedDate";
import { showMsg } from "@/app/_utils/showMsg";
import Select from "../../select";
import { updateUser } from "@/app/_libs/firebase/users";
import Alert from "../../alert";
import { getAuth } from "firebase/auth";

const updateDbUser = async (id: string, data: {role: string}) => {
  try {
    await updateUser(id, data, true);
    setTimeout(() => window.location.reload(), 1500);
  } catch {
    throw new Error("Hubo un error actualizando al usuario");
  }
};

const deleteUser = (uid: string) => async () => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) throw new Error("No hay usuario autenticado");

    const token = await user.getIdToken();
    const response = await fetch("/api/user", {
      method:  "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        uid,
        token
      })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Error al eliminar al usuario");

    showMsg(data.message, "success");
    setTimeout(() => window.location.reload(), 1500);
  } catch (error: any) {
    showMsg(error.message, "error");
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
        value={row.original.role}
        onChange={async (e) => await updateDbUser(user.id, {
          role: e.currentTarget.value
        })}
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
                    onClick={deleteUser(user.id)}
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
