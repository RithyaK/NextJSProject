import { addQuestionsToData } from "@/firestore/userData";
import { Subject } from "@/pages/menu/[username]";
import { theme } from "@/theme";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";

type RandomQuizzsProps = { listQuizz: Subject[] };

const RandomQuizzs = ({ listQuizz }: RandomQuizzsProps) => {
  const router = useRouter();
  const chapters = listQuizz
    .map((subject) => subject.chapters.map((chapitre) => chapitre.name))
    .flat()
    .sort(() => Math.random() - 0.5);

  return (
    <RandomQuizzsStyled>
      <div className="title">
        <h2>Quizz que vous pourriez aimer</h2>
      </div>
      <ul>
        {chapters.map((chapter) => (
          <li key={chapter} onClick={() => router.push(`/quizz/${chapter}`)}>
            {chapter}
          </li>
        ))}
      </ul>
    </RandomQuizzsStyled>
  );
};

export default RandomQuizzs;

const RandomQuizzsStyled = styled.div`
  margin: 20px 0;
  .title {
    display: flex;
    justify-content: center;
  }
  h2 {
    border: 1px solid black;
    border-radius: 12px;
    text-align: center;
    background-color: ${theme.colors.green};
    width: 370px;
  }
  ul {
    display: flex;
    list-style-type: none;
    background-color: ${theme.colors.lightgreen};
    overflow-x: auto;
  }
  li {
    border: 1px solid grey;
    min-width: 170px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  li:hover {
    cursor: pointer;
    border: 1px solid black;
  }
`;
