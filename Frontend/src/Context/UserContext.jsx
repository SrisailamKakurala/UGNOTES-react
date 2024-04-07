// UserContext.jsx

import React, { createContext, useState, useContext } from 'react';
// Create a context to store user data
const UserContext = createContext();

// Create a context provider component
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  return (
    <UserContext.Provider value={{ userData, setUserData}}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access user data
export const useUser = () => useContext(UserContext);
