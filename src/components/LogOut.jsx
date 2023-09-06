import React from 'react';
import { auth } from '../firebase';

const style = {
    logoutButton: {
        backgroundColor: '#e53e3e',
        color: 'white',
        fontWeight: 'bold',
        padding: '8px 12px',
        borderRadius: '4px',
        marginLeft: '10px',
        cursor: 'pointer',
        border: 'none',
      },
}

const LogOut = () => {
  const handleSignOut = () => {
    auth.signOut();
  };

  return (
    <button style={style.logoutButton} onClick={handleSignOut}>
      Cerrar Sesión
    </button>
  );
};

export default LogOut;
