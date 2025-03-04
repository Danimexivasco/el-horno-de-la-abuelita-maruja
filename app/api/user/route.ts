
import { NextResponse, NextRequest } from "next/server";
import { getActualUser } from "@/libs/firebase/users";

import { adminAuth, adminDb } from "@/app/_libs/firebaseAdmin/config";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const user = await getActualUser(userId as string);

  return NextResponse.json({
    data: user
  }, {
    status: 200
  });
}

export async function DELETE(req: Request) {
  try {
    const { uid, token } = await req.json();
    if (!uid || !token) {
      return NextResponse.json({
        error: "Sin autorización"
      }, {
        status: 401
      });
    }

    const decodedToken = await adminAuth.verifyIdToken(token);
    const requesterUid = decodedToken.uid;

    const userDoc = await adminDb.collection("users").doc(requesterUid).get();
    if (!userDoc.exists) {
      return NextResponse.json({
        sucess:  false,
        message: "El usuario no existe en la base de datos"
      }, {
        status: 404
      });
    }

    const userData = userDoc.data();

    if (userData?.role !== "admin") {
      return NextResponse.json({
        sucess:  false,
        message: "Acción prohibida: Solo los admins pueden eliminar usuarios"
      }, {
        status: 403
      });
    }

    await adminAuth.deleteUser(uid);
    await adminDb.collection("users").doc(uid).delete();

    return NextResponse.json({
      success: true,
      message: "Usuario eliminado correctamente"
    }, {
      status: 200
    });
  } catch (error: any) {
    return NextResponse.json({
      sucess:  false,
      message: error.message
    }, {
      status: 500
    });
  }
}