import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleLogin from '../LoginRegister/GoogleLogin';

const GoogleWrapper = ({btnContent}) => (
  <GoogleOAuthProvider clientId="763820276503-qsvg3g0r8ke2518g4co0pe6dl899l9h2.apps.googleusercontent.com">
    <GoogleLogin btnContent={btnContent} />
  </GoogleOAuthProvider>
);

export default GoogleWrapper;
