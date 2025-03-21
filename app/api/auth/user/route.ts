import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/libs/firebaseAdmin/config";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({
        error: "Unauthorized"
      }, {
        status: 401
      });
    }

    const decodedToken = await adminAuth.verifyIdToken(token);
    const uid = decodedToken.uid;

    const userRef = adminDb.collection("users").doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return NextResponse.json({
        error: "Usuario no econtrado"
      }, {
        status: 404
      });
    }

    const userData = userDoc.data();

    const emailVerificationUpdated = decodedToken.email_verified && !userData?.emailVerified;

    if (emailVerificationUpdated) {
      await userRef.update({
        emailVerified: true
      });
    }

    return NextResponse.json({
      id:            userData?.id,
      email:         userData?.email,
      username:      userData?.username,
      photoURL:      userData?.photoURL,
      emailVerified: emailVerificationUpdated ? true : userData?.emailVerified,
      role:          userData?.role
    });
  } catch {
    return NextResponse.json({
      error: "Unauthorized"
    }, {
      status: 401
    });
  }
}
