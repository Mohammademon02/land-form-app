import prisma from '@/lib/db';
import { NextResponse } from 'next/server';


// এই এপিআইটি khatian_no দিয়ে একটি বা একাধিক ডেটা পেতে GET রিকোয়েস্ট পরিচালনা করে।
// khatian_no URL-এ একটি ডাইনামিক রুট প্যারামিটার হিসাবে পাস করা হয়।
// উদাহরণ: GET /api/land-tax-data-by-id/1234
export async function GET(request, { params }) {
    try {
        // URL প্যারামিটার থেকে khatianNo বের করা হয়
        const { serial_number } = params;

        // যদি এটি একটি সঠিক স্ট্রিং না হয়, তাহলে 400 Bad Request ত্রুটি রিটার্ন করা হয়।
        if (!serial_number || typeof serial_number !== 'string') {
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
                serial_number: serial_number,
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

