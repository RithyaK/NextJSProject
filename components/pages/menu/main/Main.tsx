import React, { useState } from "react";
import styled from "styled-components";
import { Subject } from "@/pages/menu/[username]";
import SearchBar from "./top-main/SearchBar";
import Subjects from "./top-main/Subjects";
import RandomQuizzs from "./top-main/RandomQuizzs";
type MainProps = { listQuizz: Subject[] };

const Main = ({ listQuizz }: MainProps) => {
  // const [quizzs, setQuizzs] = useState(listQuizz);

  return (
    <MainStyled>
      <Subjects listQuizz={listQuizz} />
      <SearchBar />
      <RandomQuizzs listQuizz={listQuizz} />
      {/* <button onClick={() => addQuestionsToData("quizz", quizzs)}>X</button> */}
    </MainStyled>
  );
};
export default Main;
const MainStyled = styled.div`
  background-color: #706c6c;
  width: calc(100vw - 230px);
`;
