import axios from 'axios';

// Base URL for API requests, dynamically set based on environment
const API = axios.create({
  baseURL: 'https://car-management-tmlc.onrender.com/api',  // Use environment variable for production URL
  withCredentials: true,  // if you're using cookies/sessions
});


// API calls related to cars
export const createCar = (carData) => {
  return API.post('/cars', carData); 
};

export const getCars = (params = {}) => {
  return API.get('/cars', { params });
};

export const getCarById = (id) => {
  return API.get(`/cars/${id}`);
};

export const updateCar = (id, carData) => {
  return API.put(`/cars/${id}`, carData);
};

export const deleteCar = (id) => {
  return API.delete(`/cars/${id}`);
};

export const searchCars = (keyword) => {
  return API.get(`/cars/search?keyword=${keyword}`);
};
