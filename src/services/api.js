import axios from 'axios';

// Create an Axios instance with the base URL for the backend
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add a request interceptor to set up authentication headers (if needed)
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token'); // Assuming you store the JWT token in localStorage
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;

