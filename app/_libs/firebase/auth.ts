import {
  type User,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
  signInWithEmailAndPassword as _signInWithEmailAndPassword,
  createUserWithEmailAndPassword as _createUserWithEmailAndPassword
} from "firebase/auth";
import { useAuthState as _useAuthState } from "react-firebase-hooks/auth";

import { db, firebaseAuth } from "./config";
import { showMsg } from "@/utils/showMsg";
import { createSession, removeAdminUserCheck, removeSession } from "@/actions/authActions";
import { doc, getDoc } from "firebase/firestore";
import { createUser } from "./users";

// returns [user, loading, error]
export const useAuthState = () => _useAuthState(firebaseAuth);

export function onAuthStateChanged(callback: (authUser: User | null) => void) {
  return _onAuthStateChanged(firebaseAuth, callback);
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    const userCredential = await signInWithPopup(firebaseAuth, provider);
    const { user: { uid, email, displayName, photoURL, emailVerified } } = userCredential
    const existingUser = await (await getDoc(doc(db, "users", uid))).data()
    
    if (!existingUser) {
      await createUser(uid, {
        id: uid,
        email: email ?? "",
        username: displayName ?? "",
        createdAt: new Date(),
        photoURL: photoURL ?? "",
        emailVerified,
        role: "customer"
      })
    }

    if (!userCredential || !userCredential.user) {
      throw new Error("Google sign in failed");
    }

    return userCredential.user.uid;
  } catch (error) {
    console.error("Error signing in with Google", error);
  }
}

export const signUpWithEmailAndPassword = async (formData: { email: string; password: string }) => {
  const { email, password } = formData;
  if (!email || !password) throw new Error("Email and password are required");
  try {
    const userCredential = await _createUserWithEmailAndPassword(firebaseAuth, email, password);
    const { user: { uid, email: _email, displayName, photoURL, emailVerified } } = userCredential
    const existingUser = await (await getDoc(doc(db, "users", uid))).data()
    
    if (!existingUser) {
      await createUser(uid, {
        id: uid,
        email: _email ?? "",
        username: displayName ?? "",
        createdAt: new Date(),
        photoURL: photoURL ?? "",
        emailVerified,
        role: "customer"
      })
    }
    if (!userCredential || !userCredential.user) {
      throw new Error("Something failed during sign up");
    }
    await createSession(userCredential.user.uid)
    
    return userCredential.user.uid;
  } catch (error) {
    const message = (error instanceof Error) ? error.message : "An unexpected error occurred";
    showMsg(message, "error")
    throw new Error(message)
  }
};

export const signInWithEmailAndPassword = async (formData: { email: string; password: string }) => {
  const { email, password } = formData;
  if (!email || !password) throw new Error("Email and password are required");
  try {
    const userCredential = await _signInWithEmailAndPassword(firebaseAuth, email, password);
    if (!userCredential || !userCredential.user) {
      throw new Error("Something failed during sing in");
    }
    await createSession(userCredential.user.uid)
    return userCredential.user.uid;
  } catch (error) {
    const message = (error instanceof Error) ? error.message : "An unexpected error occurred";
    showMsg(message, "error")
    throw new Error(message)
  }
}
export async function signOut() {
  try {
    await removeSession()
    await removeAdminUserCheck()
    return await firebaseAuth.signOut()
  } catch (error) {
    const message = (error instanceof Error) ? error.message : "An unexpected error occurred";
    showMsg(message, "error")
    throw new Error(message)
  }
}