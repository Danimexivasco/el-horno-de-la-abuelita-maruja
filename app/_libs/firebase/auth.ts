import {
  type User,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
  signInWithEmailAndPassword as _signInWithEmailAndPassword,
  createUserWithEmailAndPassword as _createUserWithEmailAndPassword,
  sendPasswordResetEmail as _sendPasswordResetEmail,
  sendEmailVerification
} from "firebase/auth";
import {
  useAuthState as _useAuthState,
  useDeleteUser as _useDeleteUser
} from "react-firebase-hooks/auth";

import { db, firebaseAuth } from "./config";
import { showMsg } from "@/utils/showMsg";
import {
  createSession,
  removeAdminUserCheck,
  removeSession
} from "@/actions/authActions";
import { doc, getDoc } from "firebase/firestore";
import { createUser, updateUser } from "./users";

// returns [user, loading, error]
export const useAuthState = () => _useAuthState(firebaseAuth);

// returns [deleteUser, loading, error];
export const useDeleteUser = () => _useDeleteUser(firebaseAuth);

export function onAuthStateChanged(callback: (_authUser: User | null) => void) {
  return _onAuthStateChanged(firebaseAuth, callback);
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    const userCredential = await signInWithPopup(firebaseAuth, provider);
    const { user: { uid, email, displayName, photoURL, emailVerified } } = userCredential;
    const existingUser = await (await getDoc(doc(db, "users", uid))).data();

    if (!existingUser) {
      await createUser(uid, {
        id:        uid,
        email:     email ?? "",
        username:  displayName ?? "",
        createdAt: Date.now(),
        photoURL:  photoURL ?? "",
        emailVerified,
        role:      "customer"
      });
    }

    if (!userCredential || !userCredential.user) {
      throw new Error("El inicio con Google ha fallado");
    }

    return {
      id:      userCredential.user.uid,
      isAdmin: existingUser?.role === "admin"
    };
  } catch (error: any) {
    if (error.code !== "auth/popup-closed-by-user") {
      throw new Error("El inicio con Google ha fallado");
    }
  }
}

export const signUpWithEmailAndPassword = async (formData: { username: string, email: string; password: string }) => {
  const { username, email, password } = formData;
  if (!username ||!email || !password) throw new Error("Todos los campos son requeridos");
  try {
    const userCredential = await _createUserWithEmailAndPassword(firebaseAuth, email, password);
    const { user: { uid, email: _email, photoURL, emailVerified } } = userCredential;
    const existingUser = await (await getDoc(doc(db, "users", uid))).data();

    if (!existingUser) {
      await createUser(uid, {
        id:        uid,
        email:     _email ?? "",
        username:  username ?? "Usuario anónimo",
        createdAt: Date.now(),
        photoURL:  photoURL ?? "",
        emailVerified,
        role:      "customer"
      });
      if (firebaseAuth.currentUser) {
        await sendEmailVerification(firebaseAuth.currentUser);
      }
    }
    if (!userCredential || !userCredential.user) {
      throw new Error("El registro ha fallado");
    }
    await createSession(userCredential.user.uid);

    return userCredential.user.uid;
  } catch (error) {
    const message = (error instanceof Error) ? error.message : "Ha ocurrido un error inesperado";
    showMsg(message, "error");
    throw new Error(message);
  }
};

export const signInWithEmailAndPassword = async (formData: { email: string; password: string }) => {
  const { email, password } = formData;
  if (!email || !password) throw new Error("El email y la contraseña son requeridos");
  try {
    const userCredential = await _signInWithEmailAndPassword(firebaseAuth, email, password);
    if (!userCredential || !userCredential.user) {
      throw new Error("Ha habido un problema al iniciar sesión");
    }
    await createSession(userCredential.user.uid);
    return userCredential.user.uid;
  } catch (error) {
    const message = (error instanceof Error) ? error.message : "Ha ocurrido un error inesperado";
    showMsg(message, "error");
    throw new Error(message);
  }
};

export async function signOut() {
  try {
    await removeSession();
    await removeAdminUserCheck();
    await firebaseAuth.signOut();
  } catch (error) {
    const message = (error instanceof Error) ? error.message : "Ha ocurrido un error inesperado";
    showMsg(message, "error");
    throw new Error(message);
  }
}

export const sendPasswordResetEmail = async (email: string) => {
  try {
    await _sendPasswordResetEmail(firebaseAuth, email);

    return {
      success: true,
      message: "Petición enviada correctamente"
    };
  } catch {
    throw new Error("Error al enviar el correo para cambiar la contraseña");
  }
};

export const checkVerification = async (user: User) => {
  if (!user) throw new Error("Es necesario haber iniciado sesión");
  if (user) {
    await user.reload();

    if (user?.emailVerified) {
      await updateUser(user?.uid, {
        emailVerified: true
      }, false);

      return {
        successs: true,
        message:  "Gracias por verificar tu email 🚀"
      };
    } else {
      return {
        successs: false,
        message:  "Hubo un error al verificar tu email"
      };
    }
  }
};

export const resendEmailVerification = async (user: User) => {
  if (user) {
    try {
      await sendEmailVerification(user);

      return {
        successs: true,
        message:  "Se ha reenviado el email de verificacion"
      };
    } catch {
      throw new Error("Ocurrio un error al reenviar el email de verificacion");

    }
  }
};
