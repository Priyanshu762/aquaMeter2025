import axios from 'axios';

export const googleLogin = async (token) => {
  try {
    const response = await axios.post('/api/auth/google-login', { token });
    return response;
  } catch (error) {
    console.error('Google login failed:', error);
    throw error;
  }
};
