import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import ChatList from "./components/ChatList";
import Chat from "./components/Chat";
import UserList from "./components/UserList";
import { auth, db } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc } from "firebase/firestore";

const App = () => {
  const [currentChatId, setCurrentChatId] = useState(null);
  const [user] = useAuthState(auth);
  const [userBanned, setUserBanned] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // Nuevo estado para verificar el estado de administrador
  const [showUserList, setShowUserList] = useState(false);

  useEffect(() => {
    const checkUserBannedStatus = async () => {
      if (user) {
        const userRef = doc(db, "users", user.displayName);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const { banned, isAdmin } = userDoc.data();
          setUserBanned(banned);
          setIsAdmin(isAdmin);
        }
      }
    };

    checkUserBannedStatus();
  }, [user]);

  const onChatItemClick = (chatId) => {
    setCurrentChatId(chatId);
    setShowUserList(false);
  };

  const handleShowUserList = () => {
    setShowUserList(true);
  };

  const handleCloseUserList = () => {
    setShowUserList(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
      <Navbar currentChatId={currentChatId} setCurrentChatId={setCurrentChatId} onShowUserList={handleShowUserList} />
      {user && !userBanned && (
        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
          {isAdmin && ( // Mostrar la ChatList solo si el usuario es un administrador
            <div style={{ flex: 1 }}>
              <ChatList
                currentChatId={currentChatId}
                onChatItemClick={onChatItemClick}
              />
            </div>
          )
          }
          {!isAdmin && (
            <p>No puedes iniciar sesión porque no eres administrador.</p>
          )}
          <div style={{ flex: isAdmin ? 3 : 4, height: "90%", overflow: "auto" }}>
            {currentChatId && <Chat currentChatId={currentChatId} />}
          </div>
          {user && !isAdmin && (
            <p></p>
          )}
        </div>
      )}
      {showUserList && (
        <UserList currentUser={user} onClose={handleCloseUserList} />
      )}
    </div>
  );
};

export default App;

/*
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import ChatList from "./components/ChatList";
import Chat from "./components/Chat";
import UserList from "./components/UserList";
import { auth, db } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc } from "firebase/firestore";

const App = () => {
  const [currentChatId, setCurrentChatId] = useState(null);
  const [user] = useAuthState(auth);
  const [userBanned, setUserBanned] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // Nuevo estado para verificar el estado de administrador
  const [showUserList, setShowUserList] = useState(false);

  useEffect(() => {
    const checkUserBannedStatus = async () => {
      if (user) {
        const userRef = doc(db, "users", user.displayName);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const { banned, isAdmin } = userDoc.data();
          setUserBanned(banned);
          setIsAdmin(isAdmin);
        }
      }
    };

    checkUserBannedStatus();
  }, [user]);

  const onChatItemClick = (chatId) => {
    setCurrentChatId(chatId);
    setShowUserList(false);
  };

  const handleShowUserList = () => {
    setShowUserList(true);
  };

  const handleCloseUserList = () => {
    setShowUserList(false);
  };

  return (
    <div>
      <Navbar
        currentChatId={currentChatId}
        setCurrentChatId={setCurrentChatId}
        onShowUserList={handleShowUserList}
      />
      {user && !userBanned && (
        <div style={{ display: "flex", height: "100vh" }}>
          {isAdmin && ( // Mostrar la ChatList solo si el usuario es un administrador
            <div style={{ flex: 1 }}>
              <ChatList
                currentChatId={currentChatId}
                onChatItemClick={onChatItemClick}
              />
            </div>
          )}
          {user && !isAdmin && (
            <p>No puedes iniciar sesión porque no eres administrador.</p>
          )}
          <div style={{ flex: isAdmin ? 3 : 4, height: "90%", overflow: "auto" }}>
            {currentChatId && <Chat currentChatId={currentChatId} />}
          </div>
        </div>
      )}
      {showUserList && (
        <UserList currentUser={user} onClose={handleCloseUserList} />
      )}
    </div>
  );
};

export default App;
*/