import { NextResponse } from 'next/server';

export async function POST(request) {
    // অনুরোধ থেকে ব্যবহারকারীর নাম এবং পাসওয়ার্ড বের করা
    const { username, password } = await request.json();

    // স্ট্যাটিক ব্যবহারকারীর নাম এবং পাসওয়ার্ড
    const staticUsername = 'Ononto1676';
    const staticPassword = 'brspkon1676';

    // ব্যবহারকারীর প্রমাণপত্র যাচাই করা
    if (username === staticUsername && password === staticPassword) {
        // যদি প্রমাণপত্র সঠিক হয়, একটি কুকি সেট করুন
        const response = NextResponse.json({ message: 'Login successful' });
        response.cookies.set('authenticated', 'true', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' });
        return response;
    } else {
        // যদি প্রমাণপত্র ভুল হয়, একটি 401 ত্রুটি ফিরিয়ে দিন
        return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }
}
