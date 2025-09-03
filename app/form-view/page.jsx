"use client";
import { useState } from "react";

export default function Page() {
  const [formData, setFormData] = useState({
    serial_number: "",
    office_name: "",
    mouzaJL_no: "",
    upazila_thana: "",
    district_name: "",
    holding_no: "",
    khatian_no: "",
    land_sl: "",
    dag_no: "",
    jomir_type: "",
    jomir_poriman: "",
    net_jomir_poriman: "",
    moreThenThreeYearBokoya: "",
    lastThreeYearBokoya: "",
    bokoyaJoriman: "",
    halDabi: "",
    totalDabi: "",
    totalBokoya: "",
  });

  // Multiple owners state - এইখানে সব owners এর data store হবে
  const [owners, setOwners] = useState([
    { owner_name: "", owner_share: "" }
  ]);

  // Normal form fields এর জন্য handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Owner fields এর জন্য আলাদা handler
  const handleOwnerChange = (index, field, value) => {
    const updatedOwners = owners.map((owner, i) => 
      i === index ? { ...owner, [field]: value } : owner
    );
    setOwners(updatedOwners);
  };

  // নতুন owner add করার function
  const addOwner = () => {
    setOwners([...owners, { owner_name: "", owner_share: "" }]);
  };

  // Owner remove করার function (minimum 1 owner থাকতে হবে)
  const removeOwner = (index) => {
    if (owners.length > 1) {
      setOwners(owners.filter((_, i) => i !== index));
    }
  };

  // Form submit handler - এইখানে সব data একসাথে পাঠানো হবে
  const handleSubmit = (e) => {
    e.preventDefault();
    const completeFormData = {
      ...formData,
      owners: owners // owners array আলাদাভাবে add করা হলো
    };
    console.log("Complete Form Data:", completeFormData);
    
    // এইখানে API call করবেন
    // fetch('/api/land-tax', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(completeFormData)
    // })
  };

  // Reusable Input Component
  const InputField = ({ name, label, type = "text" }) => (
    <div className="flex flex-col">
      <label htmlFor={name} className="mb-1 font-medium text-gray-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={formData[name]}
        onChange={handleChange}
        className="border text-[#333333] border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">
          ভূমি উন্নয়ন কর পরিশোধ রসিদ
        </h2>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* সাধারণ তথ্য Section */}
          <h3 className="col-span-2 text-xl font-semibold text-gray-800 border-b pb-2">
            📌 সাধারণ তথ্য
          </h3>
          <InputField name="serial_number" label="ক্রমিক নং" type="text" />
          <InputField name="office_name" label="সিটি কর্পোরেশন/ পৌর/ ইউনিয়ন ভূমি অফিসের নাম" type="text" />
          <InputField name="mouzaJL_no" label="মৌজার নাম ও জে. এল. নং:" type="text" />
          <InputField name="upazila_thana" label="উপজেলা/থানা:" type="text" />
          <InputField name="district_name" label="জেলা:" type="text" />
          <InputField name="holding_no" label="২ নং রেজিস্টার অনুযায়ী হোল্ডিং নম্বর:" type="text" />
          <InputField name="khatian_no" label="খতিয়ান নং:" type="text" />

          {/* মালিকের বিবরণ Section - Multiple Owner Support */}
          <div className="col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
                👤 মালিকের বিবরণ
              </h3>
              <button
                type="button"
                onClick={addOwner}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200 text-sm font-semibold"
              >
                + মালিক যোগ করুন
              </button>
            </div>
            
            {/* Dynamic Owner Fields */}
            {owners.map((owner, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex items-center justify-between col-span-2 mb-2">
                  <h4 className="font-medium text-gray-700">মালিক #{index + 1}</h4>
                  {owners.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeOwner(index)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium bg-red-100 px-2 py-1 rounded"
                    >
                      ✕ সরান
                    </button>
                  )}
                </div>
                
                <div className="flex flex-col">
                  <label className="mb-1 font-medium text-gray-700">
                    মালিকের নাম
                  </label>
                  <input
                    type="text"
                    value={owner.owner_name}
                    onChange={(e) => handleOwnerChange(index, 'owner_name', e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="মালিকের পূর্ণ নাম লিখুন"
                  />
                </div>
                
                <div className="flex flex-col">
                  <label className="mb-1 font-medium text-gray-700">
                    মালিকের অংশ
                  </label>
                  <input
                    type="text"
                    value={owner.owner_share}
                    onChange={(e) => handleOwnerChange(index, 'owner_share', e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="যেমন: ১/২, ১/৪, ২/৩"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* জমির বিবরণ Section */}
          <h3 className="col-span-2 text-xl font-semibold text-gray-800 border-b pb-2 mt-4">
            🌍 জমির বিবরণ
          </h3>
          <InputField name="land_sl" label="ক্রমঃ" />
          <InputField name="dag_no" label="দাগ নং" />
          <InputField name="jomir_type" label="জমির শ্রেণি" />
          <InputField name="jomir_poriman" label="জমির পরিমাণ (শতাংশ)" />
          <InputField name="net_jomir_poriman" label="সর্বমোট জমি (শতাংশ)" />

          {/* আদায়ের বিবরণ Section */}
          <h3 className="col-span-2 text-xl font-semibold text-gray-800 border-b pb-2 mt-4">
            💰 আদায়ের বিবরণ
          </h3>
          <InputField
            name="moreThenThreeYearBokoya"
            label="তিন বৎসরের ঊর্ধ্বের বকেয়া"
          />
          <InputField name="lastThreeYearBokoya" label="গত তিন বৎসরের বকেয়া" />
          <InputField name="bokoyaJoriman" label="বকেয়ার জরিমানা ও ক্ষতিপূরণ" />
          <InputField name="halDabi" label="হাল দাবি" />
          <InputField name="totalDabi" label="মোট দাবি" />
          <InputField name="totalBokoya" label="মোট আদায়" />

          {/* Submit Button */}
          <div className="col-span-2 flex justify-center mt-6">
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg shadow hover:bg-blue-700 transition duration-200 cursor-pointer"
            >
              ফর্ম জমা দিন
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}