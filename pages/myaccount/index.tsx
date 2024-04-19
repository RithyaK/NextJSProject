import { db } from "@/firestore/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import React from "react";
import styled from "styled-components";
import { theme } from "@/theme";
import Sidebar from "@/components/pages/reusable-ui/Sidebar";
import MainMyAccount from "@/components/pages/myaccount/MainMyAccount";

export type HistoryQuizzAnswered = {
  createdAt: string;
  image: string;
  name: string;
  score: number;
  id: string;
  numberOfQuestions: number;
};
export type userDataAccount = {
  accountCreatedAt: any;
  average: number;
  email: string;
  history: HistoryQuizzAnswered[];
  totalCorrectAnswered: number;
  totalQuestionAnswered: number;
  username: string;
};

type MyAccountPageProps = {
  userDataAccount: userDataAccount;
  usersData: userDataAccount[];
};
const MyAccountPage = ({ userDataAccount, usersData }: MyAccountPageProps) => {
  return (
    <MyAccountPageStyled>
      <Sidebar usersData={usersData} />
      <MainMyAccount userDataAccount={userDataAccount} />
    </MyAccountPageStyled>
  );
};

export default MyAccountPage;

export const getServerSideProps = async ({ req }) => {
  const usersDocRef = doc(db, "infos", "users");
  const docSnapShotUsers = await getDoc(usersDocRef);

  if (docSnapShotUsers.exists()) {
    const { users } = docSnapShotUsers.data();

    const userDataFound = users.find(
      (user) => user.username === req.cookies.username
    );
    console.log(" userDataFound :", userDataFound);

    return {
      props: {
        userDataAccount: userDataFound,
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

const MyAccountPageStyled = styled.div`
  height: calc(100vh - 50px);
  display: grid;
  grid-template-columns: 230px 1fr;
  background-color: ${theme.colors.green};
`;
