import { useUsernameContext } from "@/components/context/usernameContext";
import { Chapter, Theme } from "@/pages/menu/[username]";
import { theme } from "@/theme";
import Link from "next/link";
import React, { useState } from "react";
import styled from "styled-components";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { EMPTY_QUESTION, Question } from "@/enums/quizz";
import Questions from "./Questions";
import { syncQuizz } from "@/firestore/Data";

type MainAdminProps = {
  listQuizz: Theme[];
};

const MainAdmin = ({ listQuizz }: MainAdminProps) => {
  const { username } = useUsernameContext();
  const [isQuizzMenuVisible, setIsQuizzMenuVisible] = useState(false);
  const [themeChose, setThemeChose] = useState<Theme | undefined>();
  const [quizChose, setQuizChose] = useState<Chapter | undefined>();

  function handleClickTheme(nameOfTheTheme: string) {
    const themeChoseUpdated = listQuizz.find(
      (theme) => theme.name === nameOfTheTheme
    );
    setThemeChose(themeChoseUpdated);
    setQuizChose(undefined);
  }

  function handleSelectQuizz(e: React.ChangeEvent<HTMLSelectElement>) {
    const quizChoseUpdated = themeChose?.chapters.find(
      (chapter) => chapter.name === e.target.value
    );
    setQuizChose(quizChoseUpdated);
  }

  ///////////////
  return (
    <MainAdminStyled>
      <Link href={`/menu/${username}`}>Retourner à l{"'"}accueil</Link>
      <h1>ADMIN PAGE</h1>

      <h3
        className="titledropdown menu"
        onClick={() => setIsQuizzMenuVisible(!isQuizzMenuVisible)}
      >
        Modifier un quizz
      </h3>
      <div className="quizzMenu">
        <ul className="themescontainer">
          {listQuizz.map((theme) => (
            <li
              //   className="theme"
              className={
                theme.name === themeChose?.name ? "theme activetheme" : "theme"
              }
              key={theme.name}
              onClick={() => handleClickTheme(theme.name)}
            >
              {theme.name}
            </li>
          ))}
        </ul>
        {themeChose?.name !== "" ? (
          <select onChange={(e) => handleSelectQuizz(e)}>
            <option value="">
              --Please choose a quizz ({themeChose?.name})
            </option>
            {themeChose?.chapters.map((chapter) => (
              <option key={chapter.name} value={chapter.name}>
                {chapter.name}
              </option>
            ))}
          </select>
        ) : (
          <p>Cliquez sur un thème !</p>
        )}
        <div>
          <h2>Vous modifiez le quizz : {quizChose?.name} </h2>
          <Questions
            quizChose={quizChose}
            setQuizChose={setQuizChose}
            listQuizz={listQuizz}
          />
        </div>
      </div>
    </MainAdminStyled>
  );
};

export default MainAdmin;

const MainAdminStyled = styled.div`
  background-color: ${theme.colors.green};
  h1,
  h2 {
    text-align: center;
  }
  .titledropdown {
    display: flex;
    align-items: center;
    background-color: ${theme.colors.darkgrey};
    gap: 15px;
    cursor: pointer;
    margin: 2px;
  }
  .themescontainer {
    list-style-type: none;
    display: flex;
    flex-wrap: wrap;
    gap: 1px;
  }
  .theme {
    min-width: 200px;
    height: 30px;
    text-align: center;
    border: 2px solid black;
  }
  .theme:hover {
    background-color: white;
    cursor: pointer;
  }
  .activetheme {
    background-color: white;
  }
  .questioncontainer {
    margin-bottom: 30px;
  }
  #question {
    width: 100%;
    text-align: center;
    height: 30px;
  }
  .choices {
    display: flex;
    gap: 2px;
  }
  .choice {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    width: 150px;
    height: 30px;
  }
`;
