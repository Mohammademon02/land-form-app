import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// এই এপিআইটি khatian_no দিয়ে একটি বা একাধিক ডেটা পেতে GET রিকোয়েস্ট পরিচালনা করে।
// khatian_no URL-এ একটি ডাইনামিক রুট প্যারামিটার হিসাবে পাস করা হয়।
// উদাহরণ: GET /api/land-tax-data-by-id/1234
export async function GET(request, { params }) {
    try {
        // URL প্যারামিটার থেকে khatianNo বের করা হয়
        const { khatianNo } = params;

        // URL থেকে আসা প্যারামিটার সবসময় একটি স্ট্রিং হয়, তাই এটিকে সংখ্যায় রূপান্তর করা হয়।
        // parseInt ব্যবহার করা হয়েছে কারণ এটি স্ট্রিংকে ইন্টিজারে রূপান্তর করে।
        // NOTE: The khatian_no field in your database is a String.
        // The following line is causing the error because it tries to convert a string to a number.
        // We will remove it and use the string directly.
        // const numericKhatianNo = parseInt(khatianNo, 10);

        // যদি এটি একটি সঠিক স্ট্রিং না হয়, তাহলে 400 Bad Request ত্রুটি রিটার্ন করা হয়।
        if (!khatianNo || typeof khatianNo !== 'string') {
            return NextResponse.json({
                message: "খতিয়ান নম্বর একটি সঠিক স্ট্রিং নয়।",
                status: 400,
            }, { status: 400 });
        }

        // প্রদত্ত khatianNo দিয়ে রেকর্ডগুলো খুঁজতে Prisma-এর findMany পদ্ধতি ব্যবহার করা হয়।
        // findMany একটি অ্যারে রিটার্ন করে, এমনকি যদি একটি মাত্র রেকর্ডও পাওয়া যায়।
        const receipts = await prisma.landTaxReceipt.findMany({
            where: {
                // ডেটাবেসের ফিল্ড এবং ফ্রন্টএন্ড থেকে আসা ডেটার মধ্যে মিল নিশ্চিত করা হয়েছে।
                // Using the khatianNo string directly.
                khatian_no: khatianNo,
            },
            // সম্পর্কিত ডেটা লোড করার জন্য 'include' ক্লজ যোগ করা হয়েছে।
            include: {
                owners: true,
                landDetails: true,
            },
        });

        // যদি কোনো রেকর্ড খুঁজে না পাওয়া যায়, তাহলে 404 Not Found এরর রিটার্ন করা হয়।
        if (receipts.length === 0) {
            return NextResponse.json({
                message: "কোনো রসিদ খুঁজে পাওয়া যায়নি।",
                status: 404,
            }, { status: 404 });
        }

        // যদি রেকর্ডগুলো খুঁজে পাওয়া যায়, তাহলে সেগুলো 200 OK স্ট্যাটাস দিয়ে রিটার্ন করা হয়।
        return NextResponse.json({
            message: "রসিদগুলো সফলভাবে খুঁজে পাওয়া গেছে!",
            status: 200,
            data: receipts,
        });

    } catch (error) {
        console.error("ভূমি করের রসিদ আনার সময় ত্রুটি:", error);
        return NextResponse.json({
            message: "ভূমি করের রসিদ আনতে ব্যর্থ হয়েছে।",
            status: 500,
            error: error.message
        }, { status: 500 });
    } finally {
        // অপারেশন শেষ হওয়ার পর Prisma ডিসকানেক্ট করা একটি ভাল অভ্যাস।
        await prisma.$disconnect();
    }
}

// এই এপিআইটি ডেটা সেভ করার জন্য POST রিকোয়েস্ট পরিচালনা করে।
export async function POST(request) {
    try {
        const formData = await request.json();

        // ডেটাবেসে পাঠানোর আগে ডেটা ভ্যালিডেট এবং পরিষ্কার করা হয়েছে।
        const owners = Array.isArray(formData.owners) ? formData.owners : [];
        const landDetails = Array.isArray(formData.landDetails) ? formData.landDetails : [];

        // Prisma-এর create পদ্ধতি ব্যবহার করে ডেটাবেসে নতুন রেকর্ড তৈরি করা হয়েছে।
        const newReceipt = await prisma.landTaxReceipt.create({
            data: {
                serial_number: formData.serial_number || "",
                office_name: formData.office_name || "",
                mouzaJL_no: formData.mouzaJL_no || "",
                upazila_thana: formData.upazila_thana || "",
                district_name: formData.district_name || "",
                holding_no: formData.holding_no || "",
                // ফ্রন্টএন্ড থেকে আসা khatian_no স্ট্রিংকে সংখ্যায় রূপান্তর করা হয়েছে।
                // This is also adjusted to use a string directly, based on the error.
                khatian_no: formData.khatian_no.toString(),
                net_jomir_poriman: formData.net_jomir_poriman || "",
                moreThenThreeYearBokoya: formData.moreThenThreeYearBokoya || "",
                lastThreeYearBokoya: formData.lastThreeYearBokoya || "",
                bokoyaJoriman: formData.bokoyaJoriman || "",
                halDabi: formData.halDabi || "",
                totalDabi: formData.totalDabi || "",
                totalBokoya: formData.totalBokoya || "",
                owners: {
                    create: owners.map(owner => ({
                        owner_name: owner.owner_name || "",
                        owner_share: owner.owner_share || "",
                    })),
                },
                landDetails: {
                    create: landDetails.map(detail => ({
                        land_sl: detail.land_sl || "",
                        dag_no: detail.dag_no || "",
                        jomir_type: detail.jomir_type || "",
                        jomir_poriman: detail.jomir_poriman || "",
                    })),
                },
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
