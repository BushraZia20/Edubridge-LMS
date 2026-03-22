import axios from "axios";
import { BASE_URL } from "../config/urls";

// SAVE TEACHER ONBOARDING
export const saveTeacherOnboardingApi = async (onboardingData) => {
  try {
    const payload = {
      country: onboardingData.country || "",
      profession: onboardingData.profession || "",
      experience: onboardingData.experience || "",
      expertise: onboardingData.expertise || [],
      defaultLanguage: onboardingData.defaultLanguage || "",
      courseFormat: onboardingData.courseFormat || [],
      audience: onboardingData.audience || [],
    };

    const response = await axios.post(
      `${BASE_URL}/api/teacher-onboarding`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log("Error during teacher onboarding API", error);
    throw error;
  }
};
