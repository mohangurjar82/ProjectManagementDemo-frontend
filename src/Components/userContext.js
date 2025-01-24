import React, { createContext, useState, useEffect } from "react";

// Create the context
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [userDetail, setUserDetail] = useState(null);

  // On component mount, check if user details are saved in localStorage
  useEffect(() => {
    const storedUserDetail = localStorage.getItem("userDetail");
    if (storedUserDetail) {
      setUserDetail(JSON.parse(storedUserDetail));
    }
  }, []);

  // Whenever userDetail changes, store it in localStorage
  useEffect(() => {
    if (userDetail) {
      localStorage.setItem("userDetail", JSON.stringify(userDetail));
    }
  }, [userDetail]);

  return (
    <UserContext.Provider value={{ userDetail, setUserDetail }}>
      {children}
    </UserContext.Provider>
  );
};
