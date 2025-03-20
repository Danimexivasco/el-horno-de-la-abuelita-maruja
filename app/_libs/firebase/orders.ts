import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/libs/firebase/config";
import { NewOrder, Order } from "@/types";
import { showMsg } from "@/utils/showMsg";
import { getAuth } from "firebase/auth";
import { API_ROUTES } from "@/apiRoutes";
import { getApiBaseUrl } from "@/app/_utils/getApiBaseUrl";

const _collection = collection(db, "orders");

export const getOrder = async (id: string): Promise<Order> => {
  const orderDoc = doc(db, "orders", id);
  const snapshot = await getDoc(orderDoc);
  return snapshot.data() as Order;
};

export const getOrders = async (): Promise<Order[]> => {
  try {
    const querySnapshot = await getDocs(_collection);
    const orders = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    })) as Order[];

    return orders;
  } catch {
    throw new Error("Ha ocurrido un error al obtener los pedidos");
  }
};

export const getPendingOrderByCustomerId = async (customerId: string): Promise<Order[] | null> => {
  try {
    const response = await fetch(`${getApiBaseUrl()}${API_ROUTES.PENDING_ORDER.replace(":customerId", customerId)}`, {
      method: "GET"
    });

    if (!response.ok) {
      throw new Error("Error al obtener ordenes pendientes");
    }

    return await response.json();
  } catch {
    throw new Error("Error al obtener ordenes pendientes");
  }
};

export const createOrder = async (data: NewOrder) => {
  try {
    const response = await fetch(API_ROUTES.CREATE_ORDER, {
      method:  "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error("Failed to create order");
    }

    const result = await response.json();
    return result.orderId;
  } catch {
    showMsg("Algo ha ido mal", "error");
    return null;
  }
};

export const updateOrder = async (id: string, data: Partial<Order>) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) throw new Error("No hay usuario autenticado");

    const token = await user.getIdToken(true);

    const response = await fetch(API_ROUTES.ORDER.replace(":id", id), {
      method:  "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data,
        token
      })
    });

    const resData = await response.json();

    if (!resData.success) {
      showMsg(resData.message, "error");
      return;
    }

    showMsg(resData.message, "success");

    return id;

  } catch {
    showMsg("Hubo un error actualizando la orden", "error");
    throw new Error("Hubo un error actualizando la orden");
  }
};

export const deleteOrder = async (id: string) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) throw new Error("No hay usuario autenticado");

    const token = await user.getIdToken(true);

    const response = await fetch(API_ROUTES.ORDER.replace(":id", id), {
      method:  "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token
      })
    });

    const data = await response.json();

    if (!data.success) {
      showMsg(data.message, "error");
      return;
    }
    showMsg(data.message, "success");
  } catch {
    showMsg("Hubo un error eliminando la orden", "error");
    throw new Error("Hubo un error eliminando la orden");
  }
};
