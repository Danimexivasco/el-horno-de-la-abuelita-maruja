import {
  collection,
  doc,
  query,
  addDoc,
  deleteDoc,
  setDoc,
  QuerySnapshot,
  DocumentData,
  getDoc,
  getDocs
} from "firebase/firestore";
import { db } from "@/libs/firebase/config";
import {
  useCollectionData,
  useDocumentData
} from "react-firebase-hooks/firestore";
import { Product } from "@/types";
import { showMsg } from "@/utils/showMsg";
import { revalidateCache } from "@/actions/revalidate";

const _collection = collection(db, "products");

// returns [values, loading, error, snapshot]
export const useProductsData = (): [any, boolean, any, QuerySnapshot<DocumentData, DocumentData>] => {
  const _query = query(_collection);

  const [value, loading, error, snapshot] = useCollectionData(_query);

  return [value, loading, error, snapshot!];
};

// returns [value, loading, error, snapshot, reload]
export const useSingleProductData = (id: string) => {
  const document = doc(db, "products", id);

  const [snapshot, loading, error] = useDocumentData(document);

  return [snapshot, loading, error];
};

export const getProduct = async (id: string): Promise<Product> => {
  const productDoc = doc(db, "products", id);
  const snapshot = await getDoc(productDoc);
  return snapshot.data() as Product;
};

export const getProducts = async (): Promise<Product[]> => {
  try {
    const querySnapshot = await getDocs(_collection);
    const products = querySnapshot.docs.map(doc => {

      return ({
        ...doc.data(),
        id: doc.id
      });
    });

    return products as Product[];
  } catch {
    showMsg("Error al obtener los productos", "error");
    return [];
  }
};

export const createProduct = async (data: Product) => {
  try {
    await addDoc(_collection, data);

    await revalidateCache();

    showMsg("Producto creado", "success");
  } catch {
    showMsg("Algo ha ido mal", "error");
  }
};

export const updateProduct = async (id: string, data: Product | DocumentData, reviewType?: "updateReview" | "createReview" | "deleteReview") => {
  const productDoc = doc(db, "products", id);

  try {
    await setDoc(productDoc, data);

    await revalidateCache();

    if (reviewType === "createReview") {
      return showMsg("Opinión creada", "success");

    } else if (reviewType === "updateReview") {
      return showMsg("Opinión actualizada", "success");

    } else if (reviewType === "deleteReview") {
      return showMsg("Opinión eliminada", "success");
    }

    return showMsg("Producto actualizado", "success");
  } catch {
    showMsg("Algo ha ido mal", "error");
  }
};

export const deleteProduct = async (id: string) => {
  const productDoc = doc(db, "products", id);

  try {
    await deleteDoc(productDoc);

    await revalidateCache();

    showMsg("Producto eliminado", "success");
  } catch {
    showMsg("Algo ha ido mal", "error");
  }
};
