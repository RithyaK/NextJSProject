import { db } from "@/firestore/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { UserData } from "../menu/[username]";
import MainMyAccount from "@/components/pages/menu/myaccount/MainMyAccount";
import styled from "styled-components";
import { useUsernameContext } from "@/components/context/usernameContext";
import Sidebar from "@/components/Sidebar";
import { theme } from "@/theme";

type MyAccountPageProps = {
  allTimeRanking: UserData[];
  historyData: HistoryQuizzAnswered[];
};
export type HistoryQuizzAnswered = {
  createdAt: string;
  image: string;
  name: string;
  score: number;
  id: string;
  numberOfQuestions: number;
};
const MyAccountPage = ({ allTimeRanking, historyData }: MyAccountPageProps) => {
  console.log("historyData :", historyData);

  return (
    <MyAccountPageStyled>
      <Sidebar allTimeRanking={allTimeRanking} />
      <MainMyAccount historyData={historyData} />
    </MyAccountPageStyled>
  );
};

export default MyAccountPage;

export const getServerSideProps = async ({ req }) => {
  const rankingsDocRef = doc(db, "infos", "rankings");
  const userDocRef = doc(db, "users", req.cookies.username);
  const docSnapShotRanking = await getDoc(rankingsDocRef);
  const docSnapShotUser = await getDoc(userDocRef);

  if (docSnapShotRanking.exists() && docSnapShotUser.exists()) {
    const { allTime: allTimeRanking } = docSnapShotRanking.data();
    const { history: historyData } = docSnapShotUser.data();
    const allTimeRankingUpdated = allTimeRanking.map((object) => {
      return {
        ...object,
        createdAt: object.createdAt.toDate().toISOString(),
      };
    });

    return {
      props: {
        allTimeRanking: allTimeRankingUpdated,
        historyData,
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

const MyAccountPageStyled = styled.div`
  height: calc(100vh - 50px);
  display: grid;
  grid-template-columns: 230px 1fr;
  background-color: ${theme.colors.green};
`;
