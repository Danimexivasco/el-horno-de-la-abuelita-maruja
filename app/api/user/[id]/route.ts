
import { NextResponse, NextRequest } from "next/server";
import { getActualUser } from "@/libs/firebase/users";

export async function GET(request : NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")
  const user = await getActualUser(userId as string);
  return NextResponse.json({ data: user }, { status: 200 });
}
