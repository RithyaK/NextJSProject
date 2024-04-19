import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div>
      {/* IF LOGIN 
      <Navbar />
*/}
      <Navbar />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
