"use client";

import Alert from "@/app/_components/alert";
import Button from "@/app/_components/button";
import { Trash } from "lucide-react";
import { deleteOrder } from "../_libs/firebase/orders";
import { showMsg } from "../_utils/showMsg";
import { useRouter } from "next/navigation";
import { ADMIN_ORDERS_PATH } from "@/routes";

type OrderActionsProps = {
  orderId: string
};

export default function OrderActions({ orderId }: OrderActionsProps) {
  const router = useRouter();

  const handleDelete = (id: string) => async () => {
    try {
      await deleteOrder(id);
      router.push(ADMIN_ORDERS_PATH);
    } catch {
      showMsg("Hubo un error eliminando la orden", "error");
    }

  };

  return (
    <div className="flex gap-4 lg:gap-6">
      <Alert
        title="Eliminar orden"
        description="¿Seguro que deseas eliminar la orden? Esta acción no se puede deshacer."
        triggerElement={
          <Button
            withIcon
            isRed
            title="Eliminar orden"
          >
            <Trash /> Eliminar
          </Button>
        }
        cancelElement={<Button>Cancelar</Button>}
        actionElement={
          <Button
            isRed
            onClick={handleDelete(orderId)}
          >Sí, eliminar
          </Button>
        }
      />
    </div>
  );
}