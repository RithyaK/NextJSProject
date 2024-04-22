import React from "react";
import Navbar from "./Navbar";
import { useUsernameContext } from "@/components/context/usernameContext";

const Layout = ({ children }) => {
  const { username } = useUsernameContext();
  return (
    <div>
      {username && <Navbar />}
      <div>{children}</div>
    </div>
  );
};

export default Layout;
