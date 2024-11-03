import axios from "axios";

// Create an instance of Axios
const apiClient = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
