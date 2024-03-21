import { Subject } from "@/pages/menu/[username]";
import React from "react";
import styled from "styled-components";
type BestSubjectsProps = { listQuizz: Subject[] };

const BestSubjects = ({ listQuizz }: BestSubjectsProps) => {
  return (
    <BestSubjectsStyled>
      <h2>Les thèmes préférés</h2>
      <ul>
        {listQuizz.map((subject) => {
          return <li key={subject.id}>{subject.name}</li>;
        })}
      </ul>
    </BestSubjectsStyled>
  );
};

export default BestSubjects;

const BestSubjectsStyled = styled.div`
  h2 {
    text-align: center;
  }
  ul {
    display: flex;
    background-color: maroon;
    list-style-type: none;
    justify-content: space-around;
  }
`;
