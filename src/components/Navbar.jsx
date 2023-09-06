import React, { useState, useEffect, useRef } from 'react';
import { db, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import NewChatForm from './NewChatForm';
import UserList from './UserList'; // Importar el nuevo componente UserList
import InfoTab from "./InfoTab"; // Importa el nuevo componente InfoTab

import { query, collection, orderBy, onSnapshot, deleteDoc, doc, setDoc, getDoc } from 'firebase/firestore';

import SignIn from './SignIn'; // Importa el componente SignIn
import LogOut from './LogOut'; // Importa el componente LogOut

const style = {
  infoButton: {
    backgroundColor: '#f6e05e',
    color: '#1a202c',
    fontWeight: 'bold',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '10px',
    border: 'none',
  },
  nav: {
    backgroundColor: '#4a5568',
    height: '80px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
  },
  heading: {
    color: 'white',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  createChatButton: {
    backgroundColor: '#1a202c',
    color: 'white',
    fontWeight: 'bold',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginLeft: '10px',
    border: 'none',
  },
  cancelButton: {
    backgroundColor: '#e53e3e',
    color: 'white',
    fontWeight: 'bold',
    padding: '8px 12px',
    borderRadius: '4px',
    marginLeft: '10px',
    cursor: 'pointer',
    border: 'none',
  },
  userListButton: {
    backgroundColor: '#3182ce',
    color: 'white',
    fontWeight: 'bold',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    border: 'none',
  },
  closeChatButton: {
    backgroundColor: '#718096',
    color: 'white',
    fontWeight: 'bold',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    border: 'none',
  },
  
};


const Navbar = ({ currentChatId, setCurrentChatId, onShowUserList }) => {
  const [user] = useAuthState(auth);

  const [showNewChatForm, setShowNewChatForm] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState('80px');
  const headingText = currentChatId ? currentChatId : 'Admin de ChatApp';

  const [infoTabVisible, setInfoTabVisible] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // Nuevo estado para verificar el estado de administrador

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        const userRef = doc(db, 'users', user.displayName);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const { isAdmin } = userDoc.data();
          setIsAdmin(isAdmin);
        }
      }
    };

    checkAdminStatus();
  }, [user]);

  const toggleInfoTab = () => {
    setInfoTabVisible(!infoTabVisible);
  };

  const handleShowNewChatForm = () => {
    setShowNewChatForm(true);
    setNavbarHeight('150px'); // Cambiar la altura al hacer clic en "Crear Chat"
  };

  const handleCloseNewChatForm = () => {
    setShowNewChatForm(false);
    setNavbarHeight('80px'); // Restaurar la altura al hacer clic en "Cancelar"
  };

  const handleCancelNewChatForm = () => {
    setShowNewChatForm(false);
    setNavbarHeight('80px'); // Restaurar la altura al hacer clic en "Crear Nuevo Chat"
  };

  return (
    <div style={{ ...style.nav, height: navbarHeight }}>
      <h1 style={style.heading}>{headingText}</h1>
      {user ? (
        <div style={style.buttonContainer}>
          {isAdmin ? (
            <>
              <button onClick={toggleInfoTab} style={style.infoButton}>
                Info
              </button>
              {infoTabVisible && <InfoTab onClose={toggleInfoTab} />}
              {!currentChatId && (
                <button onClick={onShowUserList} style={style.userListButton}>
                  Ver Usuarios
                </button>
              )}
              {currentChatId && (
                <button onClick={() => setCurrentChatId(null)} style={style.closeChatButton}>
                  Cerrar Chat Actual
                </button>
              )}
              {showNewChatForm ? (
                <>
                  <NewChatForm onClose={handleCloseNewChatForm} />
                  <button onClick={handleCancelNewChatForm} style={style.cancelButton}>
                    Cancelar
                  </button>
                </>
              ) : (
                <button onClick={handleShowNewChatForm} style={style.createChatButton}>
                  Crear Nuevo Chat
                </button>
              )}
            </>
          ) : (
            <p> </p>
          )}
          <LogOut />
        </div>
      ) : (
        <div style={style.buttonContainer}>
          <SignIn />
        </div>
      )}
    </div>
  );
};

export default Navbar;

/*
import React, { useState } from 'react';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import NewChatForm from './NewChatForm';
import UserList from './UserList'; // Importar el nuevo componente UserList
import InfoTab from "./InfoTab"; // Importa el nuevo componente InfoTab

import SignIn from './SignIn'; // Importa el componente SignIn
import LogOut from './LogOut'; // Importa el componente LogOut

const style = {
  infoButton: {
    backgroundColor: '#f6e05e',
    color: '#1a202c',
    fontWeight: 'bold',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '10px',
    border: 'none',
  },
  nav: {
    backgroundColor: '#4a5568',
    height: '80px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
  },
  heading: {
    color: 'white',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  createChatButton: {
    backgroundColor: '#1a202c',
    color: 'white',
    fontWeight: 'bold',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginLeft: '10px',
    border: 'none',
  },
  cancelButton: {
    backgroundColor: '#e53e3e',
    color: 'white',
    fontWeight: 'bold',
    padding: '8px 12px',
    borderRadius: '4px',
    marginLeft: '10px',
    cursor: 'pointer',
    border: 'none',
  },
  userListButton: {
    backgroundColor: '#3182ce',
    color: 'white',
    fontWeight: 'bold',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    border: 'none',
  },
  closeChatButton: {
    backgroundColor: '#718096',
    color: 'white',
    fontWeight: 'bold',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    border: 'none',
  },
};

const Navbar = ({ currentChatId, setCurrentChatId, onShowUserList }) => {
  const [user] = useAuthState(auth);

  const [showNewChatForm, setShowNewChatForm] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState('80px');
  const headingText = currentChatId ? currentChatId : 'Admin de ChatApp';

  const [infoTabVisible, setInfoTabVisible] = useState(false);

  const toggleInfoTab = () => {
    setInfoTabVisible(!infoTabVisible);
  };

  const handleShowNewChatForm = () => {
    setShowNewChatForm(true);
    setNavbarHeight('150px'); // Cambiar la altura al hacer clic en "Crear Chat"
  };

  const handleCloseNewChatForm = () => {
    setShowNewChatForm(false);
    setNavbarHeight('80px'); // Restaurar la altura al hacer clic en "Cancelar"
  };

  const handleCancelNewChatForm = () => {
    setShowNewChatForm(false);
    setNavbarHeight('80px'); // Restaurar la altura al hacer clic en "Crear Nuevo Chat"
  };

  return (
    <div style={{ ...style.nav, height: navbarHeight }}>
      <h1 style={style.heading}>{headingText}</h1>
      {user ? (
        <div style={style.buttonContainer}>
          <button  onClick={toggleInfoTab} style={style.infoButton}>
            Info
          </button>
          {infoTabVisible && <InfoTab onClose={toggleInfoTab} />}
          {!currentChatId && (
            <button onClick={onShowUserList} style={style.userListButton}>
              Ver Usuarios
            </button>
          )}
          {currentChatId && (
            <button onClick={() => setCurrentChatId(null)} style={style.closeChatButton}>
              Cerrar Chat Actual
            </button>
          )}
          {showNewChatForm ? (
            <>
              <NewChatForm onClose={handleCloseNewChatForm} />
              <button onClick={handleCancelNewChatForm} style={style.cancelButton}>
                Cancelar
              </button>
            </>
          ) : (
            <button onClick={handleShowNewChatForm} style={style.createChatButton}>
              Crear Nuevo Chat
            </button>
          )}
          <LogOut /> 
          </div>
          ) : (
            <div style={style.buttonContainer}>
              <SignIn /> 
            </div>
          )}
        </div>
      );
    };
    
    export default Navbar;
    */