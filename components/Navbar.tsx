import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { BsPersonCircle } from "react-icons/bs";
import { theme } from "@/theme";
import SearchBar from "./pages/menu/main/top-main/SearchBar";
import { useUsernameContext } from "./context/usernameContext";

const Navbar = () => {
  const [menuProfil, setMenuProfil] = useState(false);
  const menuProfilRef = useRef<HTMLDivElement>(null);
  //
  return (
    <NavbarStyled ref={menuProfilRef}>
      <Link href="/login">Se déconnecter</Link>
      <SearchBar />
      <div className="NavbarRightSide">
        <Link href="/myaccount">
          <span>Mon compte</span>
        </Link>
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
  .NavbarRightSide:hover {
    cursor: pointer;
  }
`;
