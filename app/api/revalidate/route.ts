import { REVALIDATION_ROUTES } from "@/routes";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

  try {
    const data = await req.json();
    const { secret } = data;

    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({
        message: "Sin autorización"
      }, {
        status: 401
      });
    }

    for (const path of REVALIDATION_ROUTES) {
      await revalidatePath(path);
    }

    return NextResponse.json({
      revalidated: true
    });

  } catch {
    return NextResponse.json({
      message: "Error al revalidar la cache"
    }, {
      status: 500
    });
  }
}