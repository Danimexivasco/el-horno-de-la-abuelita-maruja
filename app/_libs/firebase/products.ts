import { collection, doc, query, addDoc, deleteDoc, setDoc, QuerySnapshot, DocumentData } from "firebase/firestore";
import { db } from "@/libs/firebase/config";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { Product } from "@/types";
import { showMsg } from "@/utils/showMsg";

const _collection = collection(db, "products");

// returns [values, loading, error, snapshot]
export const useProductsData = (): [any, boolean, any, QuerySnapshot<DocumentData, DocumentData>] => {
  const _query = query(_collection);

  const [ value, loading, error, snapshot ] = useCollectionData(_query);

  return [ value, loading, error, snapshot! ];
};

// returns [value, loading, error, snapshot, reload]
export const useSingleProductData = (id: string) => {
  const document = doc(db, "products", id);

  const [ snapshot, loading, error ] = useDocumentData(document);

  return [ snapshot, loading, error ];
};


export const createProduct = async (data: Product) => {
  try {
    await addDoc(_collection, data);
    showMsg("Product created", "success")
  } catch {
    showMsg("Something went wrong", "error")
  }
}


export const updateProduct = async (id: string, data: Product | DocumentData) => {
  const productDoc = doc(db, "products", id);

  try {
    await setDoc(productDoc, data);
    showMsg("Product updated", "success")
  } catch {
    showMsg("Something went wrong", "error")
  }
}


export const deleteProduct = async (id: string) => {
  const productDoc = doc(db, "products", id);

  try {
    await deleteDoc(productDoc);
    showMsg("Product deleted", "success")
  } catch {
    showMsg("Something went wrong", "error")
  }
}
