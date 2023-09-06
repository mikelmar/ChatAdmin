import React, { useState, useEffect, useRef } from 'react';
import Message from './Message';
import { db, auth } from '../firebase';
import { updateDoc } from 'firebase/firestore';
import { query, collection, orderBy, onSnapshot, deleteDoc, doc, setDoc, getDoc } from 'firebase/firestore';
import CryptoJS from 'crypto-js';

const style = {
  main: `flex flex-col p-[5px] mt-5 overflow-auto mb-10`,
  chatId: `text-lg font-semibold mb-2`,
  buttonContainer: `flex justify-center my-4`,
  button: `px-4 py-2 mx-2 rounded-md shadow-md bg-blue-500 text-white hover:bg-blue-600`,
};

const Chat = ({ currentChatId }) => {

  const chatRef = useRef();
  const [showReportedMessages, setShowReportedMessages] = useState(false);
  const [showAllMessages, setShowAllMessages] = useState(true);

  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null); // New state to store user information
  const scroll = useRef();

  const encryptionKey = 'clave-de-encriptacion-secreta'; // Define la clave de encriptación

  useEffect(() => {
    const q = query(collection(db, currentChatId), orderBy('timestamp'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        const message = doc.data();

        // Descifra el campo "text" utilizando la clave de encriptación
        const decryptedText = decryptText(message.text);

        messages.push({ ...message, id: doc.id, text: decryptedText });
      });
      setMessages(messages);
      console.log(messages);
    });

    setTimeout(() => {
      scroll.current.scrollIntoView({ behavior: 'smooth' });
    }, 500);

    // Set user information after sign-in

    return () => unsubscribe();
  }, [currentChatId]);

  const decryptText = (encryptedText) => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedText, encryptionKey);
      const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
      return decryptedText;
    } catch (error) {
      console.error('Error decrypting text:', error);
      return '';
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await deleteDoc(doc(db, currentChatId, messageId));
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const handleBanUser = async (userId, messageId) => {
    try {
      // Eliminar el mensaje
      await deleteDoc(doc(db, currentChatId, messageId));
      // Actualizar el usuario a estado "banned"
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        banned: true,
        reported: false,
      });
      console.log('User banned successfully.');
      alert('User banned successfully');
    } catch (error) {
      console.error('Error reporting user:', error);
    }
  };

  const handleNoBanUser = async (userId, messageId, reported) => {
    try {
      // Verificar si el mensaje ya está reportado o no
      if (reported) {
        // Actualizar el mensaje a estado "reported: false"
        const messageRef = doc(db, currentChatId, messageId);
        await updateDoc(messageRef, {
          reported: false,
        });
        console.log('Message unreported successfully.');
        alert('Message unreported successfully');
      } else {
        // Mostrar un mensaje si el mensaje ya está en estado "reported: false"
        alert('Message is already unreported.');
      }
      // Actualizar el usuario si es necesario (en este caso, no actualizamos el usuario)
    } catch (error) {
      console.error('Error reporting user:', error);
    }
  };

  const handleToggleMessages = (showReported) => {
    setShowReportedMessages(showReported);
    setShowAllMessages(!showReported);
  };

  

  return (
    <>
      <main
        className={style.main}
        style={{ overflowY: "auto"}} // Permitir scroll interno en el área de mensajes
      >
        {messages &&
          messages
            .filter((message) => (showReportedMessages ? message.reported : showAllMessages))
            .map((message) => (
              <Message
                key={message.id}
                message={message}
                onDelete={handleDeleteMessage}
                onBan={handleBanUser}
                onNoBan={handleNoBanUser}
              />
            ))}
        <span ref={scroll}></span>
      </main>
      <div className={style.buttonContainer}>
        <button onClick={() => handleToggleMessages(true)} className={style.button}>
          Show Reported Messages
        </button>
        <button onClick={() => handleToggleMessages(false)} className={style.button}>
          Show All Messages
        </button>
      </div>
    </>
  );
};

export default Chat;

/*
import React, { useState, useEffect, useRef } from 'react';
import Message from './Message';
import { db, auth } from '../firebase';
import { updateDoc } from 'firebase/firestore';
import { query, collection, orderBy, onSnapshot, deleteDoc, doc, setDoc, getDoc } from 'firebase/firestore';
import CryptoJS from 'crypto-js';

const style = {
  main: `flex flex-col p-[5px] mt-5 overflow-auto mb-10`,
  chatId: `text-lg font-semibold mb-2`,
  buttonContainer: `flex justify-center my-4`,
  button: `px-4 py-2 mx-2 rounded-md shadow-md bg-blue-500 text-white hover:bg-blue-600`,
};

const Chat = ({ currentChatId }) => {

  
  const [showReportedMessages, setShowReportedMessages] = useState(false);
  const [showAllMessages, setShowAllMessages] = useState(true);

  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null); // New state to store user information
  const scroll = useRef();

  const encryptionKey = 'clave-de-encriptacion-secreta'; // Define la clave de encriptación

  useEffect(() => {
    const q = query(collection(db, currentChatId), orderBy('timestamp'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        const message = doc.data();

        // Descifra el campo "text" utilizando la clave de encriptación
        const decryptedText = decryptText(message.text);

        messages.push({ ...message, id: doc.id, text: decryptedText });
      });
      setMessages(messages);
      console.log(messages);
    });

    setTimeout(() => {
      scroll.current.scrollIntoView({ behavior: 'smooth' });
    }, 500);

    // Set user information after sign-in

    return () => unsubscribe();
  }, [currentChatId]);

  const decryptText = (encryptedText) => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedText, encryptionKey);
      const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
      return decryptedText;
    } catch (error) {
      console.error('Error decrypting text:', error);
      return '';
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await deleteDoc(doc(db, currentChatId, messageId));
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const handleBanUser = async (userId, messageId) => {
    try {
      // Eliminar el mensaje
      await deleteDoc(doc(db, currentChatId, messageId));

      // Actualizar el usuario a estado "banned"
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        banned: true,
        reported: false,
      });
      console.log('User banned successfully.');
      alert('User banned successfully');
    } catch (error) {
      console.error('Error reporting user:', error);
    }
  };

  const handleNoBanUser = async (userId, messageId, reported) => {
    try {
      // Verificar si el mensaje ya está reportado o no
      if (reported) {
        // Actualizar el mensaje a estado "reported: false"
        const messageRef = doc(db, currentChatId, messageId);
        await updateDoc(messageRef, {
          reported: false,
        });
        console.log('Message unreported successfully.');
        alert('Message unreported successfully');
      } else {
        // Mostrar un mensaje si el mensaje ya está en estado "reported: false"
        alert('Message is already unreported.');
      }

      // Actualizar el usuario si es necesario (en este caso, no actualizamos el usuario)
    } catch (error) {
      console.error('Error reporting user:', error);
    }
  };

  const handleToggleMessages = (showReported) => {
    setShowReportedMessages(showReported);
    setShowAllMessages(!showReported);
  };

  

  return (
    <>
      <main className={style.main}>
        {messages &&
          messages
            .filter((message) => (showReportedMessages ? message.reported : showAllMessages))
            .map((message) => (
              <Message
                key={message.id}
                message={message}
                onDelete={handleDeleteMessage}
                onBan={handleBanUser}
                onNoBan={handleNoBanUser}
              />
            ))}
        <span ref={scroll}></span>
      </main>
      <div className={style.buttonContainer}>
        <button onClick={() => handleToggleMessages(true)} className={style.button}>
          Show Reported Messages
        </button>
        <button onClick={() => handleToggleMessages(false)} className={style.button}>
          Show All Messages
        </button>
      </div>
    </>
  );
};

export default Chat;
*/