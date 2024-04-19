import React from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firestore/firebase-config";
import MainSearch from "@/components/pages/menu/Search/MainSearch";
import styled from "styled-components";
import { Theme } from "../menu/[username]";
import Sidebar from "@/components/Sidebar";
import { userDataAccount } from "../myaccount";

type SearchPageProps = {
  usersData: userDataAccount[];
  listQuizz: Theme[];
};
const SearchedPage = ({ usersData, listQuizz }: SearchPageProps) => {
  return (
    <SearchedPageStyled>
      <Sidebar usersData={usersData} />
      <MainSearch listQuizz={listQuizz} />
    </SearchedPageStyled>
  );
};

export default SearchedPage;

export const getServerSideProps = async () => {
  const listQuizzDocRef = doc(db, "infos", "quizz");
  const docSnapShotlistQuizz = await getDoc(listQuizzDocRef);

  const usersDocRef = doc(db, "infos", "users");
  const docSnapShotUsers = await getDoc(usersDocRef);

  if (docSnapShotlistQuizz.exists() && docSnapShotUsers.exists()) {
    const { quizz: listQuizz } = docSnapShotlistQuizz.data();
    const { users } = docSnapShotUsers.data();
    return {
      props: {
        listQuizz,
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

const SearchedPageStyled = styled.div`
  height: calc(100vh - 50px);
  display: grid;
  grid-template-columns: 230px 1fr;
`;
