'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function FindReceipt() {
    const [khatianNo, setKhatianNo] = useState('');

    const handleSearch = () => {
        if (!khatianNo) {
            return;
        }
        // Encode khatianNo using Base64
        const encoded = btoa(khatianNo);
        
        window.location.href = `/view-receipt?k=${encoded}`;
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-[#F4FFE6] font-sans">
            <div className="container bg-white rounded-2xl p-8 space-y-4 w-full max-w-4xl shadow-2xl">
                <div className="flex justify-center items-center bg-white">
                    <Image src="/images/logo2.jpg" width={200} height={50} alt="logo" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 text-center">ভূমি করের রসিদ খুঁজুন</h1>
                <p className="text-gray-500 text-center">খতিয়ান নম্বর দিয়ে আপনার ভূমি করের রসিদটি খুঁজুন।</p>

                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                    <input
                        type="text"
                        id="khatianNoInput"
                        placeholder="খতিয়ান নম্বর লিখুন"
                        value={khatianNo}
                        onChange={(e) => setKhatianNo(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="flex-grow w-full md:w-auto border text-[#333333] border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#006145] focus:ring-1 focus:ring-[#006145] font-boishakhi"
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
