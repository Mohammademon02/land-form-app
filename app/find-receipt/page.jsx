'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function FindReceipt() {
    // স্টেট ভেরিয়েবল যা ইউজার ইনপুটকে ম্যানেজ করবে
    const [khatianNo, setKhatianNo] = useState('');

    // সার্চ বাটন ক্লিক হলে এই ফাংশনটি কাজ করবে
    const handleSearch = () => {
        // যদি ইনপুট খালি থাকে, তবে কোনো কাজ হবে না
        if (!khatianNo) {
            return;
        }

        // ফলাফলের পেজে নেভিগেট করা হচ্ছে এবং খতিয়ান নম্বরটি URL-এর প্যারামিটার হিসেবে পাঠানো হচ্ছে
        window.location.href = `/view-receipt?khatianNo=${khatianNo}`;
    };

    // 'Enter' কী চাপলে সার্চ করার জন্য এই ফাংশনটি কাজ করবে
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100 font-sans">
            <div className="container bg-white rounded-2xl p-8 space-y-4 w-full max-w-4xl shadow-2xl">
                <div className="flex justify-center items-center bg-white">
                    <Image src="/images/logo2.jpg" width={200} height={50} alt="logo" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 text-center">ভূমি করের রসিদ খুঁজুন</h1>
                <p className="text-gray-500 text-center">খতিয়ান নম্বর দিয়ে আপনার ভূমি করের রসিদটি খুঁজুন।</p>

                {/* Search Section */}
                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                    <input
                        type="text"
                        id="khatianNoInput"
                        placeholder="খতিয়ান নম্বর লিখুন"
                        value={khatianNo}
                        onChange={(e) => setKhatianNo(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="flex-grow w-full md:w-auto border text-[#333333] border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#006145] focus:ring-1 focus:ring-[#006145]"
                    />
                    <button
                        id="searchButton"
                        onClick={handleSearch}
                        className="w-full md:w-auto px-6 py-2 bg-[#006145] hover:bg-[#027e59] text-white rounded-lg font-semibold shadow-lg transition-all duration-300 cursor-pointer"
                    >
                        অনুসন্ধান করুন
                    </button>
                </div>
            </div>
        </div>
    );
}
