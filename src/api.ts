import apiClient from "./apiClient"; // Import the Axios instance

interface LoginData {
  username: String;
  password: String;
}

export const apiLogin = async ({ username, password }: LoginData) => {
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

interface RegisterData {
  username: String;
  firstName: String;
  middleName: String;
  lastName: String;
  email: String;
  password: String;
}

export const apiRegister = async ({
  username,
  firstName,
  middleName,
  lastName,
  email,
  password,
}: RegisterData) => {
  try {
    const response = await apiClient.post("/player/register", {
      username,
      firstName,
      middleName,
      lastName,
      email,
      password,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
