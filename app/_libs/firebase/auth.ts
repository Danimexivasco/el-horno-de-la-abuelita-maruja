import {
  type User,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
  signInWithEmailAndPassword as _signInWithEmailAndPassword,
  sendPasswordResetEmail as _sendPasswordResetEmail,
  sendEmailVerification,
  signInWithCustomToken,
  getAuth
} from "firebase/auth";
import {
  useAuthState as _useAuthState,
  useDeleteUser as _useDeleteUser
} from "react-firebase-hooks/auth";

import { db, firebaseAuth } from "./config";
import { showMsg } from "@/utils/showMsg";
import { createSessionCookie, removeSession } from "@/actions/authActions";
import { doc, getDoc } from "firebase/firestore";
import { createUser, updateUser } from "./users";
import { validateSignUpForm } from "@/app/_schemas/signUp";
import { validateSignInForm } from "@/app/_schemas/signIn";
import { API_ROUTES } from "@/apiRoutes";

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

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) throw new Error("No hay usuario autenticado");

    const token = await user.getIdToken(true);

    await createSessionCookie(token);

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
  const validation = validateSignUpForm(formData);

  if (!validation.error) {
    try {
      const { username, email, password } = formData;

      const res = await fetch(API_ROUTES.AUTH.SIGN_UP, {
        method:  "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          email,
          password
        })
      });

      const data = await res.json();

      if (data.token) {
        const auth = getAuth();
        const userCredential = await signInWithCustomToken(auth, data.token);
        const user = userCredential.user;

        const idToken = await user.getIdToken(true);

        await createSessionCookie(idToken);

        return user.uid;
      }

    } catch (error) {
      const message = (error instanceof Error) ? error.message : "Ha ocurrido un error inesperado";
      showMsg(message, "error");
      throw new Error(message);
    }
  }
};

export const signInWithEmailAndPassword = async (formData: { email: string; password: string }) => {
  const validation = validateSignInForm(formData);
  if (!validation.error) {
    try {
      const { email, password } = formData;

      const userCredential = await _signInWithEmailAndPassword(firebaseAuth, email, password);
      if (!userCredential || !userCredential.user) {
        throw new Error("Ha habido un problema al iniciar sesión");
      }

      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) throw new Error("No hay usuario autenticado");

      const token = await user.getIdToken(true);

      await createSessionCookie(token);

      return userCredential.user.uid;
    } catch (error) {
      const message = (error instanceof Error) ? error.message : "Ha ocurrido un error inesperado";
      showMsg(message, "error");
      throw new Error(message);
    }
  }
  throw new Error("Todos los campos son requeridos");
};

export async function signOut() {
  try {
    await removeSession();

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