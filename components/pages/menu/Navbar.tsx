import React from "react";
import styled from "styled-components";
import { useUsernameContext } from "../../context/usernameContext";
import Link from "next/link";

const Navbar = () => {
  //
  const { username } = useUsernameContext();
  //

  //
  return (
    <NavbarStyled>
      <Link href="/login">Return to login page</Link>

      <div>CENTER</div>
      <div className="NavbarRightSide">
        <span>Mon compte</span>
        <span>{username}</span>
      </div>
    </NavbarStyled>
  );
};

export default Navbar;

const NavbarStyled = styled.div`
  background-color: red;
  display: flex;
  justify-content: space-between;
  height: 50px;
  padding: 0 20px;
  .NavbarRightSide {
    display: flex;
    flex-direction: column;
  }
`;
