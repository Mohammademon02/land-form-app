'use client';

import { useState } from 'react';

export default function FindReceipt( ) {
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
            <div className="container bg-white rounded-2xl p-8 space-y-8 w-full max-w-4xl shadow-2xl">
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
                        className="flex-grow w-full md:w-auto px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    />
                    <button
                        id="searchButton"
                        onClick={handleSearch}
                        className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow-lg hover:bg-blue-700 transition-all duration-300"
                    >
                        অনুসন্ধান করুন
                    </button>
                </div>
            </div>
        </div>
    );
}
