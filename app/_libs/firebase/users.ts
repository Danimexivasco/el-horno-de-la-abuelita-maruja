import {
  collection,
  doc,
  query,
  setDoc,
  QuerySnapshot,
  DocumentData,
  updateDoc,
  getDocs
} from "firebase/firestore";
import { db } from "./config";
import {
  useCollectionData,
  useDocumentData
} from "react-firebase-hooks/firestore";
import { User } from "@/types";
import { showMsg } from "@/utils/showMsg";
import { getAuth } from "firebase/auth";
import { API_ROUTES } from "@/apiRoutes";

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

export const getUsers = async (): Promise<User[]> => {
  try {
    const querySnapshot = await getDocs(_collection);
    const users = querySnapshot.docs.map(doc => {
      return (doc.data() as User);
    });

    return users;
  } catch {
    throw new Error("Ha ocurrido un error al obtener los usuarios");
  }
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
    await updateDoc(userDoc, data);
    if (withMsg) {
      showMsg("Usuario actualizado", "success");
    }
  } catch {
    if (withMsg) {
      showMsg("Algo ha fallado actualizando el usuario", "error");
    }
  }
};

export const deleteUser = async (uid: string) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) throw new Error("No hay usuario autenticado");

    const token = await user.getIdToken(true);
    const response = await fetch(API_ROUTES.USER, {
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
  } catch (error: any) {
    showMsg(error.message, "error");
  }
};
