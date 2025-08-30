
export default function Home() {
  return (
    <div className="bg-[#f4ffe6] min-h-screen px-5 pt-[50px] pb-5">

      <div className="bg-[#4B8DF8] border border-[#7cacfa] rounded overflow-hidden">
        <div className="flex items-center justify-center">
          <button className="text-[13px] leading-4 text-white py-1 px-2.5 mb-5 rounded border-r-2 border-b-2 border-r-[#333333] border-b-[#333333]">
            প্রিন্ট
          </button>
        </div>
        <div className="bg-white p-2.5"></div>
      </div>

      <div className="w-[7.9in] h-[11in] bg-white mt-5 mb-[30px] mx-auto border border-dotted border-r-solid border-[#333333] p-2.5 rounded-[10px] text-[#333333]">
        <div className="grid grid-cols-2 text-sm leading-[15px]">
          <div>
            <span className="block text-left">বাংলাদেশ ফরম নং ১০৭৭</span>
            <span className="block text-left"> (সংশোধিত) </span>
          </div>
          <div>
            <span className="block text-right">(পরিশিষ্ট: ৩৮)</span>
            <span className="block text-right">ক্রমিক নং 269624076820</span>
          </div>
        </div>

        <div>
          <div className="font-14-17 text-center">ভূমি উন্নয়ন কর পরিশোধ রসিদ</div>
          <div className="font-14-17 text-center">(অনুচ্ছেদ ৩৯২ দ্রষ্টব্য)</div>
        </div>
        <div className="mb-5"></div>

        <table className="w-full">
          <tbody>
            <tr>
              <td className="w-[320px] font-14-17">সিটি কর্পোরেশন/ পৌর/ ইউনিয়ন ভূমি অফিসের নাম:</td>
              <td className="dotted_bottom font-14-17">আশুলিয়া ইউনিয়ন ভূমি অফিস</td>
            </tr>
          </tbody>
        </table>

        <table className="mt-[5px] w-full">
          <tbody>
            <tr>
              <td className="w-[170px] font-14-17">মৌজার নাম ও জে. এল. নং:</td>
              <td className="dotted_bottom pl-[5px] pr-2.5 input_bangla">বড় আশুলিয়া - 180</td>
              <td className="w-[105px] font-14-17">উপজেলা/থানা:</td>
              <td className="dotted_bottom pl-[5px] pr-2.5 font-14-17">আশুলিয়া</td>
              <td className="w-[40px] font-14-17">জেলা:</td>
              <td className="dotted_bottom pl-[5px] pr-2.5 font-14-17">ঢাকা</td>
            </tr>
          </tbody>
        </table>

        <table className="w-full mt-[5px]">
          <tbody>
            <tr>
              <td className="w-[225px] font-14-17" >
                ২ নং রেজিস্টার অনুযায়ী হোল্ডিং নম্বর:
              </td>
              <td className="dotted_bottom numeric_bangla pl-2.5">
                1335
              </td>
            </tr>
          </tbody>
        </table>

        <table className="w-full mt-[5px]">
          <tbody>
            <tr>
              <td className="w-[75px] font-14-17">খতিয়ান নং:</td>
              <td className="dotted_bottom numeric_bangla pl-2.5"> 1335 </td>
            </tr>
          </tbody>
        </table>
        <div className="h-2.5"></div>

        <div>
          <p className="font-bold text-xs leading-3.5 text-center m-0 p-0">
            <u>মালিকের বিবরণ</u>
          </p>
        </div>

        <div>
          <table className="w-[49%] border border-dotted border-black mx-[2px] my-2.5 float-left text-[11px]">
            <thead>
              <tr>
                <th className="w-[10%] text-center b1 font-11-13">ক্রমঃ</th>
                <th className="w-[60%] text-center b1 font-11-13">মালিকের নাম</th>
                <th className="w-[25%] text-center b1 font-11-13">মালিকের অংশ</th>
              </tr>
            </thead>
            <tbody className="h-[21px]">
              <tr>
                <td className="b1 input_bangla font-10-12 text-center">1</td>
                <td className="b1 input_bangla font-10-12">মোঃ জাহাঙ্গীর আলম</td>
                <td className="b1 input_bangla font-10-12 text-center">0.875</td>
              </tr>
            </tbody>
          </table>

          <table className="w-[49%] border border-dotted border-black mx-[2px] my-2.5 float-right text-[11px]" >
            <thead>
              <tr>
                <th className="w-[10%] text-center b1 font-11-13">ক্রমঃ</th>
                <th className="w-[60%] text-center b1 font-11-13">মালিকের নাম</th>
                <th className="w-[25%] text-center b1 font-11-13">মালিকের অংশ</th>
              </tr>
            </thead>
            <tbody className="h-[21px]">
              <tr>
                <td className="b1 input_bangla font-10-12 text-center">2</td>
                <td className="b1 input_bangla font-10-12">জাহানারা বেগম</td>
                <td className="b1 input_bangla font-10-12 text-center">0.125</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>



    </div>
  );
}
