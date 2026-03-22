// teacherOnboardingSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  country: "",
  profession: "",
  experience: "",
  expertise: [],
  defaultLanguage: "",
  courseFormat: [],
  audience: [],
};

const teacherOnboardingSlice = createSlice({
  name: "teacherOnboarding",
  initialState,
  reducers: {
    setPersonalInfo: (state, action) => {
      return { ...state, ...action.payload };
    },
    setTeachingPreferences: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetTeacherOnboarding: () => initialState,
  },
});

export const {
  setPersonalInfo,
  setTeachingPreferences,
  resetTeacherOnboarding,
} = teacherOnboardingSlice.actions;

export default teacherOnboardingSlice.reducer;
