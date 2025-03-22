import React from 'react'
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { googleLogin } from '../../api/authAPI';

const GoogleLogin = ({btnContent}) => {

    const navigate = useNavigate();

    const responseGoogle = async (authResult) => {
        try {
            console.log('Auth Result:', authResult);
        
        if (authResult?.code) {
            const result = await googleLogin(authResult.code);
            const { email, name, image } = result.data.user;
            const token = result.data.token;

            const userInfo = { email, name, image, token };
            localStorage.setItem('user-info', JSON.stringify(userInfo));

            console.log('Token:', token);
            navigate('/dashboard');
        }
        } catch (error) {
            console.error('Error during Google Login:', error);
        }
    };

    const googleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: (error) => console.error('Login Failed:', error),
        flow: 'auth-code',
    });
    
  return (
    <button
        onClick={googleLogin}
        className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-gray-300 dark:bg-gray-900 bg-white dark:text-white dark:hover:bg-gray-800 dark:focus:ring-gray-400 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-100 focus:outline-none focus:ring-2  focus:ring-gray-300  cursor-pointer"
        >
        <img
            src="https://www.material-tailwind.com/logos/logo-google.png"
            alt="Google"
            className="h-6 w-6"
        />
        {btnContent}
    </button>
  )
}

export default GoogleLogin
