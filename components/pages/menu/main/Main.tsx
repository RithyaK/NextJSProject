import React, { useState } from "react";
import styled from "styled-components";
import { Subject } from "@/pages/menu/[username]";
import SearchBar from "./top-main/SearchBar";
import Subjects from "./top-main/Subjects";
type MainProps = { quizz: Subject[] };

const Main = ({ quizz }: MainProps) => {
  const [quizzs, setQuizzs] = useState(quizz);

  return (
    <MainStyled>
      <Subjects quizzs={quizzs} />
      <SearchBar />
      {/* <button onClick={() => addQuestionsToData("quizz", quizzs)}>X</button> */}
    </MainStyled>
  );
};
export default Main;
const MainStyled = styled.div`
  ul {
    display: flex;
    background-color: maroon;
    list-style-type: none;
    justify-content: space-around;
  }
  li {
    border: 1px solid grey;
    color: white;
  }
`;
