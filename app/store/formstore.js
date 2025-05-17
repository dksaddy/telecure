import { create } from 'zustand';

export const useFormStore = create((set) => ({
  formData: null,
  setFormData: (data) => set({ formData: data }),
}));
