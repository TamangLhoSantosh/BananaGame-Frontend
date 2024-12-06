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
  password: String;
}

// API to register endpoint
export const apiRegister = async ({
  username,
  firstName,
  middleName,
  lastName,
  password,
}: RegisterData) => {
  try {
    const response = await apiClient.post("/player/register", {
      username,
      firstName,
      middleName,
      lastName,
      password,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// API to call get game
export const apiGame = async () => {
  try {
    const response = await apiClient.get("/game");
    return response;
  } catch (error) {
    throw error;
  }
};

// API to call the game history of the player
export const apiGameHistory = async () => {
  try {
    const response = await apiClient.get("/game-history", {
      params: {
        playerId: localStorage.getItem("playerId"),
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// API to create new history
export const apiCreateHistory = async (status: boolean) => {
  try {
    const playerId = localStorage.getItem("playerId");
    console.log(playerId);
    const response = await apiClient.post("/game-history", {
      game_status: status,
      playerId: playerId,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
