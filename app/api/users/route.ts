import { adminDb } from "@/app/_libs/firebaseAdmin/config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest) {
  try {
    const querySnapshot = await adminDb.collection("users").get();
    const users = querySnapshot.docs.map(doc => {
      return doc.data();
    });

    return NextResponse.json({
      users
    }, {
      status: 200
    });
  } catch {
    return NextResponse.json({
      error: "Error obteniendo los usuarios"
    }, {
      status: 500
    });
  }
}