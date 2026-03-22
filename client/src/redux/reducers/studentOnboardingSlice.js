// studentOnboardingSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  purpose: [],
  interests: [],
  role: "",
  education: "",
};

const studentOnboardingSlice = createSlice({
  name: "studentOnboarding",
  initialState,
  reducers: {
    setPurpose: (state, action) => {
      state.purpose = action.payload;
    },
    setInterests: (state, action) => {
      state.interests = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setEducation: (state, action) => {
      state.education = action.payload;
    },
    resetStudentOnboarding: () => initialState,
  },
});

export const {
  setPurpose,
  setInterests,
  setRole,
  setEducation,
  resetStudentOnboarding,
} = studentOnboardingSlice.actions;

export default studentOnboardingSlice.reducer;
