import Sidebar from "@/components/Sidebar";
import { db } from "@/firestore/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import React from "react";
import styled from "styled-components";
import { Theme, UserData } from "../menu/[username]";
import MainAdmin from "@/components/pages/menu/admin/MainAdmin";
import { userDataAccount } from "../myaccount";

type AdminPageProps = {
  usersData: userDataAccount[];
  listQuizzsData: Theme[];
};
const AdminPage = ({ usersData, listQuizzsData }: AdminPageProps) => {
  return (
    <AdminPageStyled>
      <Sidebar usersData={usersData} />
      <MainAdmin listQuizzsData={listQuizzsData} />
    </AdminPageStyled>
  );
};

export default AdminPage;

const AdminPageStyled = styled.div`
  height: calc(100vh - 50px);
  display: grid;
  grid-template-columns: 230px 1fr;
`;

export const getServerSideProps = async () => {
  const quizzDocRef = doc(db, "infos", "quizz");
  const docSnapShotQuizz = await getDoc(quizzDocRef);

  const usersDocRef = doc(db, "infos", "users");
  const docSnapShotUsers = await getDoc(usersDocRef);

  if (docSnapShotQuizz.exists() && docSnapShotUsers.exists()) {
    const { quizz } = docSnapShotQuizz.data();
    const { users } = docSnapShotUsers.data();
    return {
      props: {
        listQuizzsData: quizz,
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
