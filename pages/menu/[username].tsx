// import { getUserData } from "@/firebase/userData";
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
      <div>
        <p>MenuPAGE</p>
        <Link href="/login">Return to login page</Link>
      </div>
    </MenuPageStyled>
  );
};

export default MenuPage;

const MenuPageStyled = styled.div`
  .body {
    display: flex;
    height: calc(100vh - 49px);
  }
`;
