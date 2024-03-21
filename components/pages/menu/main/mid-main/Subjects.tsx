import { Subject } from "@/pages/menu/[username]";
import React from "react";
import styled from "styled-components";
type SubjectsProps = { listQuizz: Subject[] };

const Subjects = ({ listQuizz }: SubjectsProps) => {
  const chapters = listQuizz
    .map((subject) => subject.chapters.map((chapitre) => chapitre.name))
    .flat()
    .sort(() => Math.random() - 0.5);

  return (
    <SubjectsStyled>
      <h2>Thèmatiques</h2>
      <div>
        {chapters.map((chapter) => (
          <div key={chapter}>{chapter}</div>
        ))}
      </div>
    </SubjectsStyled>
  );
};

export default Subjects;

const SubjectsStyled = styled.div`
  margin: 50px 50px;
  background-color: #853838;
  height: 500px;
  h2 {
    text-align: center;
  }
`;
