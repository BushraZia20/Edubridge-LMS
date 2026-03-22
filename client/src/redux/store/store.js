import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import studentOnboardingReducer from "../reducers/studentOnboardingSlice";
import teacherOnboardingReducer from "../reducers/teacherOnboardingSlice";

const rootReducer = combineReducers({
  studentOnboarding: studentOnboardingReducer,
  teacherOnboarding: teacherOnboardingReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
