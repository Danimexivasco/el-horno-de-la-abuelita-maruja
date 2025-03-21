import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/libs/firebaseAdmin/config";
import { OrderStatus } from "@/enums";

export async function GET(req: NextRequest, { params }: { params: Promise<{ customerId: string }> }) {
  try {
    const { customerId } = await params;

    if (!customerId) return NextResponse.json({
      error: "Missing customerId"
    }, {
      status: 400
    });

    const querySnapshot = await adminDb
      .collection("orders")
      .where("customerId", "==", customerId)
      .where("state", "==", OrderStatus.PENDING)
      .get();

    const orders = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    }));

    return NextResponse.json(orders, {
      status: 200
    });

  } catch {
    return NextResponse.json({
      error: "Error al obtener ordenes pendientes"
    }, {
      status: 500
    });
  }
}
