import axios from "axios";

// Create an instance of Axios
const apiClient = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor to add token to headers
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach token to the Authorization header
    }
    return config; // Return config to proceed with the request
  },
  (error) => {
    return Promise.reject(error); // Reject if there is an error in the request
  }
);

// Response Interceptor (Optional) to handle responses globally
apiClient.interceptors.response.use(
  (response) => {
    return response; // Return the response if it is successful
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized errors
      localStorage.removeItem("token"); // Remove token from localStorage
      localStorage.removeItem("playerId"); // Remove playerId from localStorage
      window.location.href = "/login"; // Redirect to login page
    }
    return Promise.reject(error); // Reject the promise in case of an error
  }
);

export default apiClient;
