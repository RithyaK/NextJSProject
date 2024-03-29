import { Subject } from "@/pages/menu/[username]";
import { theme } from "@/theme";
import React, { useState } from "react";
import styled from "styled-components";
type PopularSubjectsProps = { listQuizz: Subject[] };

// interface listQuizzUpdated extends Subject[] {

// }

const PopularSubjects = ({ listQuizz }: PopularSubjectsProps) => {
  const [PopularSubjects, setPopularSubjects] = useState();

  const listQuizzUpdated = listQuizz.map((subject) => {
    const played = subject.chapters.reduce(
      (accumulator, chapter) => accumulator + chapter.played,
      0
    );

    return { ...subject, played };
  });

  return (
    <PopularSubjectsStyled>
      <div className="title">
        <h2>LES THÈMES PRÉFÉRÉS</h2>
      </div>
      <ul>
        {listQuizzUpdated

          .sort((a, b) => b.played - a.played)
          .slice(0, 4)
          .map((subject) => {
            return <li key={subject.id}>{subject.name}</li>;
          })}
      </ul>
    </PopularSubjectsStyled>
  );
};

export default PopularSubjects;

const PopularSubjectsStyled = styled.div`
  margin: 20px 0;
  .title {
    display: flex;
    justify-content: center;
  }
  h2 {
    border-radius: 12px;
    border: 1px solid black;
    text-align: center;
    background-color: ${theme.colors.green};
    width: 370px;
  }
  ul {
    display: flex;
    background-color: ${theme.colors.lightgreen};
    list-style-type: none;
    justify-content: space-around;
    color: white;
  }
  li {
    border: 1px solid grey;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
  }
  li:hover {
    cursor: pointer;
    border: 1px solid black;
  }
`;
