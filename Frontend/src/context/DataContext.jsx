import React, { createContext, useState, useContext, useEffect } from 'react';
import { initialUsers } from '../lib/data';

const DataContext = createContext();

export const useData = () => {
  return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const savedUsers = localStorage.getItem('wastebank_users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      setUsers(initialUsers);
      localStorage.setItem('wastebank_users', JSON.stringify(initialUsers));
    }
  }, []);

  const updateUsers = (newUsers) => {
    setUsers(newUsers);
    localStorage.setItem('wastebank_users', JSON.stringify(newUsers));
  };

  const value = {
    users,
    updateUsers,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};