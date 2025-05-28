import DoctorShortDetails from "./sub-components/DoctorShortDetails";
import MetaDetails from "./sub-components/MetaDetails";
import PatientShortDetails from "./sub-components/PatientShortDetails";
import { useEffect, useState } from "react";

export default function CheckPrescription({ data }) {
  const { prescription, appointment, doctor } = data;
  const [prescriptionALL, setPrescriptionALL] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        const res = await fetch("/api/prescription/check", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: prescription._id }),
        });

        const result = await res.json();
        if (result.success) {
          setPrescriptionALL(result.data);
        } else {
          console.error("Failed to fetch prescription:", result.message);
        }
      } catch (error) {
        console.error("Error fetching prescription:", error);
      } finally {
        setLoading(false);
      }
    };

    if (prescription._id) {
      fetchPrescription();
    }
  }, [prescription._id]);

  if (loading) return <p>Loading ...</p>;
  if (!prescriptionALL) return <p>Prescription not found.</p>;

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

      {/* Display prescription details */}
      <div className="mt-4 flex gap-4">
        {/* Left Column - 30% */}
        <div className="w-1/3 space-y-4">
          <div>
            <h3 className="font-semibold text-lg">Complaints</h3>
            <ul className="list-disc list-inside text-sm text-gray-700">
              {prescriptionALL.complaints?.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg">Investigations</h3>
            <ul className="list-disc list-inside text-sm text-gray-700">
              {prescriptionALL.investigation?.map((inv, i) => (
                <li key={i}>{inv}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg">Diagnosis</h3>
            <ul className="list-disc list-inside text-sm text-gray-700">
              {prescriptionALL.diagnosis?.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column - 70% */}
        <div className="w-2/3">
          <h3 className="font-semibold text-lg mb-2">Medications</h3>
          <div className="border rounded-md p-4 bg-gray-50">
            <div className="grid grid-cols-4 text-sm font-medium text-gray-600 border-b pb-2 mb-2">
              <span>Name</span>
              <span>Frequency</span>
              <span>Instruction</span>
              <span>Duration</span>
            </div>
            {prescriptionALL.medication?.map((med, i) => (
              <div
                key={i}
                className="grid grid-cols-4 text-sm text-gray-800 py-1 border-b"
              >
                <span>{med.name}</span>
                <span>{med.frequency}</span>
                <span>{med.instruction}</span>
                <span>{med.duration} Days</span>
              </div>
            ))}
          </div>
        </div>
      </div>



    </>
  );
}