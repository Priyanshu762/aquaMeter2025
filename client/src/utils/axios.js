import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080', // Update this for production
  withCredentials: true, // Important for sending cookies
});

export default instance;
