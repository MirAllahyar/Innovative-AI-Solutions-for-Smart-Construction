import API from './api';

// Signup function
export const signup = async (userData) => {
  try {
    const response = await API.post('/auth/signup', userData);
    return response.data;
  } catch (error) {
    console.error('Error during signup:', error);
    throw error;
  }
};

// Login function
export const login = async (credentials) => {
  try {
    const response = await API.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

// Fetch contractors
export const getContractors = async () => {
  try {
    const response = await API.get('/users/contractors');
    return response.data;
  } catch (error) {
    console.error('Error fetching contractors:', error);
    throw error;
  }
};
