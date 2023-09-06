import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import UserListItem from './UserListItem';

const style = {
  userList: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '300px',
    backgroundColor: 'white',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
    borderRadius: '5px',
    padding: '20px',
    zIndex: 100,
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    cursor: 'pointer',
  },
};

const UserList = ({ onClose }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'users'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const usersData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUsers(usersData);
    });

    return () => unsubscribe();
  }, []);

  const handleBanUser = async (userId) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        banned: true,
      });
      console.log('User banned successfully.');
    } catch (error) {
      console.error('Error banning user:', error);
    }
  };

  const handleUnbanUser = async (userId) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        banned: false,
      });
      console.log('User unbanned successfully.');
    } catch (error) {
      console.error('Error unbanning user:', error);
    }
  };

  return (
    <div style={style.userList}>
      <button style={style.closeButton} onClick={onClose}>
        X
      </button>
      <h2>User List</h2>
      {users.map((user) => (
        <UserListItem key={user.id} user={user} onBanClick={handleBanUser} onUnbanClick={handleUnbanUser} />
      ))}
    </div>
  );
};

export default UserList;


/*
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import UserListItem from './UserListItem';

const style = {
  userList: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '300px',
    backgroundColor: 'white',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
    borderRadius: '5px',
    padding: '20px',
    zIndex: 100,
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    cursor: 'pointer',
  },
};

const UserList = ({ onClose }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'users'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const usersData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUsers(usersData);
    });

    return () => unsubscribe();
  }, []);

  const handleBanUser = async (userId) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        banned: true,
      });
      console.log('User banned successfully.');
    } catch (error) {
      console.error('Error banning user:', error);
    }
  };

  const handleUnbanUser = async (userId) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        banned: false,
      });
      console.log('User unbanned successfully.');
    } catch (error) {
      console.error('Error unbanning user:', error);
    }
  };

  return (
    <div style={style.userList}>
      <button style={style.closeButton} onClick={onClose}>
        X
      </button>
      <h2>User List</h2>
      {users.map((user) => (
        <UserListItem key={user.id} user={user} onBanClick={handleBanUser} onUnbanClick={handleUnbanUser} />
      ))}
    </div>
  );
};

export default UserList;
*/