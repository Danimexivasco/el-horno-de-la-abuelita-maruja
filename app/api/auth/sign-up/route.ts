import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/libs/firebaseAdmin/config";
import { createSessionCookie } from "@/actions/authActions";

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();
    if (!username || !email || !password) return NextResponse.json({
      error: "Todos los campos son requeridos"
    }, {
      status: 400
    });

    const userRecord = await adminAuth.createUser({
      email,
      password,
      displayName: username
    });

    const token = await adminAuth.createCustomToken(userRecord.uid);

    await adminDb.collection("users").doc(userRecord.uid).set({
      id:            userRecord.uid,
      email,
      username:      username ?? "Magdalena anónima",
      createdAt:     Date.now(),
      role:          "customer",
      emailVerified: false
    });

    await createSessionCookie(token);

    return NextResponse.json({
      success: true,
      uid:     userRecord.uid
    });
  } catch {
    return NextResponse.json({
      error: "Internal Server Error"
    }, {
      status: 500
    });
  }
}
