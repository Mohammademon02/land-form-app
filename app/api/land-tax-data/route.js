import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const receipts = await prisma.landTaxReceipt.findMany({
      orderBy: {
        createdAt: 'desc', // নতুন জমা হওয়া ডেটা সবার উপরে দেখানোর জন্য
      },
      include: {
        owners: true,
        landDetails: true,
      },
    });

    return NextResponse.json({
      message: "Data fetched successfully!",
      status: 200,
      data: receipts
    });

  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({
      message: "Failed to fetch data.",
      status: 500,
      error: error.message
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
