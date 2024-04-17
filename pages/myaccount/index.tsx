import { db } from "@/firestore/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { UserData } from "../menu/[username]";
import MainMyAccount from "@/components/pages/menu/myaccount/MainMyAccount";
import styled from "styled-components";
import { useUsernameContext } from "@/components/context/usernameContext";
import Sidebar from "@/components/Sidebar";
import { theme } from "@/theme";
import { userDataAccount } from "../quizz/[quizzName]";

type MyAccountPageProps = {
  allTimeRanking: UserData[];
  userDataAccount: userDataAccount;
};
export type HistoryQuizzAnswered = {
  createdAt: string;
  image: string;
  name: string;
  score: number;
  id: string;
  numberOfQuestions: number;
};
const MyAccountPage = ({
  allTimeRanking,
  userDataAccount,
}: MyAccountPageProps) => {
  console.log(userDataAccount);
  return (
    <MyAccountPageStyled>
      <Sidebar allTimeRanking={allTimeRanking} />
      <MainMyAccount userDataAccount={userDataAccount} />
    </MyAccountPageStyled>
  );
};

export default MyAccountPage;

export const getServerSideProps = async ({ req }) => {
  const rankingsDocRef = doc(db, "infos", "rankings");
  const docSnapShotRanking = await getDoc(rankingsDocRef);

  const usersDocRef = doc(db, "infos", "users");
  const docSnapShotUsers = await getDoc(usersDocRef);

  if (docSnapShotRanking.exists() && docSnapShotUsers.exists()) {
    const { allTime: allTimeRanking } = docSnapShotRanking.data();
    const { users } = docSnapShotUsers.data();

    const userDataFound = users.find(
      (user) => user.username === req.cookies.username
    );
    const allTimeRankingUpdated = allTimeRanking.map((object) => {
      return {
        ...object,
        createdAt: object.createdAt.toDate().toISOString(),
      };
    });

    return {
      props: {
        allTimeRanking: allTimeRankingUpdated,
        userDataAccount: userDataFound,
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
