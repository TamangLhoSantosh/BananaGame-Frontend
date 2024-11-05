import apiClient from "./apiClient"; // Import the Axios instance

// Interface for the login data
interface LoginData {
  username: String;
  password: String;
}

// API call to login endpoint
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

// Interface for the register data
interface RegisterData {
  username: String;
  firstName: String;
  middleName: String;
  lastName: String;
  email: String;
  password: String;
}

// API call to register endpoint
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

export const apiGame = async (token: String | null) => {
  try {
    const response = await apiClient.get("/game", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
