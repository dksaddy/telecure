import { useEffect, useState } from "react";
import LoadingModal from '@/app/global_components/LoadingModal';
import PrescriptionHeader from "./PrescriptionHeader";

export default function CheckPrescription({ data }) {
  const { prescription, appointment, doctor } = data;
  const [cData, setCData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!prescription._id) return;

    const fetchPrescription = async () => {
      setLoading(true);

      try {
        const res = await fetch("/api/prescription/check", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: prescription._id }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Failed to fetch prescription");
        }

        const result = await res.json();

        if (result.success) {
          setCData(result.data);
        } else {
          throw new Error(result.message || "Failed to fetch prescription");
        }
      } catch (err) {
        console.error("Error fetching prescription:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrescription();
  }, [prescription._id]);


  console.log("Prescription Data:", cData);
  if (loading || !cData) {
    return <LoadingModal />;
  }


  return (
    <>
      <PrescriptionHeader doctor={doctor} appointment={appointment} />

      {/* Summary Section */}
      <div className="bg-white rounded-xl p-3 sm:p-4 max-w-6xl mx-auto font-sans space-y-4 shadow-sm border border-gray-100">
        {/* Header */}
          <h2 className="text-xl sm:text-lg font-semibold text-purple-700 mb-1">Prescription Summary</h2>

        {/* Complaint / Investigation / Diagnosis */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { title: "Complaints", items: cData.complaints },
            { title: "Investigation", items: cData.investigation },
            { title: "Diagnosis", items: cData.diagnosis }
          ].map(({ title, items }, idx) => (
            <div key={idx} className="bg-gray-50 p-3 rounded-md border border-gray-200">
              <h3 className="text-base font-semibold text-gray-800 mb-2">{title}</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                {items.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Medication Section */}
      <div className="bg-white rounded-xl p-3 sm:p-4 max-w-6xl mx-auto font-sans space-y-4 mt-4 shadow-sm border border-gray-100">
        <h2 className="text-xl sm:text-lg font-semibold text-purple-700 mb-2">Medication Summary</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {cData?.medication.map((med, index) => (
            <div key={index} className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
              <h3 className="text-base font-bold text-purple-700 mb-1">
                {med.name}
                <span className="ml-2 text-sm font-medium text-gray-600 italic">
                  ({med.fullData.strength} • {med.fullData.dosageForm})
                </span>
              </h3>

              <p className="text-sm text-gray-600 mb-1">
                <span className="font-bold text-gray-700">Generic:</span> {med.fullData.generic}
              </p>

              <div className="grid sm:grid-cols-2 gap-2 text-sm text-gray-700">
                <p><span className="font-bold">Frequency:</span> {med.frequency.join(", ")}</p>
                <p><span className="font-bold">Duration:</span> {med.duration} Days</p>
              </div>

              <p className="text-sm text-gray-700 mt-2">
                <span className="font-bold">Instruction:</span> {med.instruction}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>

  );
}