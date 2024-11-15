import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Optional, for error notifications

// Base URL for API requests, dynamically set based on environment
const API = axios.create({
  baseURL: 'http://localhost:7001/api',  // Use environment variable for production URL
  withCredentials: true,  // if you're using cookies/sessions
});

// Add an interceptor to handle errors globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const navigate = useNavigate();

    if (error.response) {
      if (error.response.status === 401) {
        navigate('/login');  // Redirect to login page if unauthorized
      } else {
        // Notify user of errors with toast
        toast.error(`Error: ${error.response.data.message || 'An error occurred'}`);
      }
    } else {
      // Network error (server unreachable)
      toast.error('Network error: Unable to connect to server.');
    }
    return Promise.reject(error);
  }
);

// API calls related to cars
export const createCar = (carData) => {
  return API.post('/cars', carData);  // Create a new car
};

export const getCars = (params = {}) => {
  return API.get('/cars', { params });  // List all cars, can pass query params for filtering/sorting
};

export const getCarById = (id) => {
  return API.get(`/cars/${id}`);  // Get car details by ID
};

export const updateCar = (id, carData) => {
  return API.put(`/cars/${id}`, carData);  // Update car by ID
};

export const deleteCar = (id) => {
  return API.delete(`/cars/${id}`);  // Delete car by ID
};

export const searchCars = (keyword) => {
  return API.get(`/cars/search?keyword=${keyword}`);  // Search cars by keyword
};
