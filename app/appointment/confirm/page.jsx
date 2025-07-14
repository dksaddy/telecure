"use client";

import { useState } from "react";
import { useFormStore } from "../../store/formstore";
import SubmittedFiles from "./components/SubmittedFiles";
import DocDetails from "../components/docDetail";

export default function Confirm() {
  const formData = useFormStore((state) => state.formData);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    delete formData.docDetails; // Remove docDetails from formData before sending
    try {
      const data = new FormData();

      for (const [key, value] of Object.entries(formData)) {
        if (key === "files") {
          value.forEach((file) => data.append("files", file));
        } else if (key === "interval") {
          data.append("interval", JSON.stringify(value));
        } else {
          data.append(key, value);
        }
      }

      const res = await fetch("/api/appointment", {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (result.success && result.gatewayUrl) {
        alert("Appointment submitted successfully!");
        window.location.href = result.gatewayUrl;
      } else {
        //show error message in a modal
        console.error("Submission error:", result.error);
        alert("Failed to submit appointment.");
      }

    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  console.log("Form Data:", formData);


  return (
    <div className="grid grid-cols-12 gap-1 px-20 py-8 pt-[80px]">

      <div className="col-span-12 md:col-span-4 p-2 rounded-lg shadow-md">
        <DocDetails doctor={formData.docDetails} />
      </div>

      <div className="col-span-12 md:col-span-8 p-8 bg-gray-50 rounded-lg shadow-md">

        {/* 2. Appointment Details */}
        <div>
          <h2 className="text-xl font-semibold text-purple-700 mb-3">Appointment Details</h2>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
            <p><span className="font-medium">Date:</span> {formData.date}</p>
            <p><span className="font-medium">Time Slot:</span> {formData.interval.start} - {formData.interval.end}</p>
            <p><span className="font-medium">Available Range:</span> {formData.timeRange}</p>
            <p><span className="font-medium">Doctor ID:</span> {formData.docId}</p>
            <p><span className="font-medium">Status:</span> {formData.status}</p>
            <p><span className="font-medium">Payment:</span> {formData.paymentStatus ? "Paid" : "Pending"}</p>
          </div>
        </div>


        {/* 1. Patient Details */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-purple-700 mb-3">Patient Details</h2>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
            <p><span className="font-medium">Name:</span> {formData.name}</p>
            <p><span className="font-medium">Phone:</span> {formData.phone}</p>
            <p><span className="font-medium">Age:</span> {formData.age}</p>
            <p><span className="font-medium">Gender:</span> {formData.gender}</p>
            <p><span className="font-medium">Weight:</span> {formData.weight} kg</p>
            <p><span className="font-medium">Height:</span> {formData.heightFeet} ft {formData.heightInch} in</p>
          </div>
        </div>

        {/* 3. Medical History */}
        <div className="mt-6">
          <SubmittedFiles files={formData.files} />
        </div>

        {/* 4. Billing Info */}
        <div className="mb-6 mt-6">
          <h2 className="text-xl font-semibold text-purple-700 mb-3">Billing</h2>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
            <p><span className="font-medium">Appointment Fee:</span> ৳500</p>
            <p><span className="font-medium">Discount:</span> ৳0</p>
            <p><span className="font-medium">Total Payable:</span> ৳500</p>
            <p><span className="font-medium">Transaction ID:</span> {formData.transactionId || "Not available"}</p>
          </div>
        </div>


        <div className="flex justify-end mt-10">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 disabled:bg-gray-400"
          >
            {loading ? "Submitting..." : "Confirm Appointment"}
          </button>
        </div>

      </div>

    </div>
  )

}
