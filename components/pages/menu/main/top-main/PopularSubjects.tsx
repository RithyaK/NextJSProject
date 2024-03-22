import { Subject } from "@/pages/menu/[username]";
import React, { useState } from "react";
import styled from "styled-components";
type PopularSubjectsProps = { listQuizz: Subject[] };

const PopularSubjects = ({ listQuizz }: PopularSubjectsProps) => {
  // const [PopularSubjects,setPopularSubjects] = useState()

  // const listQuizzUpdated = listQuizz.map((subject) => {
  //   const played = subject.chapters.reduce((total, chapter) => {
  //     return total + chapter.played;
  //   });
  //   return { ...subject, played };
  // });
  // console.log(listQuizzUpdated);

  return (
    <PopularSubjectsStyled>
      <h2>Les thèmes préférés</h2>
      <ul>
        {listQuizz
          // .sort((a, b) => b.played - a.played)
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
