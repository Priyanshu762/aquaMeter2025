import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleLogin from '../LoginRegister/GoogleLogin';

const GoogleWrapper = ({btnContent}) => (
  <GoogleOAuthProvider clientId="97401399361-dvger39heubbpcuf1555lqahh4lflj7d.apps.googleusercontent.com">
    <GoogleLogin btnContent={btnContent} />
  </GoogleOAuthProvider>
);

export default GoogleWrapper;
