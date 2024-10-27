import {
  type User,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
  signInWithEmailAndPassword as _signInWithEmailAndPassword,
  createUserWithEmailAndPassword as _createUserWithEmailAndPassword
} from "firebase/auth";

import { firebaseAuth } from "./config";
import { showMsg } from "@/utils/showMsg";

export function onAuthStateChanged(callback: (authUser: User | null) => void) {
  return _onAuthStateChanged(firebaseAuth, callback);
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(firebaseAuth, provider);

    if (!result || !result.user) {
      throw new Error("Google sign in failed");
    }
    return result.user.uid;
  } catch (error) {
    console.error("Error signing in with Google", error);
  }
}

export const createUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) throw new Error("Email and password are required");
  try {
    await _createUserWithEmailAndPassword(firebaseAuth, email, password);
  } catch (error) {
    const message = (error instanceof Error) ? error.message : "An unexpected error occurred";
    showMsg(message, "error")
    throw new Error(message)
  }
};

export const signInWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) throw new Error("Email and password are required");
  try {
    return await _signInWithEmailAndPassword(firebaseAuth, email, password);
  } catch (error) {
    const message = (error instanceof Error) ? error.message : "An unexpected error occurred";
    showMsg(message, "error")
    throw new Error(message)
  }
}
export async function signOut() {
  try {
    return await firebaseAuth.signOut()
  } catch (error) {
    const message = (error instanceof Error) ? error.message : "An unexpected error occurred";
    showMsg(message, "error")
    throw new Error(message)
  }
}