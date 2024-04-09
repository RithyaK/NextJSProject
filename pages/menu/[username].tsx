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
export type Theme = {
  id: number;
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
};

export type UserData = {
  score: number;
  username: string;
  createdAt: string;
};
type MenuPageProps = {
  allTimeRanking: UserData[];
  month: UserData[];
  week: UserData[];
  listQuizz: Theme[];
  usersPoints: UserPoints[];
};

const MenuPage = ({
  allTimeRanking,
  listQuizz,
  usersPoints,
}: MenuPageProps) => {
  const { setPoints } = useHistory();

  //
  useEffect(() => {
    setPoints(usersPoints);
  }, []);
  //
  return (
    <MenuPageStyled>
      <Sidebar allTimeRanking={allTimeRanking} />
      <Main listQuizz={listQuizz} />
    </MenuPageStyled>
  );
};

export default MenuPage;

export const getServerSideProps = async () => {
  const UsersPointsDocRef = doc(db, "infos", "points");
  const rankingsDocRef = doc(db, "infos", "rankings");
  const quizzDocRef = doc(db, "infos", "quizz");
  const docSnapShotUsersPoints = await getDoc(UsersPointsDocRef);
  const docSnapShotRankings = await getDoc(rankingsDocRef);
  const docSnapShotQuizzs = await getDoc(quizzDocRef);
  if (
    docSnapShotUsersPoints.exists() &&
    docSnapShotRankings.exists() &&
    docSnapShotQuizzs.exists()
  ) {
    const { usersPoints } = docSnapShotUsersPoints.data();
    const { allTime: allTimeRanking } = docSnapShotRankings.data();
    const { quizz } = docSnapShotQuizzs.data();
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
        usersPoints,
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
