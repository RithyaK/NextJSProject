// import { getUserData } from "@/firebase/userData";
import { useUsernameContext } from "@/components/context/usernameContext";
import SearchBar from "@/components/pages/menu/SearchBar";
import Sidebar from "@/components/pages/menu/Sidebar";
import Main from "@/components/pages/menu/main/Main";
import { db } from "@/firestore/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { use, useContext, useEffect } from "react";
import styled from "styled-components";

type UserData = {
  score: number;
  username: string;
};

type MenuPageProps = {
  allTime: UserData[];
  month: UserData[];
  week: UserData[];
};
const MenuPage = ({ allTime, month, week }: MenuPageProps) => {
  //

  //

  //
  return (
    <MenuPageStyled>
      <Sidebar allTime={allTime} month={month} week={week} />
      <Main />
    </MenuPageStyled>
  );
};

export default MenuPage;

export const getServerSideProps = async () => {
  const docRef = doc(db, "infos", "rankings");
  const docSnapShot = await getDoc(docRef);
  if (docSnapShot.exists()) {
    const { allTime, month, week } = docSnapShot.data();
    console.log("allTime : ", allTime);

    return {
      props: {
        allTime,
        month,
        week,
      },
    };
  } else {
    return {
      props: {
        allTime: null,
      },
    };
  }
};

const MenuPageStyled = styled.div`
  display: flex;
  height: calc(100vh - 50px);
  background-color: #4b4b50;
  display: grid;
  grid-template-columns: 230px 1fr;
`;
