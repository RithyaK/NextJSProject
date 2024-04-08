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
  const { username } = useUsernameContext();
  //

  useEffect(() => {
    let handler = (e) => {
      if (!menuProfilRef.current.contains(e.target)) {
        setMenuProfil(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <NavbarStyled>
      <Link href="/login">Se déconnecter</Link>
      <SearchBar />
      <div
        className="NavbarRightSide"
        ref={menuProfilRef}
        onClick={() => setMenuProfil(!menuProfil)}
      >
        <span className="welcomemessage">Bonjour , {username} !</span>
        <BsPersonCircle />
        {menuProfil && (
          <div className="menuProfileDropDown">
            <Link href="/myaccount">Mon compte</Link>
            <span>Confidentialité</span>
            <span>Information</span>
            <span>Langue</span>
          </div>
        )}
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
  }
  .welcomemessage {
    margin: 0 10px;
  }
  .NavbarRightSide:hover {
    cursor: pointer;
  }

  .menuProfileDropDown {
    position: absolute;
    z-index: 1;
    transform: translate(50%, 70%);
    border-radius: 10px;
    background-color: #a19a9a;
    padding: 5px;
    max-height: 50vh;
    overflow: auto;
    display: flex;
    flex-direction: column;
    width: 100px;
    gap: 3px;
  }
  a {
    text-decoration: none;
  }
`;
