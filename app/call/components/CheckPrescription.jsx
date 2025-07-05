import DoctorShortDetails from "./sub-components/DoctorShortDetails";
import MetaDetails from "./sub-components/MetaDetails";
import PatientShortDetails from "./sub-components/PatientShortDetails";
import { useEffect, useState } from "react";

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



    </>
  );
}