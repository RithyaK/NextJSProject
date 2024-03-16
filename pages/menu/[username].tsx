// import { getUserData } from "@/firebase/userData";
import Sidebar from "@/components/Sidebar";
import { useUsernameContext } from "@/components/context/usernameContext";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { use, useContext, useEffect } from "react";
import styled from "styled-components";
const MenuPage = () => {
  //
  const { setUsername } = useUsernameContext();
  //
  useEffect(() => {
    const usernameData = localStorage.getItem("username");
    setUsername(usernameData);
  }, []);
  //
  return (
    <MenuPageStyled>
      <Sidebar />
      <div>
        <p>MenuPAGE</p>
        <Link href="/login">Return to login page</Link>
      </div>
    </MenuPageStyled>
  );
};

export default MenuPage;

const MenuPageStyled = styled.div`
  display: flex;
  height: calc(100vh - 49px);
  background-color: #4b4b50;
`;
