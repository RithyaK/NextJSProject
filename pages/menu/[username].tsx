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

export type Subject = {
  id: number;
  name: string;
  chapters: {
    name: string;
    questions: {
      question: string;
      choices: string[];
      answer: string;
    }[];
  }[];
};
type MenuPageProps = {
  allTime: UserData[];
  month: UserData[];
  week: UserData[];
  quizz: Subject[];
};

const MenuPage = ({ allTime, month, week, quizz }: MenuPageProps) => {
  //

  //

  //
  return (
    <MenuPageStyled>
      <Sidebar allTime={allTime} month={month} week={week} />
      <Main listQuizz={quizz} />
    </MenuPageStyled>
  );
};

export default MenuPage;

export const getServerSideProps = async () => {
  const rankingsDocRef = doc(db, "infos", "rankings");
  const quizzDocRef = doc(db, "infos", "quizz");
  const docSnapShotRankings = await getDoc(rankingsDocRef);
  const docSnapShotQuizzs = await getDoc(quizzDocRef);
  if (docSnapShotRankings.exists() && docSnapShotQuizzs.exists()) {
    const { allTime, month, week } = docSnapShotRankings.data();
    const { quizz } = docSnapShotQuizzs.data();

    return {
      props: {
        allTime,
        month,
        week,
        quizz,
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
  display: flex;
  height: calc(100vh - 50px);
  display: grid;
  grid-template-columns: 230px 1fr;
`;
