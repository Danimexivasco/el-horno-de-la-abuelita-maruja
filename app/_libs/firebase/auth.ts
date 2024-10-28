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
import { createSession, removeSession } from "@/actions/authActions";

export function onAuthStateChanged(callback: (authUser: User | null) => void) {
  return _onAuthStateChanged(firebaseAuth, callback);
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    const userCredential = await signInWithPopup(firebaseAuth, provider);

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
    return await firebaseAuth.signOut()
  } catch (error) {
    const message = (error instanceof Error) ? error.message : "An unexpected error occurred";
    showMsg(message, "error")
    throw new Error(message)
  }
}