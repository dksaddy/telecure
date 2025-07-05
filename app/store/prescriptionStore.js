import { create } from 'zustand';

const usePrescriptionStore = create((set) => ({
  complaintsText: '',
  investigationText: '',
  diagnosisText: '',
  medications: [{
    name: '',
    frequency: [],
    customFrequency: '',
    instruction: '',
    duration: '',
    fullData: null, // stores full medicine details after selection
  }],

  setComplaintsText: (text) => set({ complaintsText: text }),
  setInvestigationText: (text) => set({ investigationText: text }),
  setDiagnosisText: (text) => set({ diagnosisText: text }),

  setMedications: (meds) => set({ medications: meds }),
  addMedication: () =>
    set((state) => ({
      medications: [
        ...state.medications,
        { name: '', frequency: [], customFrequency: '', instruction: '', duration: '', fullData: null }
      ]
    })),
  removeMedication: (index) =>
    set((state) => ({
      medications: state.medications.filter((_, i) => i !== index)
    })),
  reset: () =>
    set({
      complaintsText: '',
      investigationText: '',
      diagnosisText: '',
      medications: [{
        name: '',
        frequency: [],
        customFrequency: '',
        instruction: '',
        duration: '',
        fullData: null
      }]
    }),
}));

export default usePrescriptionStore;
