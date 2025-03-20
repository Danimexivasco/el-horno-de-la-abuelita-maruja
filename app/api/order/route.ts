import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/app/_libs/firebaseAdmin/config";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (!data) {
      return NextResponse.json({
        error: "No se pudo crear el pedido"
      }, {
        status: 400
      });
    }

    const newDocRef = await adminDb.collection("orders").add(data);

    return NextResponse.json({
      orderId: newDocRef.id
    }, {
      status: 201
    });
  } catch {
    return NextResponse.json({
      error: "Error al crear el pedido"
    }, {
      status: 500
    });
  }
}