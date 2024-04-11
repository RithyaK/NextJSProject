import Sidebar from "@/components/Sidebar";
import { db } from "@/firestore/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import React from "react";
import styled from "styled-components";
import { Theme, UserData } from "../menu/[username]";
import MainAdmin from "@/components/pages/menu/admin/MainAdmin";

type AdminPageProps = {
  allTimeRanking: UserData[];
  listQuizz: Theme[];
};
const AdminPage = ({ allTimeRanking, listQuizz }: AdminPageProps) => {
  return (
    <AdminPageStyled>
      <Sidebar allTimeRanking={allTimeRanking} />
      <MainAdmin listQuizz={listQuizz} />
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
  const rankingsDocRef = doc(db, "infos", "rankings");
  const quizzDocRef = doc(db, "infos", "quizz");
  const docSnapShotRankings = await getDoc(rankingsDocRef);
  const docSnapShotQuizz = await getDoc(quizzDocRef);
  if (docSnapShotRankings.exists() && docSnapShotQuizz.exists()) {
    const { allTime: allTimeRanking } = docSnapShotRankings.data();
    const { quizz } = docSnapShotQuizz.data();
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
