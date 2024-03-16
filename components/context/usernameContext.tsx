import React, { useContext, useState } from "react";
const Context = React.createContext();

export const UsernameContextProvider = (props) => {
  const [username, setUsername] = useState<string>("");

  const contextValue = { username, setUsername };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export const useUsernameContext = () => useContext(Context);
