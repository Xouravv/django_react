import axios from "axios";
import { ACCESS_TOKEN } from "./constant";

// Create Axios instance
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000" // Fallback URL
});

// Request Interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config; // Ensure to return config
    },
    (error) => Promise.reject(error)
);

// Response Interceptor (Optional: Handle common responses or errors)
api.interceptors.response.use(
    (response) => response, // Simply return response if successful
    (error) => {
        // Handle specific HTTP errors here if needed
        if (error.response && error.response.status === 401) {
            // Example: Handle unauthorized access (e.g., token expired)
            console.error("Unauthorized. Please log in again.");
        } else {
            // Generic error handling
            console.error("An error occurred:", error.message);
        }
        return Promise.reject(error);
    }
);

export default api;
