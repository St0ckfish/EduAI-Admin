import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentLanguage: "en", // Default language
  loading: true,        // Loading state
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.currentLanguage = action.payload;
      localStorage.setItem('language', action.payload);
      state.loading = false; // Set loading to false when the language is set
    },
    initializeLanguage: (state) => {
      const savedLanguage = typeof window !== 'undefined' ? localStorage.getItem('language') : null;
      if (savedLanguage) {
        state.currentLanguage = savedLanguage;
      }
      state.loading = false; // Set loading to false after initialization
    },
  },
});

export const { setLanguage, initializeLanguage } = languageSlice.actions;
export default languageSlice.reducer;
