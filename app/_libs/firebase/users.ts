import {
  collection,
  doc,
  query,
  deleteDoc,
  setDoc,
  QuerySnapshot,
  DocumentData,
  getDoc
} from "firebase/firestore";
import { db } from "./config";
import {
  useCollectionData,
  useDocumentData
} from "react-firebase-hooks/firestore";
import { User } from "@/types";
import { showMsg } from "@/utils/showMsg";

const _collection = collection(db, "users");

// returns [values, loading, error, snapshot]
export const useUsersData = (): [any, boolean, any, QuerySnapshot<DocumentData, DocumentData>] => {
  const _query = query(_collection);
  // let query = buildQuery(queryObject);

  const [value, loading, error, snapshot] = useCollectionData(_query);

  return [value, loading, error, snapshot!];
};

// returns [value, loading, error, snapshot, reload]
export const useSingleUserData = (id: string) => {
  const document = doc(db, "users", id);

  const [snapshot, loading, error] = useDocumentData(document);

  return [snapshot, loading, error];
};

export const getActualUser = async (id: string) => {
  const userDoc = doc(db, "users", id);
  const snapshot = await getDoc(userDoc);
  return snapshot.data();
};

export const createUser = async (uid: string, data: User) => {
  try {
    await setDoc(doc(db, "users", uid), data);
    showMsg("Usuario creado", "success");
  } catch {
    showMsg("Algo ha fallado creando el usuario", "error");
  }
};

export const updateUser = async (id: string, data: User | DocumentData, withMsg: boolean = true) => {
  const userDoc = doc(db, "users", id);
  try {
    await setDoc(userDoc, data);
    if (withMsg) {
      showMsg("Usuario actualizado", "success");
    }
  } catch {
    if (withMsg) {
      showMsg("Algo ha fallado actualizando el usuario", "error");
    }
  }
};

export const deleteUser = async (id: string) => {
  const userDoc = doc(db, "users", id);

  try {
    await deleteDoc(userDoc);
    showMsg("Usuario eliminado", "success");
  } catch {
    showMsg("Algo ha fallado eliminando el usuario", "error");
  }
};
