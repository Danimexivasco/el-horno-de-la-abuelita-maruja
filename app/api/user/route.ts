
import { NextResponse } from "next/server";

import { adminAuth, adminDb } from "@/app/_libs/firebaseAdmin/config";

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
        success: false,
        message: "El usuario no existe en la base de datos"
      }, {
        status: 404
      });
    }

    const userData = userDoc.data();

    if (userData?.role !== "admin") {
      return NextResponse.json({
        success: false,
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
      success: false,
      message: error.message
    }, {
      status: 500
    });
  }
}