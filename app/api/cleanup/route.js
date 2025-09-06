import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  await prisma.landTaxReceipt.deleteMany({
    where: {
      createdAt: {
        lt: sevenDaysAgo,
      },
    },
  });

  return NextResponse.json({
    message: "Data cleaned up successfully!",
    status: 200,
  });
}
