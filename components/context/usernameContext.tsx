import React, { useContext, useEffect, useState } from "react";

const UsernameContext = React.createContext<{
  username: string | null;
  setUsername: React.Dispatch<React.SetStateAction<string | null>>;
}>({ username: null, setUsername: () => "" });

export const UsernameContextProvider = (props: {
  children: React.JSX.Element;
}) => {
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
    <UsernameContext.Provider value={contextValue}>
      {props.children}
    </UsernameContext.Provider>
  );
};

export const useUsernameContext = () => useContext(UsernameContext);
