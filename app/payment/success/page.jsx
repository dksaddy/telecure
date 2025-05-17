"use client";
import { useSearchParams } from "next/navigation";

export default function Success() {
  const params = useSearchParams();
  const tranId = params.get("tran_id");

  return (
    <div className="p-6 mt-20">
      <h1 className="text-xl font-bold">✅ Payment Successful</h1>
      {tranId && <p className="mt-2">Transaction ID: {tranId}</p>}
    </div>
  );
}
