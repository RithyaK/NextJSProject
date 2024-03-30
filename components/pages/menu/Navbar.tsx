import React, { useEffect } from "react";
import styled from "styled-components";
import { useUsernameContext } from "../../context/usernameContext";
import Link from "next/link";
import { BsPersonCircle } from "react-icons/bs";
import { theme } from "@/theme";
import SearchBar from "./main/top-main/SearchBar";

const Navbar = () => {
  //

  const { username } = useUsernameContext();
  //

  //
  return (
    <NavbarStyled>
      <Link href="/login">Se déconnecter</Link>
      <div className="NavbarRightSide">
        <span>Mon compte</span>
        <BsPersonCircle />
      </div>
    </NavbarStyled>
  );
};

export default Navbar;

const NavbarStyled = styled.div`
  background-color: ${theme.colors.lightgreen};
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  padding: 0 20px;
  .NavbarRightSide {
    display: flex;
    align-items: center;
    span {
      margin: 0 10px;
    }
  }
`;
