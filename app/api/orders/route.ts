import { adminDb } from "@/app/_libs/firebaseAdmin/config";
import { NextRequest, NextResponse } from "next/server";

export async function GET (_req: NextRequest) {
  try {
    const querySnapshot = await adminDb.collection("orders").get();
    const orders = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({
      orders
    }, {
      status: 200
    });
  } catch {
    return NextResponse.json({
      error: "Error al obtener las ordenes"
    }, {
      status: 500
    });
  }
}