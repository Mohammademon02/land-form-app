import { NextResponse } from "next/server";
import { deleteOldData } from "@/lib/deleteOldData";

export async function GET() {
  await deleteOldData();
  return NextResponse.json({ message: "Cleanup done ✅" });
}
