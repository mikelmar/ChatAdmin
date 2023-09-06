import React, { useState } from "react";
import { db } from "../firebase";
import { collection, doc, setDoc } from "firebase/firestore";

const NewChatForm = ({ onClose }) => {
  const [newChatId, setNewChatId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCreateChat = async () => {
    if (newChatId.trim() === "") {
      return;
    }

    try {
      // Usar el nombre como el ID del documento en la colección "chats" y establecer el campo "name"
      const chatRef = doc(db, "chats", "colec", "chats", newChatId);
      await setDoc(chatRef, { name: newChatId });

      onClose();
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  const style = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: "20px",
    },
    input: {
      width: "300px",
      padding: "10px",
      fontSize: "16px",
      borderRadius: "4px",
      border: "1px solid #ccc",
      marginBottom: "10px",
    },
    button: {
      padding: "10px 20px",
      fontSize: "16px",
      backgroundColor: "#395dff",
      color: "#fff",
      borderRadius: "4px",
      border: "none",
      cursor: "pointer",
    },
    error: {
      color: "red",
    },
  };

  return (
    <div style={style.container}>
      <input
        type="text"
        value={newChatId}
        onChange={(e) => setNewChatId(e.target.value)}
        placeholder="Escribe el nombre del chat"
        style={style.input}
      />
      <button onClick={handleCreateChat} style={style.button}>
        Crear nuevo Chat
      </button>
      {errorMessage && <p style={style.error}>{errorMessage}</p>}
    </div>
  );
};

export default NewChatForm;



/*import React, { useState } from "react";
import { db } from "../firebase";
import { collection, doc, setDoc } from "firebase/firestore";

const NewChatForm = ({ onClose }) => {
  const [newChatId, setNewChatId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCreateChat = async () => {
    if (newChatId.trim() === "") {
      setErrorMessage("El nombre del chat no puede estar vacío");
      return;
    }

    try {
      // Usar el nombre como el ID del documento en la colección "chats" y establecer el campo "name"
      const chatRef = doc(db, "chats", "colec", "chats", newChatId);
      await setDoc(chatRef, { name: newChatId });

      onClose();
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={newChatId}
        onChange={(e) => setNewChatId(e.target.value)}
        placeholder="Escribe el nombre del chat"
      />
      <button onClick={handleCreateChat}>Crear Chat</button>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default NewChatForm;*/