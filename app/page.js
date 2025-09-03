'use client'
import { useEffect, useState } from "react";

export default function Home() {
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);

  // API থেকে সব রসিদ Fetch করা
  useEffect(() => {
    async function fetchReceipts() {
      setLoading(true);
      try {
        const response = await fetch("/api/land-tax-data");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setReceipts(data.data);
      } catch (error) {
        console.error("Failed to fetch receipts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchReceipts();
  }, []); // শুধু একবার রান হবে

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">
          জমা দেওয়া রসিদসমূহ
        </h2>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          {loading ? (
            <p className="text-center text-gray-500">ডেটা লোড হচ্ছে...</p>
          ) : receipts.length === 0 ? (
            <p className="text-center text-gray-500">কোনো রসিদ জমা দেওয়া হয়নি।</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {receipts.map((receipt) => (
                <div key={receipt.id} className="bg-gray-100 rounded-lg p-4 border border-gray-200 shadow-sm">
                  <p className="text-lg font-semibold text-blue-800">ক্রমিক নং: {receipt.serial_number}</p>
                  <p className="text-sm text-gray-600 mt-1">হোল্ডিং নং: {receipt.holding_no}</p>
                  
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-700">মালিকগণ:</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {receipt.owners.map((owner, index) => (
                        <li key={index}>{owner.owner_name} ({owner.owner_share})</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-medium text-gray-700">জমির বিবরণ:</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {receipt.landDetails.map((detail, index) => (
                        <li key={index}>{detail.jomir_type} - {detail.jomir_poriman} শতাংশ</li>
                      ))}
                    </ul>
                  </div>

                  <p className="mt-4 text-sm font-semibold text-green-700">মোট আদায়: {receipt.totalBokoya}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    // <div className="bg-[#f4ffe6] px-5 pt-[50px] pb-5 relative">
    //   <div className="bg-[#4B8DF8] border border-[#7cacfa] rounded overflow-hidden">
    //     <div className="flex items-center justify-center">
    //       <button className="text-[13px] leading-4 text-white py-1 px-2.5 mb-5 rounded border-r-2 border-b-2 border-r-[#333333] border-b-[#333333]">
    //         প্রিন্ট
    //       </button>
    //     </div>
    //     <div className="bg-white p-2.5"></div>
    //   </div>

    //   <div className="w-[815px] mx-auto">
    //     {/* ==========Address part start========= */}
    //     <div className="w-[7.9in] h-[11in] bg-white mt-5 mb-[30px] border border-dotted border-r-solid border-[#333333] p-2.5 rounded-[10px] text-[#333333]">
    //       <div className="grid grid-cols-2 text-sm leading-[15px]">
    //         <div>
    //           <span className="block text-left font-14-17">
    //             বাংলাদেশ ফরম নং ১০৭৭
    //           </span>
    //           <span className="block text-left font-14-17"> (সংশোধিত) </span>
    //         </div>
    //         <div>
    //           <span className="block text-right font-14-17">
    //             (পরিশিষ্ট: ৩৮)
    //           </span>
    //           <span className="block text-right font-boishakhi font-13-15">
    //             ক্রমিক নং {serial_number}
    //           </span>
    //         </div>
    //       </div>

    //       <div>
    //         <div className="font-14-17 text-center">
    //           ভূমি উন্নয়ন কর পরিশোধ রসিদ
    //         </div>
    //         <div className="font-14-17 text-center">
    //           (অনুচ্ছেদ ৩৯২ দ্রষ্টব্য)
    //         </div>
    //       </div>
    //       <div className="mb-5"></div>

    //       <table className="w-full">
    //         <tbody>
    //           <tr>
    //             <td className="w-[320px] font-14-17">
    //               সিটি কর্পোরেশন/ পৌর/ ইউনিয়ন ভূমি অফিসের নাম:
    //             </td>
    //             <td className="dotted_bottom font-14-17">{office_name}</td>
    //           </tr>
    //         </tbody>
    //       </table>

    //       <table className="mt-[5px] w-full">
    //         <tbody>
    //           <tr>
    //             <td className="w-[170px] font-14-17">
    //               মৌজার নাম ও জে. এল. নং:
    //             </td>
    //             <td className="dotted_bottom pl-[5px] pr-2.5 input_bangla font-13-15 font-boishakhi">
    //               {mouzaJL_no}
    //             </td>
    //             <td className="w-[105px] font-14-17">উপজেলা/থানা:</td>
    //             <td className="dotted_bottom pl-[5px] pr-2.5 font-14-17">
    //               {upazila_thana}
    //             </td>
    //             <td className="w-[40px] font-14-17">জেলা:</td>
    //             <td className="dotted_bottom pl-[5px] pr-2.5 font-14-17">
    //               {district_name}
    //             </td>
    //           </tr>
    //         </tbody>
    //       </table>

    //       <table className="w-full mt-[5px]">
    //         <tbody>
    //           <tr>
    //             <td className="w-[225px] font-14-17">
    //               ২ নং রেজিস্টার অনুযায়ী হোল্ডিং নম্বর:
    //             </td>
    //             <td className="dotted_bottom numeric_bangla pl-2.5 font-11-13 font-boishakhi">
    //               {holding_no}
    //             </td>
    //           </tr>
    //         </tbody>
    //       </table>

    //       <table className="w-full mt-[5px]">
    //         <tbody>
    //           <tr>
    //             <td className="w-[75px] font-14-17">খতিয়ান নং:</td>
    //             <td className="dotted_bottom numeric_bangla pl-2.5 font-11-13 font-boishakhi">
    //               {khatian_no}
    //             </td>
    //           </tr>
    //         </tbody>
    //       </table>
    //       <div className="h-2.5"></div>

    //       {/* ==========Address part End========= */}

    //       {/* ==========মালিকের বিবরণ Start ========= */}
    //       <div>
    //         <p className="font-bold text-xs leading-3.5 text-center m-0 p-0">
    //           <u>মালিকের বিবরণ</u>
    //         </p>
    //       </div>

    //       <div>
    //         <table className="w-[49%] border border-dotted border-black mx-[2px] my-2.5 float-left text-[11px]">
    //           <thead>
    //             <tr>
    //               <th className="w-[10%] text-center b1 font-11-13">ক্রমঃ</th>
    //               <th className="w-[60%] text-center b1 font-11-13">
    //                 মালিকের নাম
    //               </th>
    //               <th className="w-[25%] text-center b1 font-11-13">
    //                 মালিকের অংশ
    //               </th>
    //             </tr>
    //           </thead>
    //           <tbody className="h-[21px]">
    //             <tr>
    //               <td className="b1 input_bangla font-10-12 text-center">1</td>
    //               <td className="b1 input_bangla font-10-12">
    //                 {owner_name}
    //               </td>
    //               <td className="b1 input_bangla font-10-12 text-center">
    //                 {owner_share}
    //               </td>
    //             </tr>
    //           </tbody>
    //         </table>

    //         <table className="w-[49%] border border-dotted border-black mx-[2px] my-2.5 float-right text-[11px]">
    //           <thead>
    //             <tr>
    //               <th className="w-[10%] text-center b1 font-11-13">ক্রমঃ</th>
    //               <th className="w-[60%] text-center b1 font-11-13">
    //                 মালিকের নাম
    //               </th>
    //               <th className="w-[25%] text-center b1 font-11-13">
    //                 মালিকের অংশ
    //               </th>
    //             </tr>
    //           </thead>
    //           <tbody className="h-[21px]">
    //             <tr>
    //               <td className="b1 input_bangla font-10-12 text-center">2</td>
    //               <td className="b1 input_bangla font-10-12">{owner_name}</td>
    //               <td className="b1 input_bangla font-10-12 text-center">
    //                 {owner_share}
    //               </td>
    //             </tr>
    //           </tbody>
    //         </table>
    //       </div>
    //       {/* ==========মালিকের বিবরণ End ========= */}

    //       <div className="w-full">
    //         {/* ==========জমির বিবরণ Start============ */}
    //         <table className="w-full border border-dotted border-black mx-[2px] my-2.5 float-left text-[11px]">
    //           <thead>
    //             <tr>
    //               <th className="b1 text-left">ক্রমঃ</th>
    //               <th className="b1 text-left">দাগ নং</th>
    //               <th className="b1 text-left">জমির শ্রেণি</th>
    //               <th className="b1 text-left">জমির পরিমাণ (শতাংশ)</th>
    //             </tr>
    //           </thead>
    //           <tbody className="h-[21px]">
    //             <tr>
    //               <td className="b1 input_bangla text-center">{land_sl}</td>
    //               <td className="b1 input_bangla">{dag_no}</td>
    //               <td className="b1">{jomir_type}</td>
    //               <td className="b1 input_bangla">{jomir_poriman}</td>
    //             </tr>
    //           </tbody>
    //         </table>

    //         <table className="w-full border border-dotted border-black mx-[2px] my-2.5 text-[12px]">
    //           <tbody>
    //             <tr>
    //               <td className="w-[50%] b1 text-center">
    //                 সর্বমোট জমি (শতাংশ)
    //               </td>
    //               <td className="w-[50%] b1 input_bangla">{net_jomir_poriman}</td>
    //             </tr>
    //           </tbody>
    //         </table>

    //         <div className="h-2.5"></div>
    //         {/* ==========জমির বিবরণ End============ */}

    //         {/* ===========আদায়ের বিবরণ Start=========== */}
    //         <table className="w-full table table-striped table-bordered table-hover mx-[2px] my-2.5">
    //           <tbody>
    //             <tr className="bg-[#F9F9F9] hover:bg-[#F5F5F5]">
    //               <th
    //                 className="text-center p-2 border-b border-[#ddd] text-sm leading-5"
    //                 colSpan="8"
    //               >
    //                 আদায়ের বিবরণ
    //               </th>
    //             </tr>

    //             <tr className="hover:bg-[#F5F5F5]">
    //               <td className="text-center text-sm leading-5 p-2 border border-[#ddd]">
    //                 তিন বৎসরের ঊর্ধ্বের বকেয়া
    //               </td>
    //               <td className="text-center text-sm leading-5 p-2 border border-[#ddd]">
    //                 গত তিন বৎসরের বকেয়া
    //               </td>
    //               <td className="text-center text-sm leading-5 p-2 border border-[#ddd]">
    //                 বকেয়ার জরিমানা ও ক্ষতিপূরণ
    //               </td>
    //               <td className="text-center text-sm leading-5 p-2 border border-[#ddd]">
    //                 হাল দাবি
    //               </td>
    //               <td className="text-center text-sm leading-5 p-2 border border-[#ddd]">
    //                 মোট দাবি
    //               </td>
    //               <td className="text-center text-sm leading-5 p-2 border border-[#ddd]">
    //                 মোট আদায়
    //               </td>
    //               <td className="text-center text-sm leading-5 p-2 border border-[#ddd]">
    //                 মোট বকেয়া
    //               </td>
    //               <td className="text-center text-sm leading-5 p-2 border border-[#ddd]">
    //                 মন্তব্য
    //               </td>
    //             </tr>

    //             <tr className="bg-[#F9F9F9] hover:bg-[#F5F5F5]">
    //               <td className="text-center text-sm leading-5 p-2 border border-[#ddd]">
    //                 {moreThenThreeYearBokoya}
    //               </td>
    //               <td className="text-center text-sm leading-5 p-2 border border-[#ddd]">
    //                 {lastThreeYearBokoya}
    //               </td>
    //               <td className="text-center text-sm leading-5 p-2 border border-[#ddd]">
    //                 {bokoyaJoriman}
    //               </td>
    //               <td className="text-center text-sm leading-5 p-2 border border-[#ddd]">
    //                 {halDabi}
    //               </td>
    //               <td className="text-center text-sm leading-5 p-2 border border-[#ddd]">
    //                 {totalDabi}
    //               </td>
    //               <td className="text-center text-sm leading-5 p-2 border border-[#ddd]">
    //                 {totalBokoya}
    //               </td>
    //               <td className="text-center text-sm leading-5 p-2 border border-[#ddd]">
    //                 ০
    //               </td>
    //               <td className="text-center text-sm leading-5 p-2 border border-[#ddd]"></td>
    //             </tr>
    //           </tbody>
    //         </table>

    //         <div className="w-full  mx-[2px] my-2.5">
    //           <p className="dotted_bottom font-14-17">
    //             সর্বমোট (কথায়): পাঁচ শত টাকা মাত্র ।
    //           </p>
    //         </div>
    //         {/* ===========আদায়ের বিবরণ End=========== */}

    //         {/* ===========Qr Code Start=========== */}
    //         <div>
    //           <div className="w-[350px] float-left">
    //             <p className="m-0 font-14-17">
    //               নোট: সর্বশেষ কর পরিশোধের সাল - 2024-2025 (অর্থবছর)
    //             </p>
    //             <p className="input_bangla font-13-15 mb-4">
    //               {" "}
    //               চালান নং : 2324-0037088472
    //             </p>

    //             <p> তারিখ : </p>

    //             <div className="mt-[-37px] ml-2.5 font-14-17">
    //               <p className="w-[115px] p-0 m-0 ml-[38px] mb-[2px] font-14-17">
    //                 ১৯ বৈশাখ ১৪৩১
    //               </p>
    //               <span className="border-t ml-[36px] font-14-17">
    //                 ০২ মে, ২০২৪
    //               </span>
    //             </div>
    //           </div>

    //           <div className="w-[90px] float-left">
    //             <div className="qrcode-print"></div>
    //           </div>
    //           <div className="w-[265px] float-right text-right text-xs">
    //             <p className="text-center p-[5px]">
    //               এই দাখিলা ইলেক্ট্রনিকভাবে তৈরি করা হয়েছে, <br /> কোন স্বাক্ষর
    //               প্রয়োজন নেই।
    //             </p>
    //           </div>
    //         </div>
    //         {/* ===========Qr Code End=========== */}
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
