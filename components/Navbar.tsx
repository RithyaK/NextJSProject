import React from "react";
import styled from "styled-components";

const Navbar = () => {
  return (
    <NavbarStyled>
      <div>LEFT SIDE</div>
      <div>CENTER</div>
      <div>RIGHT SIDE</div>
    </NavbarStyled>
  );
};

export default Navbar;

const NavbarStyled = styled.div`
  background-color: red;
  display: flex;
  justify-content: space-between;
  height: 50px;
`;
