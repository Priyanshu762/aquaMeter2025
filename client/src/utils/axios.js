import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000', // Update this for production
  withCredentials: true, // Important for sending cookies
});

export default instance;
