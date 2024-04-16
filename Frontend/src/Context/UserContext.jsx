// UserContext.jsx

import React, { createContext, useState, useContext } from 'react';
// Create a context to store user data
const UserContext = createContext();

// Create a context provider component
export const UserProvider = ({ children }) => {
  const [trigger, setTrigger] = useState(null);
  const [loadProfile, setLoadProfile] = useState(false);
  const [loadHome, setLoadHome] = useState(false);

  return (
    <UserContext.Provider value={{ trigger, setTrigger, loadProfile, setLoadProfile, loadHome, setLoadHome}}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access user data
export const useUser = () => useContext(UserContext);
