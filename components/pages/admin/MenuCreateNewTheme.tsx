import { syncQuizz } from "@/firestore/Data";
import { Theme } from "@/pages/menu/[username]";
import React, { useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

type MenuCreateNewThemeProps = {
  listQuizzs: Theme[];
  setListQuizzs: React.Dispatch<React.SetStateAction<Theme[]>>;
};
const MenuCreateNewTheme = ({
  listQuizzs,
  setListQuizzs,
}: MenuCreateNewThemeProps) => {
  const [isCreateThemeVisible, setIsCreateThemeVisible] = useState(false);
  const [newThemeName, setNewThemeName] = useState("");

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

  return (
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
  );
};

export default MenuCreateNewTheme;
