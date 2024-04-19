import { Theme } from "@/pages/menu/[username]";
import React, { useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

type MenuCreateNewQuizzProps = {
  listQuizzs: Theme[];
  setListQuizzs: React.Dispatch<React.SetStateAction<Theme[]>>;
  themeChose: Theme | undefined;
  setThemeChose: React.Dispatch<React.SetStateAction<Theme | undefined>>;
};
const MenuCreateNewQuizz = ({
  listQuizzs,
  setListQuizzs,
  themeChose,
  setThemeChose,
}: MenuCreateNewQuizzProps) => {
  const [isMenuNewQuizzVisible, setIsMenuNewQuizzVisible] = useState(false);
  const [newQuizzName, setNewQuizzName] = useState("");
  const [themeChoseNewQuizz, setThemeChoseNewQuizz] = useState("Histoire");

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

  return (
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
  );
};

export default MenuCreateNewQuizz;
