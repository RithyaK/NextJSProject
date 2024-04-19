import { Theme } from "@/pages/menu/[username]";
import { theme } from "@/theme";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";
type SubjectsProps = { listQuizz: Theme[] };

const Subjects = ({ listQuizz }: SubjectsProps) => {
  const router = useRouter();
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
      <div className="title">
        <h2>Thématiques</h2>
      </div>
      <div className="container-subjects">
        {listQuizz.slice(0, subjectsDisplayed).map((subject) => (
          <div
            key={subject.name}
            className="subject"
            onClick={() => router.push(`/search/${subject.name}`)}
          >
            {subject.name}
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
  margin: 50px 0;
  padding: 20px 50px;
  text-align: center;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  .title {
    display: flex;
    justify-content: center;
  }
  h2 {
    border: 1px solid black;
    border-radius: 12px;
    text-align: center;
    background-color: ${theme.colors.green};
    width: 450px;
  }
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
    background-color: ${theme.colors.lightgreen};
    height: 80px;
    font-size: 20px;
  }
  .subject:hover {
    cursor: pointer;
    border: 1px solid black;
  }

  button {
    background: none;
    color: inherit;
    border: none;
    cursor: pointer;
    outline: inherit;
    padding: 5px 20px;
    font-size: 15px;
    background-color: grey;
  }
  button:hover {
    background-color: ${theme.colors.lightgreen};
  }
`;
