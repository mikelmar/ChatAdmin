import React from 'react';

const style = {
  userItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid #ccc',
  },
  userName: {
    flex: 1,
    marginLeft: '10px',
  },
  actionButton: {
    padding: '8px 12px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
  },
};

const UserListItem = ({ user, onBanClick, onUnbanClick }) => {
  return (
    <div style={style.userItem}>
      <span style={style.userName}>{user.name}</span>
      {user.banned ? (
        <button style={{ ...style.actionButton, backgroundColor: 'red', color: 'white' }} onClick={() => onUnbanClick(user.id)}>
          Unban
        </button>
      ) : (
        <button style={{ ...style.actionButton, backgroundColor: 'green', color: 'white' }} onClick={() => onBanClick(user.id)}>
          Ban
        </button>
      )}
    </div>
  );
};

export default UserListItem;


/*
import React from 'react';

const style = {
  userItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid #ccc',
  },
  userName: {
    flex: 1,
    marginLeft: '10px',
  },
  actionButton: {
    padding: '8px 12px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
  },
};

const UserListItem = ({ user, onBanClick, onUnbanClick }) => {
  return (
    <div style={style.userItem}>
      <span style={style.userName}>{user.name}</span>
      {user.banned ? (
        <button style={{ ...style.actionButton, backgroundColor: 'red', color: 'white' }} onClick={() => onUnbanClick(user.id)}>
          Unban
        </button>
      ) : (
        <button style={{ ...style.actionButton, backgroundColor: 'green', color: 'white' }} onClick={() => onBanClick(user.id)}>
          Ban
        </button>
      )}
    </div>
  );
};

export default UserListItem;
*/