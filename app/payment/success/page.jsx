"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import LoadingModal from "@/app/global_components/LoadingModal";

export default function Success() {
  const params = useSearchParams();
  const tranId = params.get("tran_id");

  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchAppointment() {
      if (!tranId) {
        setError("❌ Missing transaction ID.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/payment/success?tran_id=${tranId}`);
        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.error || "Failed to fetch appointment details.");
        }

        setAppointment(data.appointment);
      } catch (err) {
        setError(`❌ ${err.message}`);
      } finally {
        setLoading(false);
      }
    }

    fetchAppointment();
  }, [tranId]);


  
  if (loading) return <LoadingModal />;
  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-xl p-6 rounded-2xl border bg-white text-center shadow-lg">
        <h1 className="text-2xl font-bold text-green-600 flex justify-center items-center gap-2">
          ✅ Payment Successful
        </h1>

        {!loading && appointment && (
          <div className="mt-6 space-y-3 text-gray-700 text-left">
            <p><strong>Transaction ID:</strong> {tranId}</p>
            <p><strong>Date:</strong> {appointment.date}</p>
            <p>
              <strong>Time:</strong>{" "}
              {appointment.interval?.start} – {appointment.interval?.end}
            </p>
            <p>
              <strong>Payment Status:</strong>{" "}
              <span className="text-green-600 font-semibold">
                {appointment.paymentStatus ? "Paid" : "Pending"}
              </span>
            </p>
          </div>
        )}

        <Link
          href="/dashboard/user"
          className="mt-8 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition duration-200"
        >
          🏠 Go Home
        </Link>
      </div>
    </div>
  );
}
