import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/libs/firebaseAdmin/config";

// Get user role
export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();
    if (!token) return NextResponse.json({
      error: "Unauthorized"
    }, {
      status: 401
    });

    const decodedToken = await adminAuth.verifyIdToken(token);
    const uid = decodedToken.uid;

    const userDoc = await adminDb.collection("users").doc(uid).get();
    const userData = userDoc.exists ? userDoc.data() : null;
    const role = userData?.role ?? "user";

    return NextResponse.json({
      success: true,
      role
    });
  } catch {
    return NextResponse.json({
      error: "Unauthorized"
    }, {
      status: 401
    });
  }
}
