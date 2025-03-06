import {
  collection,
  doc,
  addDoc,
  getDoc,
  query,
  where,
  getDocs
} from "firebase/firestore";
import { db } from "@/libs/firebase/config";
import { NewOrder, Order } from "@/types";
import { showMsg } from "@/utils/showMsg";
import { getAuth } from "firebase/auth";
import { API_ROUTES } from "@/apiRoutes";

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

export const getPendingOrderByCustomerId = async (customerId: string): Promise<Order[]> => {
  const ordersRef = collection(db, "orders");
  const q = query(
    ordersRef,
    where("customerId", "==", customerId),
    where("state", "==", "pending")
  );

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id
  })) as Order[];
};

export const createOrder = async (data: NewOrder) => {
  try {
    const newDocRef = await addDoc(_collection, data);

    return newDocRef?.id;
  } catch {
    showMsg("Algo ha ido mal", "error");
  }
};

export const updateOrder = async (id: string, data: Partial<Order>) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) throw new Error("No hay pedido autenticado");

    const token = await user.getIdToken();

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

    const token = await user.getIdToken();

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