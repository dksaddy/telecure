"use client";
import { useSearchParams, useRouter } from "next/navigation";

export default function PaymentFail() {
  const params = useSearchParams();
  const router = useRouter();
  const error = params.get("error");

  const getErrorMessage = () => {
    switch (error) {
      case "missing_tran_id":
        return "❌ Missing Transaction ID.";
      case "appointment_not_found":
        return "❌ Appointment not found.";
      case "server":
        return "❌ Server error occurred. Please try again.";
      default:
        return "❌ Payment failed. Please try again.";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-xl mx-auto p-6 rounded-2xl border bg-white text-center shadow-lg">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Payment Failed</h1>
        <p className="text-gray-700 text-base mb-6">{getErrorMessage()}</p>
        <button
          onClick={() => router.push("/find")}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
