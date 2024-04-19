import { Question } from "@/enums/quizzs";
import { syncQuizz } from "@/firestore/Data";
import { Chapter, Theme } from "@/pages/menu/[username]";
import React, { useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import Questions from "./Questions";

type MenuEditQuizzProps = {
  listQuizzs: Theme[];
  setListQuizzs: React.Dispatch<React.SetStateAction<Theme[]>>;
  themeChose: Theme | undefined;
  setThemeChose: React.Dispatch<React.SetStateAction<Theme | undefined>>;
};

const MenuEditQuizz = ({
  listQuizzs,
  setListQuizzs,
  themeChose,
  setThemeChose,
}: MenuEditQuizzProps) => {
  const [isMenuEditVisible, setIsMenuEditVisible] = useState(false);
  const [quizChose, setQuizChose] = useState<Chapter | undefined>();
  const [questions, setQuestions] = useState<Question[] | undefined>();

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

  function handleSelectQuizz(e: React.ChangeEvent<HTMLSelectElement>) {
    const quizChoseUpdated = themeChose?.chapters.find(
      (chapter) => chapter.name === e.target.value
    );
    setQuizChose(quizChoseUpdated);
    setQuestions(quizChoseUpdated?.questions);
  }

  return (
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
            />
          )}
        </div>
      )}
    </div>
  );
};

export default MenuEditQuizz;
