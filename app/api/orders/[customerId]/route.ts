import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/libs/firebaseAdmin/config";

export async function GET(req: NextRequest, { params }: { params: Promise<{ customerId: string }> }) {
  try {
    const { customerId } = await params;

    if (!customerId) {
      return NextResponse.json({
        error: "customerId es requerido"
      }, {
        status: 400
      });
    }

    const ordersRef = await adminDb.collection("orders");
    const q = ordersRef.where("customerId", "==", customerId);

    const querySnapshot = await q.get();
    const orders = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({
      success: true,
      orders
    }, {
      status: 200
    });

  } catch {
    return NextResponse.json({
      error: "Internal Server Error"
    }, {
      status: 500
    });
  }
}
