import DoctorShortDetails from "./sub-components/DoctorShortDetails";
import MetaDetails from "./sub-components/MetaDetails";
import PatientShortDetails from "./sub-components/PatientShortDetails";

export default function AddPrescription({ data }) {
    const { prescription, appointment, doctor } = data;
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