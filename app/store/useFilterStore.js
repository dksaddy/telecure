// store/useFilterStore.js
import { create } from "zustand";

const useFilterStore = create((set) => ({
  // Filter state
  searchTerm: "",
  selectedCategory: "",
  ratingValue: 0,
  experience: 0,
  availableToday: false,
  categories: [],
  gender: "",

  // Setters
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  setRatingValue: (ratingValue) => set({ ratingValue }),
  setExperience: (experience) => set({ experience }),
  setAvailableToday: (availableToday) => set({ availableToday }),
  setCategories: (categories) => set({ categories }),
  setGender: (gender) => set({ gender }),

  // Reset filters
  resetFilters: () =>
    set({
      searchTerm: "",
      selectedCategory: "",
      ratingValue: 0,
      experience: 0,
      availableToday: false,
    }),
}));

export default useFilterStore;
