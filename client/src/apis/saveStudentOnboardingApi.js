import axios from "axios";
import { BASE_URL } from "../config/urls";

// SAVE STUDENT ONBOARDING
export const saveStudentOnboardingApi = async (onboardingData) => {
  try {
    const payload = {
      purpose: onboardingData.purpose || [],
      interests: onboardingData.interests || [],
      currentRole: onboardingData.role || "",
      educationLevel: onboardingData.education || "",
    };

    const response = await axios.post(
      `${BASE_URL}/api/student-onboarding`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log("Error during student onboarding API", error);
    throw error;
  }
};
