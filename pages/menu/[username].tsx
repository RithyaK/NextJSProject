// import { getUserData } from "@/firebase/userData";
import { useUsernameContext } from "@/components/context/usernameContext";
import Main from "@/components/pages/menu/main/Main";
import { db } from "@/firestore/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { use, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Timestamp } from "@firebase/firestore-types";
import Sidebar from "@/components/Sidebar";
import useHistory, { UserPoints } from "@/hooks/useHistory";
import { userDataAccount } from "../quizz/[quizzName]";
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

export type UserData = {
  score: number;
  username: string;
  createdAt: string;
};
type MenuPageProps = {
  allTimeRanking: UserData[];
  listQuizz: Theme[];
  usersData: userDataAccount[];
};

const MenuPage = ({ allTimeRanking, listQuizz, usersData }: MenuPageProps) => {
  //
  return (
    <MenuPageStyled>
      <Sidebar allTimeRanking={allTimeRanking} usersData={usersData} />
      <Main listQuizz={listQuizz} />
    </MenuPageStyled>
  );
};

export default MenuPage;

export const getServerSideProps = async () => {
  const rankingsDocRef = doc(db, "infos", "rankings");
  const quizzDocRef = doc(db, "infos", "quizz");

  const docSnapShotRankings = await getDoc(rankingsDocRef);
  const docSnapShotQuizzs = await getDoc(quizzDocRef);

  const usersDocRef = doc(db, "infos", "users");
  const docSnapShotUsers = await getDoc(usersDocRef);

  if (
    docSnapShotRankings.exists() &&
    docSnapShotQuizzs.exists() &&
    docSnapShotUsers.exists()
  ) {
    const { allTime: allTimeRanking } = docSnapShotRankings.data();
    const { quizz } = docSnapShotQuizzs.data();
    const { users } = docSnapShotUsers.data();
    // const createdAt = allTimeRanking[0].createdAt.toDate() as Timestamp;
    // console.log(createdAt);
    const allTimeRankingUpdated = allTimeRanking.map((object) => {
      return {
        ...object,
        createdAt: object.createdAt.toDate().toISOString(),
      };
    });
    return {
      props: {
        allTimeRanking: allTimeRankingUpdated,
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
