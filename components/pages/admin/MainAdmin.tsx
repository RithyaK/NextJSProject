import { useUsernameContext } from "@/components/context/usernameContext";
import { Chapter, Theme } from "@/pages/menu/[username]";
import { theme } from "@/theme";
import Link from "next/link";
import React, { useState } from "react";
import styled from "styled-components";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { EMPTY_QUESTION, EMPTY_THEME, Question } from "@/enums/quizzs";
import Questions from "./Questions";
import { syncQuizz } from "@/firestore/Data";
import { deepClone } from "@/utils/array";

type MainAdminProps = {
  listQuizzsData: Theme[];
};

const MainAdmin = ({ listQuizzsData }: MainAdminProps) => {
  const { username } = useUsernameContext();
  const [isCreateThemeVisible, setIsCreateThemeVisible] = useState(false);
  const [isMenuEditVisible, setIsMenuEditVisible] = useState(false);
  const [isMenuNewQuizzVisible, setIsMenuNewQuizzVisible] = useState(false);
  const [newThemeName, setNewThemeName] = useState("");
  const [listQuizzs, setListQuizzs] = useState(listQuizzsData);
  const [themeChose, setThemeChose] = useState<Theme | undefined>();
  const [newQuizzName, setNewQuizzName] = useState("");
  const [quizChose, setQuizChose] = useState<Chapter | undefined>();
  const [questions, setQuestions] = useState<Question[] | undefined>();
  const [themeChoseNewQuizz, setThemeChoseNewQuizz] = useState("Histoire");
  function handleSubmitNewTheme(e) {
    e.preventDefault();
    const listQuizzsCopy = JSON.parse(JSON.stringify(listQuizzs));
    let listQuizzsUpdated: Theme[];

    const newThemeToAdd: Theme = {
      id: crypto.randomUUID(),
      name: newThemeName,
      chapters: [],
    };
    listQuizzsUpdated = [...listQuizzsCopy, newThemeToAdd];
    setListQuizzs(listQuizzsUpdated);
    syncQuizz(listQuizzsUpdated);
    setNewThemeName("");
  }

  function handleClickTheme(nameOfTheTheme: string) {
    const themeChoseUpdated = listQuizzs.find(
      (theme) => theme.name === nameOfTheTheme
    );
    if (themeChose?.name !== themeChoseUpdated?.name) {
      setThemeChose(themeChoseUpdated);
      setQuizChose(undefined);
      setQuestions(undefined);
    }
  }

  function handleSelectQuizz(e: React.ChangeEvent<HTMLSelectElement>) {
    const quizChoseUpdated = themeChose?.chapters.find(
      (chapter) => chapter.name === e.target.value
    );
    setQuizChose(quizChoseUpdated);
    setQuestions(quizChoseUpdated?.questions);
  }
  function handleDeleteTheme() {
    let confirm = prompt("Voulez vous vraiment supprimer ?", "Oui");
    if (confirm === "Oui") {
      const listQuizzsUpdated = listQuizzs.filter(
        (theme) => theme !== themeChose
      );
      setListQuizzs(listQuizzsUpdated);
      syncQuizz(listQuizzsUpdated);
      setThemeChose(undefined);
    }
  }

  function handleSubmitNewQuizz(e) {
    e.preventDefault();
    const date = new Date();
    const newQuizz = {
      played: 0,
      name: newQuizzName,
      difficulty: "Medium",
      date: date.toISOString().split("T")[0],
      image:
        "https://img.freepik.com/vecteurs-premium/logo-quiz-icone-bulle-dialogue_149152-811.jpg?w=740",
      questions: [],
    };
    const listQuizzsUpdated = listQuizzs.map((theme: Theme) =>
      theme.name === themeChoseNewQuizz
        ? {
            ...theme,
            chapters: theme.chapters.concat(newQuizz),
          }
        : theme
    );
    const themeChoseFound = listQuizzsUpdated.find(
      (theme) => theme.id === themeChose?.id
    );

    setThemeChose(themeChoseFound);
    setListQuizzs(listQuizzsUpdated);
    // syncQuizz(listQuizzsUpdated);
    setNewQuizzName("");
  }
  /////////////

  return (
    <MainAdminStyled>
      <Link href={`/menu/${username}`}>Retourner à l{"'"}accueil</Link>
      <h1>ADMIN PAGE</h1>
      <div className="editquizz-container">
        <h3
          className="titledropdown"
          onClick={() => setIsMenuEditVisible(!isMenuEditVisible)}
        >
          EDIT QUIZZ
          {isMenuEditVisible ? <FaArrowDown /> : <FaArrowUp />}
        </h3>

        {isMenuEditVisible && (
          <div className="menu-editquizz">
            <ul className="themescontainer">
              {listQuizzs.map((theme) => (
                <li
                  //   className="theme"
                  className={
                    theme.name === themeChose?.name
                      ? "theme activetheme"
                      : "theme"
                  }
                  key={theme.id}
                  onClick={() => handleClickTheme(theme.name)}
                >
                  {theme.name}
                </li>
              ))}
            </ul>
            {themeChose ? (
              <div>
                <div className="container-selectquizz-buttondeletetheme">
                  <select onChange={(e) => handleSelectQuizz(e)}>
                    <option
                      value={`--Please choose a quizz (${themeChose?.name})`}
                    >
                      --Please choose a quizz ({themeChose?.name})
                    </option>
                    {themeChose?.chapters.map((chapter) => (
                      <option key={chapter.name} value={chapter.name}>
                        {chapter.name}
                      </option>
                    ))}
                  </select>
                  <button onClick={() => handleDeleteTheme()}>
                    {`Supprimer le thème : "${themeChose?.name}"`}
                  </button>
                </div>
              </div>
            ) : (
              <p className="message-clicktheme">Cliquez sur un thème !</p>
            )}
            {quizChose && (
              <Questions
                questions={questions}
                setQuestions={setQuestions}
                quizChose={quizChose}
                setQuizChose={setQuizChose}
                listQuizzs={listQuizzs}
                setListQuizzs={setListQuizzs}
                themeChose={themeChose}
                setThemeChose={setThemeChose}
                // listQuizzsData={listQuizzsData}
              />
            )}
          </div>
        )}
      </div>
      <div className="newtheme-container">
        <h3
          className="titledropdown"
          onClick={() => setIsCreateThemeVisible(!isCreateThemeVisible)}
        >
          CREATE A NEW THEME
          {isCreateThemeVisible ? <FaArrowDown /> : <FaArrowUp />}
        </h3>
        {isCreateThemeVisible && (
          <form onSubmit={(e) => handleSubmitNewTheme(e)}>
            <input
              placeholder="Ecrivez votre thème"
              onChange={(e) => setNewThemeName(e.target.value)}
              value={newThemeName}
            />
            <button>Valider</button>
          </form>
        )}
        {/* //////////////// */}
      </div>
      <div className="newquizz-container">
        <h3
          className="titledropdown"
          onClick={() => setIsMenuNewQuizzVisible(!isMenuNewQuizzVisible)}
        >
          CREATE QUIZZ
          {isMenuNewQuizzVisible ? <FaArrowDown /> : <FaArrowUp />}
        </h3>
        {isMenuNewQuizzVisible && (
          <form
            className="title-newquizz"
            onSubmit={(e) => handleSubmitNewQuizz(e)}
          >
            <label htmlFor="newquizz">Créer un quizz sur le thème :</label>
            <select onChange={(e) => setThemeChoseNewQuizz(e.target.value)}>
              {listQuizzs.map((theme) => (
                <option key={theme.id}>{theme.name}</option>
              ))}
            </select>
            <input
              placeholder="Nom du quizz"
              id="newquizz"
              value={newQuizzName}
              onChange={(e) => setNewQuizzName(e.target.value)}
            />
          </form>
        )}
      </div>
    </MainAdminStyled>
  );
};

export default MainAdmin;

const MainAdminStyled = styled.div`
  padding: 0 20px;
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
  .container-selectquizz-buttondeletetheme {
    display: flex;
    justify-content: space-between;
  }
  .title-newquizz {
    text-align: center;
    padding: 20px;
  }
  .message-clicktheme {
    text-align: center;
  }
`;
