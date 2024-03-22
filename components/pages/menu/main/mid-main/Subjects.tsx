import { Subject } from "@/pages/menu/[username]";
import React, { useState } from "react";
import styled from "styled-components";
type SubjectsProps = { listQuizz: Subject[] };

const Subjects = ({ listQuizz }: SubjectsProps) => {
  const [subjectsDisplayed, setSubjectsDisplayed] = useState<number>(6);

  function handleButton() {
    if (subjectsDisplayed === 12) {
      setSubjectsDisplayed(6);
    } else {
      setSubjectsDisplayed((prev) => prev + 3);
    }
  }
  return (
    <SubjectsStyled>
      <h2>Thèmatiques</h2>
      <div className="container-subjects">
        {listQuizz.slice(0, subjectsDisplayed).map((chapter) => (
          <div key={chapter.name} className="subject">
            {chapter.name}
          </div>
        ))}
      </div>
      <button onClick={handleButton}>
        {subjectsDisplayed === 12 ? "Afficher moins" : "Afficher plus"}
      </button>
    </SubjectsStyled>
  );
};

export default Subjects;

const SubjectsStyled = styled.div`
  background-color: maroon;
  margin: 50px 0;
  padding: 20px 50px;
  text-align: center;
  .container-subjects {
    padding: 10px;
    display: grid;
    grid-template-rows: inherit;
    grid-template-columns: repeat(3, auto);
    gap: 20px;
  }
  .subject {
    display: flex;
    border: 1px solid grey;
    justify-content: center;
    align-items: center;
    background-color: white;
    height: 80px;
  }
`;
