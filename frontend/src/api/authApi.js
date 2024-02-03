// frontend/src/api/authApi.js
import axios from 'axios';

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post('http://localhost:5000/api/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Add other authentication-related functions if needed
