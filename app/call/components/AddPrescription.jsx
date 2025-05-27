import usePrescriptionStore from '@/app/store/prescriptionStore';
import DoctorShortDetails from "./sub-components/DoctorShortDetails";
import MetaDetails from "./sub-components/MetaDetails";
import PatientShortDetails from "./sub-components/PatientShortDetails";

export default function AddPrescription({ data }) {
  const { prescription, appointment, doctor } = data;

  const {
    complaintsText,
    investigationText,
    diagnosisText,
    medications,
    setComplaintsText,
    setInvestigationText,
    setDiagnosisText,
    setMedications,
    addMedication,
    removeMedication,
  } = usePrescriptionStore();

  const handleMedicationChange = (index, field, value) => {
    const updated = [...medications];
    updated[index][field] = value;
    setMedications(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      _id: prescription?._id, // include _id if updating
      complaints: complaintsText.split('\n').filter(Boolean),
      investigation: investigationText.split('\n').filter(Boolean),
      diagnosis: diagnosisText.split('\n').filter(Boolean),
      medication: medications
    };

    try {
      const res = await fetch('/api/prescription/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (res.ok) {
        alert('Prescription saved successfully!');
      } else {
        alert(result.message || 'Failed to save.');
      }
    } catch (err) {
      console.error('Error saving prescription:', err);
      alert('Something went wrong.');
    }
  };

  return (
    <>
      <div className="flex justify-between mb-4">
        <div className="w-1/2">
          <DoctorShortDetails doctor={doctor} />
        </div>
        <div className="w-1/2 text-right mr-10">
          <MetaDetails appointment={appointment} />
        </div>
      </div>

      <PatientShortDetails patient={appointment} />


      <form onSubmit={handleSubmit} className="space-y-6 mt-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left: Textareas (30%) */}
          <div className="md:w-1/3 space-y-4 shadow-md p-4 bg-white rounded-md border border-gray-200">
            {[
              { label: 'Complaints', value: complaintsText, setValue: setComplaintsText },
              { label: 'Investigation', value: investigationText, setValue: setInvestigationText },
              { label: 'Diagnosis', value: diagnosisText, setValue: setDiagnosisText }
            ].map(({ label, value, setValue }) => (
              <div key={label}>
                <label className="font-semibold text-gray-700 block mb-1">{label}</label>
                <textarea
                  className="w-full border border-gray-300 p-2 rounded-md text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  rows={3}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Each point on a new line"
                />
              </div>
            ))}
          </div>

          {/* Right: Medications (70%) */}
          <div className="md:w-2/3 space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Medications</h2>

            {medications.map((med, index) => (
              <div
                key={index}
                className="relative bg-white border border-gray-200 p-2 transition-all hover:shadow-md focus-within:shadow-md group"
              >
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: 'Name', key: 'name' },
                    { label: 'Frequency', key: 'frequency' },
                    { label: 'Instruction', key: 'instruction' },
                    { label: 'Duration', key: 'duration' }
                  ].map(({ label, key }) => (
                    <div key={key} className="flex flex-col">
                      <label className="text-sm font-medium text-gray-600 mb-1">{label}</label>
                      <input
                        type="text"
                        placeholder={label}
                        value={med[key]}
                        onChange={(e) => handleMedicationChange(index, key, e.target.value)}
                        className="border border-gray-300 rounded-md p-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  ))}
                </div>

                {/* Delete Button */}
                <button
                  type="button"
                  onClick={() => removeMedication(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity"
                  title="Remove"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3 h-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addMedication}
              className="flex items-center gap-1 mt-2 text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md transition"
            >
              ➕ Add Medication
            </button>
          </div>

        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded shadow hover:bg-green-700 transition"
        >
          Submit Prescription
        </button>
      </form>
    </>
  );
}
