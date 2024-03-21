import { addQuestionsToData } from "@/firestore/userData";
import { Subject } from "@/pages/menu/[username]";
import React, { useState } from "react";
import styled from "styled-components";

type RandomQuizzsProps = { listQuizz: Subject[] };

const RandomQuizzs = ({ listQuizz }: RandomQuizzsProps) => {
  const chapters = listQuizz
    .map((subject) => subject.chapters.map((chapitre) => chapitre.name))
    .flat()
    .sort(() => Math.random() - 0.5);

  return (
    <RandomQuizzsStyled>
      <h2>Quizz que vous pourrez aimer</h2>
      <ul>
        {chapters.map((chapter) => (
          <li key={chapter}>{chapter}</li>
        ))}
      </ul>
    </RandomQuizzsStyled>
  );
};

export default RandomQuizzs;

const RandomQuizzsStyled = styled.div`
  h2 {
    text-align: center;
  }
  ul {
    display: flex;
    list-style-type: none;
    background-color: red;
    overflow-x: auto;
  }
  li {
    border: 1px solid grey;
    min-width: 140px;
  }
`;
