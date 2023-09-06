import React from 'react';
import { auth, db } from '../firebase';
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import GoogleButton from 'react-google-button';

const SignIn = () => {
  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <GoogleButton onClick={handleSignIn} />
  );
};

export default SignIn;


/*
import React from 'react';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';

const SignIn = () => {
  const handleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  return (
    <button onClick={handleSignIn}>
      Iniciar Sesión con Google
    </button>
  );
};

export default SignIn;
*/
