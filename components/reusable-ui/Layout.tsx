import React from "react";
import Navbar from "../pages/menu/Navbar";
import Sidebar from "../pages/menu/Sidebar";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
