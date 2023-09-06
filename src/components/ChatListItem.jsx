import React from "react";

const style = {
  chatItem: {
    padding: "10px",
    cursor: "pointer",
    transition: "background-color 0.3s ease-in-out",
  },
  selected: {
    backgroundColor: "lightblue",
  },
  deleteButton: {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    color: "#e53e3e",
    marginLeft: "10px",
  },
};

const ChatListItem = ({ name, onClick, isSelected, onDelete }) => {
  const backgroundColor = isSelected ? style.selected.backgroundColor : "white";

  return (
    <div style={{ ...style.chatItem, backgroundColor, display: "flex", justifyContent: "space-between" }}>
      <span onClick={onClick}>{name}</span>
      <button onClick={onDelete} style={style.deleteButton}>
        ❌
      </button>
    </div>
  );
};

export default ChatListItem;


/*
import React from "react";

const ChatListItem = ({ name, onClick, isSelected, onDelete }) => {
  const backgroundColor = isSelected ? "lightblue" : "white";
  return (
    <div style={{ backgroundColor, display: "flex", justifyContent: "space-between" }}>
      <span onClick={onClick}>{name}</span>
      <button onClick={onDelete}>❌</button>
      </div>
      );
    };
    
    export default ChatListItem;
*/
