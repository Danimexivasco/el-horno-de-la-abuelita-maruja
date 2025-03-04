import { adminDb } from "@/app/_libs/firebaseAdmin/config";
import { NextResponse } from "next/server";

export async function GET({ params }: { params: { id: string } }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({
        sucess:  false,
        message: "No se proporcionó un id de orden"
      }, {
        status: 400
      });
    }

    const orderDoc = await adminDb.collection("orders").doc(id).get();

    if (!orderDoc.exists) {
      return NextResponse.json({
        sucess:  false,
        message: "La orden no existe"
      }, {
        status: 404
      });
    }

    const orderData = orderDoc.data();

    return NextResponse.json({
      sucess: true,
      data:   orderData
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