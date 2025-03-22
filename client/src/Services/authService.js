import { googleLogin } from '../API/authAPI';
import { login } from '../store/authSlice';
import { store } from '../store/store';

export const handleGoogleLogin = async (googleToken) => {
  try {
    
    const data = await googleLogin(googleToken);
    store.dispatch(login(data));
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data;

  } catch (error) {
    console.error('Error during Google Login:', error);
    throw error;
  }
};
