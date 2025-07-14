import DoctorShortDetails from "./sub-components/DoctorShortDetails";
import MetaDetails from "./sub-components/MetaDetails";
import PatientShortDetails from "./sub-components/PatientShortDetails";
import { useEffect, useState } from "react";
import LoadingModal from '@/app/global_components/LoadingModal';

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


  return (
    <>
      <div className="flex justify-between mb-4">
        <div className="w-1/2">
          <DoctorShortDetails doctor={doctor} />
        </div>
        <div className="w-1/2 text-right mr-2">
          <MetaDetails appointment={appointment} />
        </div>
      </div>

      <PatientShortDetails patient={appointment} />

      <div className="p-4 mt-2 grid gap-4 grid-cols-1 md:grid-cols-2">
        {cData?.medication.map((med, index) => (
          <div key={index} className="bg-white rounded-lg p-4 w-full border border-gray-300">

            <h2 className="text-lg font-bold text-purple-700 mb-1">
              {med.name}
              <span className="ml-2 text-sm font-medium text-gray-600 italic">
                ({med.fullData.strength} • {med.fullData.dosageForm})
              </span>
            </h2>

            <p className="text-sm text-gray-600 mb-2"><span className="font-bold text-gray-700">Generic:</span> {med.fullData.generic}</p>

            <div className="grid sm:grid-cols-2 grid-cols-1 gap-2 text-sm text-gray-700">
              <p><span className="font-bold">Frequency:</span> {med.frequency.join(", ")}</p>
              <p><span className="font-bold">Duration:</span> {med.duration} days</p>
            </div>

            <p className="text-sm text-gray-700 mt-2"><span className="font-bold">Instruction:</span> {med.instruction}</p>
          </div>
        ))}
      </div>



    </>
  );
}