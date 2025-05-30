import { useEffect, useState } from 'react';
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

  const [searchResults, setSearchResults] = useState({});
  const [focusedIndex, setFocusedIndex] = useState(null); // Track focus to manage dropdown visibility

  const handleMedicationChange = (index, field, value) => {
    const updated = [...medications];
    updated[index][field] = value;

    if (field === 'name') {
      updated[index].fullData = null;
      setSearchResults((prev) => ({ ...prev, [index]: [] }));
    }

    setMedications(updated);
  };

  useEffect(() => {
    medications.forEach((med, index) => {
      const name = med.name?.trim();
      if (name && name.length > 0) {
        (async () => {
          try {
            const res = await fetch('/api/prescription/medicine/search', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ searchTerm: name }),
            });

            if (!res.ok) {
              setSearchResults((prev) => ({ ...prev, [index]: [] }));
              return;
            }

            const result = await res.json();
            const newResults = Array.isArray(result) ? result.slice(0, 10) : [];

            setSearchResults((prev) => {
              const prevResults = prev[index] || [];
              if (JSON.stringify(prevResults) === JSON.stringify(newResults)) return prev;
              return { ...prev, [index]: newResults };
            });
          } catch (err) {
            console.error('Search error:', err);
            setSearchResults((prev) => ({ ...prev, [index]: [] }));
          }
        })();
      } else {
        setSearchResults((prev) => ({ ...prev, [index]: [] }));
      }
    });
  }, [medications]);

  const selectMedication = async (index, selected) => {
    const updated = [...medications];
    updated[index].name = selected.brandName;

    try {
      const res = await fetch('/api/prescription/medicine/details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selected._id })
      });
      const data = await res.json();
      updated[index].fullData = data;
    } catch (err) {
      console.error('Error fetching medicine details:', err);
    }

    setMedications(updated);
    setSearchResults((prev) => ({ ...prev, [index]: [] }));
    setFocusedIndex(null); // close dropdown
  };

  const toggleFrequency = (index, value) => {
    const updated = [...medications];
    const freq = updated[index].frequency;

    if (value === 'custom') {
      if (freq.includes('custom')) {
        updated[index].frequency = [];
        updated[index].customFrequency = '';
      } else {
        updated[index].frequency = ['custom'];
      }
    } else {
      if (freq.includes('custom')) return;
      if (freq.includes(value)) {
        updated[index].frequency = freq.filter(f => f !== value);
      } else {
        updated[index].frequency = [...freq, value];
      }
    }
    setMedications(updated);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      _id: prescription._id,
      complaints: complaintsText.split('\n').filter(Boolean),
      investigation: investigationText.split('\n').filter(Boolean),
      diagnosis: diagnosisText.split('\n').filter(Boolean),
      medication: medications.map(med => ({
        name: med.name,
        frequency: med.frequency.includes('custom') ? [med.customFrequency] : med.frequency,
        instruction: med.instruction,
        duration: med.duration,
        fullData: med.fullData,
      }))
    };

    try {
      const res = await fetch('/api/prescription/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        alert('Prescription saved!');
      } else {
        alert(result.message || 'Save failed');
      }
    } catch (error) {
      alert('Error submitting prescription');
      console.error(error);
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

      <form onSubmit={handleSubmit} className="space-y-6 mt-2">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3 space-y-4 shadow-md p-4 bg-white rounded-md border border-gray-200">
            {[{ label: 'Complaints', value: complaintsText, setValue: setComplaintsText },
            { label: 'Investigation', value: investigationText, setValue: setInvestigationText },
            { label: 'Diagnosis', value: diagnosisText, setValue: setDiagnosisText }].map(({ label, value, setValue }) => (
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

          <div className="md:w-2/3 space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Medications</h2>
            {medications.map((med, index) => (
              <div
                key={index}
                className="relative bg-white border border-gray-400 p-2 transition-all hover:shadow-md focus-within:shadow-md group"
              >
                <div className="grid grid-row-4 gap-2">
                  <div className="flex flex-col col-span-1 relative mt-2">
                    <label className="text-sm font-medium text-gray-600 mb-1">Name</label>
                    <input
                      type="text"
                      value={med.name}
                      onChange={(e) => handleMedicationChange(index, 'name', e.target.value)}
                      onFocus={() => setFocusedIndex(index)}
                      onBlur={() => setTimeout(() => setFocusedIndex(null), 100)}
                      className="border border-gray-300 rounded-md p-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    {searchResults[index]?.length > 0 && focusedIndex === index && (
                      <ul className="absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-md z-10 max-h-40 overflow-y-auto">
                        {searchResults[index].map((suggestion) => (
                          <li
                            key={suggestion._id}
                            onClick={() => selectMedication(index, suggestion)}
                            className="px-3 py-2 hover:bg-blue-100 cursor-pointer text-sm"
                          >
                            {suggestion.brandName} - {suggestion.strength || 'N/A'} - {suggestion.dosageForm || 'N/A'}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {med.fullData && (
                    <div className="flex flex-row gap-4 mb-2 text-sm text-gray-600">
                      <p><strong>Generic: </strong> {med.fullData.generic || 'N/A'}</p>
                      <p><strong>Strength: </strong>{med.fullData.strength || 'N/A'}</p>
                      <p><strong>Dosage Form: </strong> {med.fullData.dosageForm || 'N/A'}</p>
                    </div>
                  )}




                  <label className="text-sm font-medium text-gray-600 mb-1">Frequency</label>
                  <div className="flex flex-row">
                    <div className="flex flex-wrap gap-4 text-sm">
                      {['Morning', 'Noon', 'Night'].map((option) => (
                        <label key={option} className="flex items-center gap-1">
                          <input
                            type="checkbox"
                            checked={med.frequency.includes(option)}
                            onChange={() => toggleFrequency(index, option)}
                            disabled={med.frequency.includes('custom')}
                          />
                          {option}
                        </label>
                      ))}
                      <label className="flex items-center gap-1">
                        <input
                          type="checkbox"
                          checked={med.frequency.includes('custom')}
                          onChange={() => toggleFrequency(index, 'custom')}
                        />
                        Custom
                      </label>
                    </div>
                    {med.frequency.includes('custom') && (
                      <input
                        type="text"
                        placeholder="X/day"
                        value={med.customFrequency}
                        onChange={(e) => handleMedicationChange(index, 'customFrequency', e.target.value)}
                        className="w-20 h-7 ml-4 border border-gray-300 rounded-md p-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    )}
                  </div>

                  <div className='grid grid-cols-2 gap-4'>
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-600 mb-1">Instruction</label>
                      <input
                        type="text"
                        value={med.instruction}
                        onChange={(e) => handleMedicationChange(index, 'instruction', e.target.value)}
                        className="border border-gray-300 rounded-md p-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-600 mb-1">Duration</label>
                      <input
                        type="text"
                        value={med.duration}
                        onChange={(e) => handleMedicationChange(index, 'duration', e.target.value)}
                        className="border border-gray-300 rounded-md p-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => removeMedication(index)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addMedication}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              + Add Medication
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Save Prescription
        </button>
      </form>
    </>
  );
}
