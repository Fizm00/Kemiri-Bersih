import React, { createContext, useState, useContext, useEffect } from 'react';
import { initialUsers } from '../lib/data';

const DataContext = createContext();

export const useData = () => {
  return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [activities, setActivities] = useState(() => {
    const savedActivities = localStorage.getItem('wastebank_activities');
    return savedActivities ? JSON.parse(savedActivities) : [];
  });

  useEffect(() => {
    const savedUsers = localStorage.getItem('wastebank_users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      setUsers(initialUsers);
      localStorage.setItem('wastebank_users', JSON.stringify(initialUsers));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('wastebank_activities', JSON.stringify(activities));
  }, [activities]);

  const updateUsers = (newUsers) => {
    setUsers(newUsers);
    localStorage.setItem('wastebank_users', JSON.stringify(newUsers));
  };

  const addActivity = (activity) => {
    setActivities((prev) => [
      { id: Date.now(), timestamp: new Date().toISOString(), ...activity },
      ...prev.slice(0, 49), // Limit to 50 recent activities
    ]);
  };

  const value = {
    users,
    updateUsers,
    activities,
    addActivity,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};