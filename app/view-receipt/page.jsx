"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState, Suspense } from "react";


function ViewReceiptContent() {
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  
  // 🔑 Get encoded value
  const encoded = searchParams.get("k");

  // 🔑 Decode Base64
  const khatianNo = encoded ? atob(encoded) : "";

  useEffect(() => {
    if (khatianNo) {
      // Simulate fetching data from an API
      const fetchData = async () => {
        setLoading(true);
        try {
          // Replace with your actual API call
          const response = await fetch(`/api/land-tax-data-by-id/${khatianNo}`);
          const data = await response.json();
          setReceipts(data); // Assuming the API returns an object with a 'receipts' array
        } catch (error) {
          console.error("Failed to fetch data:", error);
          setReceipts([]);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    } else {
      setLoading(false);
      setReceipts([]);
    }
  }, [khatianNo]);

  // Handle the print action
  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    // disable right click
    const handleContextMenu = (e) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  if (loading) {
    return (
      <div
        key={khatianNo}
        className="flex justify-center items-center min-h-screen bg-white text-[#333333]"
      >
        <Image
          src="/images/loading_img.webp"
          width={55}
          height={55}
          alt="logo"
          className="animate-spin"
        />
      </div>
    );
  }

  return (
    <>
      {receipts && receipts.status === 200 ? (
        <div>
          {receipts?.data?.map((receipt, index) => {
            const qrEncoded = btoa(receipt?.khatian_no);
            const qrUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/view-receipt?k=${qrEncoded}`;
            return (
              <div
                key={index}
                className="bg-[#f4ffe6] px-5 pt-[50px] pb-5 relative printContent"
              >
                <div className="w-full min-w-[500px] bg-[#4B8DF8] border border-[#7cacfa] rounded overflow-hidden hide-on-print">
                  <div className="flex items-center justify-center">
                    <button onClick={handlePrint}
                      className="text-[13px] leading-4 text-white py-1 px-2.5 mb-5 rounded border-r-2 border-b-2 border-r-[#333333] border-b-[#333333] cursor-pointer">
                      প্রিন্ট
                    </button>
                  </div>
                  <div className="bg-white p-2.5"></div>
                </div>

                <div className="w-[815px] mx-auto ">
                  {/* ==========Address part start========= */}
                  <div className="printContent__wrapper w-[7.9in] h-[11in] bg-white mt-5 mb-[30px] border border-dotted border-r-solid border-[#333333] p-2.5 rounded-[10px] text-[#333333]">
                    <div className="grid grid-cols-2 text-sm leading-[15px]">
                      <div>
                        <span className="block text-left font-14-17 font-b">
                          বাংলাদেশ ফরম নং {receipt.form_no}
                        </span>
                        <span className="block text-left font-14-17">
                          {" "}
                          (সংশোধিত){" "}
                        </span>
                      </div>
                      <div>
                        <span className="block text-right font-14-17">
                          (পরিশিষ্ট: {receipt.porishisht_no})
                        </span>
                        <span className="block text-right font-boishakhi font-13-15">
                          ক্রমিক নং {`${receipt.serial_number}`}
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="font-14-17 text-center">
                        ভূমি উন্নয়ন কর পরিশোধ রসিদ
                      </div>
                      <div className="font-14-17 text-center">
                        (অনুচ্ছেদ ৩৯২ দ্রষ্টব্য)
                      </div>
                    </div>
                    <div className="mb-5"></div>

                    <table className="w-full">
                      <tbody>
                        <tr>
                          <td className="w-[320px] font-14-17">
                            সিটি কর্পোরেশন/ পৌর/ ইউনিয়ন ভূমি অফিসের নাম:
                          </td>
                          <td className="dotted_bottom font-14-17">
                            {receipt?.office_name}
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <table className="mt-[5px] w-full">
                      <tbody>
                        <tr>
                          <td className="w-[170px] font-14-17">
                            মৌজার নাম ও জে. এল. নং:
                          </td>
                          <td className="dotted_bottom pl-[5px] pr-2.5 input_bangla font-13-15 font-boishakhi">
                            {receipt?.mouzaJL_no}
                          </td>
                          <td className="w-[105px] font-14-17">উপজেলা/থানা:</td>
                          <td className="dotted_bottom pl-[5px] pr-2.5 font-14-17">
                            {receipt?.upazila_thana}
                          </td>
                          <td className="w-[40px] font-14-17">জেলা:</td>
                          <td className="dotted_bottom pl-[5px] pr-2.5 font-14-17">
                            {receipt?.district_name}
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <table className="w-full mt-[5px]">
                      <tbody>
                        <tr>
                          <td className="w-[225px] font-14-17">
                            ২ নং রেজিস্টার অনুযায়ী হোল্ডিং নম্বর:
                          </td>
                          <td className="dotted_bottom numeric_bangla pl-2.5 font-11-13 font-boishakhi">
                            {receipt?.holding_no}
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <table className="w-full mt-[5px]">
                      <tbody>
                        <tr>
                          <td className="w-[75px] font-14-17">খতিয়ান নং:</td>
                          <td className="dotted_bottom numeric_bangla pl-2.5 font-11-13 font-boishakhi">
                            {receipt?.khatian_no}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="h-2.5"></div>

                    {/* ==========Address part End========= */}

                    {/* ==========মালিকের বিবরণ Start ========= */}
                    <div>
                      <p className="font-bold text-xs leading-3.5 text-center m-0 p-0">
                        <u>মালিকের বিবরণ</u>
                      </p>
                    </div>

                    <div className="w-full flex flex-wrap gap-x-[14px] mx-[2px]">
                      {receipt?.owners?.map((owner, i) => {
                        return (
                          <table
                            key={i}
                            className={cn(
                              "border border-dotted border-black my-2.5 text-[11px]",
                              receipt?.owners?.length === 1
                                ? "w-[100%]"
                                : "w-[49%]"
                            )}
                          >
                            <thead>
                              <tr>
                                <th className="w-[10%] text-center b1 font-11-13">
                                  ক্রমঃ
                                </th>
                                <th className="w-[60%] text-center b1 font-11-13">
                                  মালিকের নাম
                                </th>
                                <th className="w-[25%] text-center b1 font-11-13">
                                  মালিকের অংশ
                                </th>
                              </tr>
                            </thead>
                            <tbody className="h-[21px]">
                              <tr>
                                <td className="b1 input_bangla font-10-12 text-center">
                                  {i + 1}
                                </td>
                                <td className="b1 input_bangla font-10-12">
                                  {owner?.owner_name}
                                </td>
                                <td className="b1 input_bangla font-10-12 text-center">
                                  {owner?.owner_share}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        );
                      })}
                    </div>

                    {/* ==========মালিকের বিবরণ End ========= */}

                    <div className="w-full">
                      {/* ==========জমির বিবরণ Start============ */}

                      <div>
                        <p className="font-bold text-xs leading-3.5 text-center m-0 p-0">
                          <u>জমির বিবরণ</u>
                        </p>
                      </div>

                      {receipt?.landDetails?.length > 0 && (
                        <>
                          <div className="w-full flex flex-wrap gap-x-[14px] mx-[2px]">
                            {receipt?.landDetails?.map((land, index) => {
                              return (
                                <table
                                  key={index}
                                  className={cn(
                                    "border border-dotted border-black my-2.5 text-[11px]",
                                    receipt?.landDetails?.length === 1
                                      ? "w-[100%]"
                                      : "w-[49%]"
                                  )}
                                >
                                  <thead>
                                    <tr>
                                      <th className="b1 text-left">ক্রমঃ</th>
                                      <th className="b1 text-left">দাগ নং</th>
                                      <th className="b1 text-left">
                                        জমির শ্রেণি
                                      </th>
                                      <th className="b1 text-left">
                                        জমির পরিমাণ (শতাংশ)
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody className="h-[21px]">
                                    <tr>
                                      <td className="b1 input_bangla text-center">
                                        {land?.land_sl}
                                      </td>
                                      <td className="b1 input_bangla">
                                        {land?.dag_no}
                                      </td>
                                      <td className="b1">{land?.jomir_type}</td>
                                      <td className="b1 input_bangla">
                                        {land?.jomir_poriman}
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              );
                            })}
                          </div>

                          <table className="w-full border border-dotted border-black mx-[2px] my-2.5 text-[12px]">
                            <tbody>
                              <tr>
                                <td className="w-[50%] b1 text-center">
                                  সর্বমোট জমি (শতাংশ)
                                </td>
                                <td className="w-[50%] b1 input_bangla">
                                  {receipt?.net_jomir_poriman}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </>
                      )}

                      <div className="h-2.5"></div>
                      {/* ==========জমির বিবরণ End============ */}

                      {/* ===========আদায়ের বিবরণ Start=========== */}
                      <table className="w-full table table-striped table-bordered table-hover mx-[2px] my-2.5">
                        <tbody>
                          <tr className="bg-[#F9F9F9] hover:bg-[#F5F5F5]">
                            <th
                              className="text-center p-2 border-b border-[#ddd] text-sm leading-5"
                              colSpan="8"
                            >
                              আদায়ের বিবরণ
                            </th>
                          </tr>

                          <tr className="hover:bg-[#F5F5F5]">
                            <td className="text-center text-sm leading-5 p-2 border border-[#ddd]">
                              তিন বৎসরের ঊর্ধ্বের বকেয়া
                            </td>
                            <td className="text-center text-sm leading-5 p-2 border border-[#ddd]">
                              গত তিন বৎসরের বকেয়া
                            </td>
                            <td className="text-center text-sm leading-5 p-2 border border-[#ddd]">
                              বকেয়ার জরিমানা ও ক্ষতিপূরণ
                            </td>
                            <td className="text-center text-sm leading-5 p-2 border border-[#ddd]">
                              হাল দাবি
                            </td>
                            <td className="text-center text-sm leading-5 p-2 border border-[#ddd]">
                              মোট দাবি
                            </td>
                            <td className="text-center text-sm leading-5 p-2 border border-[#ddd]">
                              মোট আদায়
                            </td>
                            <td className="text-center text-sm leading-5 p-2 border border-[#ddd]">
                              মোট বকেয়া
                            </td>
                            <td className="text-center text-sm leading-5 p-2 border border-[#ddd]">
                              মন্তব্য
                            </td>
                          </tr>

                          <tr className="bg-[#F9F9F9] hover:bg-[#F5F5F5]">
                            <td className="text-center text-sm leading-5 p-2 border border-[#ddd] font-kalpurush">
                              {receipt?.moreThenThreeYearBokoya}
                            </td>
                            <td className="text-center text-sm leading-5 p-2 border border-[#ddd] font-kalpurush">
                              {receipt?.lastThreeYearBokoya}
                            </td>
                            <td className="text-center text-sm leading-5 p-2 border border-[#ddd] font-kalpurush">
                              {receipt?.bokoyaJoriman}
                            </td>
                            <td className="text-center text-sm leading-5 p-2 border border-[#ddd] font-kalpurush">
                              {receipt?.halDabi}
                            </td>
                            <td className="text-center text-sm leading-5 p-2 border border-[#ddd] font-kalpurush">
                              {receipt?.totalDabi}
                            </td>
                            <td className="text-center text-sm leading-5 p-2 border border-[#ddd] font-kalpurush">
                              {receipt?.totalBokoya}
                            </td>
                            <td className="text-center text-sm leading-5 p-2 border border-[#ddd] font-kalpurush">
                              ০
                            </td>
                            <td className="text-center text-sm leading-5 p-2 border border-[#ddd]"></td>
                          </tr>
                        </tbody>
                      </table>

                      <div className="w-full  mx-[2px] my-2.5">
                        <p className="dotted_bottom font-14-17">
                          সর্বমোট (কথায়): {receipt?.netTotal} ।
                        </p>
                      </div>
                      {/* ===========আদায়ের বিবরণ End=========== */}

                      {/* ===========Qr Code Start=========== */}
                      <div>
                        <div className="w-[350px] float-left">
                          <p className="m-0 font-14-17">
                            নোট: সর্বশেষ কর পরিশোধের সাল - {receipt?.last_tax_payment_year} (অর্থবছর)
                          </p>
                          <p className="input_bangla font-13-15 mb-2">
                            {" "}
                            চালান নং : {receipt?.chalan_no}
                          </p>

                          <p> তারিখ : </p>

                          <div className="mt-[-28px] ml-2.5 font-14-17">
                            <p className="w-[115px] p-0 m-0 ml-[41px] mb-[2px] font-14-17">
                              {receipt?.bangla_date}
                            </p>
                            <span className="border-t ml-[41px] font-14-17">
                              {receipt?.eglish_date}
                            </span>
                          </div>
                        </div>

                        <div className="w-[90px] float-left flex justify-center items-center">
                          {/* ✅ QR Code render */}
                          <QRCodeCanvas
                            value={qrUrl}
                            size={74}
                            includeMargin={true}
                            bgColor={"#ffffff"}
                            fgColor={"#000000"}
                          />
                        </div>

                        <div className="w-[265px] float-right text-right text-xs">
                          <p className="text-center p-[5px]">
                            এই দাখিলা ইলেক্ট্রনিকভাবে তৈরি করা হয়েছে, <br />{" "}
                            কোন স্বাক্ষর প্রয়োজন নেই।
                          </p>
                        </div>
                      </div>
                      {/* ===========Qr Code End=========== */}
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-[#f4ffe6] px-5 pt-[50px] pb-5 relative min-h-screen text-2xl text-[#333333] flex items-center justify-center">
          {receipts.message}
        </div>
      )}
    </>
  );
}

// Loading component for Suspense fallback
function LoadingFallback() {
  return (
    <div
      className="flex justify-center items-center min-h-screen bg-white text-[#333333]"
    >
      <Image
        src="/images/loading_img.webp"
        width={55}
        height={55}
        alt="logo"
        className="animate-spin"
      />
    </div>
  );
}

// Main component wrapped with Suspense
export default function ViewReceipt() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ViewReceiptContent />
    </Suspense>
  );
}
