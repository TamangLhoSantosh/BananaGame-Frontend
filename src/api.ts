import apiClient from "./apiClient"; // Import the Axios instance

export const apiLogin = async (username: String, password: String) => {
  try {
    const response = await apiClient.post("/player/login", {
      username,
      password,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
