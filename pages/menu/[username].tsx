// import { getUserData } from "@/firebase/userData";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { use, useContext, useEffect } from "react";
import styled from "styled-components";
const MenuPage = () => {
  //

  //

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
  height: calc(100vh - 50px);
  background-color: #4b4b50;
`;
