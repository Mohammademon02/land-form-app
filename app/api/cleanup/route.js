import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  await prisma.landTaxReceipt.deleteMany({
    where: {
      createdAt: {
        lt: sixMonthsAgo,
      },
    },
  });

  return NextResponse.json({
    message: "Data cleaned up successfully!",
    status: 200,
  });
}

