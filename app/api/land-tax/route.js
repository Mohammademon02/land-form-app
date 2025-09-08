import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const formData = await request.json();

    // Check if both owners and landDetails are arrays
    const owners = Array.isArray(formData.owners) ? formData.owners : [];
    const landDetails = Array.isArray(formData.landDetails) ? formData.landDetails : [];

    // Save the data to MongoDB using Prisma
    const newReceipt = await prisma.landTaxReceipt.create({
      data: {
        form_no: parseFloat(formData.form_no) || 0,
        porishisht_no: parseFloat(formData.porishisht_no) || 0,
        serial_number: parseFloat(formData.serial_number) || 0,
        office_name: formData.office_name || "",
        mouzaJL_no: formData.mouzaJL_no || "",
        upazila_thana: formData.upazila_thana || "",
        district_name: formData.district_name || "",
        holding_no: formData.holding_no || "",
        khatian_no: formData.khatian_no || "",
        net_jomir_poriman: parseFloat(formData.net_jomir_poriman) || 0,
        moreThenThreeYearBokoya: parseFloat(formData.moreThenThreeYearBokoya) || 0,
        lastThreeYearBokoya: parseFloat(formData.lastThreeYearBokoya) || 0,
        bokoyaJoriman: parseFloat(formData.bokoyaJoriman) || 0,
        halDabi: parseFloat(formData.halDabi) || 0,
        totalDabi: parseFloat(formData.totalDabi) || 0,
        totalBokoya: parseFloat(formData.totalBokoya) || 0,
        netTotal: formData.netTotal || "",
        last_tax_payment_year: formData.last_tax_payment_year || "",
        chalan_no: formData.chalan_no || "",
        bangla_date: formData.bangla_date || "",
        eglish_date: formData.eglish_date || "",
        owners: owners.map(owner => ({
          owner_name: owner.owner_name || "",
          owner_share: parseFloat(owner.owner_share) || 0,
        })),
        landDetails: landDetails.map(detail => ({
          land_sl: parseFloat(detail.land_sl) || 0,
          dag_no: parseFloat(detail.dag_no) || 0,
          jomir_type: detail.jomir_type || "",
          // Convert this field to Float
          jomir_poriman: parseFloat(detail.jomir_poriman) || 0,
        })),
      },
    });

    console.log("Form data saved successfully:", newReceipt);

    return NextResponse.json({
      message: "Form data received and saved successfully!",
      status: 200,
      data: newReceipt
    });

  } catch (error) {
    console.error("Error processing form data:", error);
    return NextResponse.json({
      message: "Failed to process and save form data.",
      status: 500,
      error: error.message
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}