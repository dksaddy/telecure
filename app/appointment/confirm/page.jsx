"use client";

import { useState, useEffect } from "react";
import { useFormStore } from "../../store/formstore";
import SubmittedFiles from "./components/SubmittedFiles";
import DocDetails from "../components/docDetail";

export default function Confirm() {
  const formData = useFormStore((state) => state.formData);
  const [loading, setLoading] = useState(false);
  const [doctor, setDoctor] = useState(null);
  const [fetchingDoctor, setFetchingDoctor] = useState(true); // track fetch state
  const [error, setError] = useState(null);

  const docId = formData?.docId;

  // Show fallback if no form data
  if (!formData || Object.keys(formData).length === 0) {
    return (
      <div className="flex items-center justify-center h-screen text-red-600 font-semibold">
        No appointment data found. Please go back and fill the form.
      </div>
    );
  }

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      if (!docId) return;

      try {
        const response = await fetch("/api/mydoc", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ docId }),
        });

        if (!response.ok) throw new Error("Failed to fetch doctor details");
        const data = await response.json();
        setDoctor(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setFetchingDoctor(false);
      }
    };

    fetchDoctorDetails();
  }, [docId]);

  const handleSubmit = async () => {
    setLoading(true);

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

  if (fetchingDoctor) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Fetching doctor details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-600">
        Error: {error}
      </div>
    );
  }


  return (
    <div className="grid grid-cols-12 gap-4 px-4 sm:px-6 lg:px-20 py-8 pt-[80px] font-sans">

  {/* Doctor Info */}
  <div className="col-span-12 md:col-span-4 p-2 rounded-lg shadow-md bg-white">
    <DocDetails doctor={doctor} />
  </div>

  {/* Appointment Summary */}
  <div className="col-span-12 md:col-span-8 p-4 sm:p-6 bg-gray-50 rounded-lg shadow-md">

    {/* Appointment Details */}
    <div>
      <h2 className="text-lg sm:text-xl font-semibold text-purple-700 mb-3">Appointment Details</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-md text-gray-700">
        <p><span className="font-medium">Date:</span> {formData?.date}</p>
        <p><span className="font-medium">Time Slot:</span> {formData?.interval.start} - {formData?.interval.end}</p>
        <p><span className="font-medium">Available Range:</span> {formData?.timeRange}</p>
        <p><span className="font-medium">Doctor ID:</span> {formData?.docId}</p>
        <p><span className="font-medium">Status:</span> {formData?.status}</p>
        <p><span className="font-medium">Payment:</span> {formData?.paymentStatus ? "Paid" : "Pending"}</p>
      </div>
    </div>

    {/* Patient Details */}
    <div className="mt-6">
      <h2 className="text-lg sm:text-xl font-semibold text-purple-700 mb-3">Patient Details</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-md text-gray-700">
        <p><span className="font-medium">Name:</span> {formData?.name}</p>
        <p><span className="font-medium">Phone:</span> {formData?.phone}</p>
        <p><span className="font-medium">Age:</span> {formData?.age}</p>
        <p><span className="font-medium">Gender:</span> {formData?.gender}</p>
        <p><span className="font-medium">Weight:</span> {formData?.weight} kg</p>
        <p><span className="font-medium">Height:</span> {formData?.heightFeet} ft {formData?.heightInch} in</p>
      </div>
    </div>

    {/* Files */}
    <div className="mt-6">
      <SubmittedFiles files={formData?.files} />
    </div>

    {/* Billing */}
    <div className="mb-6 mt-6">
      <h2 className="text-lg sm:text-xl font-semibold text-purple-700 mb-3">Billing</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-md text-gray-700">
        <p><span className="font-medium">Appointment Fee:</span> ৳500</p>
        <p><span className="font-medium">Discount:</span> ৳0</p>
        <p><span className="font-medium">Total Payable:</span> ৳500</p>
        <p><span className="font-medium">Transaction ID:</span> {formData?.transactionId || "Not available"}</p>
      </div>
    </div>

    {/* Submit Button */}
    <div className="flex justify-end mt-10">
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-purple-600 hover:bg-purple-700 active:bg-purple-800 disabled:bg-gray-400 text-white px-6 py-2 rounded-xl text-sm sm:text-base transition-all duration-300"
      >
        {loading ? "Submitting..." : "Confirm Appointment"}
      </button>
    </div>

  </div>
</div>

  )

}
