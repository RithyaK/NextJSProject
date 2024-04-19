// import { getUserData } from "@/firebase/userData";
import { useUsernameContext } from "@/components/context/usernameContext";
import { db } from "@/firestore/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { use, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Timestamp } from "@firebase/firestore-types";
import useHistory, { UserPoints } from "@/hooks/useHistory";
import { userDataAccount } from "../myaccount";
import Sidebar from "@/components/pages/reusable-ui/Sidebar";
import Main from "@/components/pages/menu/Main";
export type Theme = {
  id: string;
  name: string;
  chapters: Chapter[];
};

export type Chapter = {
  played: number;
  name: string;
  difficulty: string;
  date: string;
  image: string;
  questions: Question[];
};

export type Question = {
  question: string;
  choices: string[];
  answer: string;
  id: string;
};

type MenuPageProps = {
  listQuizz: Theme[];
  usersData: userDataAccount[];
};

const MenuPage = ({ listQuizz, usersData }: MenuPageProps) => {
  //
  return (
    <MenuPageStyled>
      <Sidebar usersData={usersData} />
      <Main listQuizz={listQuizz} />
    </MenuPageStyled>
  );
};

export default MenuPage;

export const getServerSideProps = async () => {
  const quizzDocRef = doc(db, "infos", "quizz");
  const docSnapShotQuizzs = await getDoc(quizzDocRef);

  const usersDocRef = doc(db, "infos", "users");
  const docSnapShotUsers = await getDoc(usersDocRef);

  if (docSnapShotQuizzs.exists() && docSnapShotUsers.exists()) {
    const { quizz } = docSnapShotQuizzs.data();
    const { users } = docSnapShotUsers.data();
    return {
      props: {
        listQuizz: quizz,
        usersData: users,
      },
    };
  } else {
    return {
      props: {
        data: null,
      },
    };
  }
};

const MenuPageStyled = styled.div`
  height: calc(100vh - 50px);
  display: grid;
  grid-template-columns: 230px 1fr;
`;
