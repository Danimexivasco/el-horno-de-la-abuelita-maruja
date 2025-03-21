import { adminAuth } from "@/app/_libs/firebaseAdmin/config";
import { UserRoles } from "@/types";
import { User } from "firebase/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { uid, role }: {uid: User["uid"], role: UserRoles} = await req.json();

    if (!uid) {
      return NextResponse.json({
        error: "UID is required"
      }, {
        status: 400
      });
    }

    await adminAuth.setCustomUserClaims(uid, {
      admin: role === "admin" ? true : false
    });

    return NextResponse.json({
      message: `Admin role assigned to ${uid}`
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