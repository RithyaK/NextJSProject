import React, { useContext, useEffect, useState } from "react";
const Context = React.createContext();

export const UsernameContextProvider = (props) => {
  const [username, setUsername] = useState(() => {
    if (typeof window === "undefined") {
      return null;
    }
    return localStorage.getItem("username");
  });

  useEffect(() => {
    localStorage.setItem("username", username ?? "");
  }, [username]);
  const contextValue = { username, setUsername };
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export const useUsernameContext = () => useContext(Context);
