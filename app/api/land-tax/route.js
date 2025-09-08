import prisma from '@/lib/db';
import { NextResponse } from 'next/server';


export async function POST(request) {
  try {
    const formData = await request.json();
    
    // Check if both owners and landDetails are arrays
    const owners = Array.isArray(formData.owners) ? formData.owners : [];
    const landDetails = Array.isArray(formData.landDetails) ? formData.landDetails : [];

    // Save the data to MongoDB using Prisma
    // For MongoDB, you should pass the arrays directly, not wrapped in a `create` object.
    const newReceipt = await prisma.landTaxReceipt.create({
      data: {
        form_no: formData.form_no || "",
        porishisht_no: formData.porishisht_no || "",
        serial_number: formData.serial_number || "",
        office_name: formData.office_name || "",
        mouzaJL_no: formData.mouzaJL_no || "",
        upazila_thana: formData.upazila_thana || "",
        district_name: formData.district_name || "",
        holding_no: formData.holding_no || "",
        khatian_no: formData.khatian_no || "",
        net_jomir_poriman: formData.net_jomir_poriman || "",
        moreThenThreeYearBokoya: formData.moreThenThreeYearBokoya || "",
        lastThreeYearBokoya: formData.lastThreeYearBokoya || "",
        bokoyaJoriman: formData.bokoyaJoriman || "",
        halDabi: formData.halDabi || "",
        totalDabi: formData.totalDabi || "",
        totalBokoya: formData.totalBokoya || "",
        netTotal: formData.netTotal || "",
        last_tax_payment_year: formData.last_tax_payment_year || "",
        chalan_no: formData.chalan_no || "",
        bangla_date: formData.bangla_date || "",
        eglish_date: formData.eglish_date || "",
        owners: owners.map(owner => ({
            owner_name: owner.owner_name || "",
            owner_share: owner.owner_share || "",
        })),
        landDetails: landDetails.map(detail => ({
            land_sl: detail.land_sl || "",
            dag_no: detail.dag_no || "",
            jomir_type: detail.jomir_type || "",
            jomir_poriman: detail.jomir_poriman || "",
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
