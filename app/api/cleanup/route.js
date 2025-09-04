import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  
  const tenMinutesAgo = new Date();
  tenMinutesAgo.setMinutes(tenMinutesAgo.getMinutes() - 10);

  await prisma.landTaxReceipt.deleteMany({
    where: {
      createdAt: {
        lt: tenMinutesAgo,
      },
    },
  });

  return NextResponse.json({
    message: "Data cleaned up successfully!",
    status: 200,
  });
}