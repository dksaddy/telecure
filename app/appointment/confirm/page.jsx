"use client";

import { useState } from "react";
import { useFormStore } from "../../store/formstore";
import { useRouter } from "next/navigation";

export default function Confirm() {
  const formData = useFormStore((state) => state.formData);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">

      <h1 className="text-2xl font-bold mb-4">Confirm Your Appointment</h1>
      <p className="text-lg mb-4">Click below to submit your appointment.</p>
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 disabled:bg-gray-400"
      >
        {loading ? "Submitting..." : "Confirm Appointment"}
      </button>

    </div>
  )

}





