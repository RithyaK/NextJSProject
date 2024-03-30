import React, { useState } from "react";
import styled from "styled-components";
import { Theme } from "@/pages/menu/[username]";
import SearchBar from "./top-main/SearchBar";
import PopularSubjects from "./top-main/PopularSubjects";
import RandomQuizzs from "./top-main/RandomQuizzs";
import Subjects from "./mid-main/Subjects";
import { addQuestionsToData } from "@/firestore/userData";
import OptionsSearch from "./mid-main/OptionsSearch";
import { theme } from "@/theme";
type MainProps = { listQuizz: Theme[] };

const Main = ({ listQuizz }: MainProps) => {
  // const [quizzs, setQuizzs] = useState(listQuizz);

  return (
    <MainStyled>
      {/* <button onClick={() => addQuestionsToData(DATA)}>X</button> */}
      <PopularSubjects listQuizz={listQuizz} />
      <RandomQuizzs listQuizz={listQuizz} />
      {/* <SearchBar /> */}
      <Subjects listQuizz={listQuizz} />
      <OptionsSearch listQuizz={listQuizz} />
    </MainStyled>
  );
};
export default Main;
const MainStyled = styled.div`
  background-color: ${theme.colors.green};
  width: calc(100vw - 230px);
  font-weight: bold;
  box-shadow: #3a965833 0px 8px 20px 8px inset;
`;
