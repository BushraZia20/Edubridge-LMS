import axios from "axios";
import { BASE_URL } from "../config/urls.js";

// REGISTER USER
export const registerUser = async (formData) => {
  try {
    const payload = {
      fullName: formData.fullName || "",
      email: formData.email || "",
      password: formData.password || "",
      role: formData.role || "student",
    };

    const response = await axios.post(`${BASE_URL}/api/auth/register`, payload);
    return response.data;
  } catch (error) {
    console.log("Error during register API", error);
    throw error;
  }
};
// this is pre-main branch

// LOGIN USER
export const loginUser = async (formData) => {
  try {
    const payload = {
      email: formData.email || "",
      password: formData.password || "",
    };

    const response = await axios.post(`${BASE_URL}/api/auth/login`, payload);

    return response.data;
  } catch (error) {
    console.log("Error during login API", error);
    throw error;
  }
};
