import React from "react";
import Sidebar from "@/components/pages/menu/Sidebar";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firestore/firebase-config";
import MainSearch from "@/components/pages/menu/Search/MainSearch";
import styled from "styled-components";
const SearchedPage = ({ allTimeRanking, listQuizz }) => {
  return (
    <SearchedPageStyled>
      <Sidebar allTimeRanking={allTimeRanking} />
      <MainSearch listQuizz={listQuizz} />
    </SearchedPageStyled>
  );
};

export default SearchedPage;

export const getServerSideProps = async () => {
  const rankingsDocRef = doc(db, "infos", "rankings");
  const listQuizzDocRef = doc(db, "infos", "quizz");
  const docSnapShotRanking = await getDoc(rankingsDocRef);
  const docSnapShotlistQuizz = await getDoc(listQuizzDocRef);

  if (docSnapShotRanking.exists() && docSnapShotlistQuizz.exists()) {
    const { allTime: allTimeRanking } = docSnapShotRanking.data();
    const { quizz: listQuizz } = docSnapShotlistQuizz.data();
    const allTimeRankingUpdated = allTimeRanking.map((object) => {
      return {
        ...object,
        createdAt: object.createdAt.toDate().toISOString(),
      };
    });
    return {
      props: {
        allTimeRanking: allTimeRankingUpdated,
        listQuizz,
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

const SearchedPageStyled = styled.div`
  height: calc(100vh - 50px);
  display: grid;
  grid-template-columns: 230px 1fr;
`;
