import { adminAuth, adminDb } from "@/app/_libs/firebaseAdmin/config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({
        success: false,
        message: "No se proporcionó un id de orden"
      }, {
        status: 400
      });
    }

    const orderDoc = await adminDb.collection("orders").doc(id).get();

    if (!orderDoc.exists) {
      return NextResponse.json({
        success: false,
        message: "La orden no existe"
      }, {
        status: 404
      });
    }

    const orderData = orderDoc.data();

    return NextResponse.json({
      success: true,
      data:    orderData
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

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { data, token } = await req.json();

    if (!id) {
      return NextResponse.json({
        success: false,
        message: "No se proporcionó el ID del pedido"
      }, {
        status: 400
      });
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json({
        success: false,
        message: "No se proporcionaron datos para actualizar"
      }, {
        status: 400
      });
    }

    if (!token) {
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
        message: "Acción prohibida: Solo los admins pueden eliminar pedidos"
      }, {
        status: 403
      });
    }

    const orderRef = adminDb.collection("orders").doc(id);
    const orderDoc = await orderRef.get();

    if (!orderDoc.exists) {
      return NextResponse.json({
        success: false,
        message: "Pedido no encontrado"
      }, {
        status: 404
      });
    }

    await orderRef.update(data);

    return NextResponse.json({
      success: true,
      message: "Pedido actualizado con éxito"
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

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { token } = await req.json();

    if (!id) {
      return NextResponse.json({
        success: false,
        message: "No se proporcionó el ID del pedido"
      }, {
        status: 400
      });
    }

    if (!token) {
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
        message: "Acción prohibida: Solo los admins pueden eliminar pedidos"
      }, {
        status: 403
      });
    }

    const orderRef = adminDb.collection("orders").doc(id);
    const orderDoc = await orderRef.get();

    if (!orderDoc.exists) {
      return NextResponse.json({
        success: false,
        message: "Pedido no encontrado"
      }, {
        status: 404
      });
    }

    await orderRef.delete();

    return NextResponse.json({
      success: true,
      message: "Pedido eliminado con éxito"
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
