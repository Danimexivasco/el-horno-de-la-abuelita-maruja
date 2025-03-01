import {
  collection,
  doc,
  addDoc,
  DocumentData,
  getDoc,
  query,
  where,
  getDocs,
  updateDoc,
  deleteDoc
} from "firebase/firestore";
import { db } from "@/libs/firebase/config";
import { NewOrder, Order } from "@/types";
import { showMsg } from "@/utils/showMsg";

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
    where("state", "==", "pending") // Filtering only pending orders
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

export const updateOrder = async (id: string, data: Order | DocumentData) => {
  const orderDoc = doc(db, "orders", id);

  try {
    await updateDoc(orderDoc, data);

    return id;
  } catch {
    showMsg("Algo ha ido mal", "error");
  }
};

export const deleteOrder = async (id: string) => {
  const orderDoc = doc(db, "orders", id);

  try {
    await deleteDoc(orderDoc);

    return true;
  } catch {
    showMsg("Algo ha ido mal", "error");
  }
};