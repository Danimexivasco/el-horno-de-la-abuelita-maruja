"use client";

import { useEffect, useRef, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/shadcn/table";
import { Button } from "../../shadcn/button";
import Input from "../../input";
import { CrossIcon, LensIcon } from "@/app/_icons";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { combine } from "@/app/_utils/combineClassnames";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "../../shadcn/dropdown-menu";

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
};

export default function OrdersDataTable<TData, TValue>({
  columns,
  data
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const searchRef = useRef<HTMLInputElement>(null);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel:          getCoreRowModel(),
    getPaginationRowModel:    getPaginationRowModel(),
    onSortingChange:          setSorting,
    getSortedRowModel:        getSortedRowModel(),
    onColumnFiltersChange:    setColumnFilters,
    getFilteredRowModel:      getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state:                    {
      sorting,
      columnFilters,
      columnVisibility
    }
  });

  const keydownHandler = (e: KeyboardEvent) => {
    if(e.key === "g" && e.ctrlKey) {
      e.preventDefault();
      searchRef.current?.focus();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keydownHandler);
    return () => {
      document.removeEventListener("keydown", keydownHandler);
    };
  }, []);

  return (
    <div>
      <div className="flex flex-wrap gap-8 items-center mb-6">
        <div
          className="flex-1 lg:max-w-sm flex justify-center items-center bg-white rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-cake-600 shadow-md"
        >
          <LensIcon className="w-6 h-6 dark:text-cake-400 text-cake-600"/>
          <Input
            name="idFilter"
            type="text"
            placeholder="Filtra por ID de la orden..."
            value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("id")?.setFilterValue(event.target.value)
            }
            className="flex-1 focus:ring-0 !appearance-none peer"
            ref={searchRef}
          />
          {columnFilters.find((columnFilter) => columnFilter.id === "id") ?
            <CrossIcon
              className="w-6 h-6 dark:text-cake-400 text-cake-600"
              role="button"
              onClick={() => setColumnFilters([])}
            />
            :
            <span
              title="Press Ctrl + G activate the search"
              className="hidden lg:block text-gray-400/90 border-2 border-gray-400/20 px-2 py-1 rounded-lg peer-focus:hidden shadow-sm"
            >Ctrl + G
            </span>
          }
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="ml-auto"
            >
              Columnas
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(
                (column) => column.getCanHide()
              )
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border border-cake-600 dark:bg-cake-900 bg-cake-100">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No hay resultados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className={combine("flex items-center justify-end space-x-2 py-4", (!table.getCanPreviousPage() && !table.getCanNextPage()) && "hidden")}>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft /> Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Siguiente <ChevronRight />
        </Button>
      </div>
    </div>
  );
}