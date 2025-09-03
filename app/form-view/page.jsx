"use client";
import { useState, memo } from "react";

// Helper function to generate a unique ID for list items
const generateUniqueId = () => crypto.randomUUID();

// Reusable Input Component, optimized with memo()
const InputField = memo(({ name, label, type = "text", value, onChange }) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="mb-1 font-medium text-gray-700">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className="border text-[#333333] border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
));

InputField.displayName = 'InputField';

export default function Page() {
  const [formData, setFormData] = useState({
    serial_number: "",
    office_name: "",
    mouzaJL_no: "",
    upazila_thana: "",
    district_name: "",
    holding_no: "",
    khatian_no: "",
    net_jomir_poriman: "",
    moreThenThreeYearBokoya: "",
    lastThreeYearBokoya: "",
    bokoyaJoriman: "",
    halDabi: "",
    totalDabi: "",
    totalBokoya: "",
  });

  const [owners, setOwners] = useState([
    { id: generateUniqueId(), owner_name: "", owner_share: "" }
  ]);

  const [landDetails, setLandDetails] = useState([
    { id: generateUniqueId(), land_sl: "", dag_no: "", jomir_type: "", jomir_poriman: "" }
  ]);

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOwnerChange = (id, field, value) => {
    const updatedOwners = owners.map((owner) => 
      owner.id === id ? { ...owner, [field]: value } : owner
    );
    setOwners(updatedOwners);
  };

  const handleLandDetailChange = (id, field, value) => {
    const updatedLandDetails = landDetails.map((detail) =>
      detail.id === id ? { ...detail, [field]: value } : detail
    );
    setLandDetails(updatedLandDetails);
  };

  const addOwner = () => {
    setOwners([...owners, { id: generateUniqueId(), owner_name: "", owner_share: "" }]);
  };

  const addLandDetail = () => {
    setLandDetails([...landDetails, { id: generateUniqueId(), land_sl: "", dag_no: "", jomir_type: "", jomir_poriman: "" }]);
  };

  const removeOwner = (id) => {
    if (owners.length > 1) {
      setOwners(owners.filter((owner) => owner.id !== id));
    }
  };

  const removeLandDetail = (id) => {
    if (landDetails.length > 1) {
      setLandDetails(landDetails.filter((detail) => detail.id !== id));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage("");

    const completeFormData = {
      ...formData,
      owners: owners,
      landDetails: landDetails
    };

    try {
      const response = await fetch('/api/land-tax', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(completeFormData)
      });

      const result = await response.json();
      
      if (response.ok) {
        setStatusMessage("ডেটা সফলভাবে জমা হয়েছে! সার্ভার থেকে প্রতিক্রিয়া: " + result.message);
      } else {
        setStatusMessage("ডেটা জমা দিতে ব্যর্থ হয়েছে। ত্রুটি: " + result.message);
      }
    } catch (error) {
      setStatusMessage("নেটওয়ার্ক ত্রুটি: ডেটা জমা দিতে ব্যর্থ হয়েছে।");
    } finally {
      setLoading(false);
    }
  };

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
          <InputField 
            name="serial_number" 
            label="ক্রমিক নং" 
            value={formData.serial_number} 
            onChange={handleChange} 
          />
          <InputField 
            name="office_name" 
            label="সিটি কর্পোরেশন/ পৌর/ ইউনিয়ন ভূমি অফিসের নাম" 
            value={formData.office_name} 
            onChange={handleChange} 
          />
          <InputField 
            name="mouzaJL_no" 
            label="মৌজার নাম ও জে. এল. নং:" 
            value={formData.mouzaJL_no} 
            onChange={handleChange} 
          />
          <InputField 
            name="upazila_thana" 
            label="উপজেলা/থানা:" 
            value={formData.upazila_thana} 
            onChange={handleChange} 
          />
          <InputField 
            name="district_name" 
            label="জেলা:" 
            value={formData.district_name} 
            onChange={handleChange} 
          />
          <InputField 
            name="holding_no" 
            label="২ নং রেজিস্টার অনুযায়ী হোল্ডিং নম্বর:" 
            value={formData.holding_no} 
            onChange={handleChange} 
          />
          <InputField 
            name="khatian_no" 
            label="খতিয়ান নং:" 
            value={formData.khatian_no} 
            onChange={handleChange} 
          />

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
            {owners.map((owner) => (
              <div key={owner.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex items-center justify-between col-span-2 mb-2">
                  <h4 className="font-medium text-gray-700">মালিক</h4>
                  {owners.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeOwner(owner.id)}
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
                    onChange={(e) => handleOwnerChange(owner.id, 'owner_name', e.target.value)}
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
                    onChange={(e) => handleOwnerChange(owner.id, 'owner_share', e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="যেমন: ১/২, ১/৪, ২/৩"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* জমির বিবরণ Section - Multiple Land Details Support */}
          <div className="col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 mt-4">
                🌍 জমির বিবরণ
              </h3>
              <button
                type="button"
                onClick={addLandDetail}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200 text-sm font-semibold"
              >
                + নতুন জমির তথ্য যোগ করুন
              </button>
            </div>

            {/* Dynamic Land Details Fields */}
            {landDetails.map((detail) => (
              <div key={detail.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex items-center justify-between col-span-4 mb-2">
                  <h4 className="font-medium text-gray-700">জমির তথ্য</h4>
                  {landDetails.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeLandDetail(detail.id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium bg-red-100 px-2 py-1 rounded"
                    >
                      ✕ সরান
                    </button>
                  )}
                </div>
                
                <div className="flex flex-col">
                  <label className="mb-1 font-medium text-gray-700">
                    ক্রমিক নং
                  </label>
                  <input
                    type="text"
                    value={detail.land_sl}
                    onChange={(e) => handleLandDetailChange(detail.id, 'land_sl', e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="ক্রমিক নং"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-1 font-medium text-gray-700">
                    দাগ নং
                  </label>
                  <input
                    type="text"
                    value={detail.dag_no}
                    onChange={(e) => handleLandDetailChange(detail.id, 'dag_no', e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="দাগ নং"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-1 font-medium text-gray-700">
                    জমির শ্রেণি
                  </label>
                  <input
                    type="text"
                    value={detail.jomir_type}
                    onChange={(e) => handleLandDetailChange(detail.id, 'jomir_type', e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="জমির শ্রেণি"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-1 font-medium text-gray-700">
                    জমির পরিমাণ (শতাংশ)
                  </label>
                  <input
                    type="text"
                    value={detail.jomir_poriman}
                    onChange={(e) => handleLandDetailChange(detail.id, 'jomir_poriman', e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="পরিমাণ"
                  />
                </div>
              </div>
            ))}
          </div>

          <InputField 
            name="net_jomir_poriman" 
            label="সর্বমোট জমি (শতাংশ)" 
            value={formData.net_jomir_poriman} 
            onChange={handleChange} 
          />

          {/* আদায়ের বিবরণ Section */}
          <h3 className="col-span-2 text-xl font-semibold text-gray-800 border-b pb-2 mt-4">
            💰 আদায়ের বিবরণ
          </h3>
          <InputField
            name="moreThenThreeYearBokoya"
            label="তিন বৎসরের ঊর্ধ্বের বকেয়া"
            value={formData.moreThenThreeYearBokoya}
            onChange={handleChange}
          />
          <InputField 
            name="lastThreeYearBokoya" 
            label="গত তিন বৎসরের বকেয়া" 
            value={formData.lastThreeYearBokoya} 
            onChange={handleChange} 
          />
          <InputField 
            name="bokoyaJoriman" 
            label="বকেয়ার জরিমানা ও ক্ষতিপূরণ" 
            value={formData.bokoyaJoriman} 
            onChange={handleChange} 
          />
          <InputField 
            name="halDabi" 
            label="হাল দাবি" 
            value={formData.halDabi} 
            onChange={handleChange} 
          />
          <InputField 
            name="totalDabi" 
            label="মোট দাবি" 
            value={formData.totalDabi} 
            onChange={handleChange} 
          />
          <InputField 
            name="totalBokoya" 
            label="মোট আদায়" 
            value={formData.totalBokoya} 
            onChange={handleChange} 
          />
          
          {/* Status and loading indicators */}
          {statusMessage && (
            <div className={`col-span-2 p-4 rounded-lg text-center font-medium ${
              statusMessage.includes("সফলভাবে") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}>
              {statusMessage}
            </div>
          )}

          {/* Submit Button */}
          <div className="col-span-2 flex justify-center mt-6">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg shadow hover:bg-blue-700 transition duration-200 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? "জমা হচ্ছে..." : "ফর্ম জমা দিন"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
