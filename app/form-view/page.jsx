"use client";
import Link from "next/link";
import { useState, memo } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";

// Reusable Input Component, optimized with memo()
const InputField = memo(({ name, label, type, error, ...rest }) => (
  <div className="w-full flex flex-col">
    <label htmlFor={name} className="mb-1 font-semibold text-[#333333]">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      className="border text-[#333333] border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#006145] focus:ring-1 focus:ring-[#006145]"
      {...rest}
    />
    {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
  </div>
));

InputField.displayName = "InputField";

// Modal component for success message
const SuccessModal = ({ message, onClose }) => (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
    <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
      <h3 className="text-2xl font-semibold text-green-600 mb-4">সফল!</h3>
      <p className="mb-4">{message}</p>
      <div className="flex justify-center space-x-4">
        <Link
          href="/find-receipt"
          className="bg-[#006145] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#027e59] transition duration-200"
        >
          আউটপুট দেখুন
        </Link>
        <button
          onClick={onClose}
          className="bg-gray-200 text-gray-800 font-semibold px-6 py-2 rounded-lg hover:bg-gray-300 transition duration-200"
        >
          বন্ধ করুন
        </button>
      </div>
    </div>
  </div>
);

export default function App() {
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [viewOutput, setViewOutput] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
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
      owners: [{ owner_name: "", owner_share: "" }],
      landDetails: [
        { land_sl: "", dag_no: "", jomir_type: "", jomir_poriman: "" },
      ],
    },
  });

  const {
    fields: ownerFields,
    append: appendOwner,
    remove: removeOwner,
  } = useFieldArray({
    control,
    name: "owners",
  });

  const {
    fields: landDetailFields,
    append: appendLandDetail,
    remove: removeLandDetail,
  } = useFieldArray({
    control,
    name: "landDetails",
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setStatusMessage("");
    setSubmittedData(null);

    // This is a placeholder for your actual API call.
    // Replace this with a real fetch request to your backend.
    try {
      const response = await fetch("/api/land-tax", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmittedData(data);
        setStatusMessage("ডেটা সফলভাবে জমা হয়েছে!");
        reset(); // Reset the form fields
        setShowModal(true); // Show the success modal
      } else {
        setStatusMessage(
          "ডেটা জমা দিতে ব্যর্থ হয়েছে। ত্রুটি: " + result.message
        );
      }
    } catch (error) {
      console.error("Network error:", error);
      setStatusMessage("নেটওয়ার্ক ত্রুটি: ডেটা জমা দিতে ব্যর্থ হয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  if (viewOutput) {
    return (
      <OutputView data={submittedData} onBack={() => setViewOutput(false)} />
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#006145]">
          ভূমি উন্নয়ন কর পরিশোধ রসিদ
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="">
          {/* সাধারণ তথ্য Section */}
          <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
            📌 সাধারণ তথ্য
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-5">
            <Controller
              name="serial_number"
              control={control}
              rules={{ required: "ক্রমিক নং আবশ্যক" }}
              render={({ field }) => (
                <InputField
                  {...field}
                  label="ক্রমিক নং"
                  type="number"
                  error={errors.serial_number}
                />
              )}
            />
            <Controller
              name="office_name"
              control={control}
              rules={{ required: "অফিসের নাম আবশ্যক" }}
              render={({ field }) => (
                <InputField
                  {...field}
                  type="text"
                  label="সিটি কর্পোরেশন/ পৌর/ ইউনিয়ন ভূমি অফিসের নাম"
                  error={errors.office_name}
                />
              )}
            />
            <Controller
              name="mouzaJL_no"
              control={control}
              rules={{ required: "মৌজার নাম ও জে. এল. নং আবশ্যক" }}
              render={({ field }) => (
                <InputField
                  {...field}
                  type="text"
                  label="মৌজার নাম ও জে. এল. নং:"
                  error={errors.mouzaJL_no}
                />
              )}
            />
            <Controller
              name="upazila_thana"
              control={control}
              rules={{ required: "উপজেলা/থানা আবশ্যক" }}
              render={({ field }) => (
                <InputField
                  {...field}
                  type="text"
                  label="উপজেলা/থানা:"
                  error={errors.upazila_thana}
                />
              )}
            />
            <Controller
              name="district_name"
              control={control}
              rules={{ required: "জেলা আবশ্যক" }}
              render={({ field }) => (
                <InputField
                  {...field}
                  type="text"
                  label="জেলা:"
                  error={errors.district_name}
                />
              )}
            />
            <Controller
              name="holding_no"
              control={control}
              rules={{ required: "হোল্ডিং নম্বর আবশ্যক" }}
              render={({ field }) => (
                <InputField
                  {...field}
                  type="number"
                  label="২ নং রেজিস্টার অনুযায়ী হোল্ডিং নম্বর:"
                  error={errors.holding_no}
                />
              )}
            />
            <Controller
              name="khatian_no"
              control={control}
              rules={{ required: "খতিয়ান নং আবশ্যক" }}
              render={({ field }) => (
                <InputField
                  {...field}
                  type="number"
                  label="খতিয়ান নং:"
                  error={errors.khatian_no}
                />
              )}
            />
          </div>

          {/* মালিকের বিবরণ Section - Multiple Owner Support */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
                👤 মালিকের বিবরণ
              </h3>
              <button
                type="button"
                onClick={() => appendOwner({ owner_name: "", owner_share: "" })}
                className="bg-[#006145] text-white px-4 py-2 rounded-lg hover:bg-[#027e59] transition duration-200 text-sm font-semibold cursor-pointer"
              >
                + মালিক যোগ করুন
              </button>
            </div>

            {/* Dynamic Owner Fields */}
            {ownerFields.map((item, index) => (
              <div
                key={item.id}
                className="mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-700">
                    মালিক - {index + 1}
                  </h4>
                  {ownerFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeOwner(index)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium bg-red-100 px-2 py-1 rounded"
                    >
                      ✕ সরান
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Controller
                    name={`owners.${index}.owner_name`}
                    control={control}
                    rules={{ required: "মালিকের নাম আবশ্যক" }}
                    render={({ field }) => (
                      <InputField
                        {...field}
                        type="text"
                        label="মালিকের নাম"
                        error={errors.owners?.[index]?.owner_name}
                        placeholder="মালিকের পূর্ণ নাম লিখুন"
                      />
                    )}
                  />

                  <Controller
                    name={`owners.${index}.owner_share`}
                    control={control}
                    rules={{ required: "মালিকের অংশ আবশ্যক" }}
                    render={({ field }) => (
                      <InputField
                        {...field}
                        type="text" // Changed to text to support fractional input
                        label="মালিকের অংশ"
                        error={errors.owners?.[index]?.owner_share}
                        placeholder="যেমন: ১/২, ১/৪, ২/৩"
                      />
                    )}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* জমির বিবরণ Section - Multiple Land Details Support */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 mt-4">
                🌍 জমির বিবরণ
              </h3>
              <button
                type="button"
                onClick={() =>
                  appendLandDetail({
                    land_sl: "",
                    dag_no: "",
                    jomir_type: "",
                    jomir_poriman: "",
                  })
                }
                className="bg-[#006145] text-white px-4 py-2 rounded-lg hover:bg-[#027e59] transition duration-200 text-sm font-semibold cursor-pointer"
              >
                + নতুন জমির তথ্য যোগ করুন
              </button>
            </div>

            {/* Dynamic Land Details Fields */}
            {landDetailFields.map((item, index) => (
              <div
                key={item.id}
                className="mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50"
              >
                <div className="flex items-center justify-between col-span-4 mb-2">
                  <h4 className="font-medium text-gray-700">
                    জমির তথ্য - {index + 1}
                  </h4>
                  {landDetailFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeLandDetail(index)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium bg-red-100 px-2 py-1 rounded"
                    >
                      ✕ সরান
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <Controller
                    name={`landDetails.${index}.land_sl`}
                    control={control}
                    rules={{ required: "ক্রমিক নং আবশ্যক" }}
                    render={({ field }) => (
                      <InputField
                        {...field}
                        label="ক্রমিক নং"
                        type="number"
                        error={errors.landDetails?.[index]?.land_sl}
                        placeholder="ক্রমিক নং"
                      />
                    )}
                  />
                  <Controller
                    name={`landDetails.${index}.dag_no`}
                    control={control}
                    rules={{ required: "দাগ নং আবশ্যক" }}
                    render={({ field }) => (
                      <InputField
                        {...field}
                        label="দাগ নং"
                        type="number"
                        error={errors.landDetails?.[index]?.dag_no}
                        placeholder="দাগ নং"
                      />
                    )}
                  />
                  <Controller
                    name={`landDetails.${index}.jomir_type`}
                    control={control}
                    rules={{ required: "জমির শ্রেণি আবশ্যক" }}
                    render={({ field }) => (
                      <InputField
                        {...field}
                        label="জমির শ্রেণি"
                        type="text"
                        error={errors.landDetails?.[index]?.jomir_type}
                        placeholder="জমির শ্রেণি"
                      />
                    )}
                  />
                  <Controller
                    name={`landDetails.${index}.jomir_poriman`}
                    control={control}
                    rules={{ required: "জমির পরিমাণ আবশ্যক" }}
                    render={({ field }) => (
                      <InputField
                        {...field}
                        type="number"
                        label="জমির পরিমাণ (শতাংশ)"
                        error={errors.landDetails?.[index]?.jomir_poriman}
                        placeholder="পরিমাণ"
                      />
                    )}
                  />
                </div>
              </div>
            ))}
          </div>

          <Controller
            name="net_jomir_poriman"
            control={control}
            rules={{ required: "সর্বমোট জমি আবশ্যক" }}
            render={({ field }) => (
              <InputField
                {...field}
                type="number"
                label="সর্বমোট জমি (শতাংশ)"
                error={errors.net_jomir_poriman}
              />
            )}
          />

          {/* আদায়ের বিবরণ Section */}
          <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 mt-4">
            💰 আদায়ের বিবরণ
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 py-5">
            <Controller
              name="moreThenThreeYearBokoya"
              control={control}
              rules={{ required: "এই ফিল্ড আবশ্যক" }}
              render={({ field }) => (
                <InputField
                  {...field}
                  type="number"
                  label="তিন বৎসরের ঊর্ধ্বের বকেয়া"
                  error={errors.moreThenThreeYearBokoya}
                />
              )}
            />
            <Controller
              name="lastThreeYearBokoya"
              control={control}
              rules={{ required: "এই ফিল্ড আবশ্যক" }}
              render={({ field }) => (
                <InputField
                  {...field}
                  type="number"
                  label="গত তিন বৎসরের বকেয়া"
                  error={errors.lastThreeYearBokoya}
                />
              )}
            />
            <Controller
              name="bokoyaJoriman"
              control={control}
              rules={{ required: "এই ফিল্ড আবশ্যক" }}
              render={({ field }) => (
                <InputField
                  {...field}
                  type="number"
                  label="বকেয়ার জরিমানা ও ক্ষতিপূরণ"
                  error={errors.bokoyaJoriman}
                />
              )}
            />
            <Controller
              name="halDabi"
              control={control}
              rules={{ required: "এই ফিল্ড আবশ্যক" }}
              render={({ field }) => (
                <InputField
                  {...field}
                  type="number"
                  label="হাল দাবি"
                  error={errors.halDabi}
                />
              )}
            />
            <Controller
              name="totalDabi"
              control={control}
              rules={{ required: "এই ফিল্ড আবশ্যক" }}
              render={({ field }) => (
                <InputField
                  {...field}
                  type="number"
                  label="মোট দাবি"
                  error={errors.totalDabi}
                />
              )}
            />
            <Controller
              name="totalBokoya"
              control={control}
              rules={{ required: "এই ফিল্ড আবশ্যক" }}
              render={({ field }) => (
                <InputField
                  {...field}
                  type="number"
                  label="মোট আদায়"
                  error={errors.totalBokoya}
                />
              )}
            />
          </div>
          {/* Status and loading indicators */}
          {statusMessage && (
            <div
              className={`col-span-2 p-4 rounded-lg text-center font-medium ${
                statusMessage.includes("সফলভাবে")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {statusMessage}
            </div>
          )}

          {/* Submit Button */}
          <div className="col-span-2 flex justify-center mt-6">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#006145] text-white font-semibold px-8 py-3 rounded-lg shadow hover:bg-[#027e59] transition duration-200 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? "জমা হচ্ছে..." : "ফর্ম জমা দিন"}
            </button>
          </div>
        </form>

        {/* Conditional Modal */}
        {showModal && submittedData && (
          <SuccessModal
            message={statusMessage}
            onClose={() => setShowModal(false)}
            onViewOutput={() => {
              setShowModal(false);
              setViewOutput(true);
            }}
          />
        )}
      </div>
    </div>
  );
}
