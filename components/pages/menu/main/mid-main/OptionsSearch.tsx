import { Theme } from "@/pages/menu/[username]";
import React, { useState } from "react";
import Select from "./Select";
import styled from "styled-components";
import Image from "next/image";
import { theme } from "@/theme";
import OptionsSearchCard from "@/components/reusable-ui/OptionsSearchCard";
import { isBefore } from "date-fns";
type OptionsSearchProps = { listQuizz: Theme[] };

const IMAGE_QUIZZ = "./../../../../../public/quizz-img.jpg";

const OptionsSearch = ({ listQuizz }: OptionsSearchProps) => {
  const difficulties = ["easy", "medium", "hard"];
  const optionsThird = ["Récent", "Popularité"];
  const themes = listQuizz.map((theme) => theme.name);
  // const [listQuizzUpdated, setListQuizzUpdated] = useState(listQuizz);
  const [themeSelected, setThemeSelected] = useState<string>("Thématique");
  const [difficultySelected, setDifficultySelected] =
    useState<string>("Difficulty");
  const [optionThirdSelected, setOptionThirdSelected] =
    useState<string>("Trier par");

  function handleSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    const optionClicked = event.target.value;
    const SelectPart = event.target.id;
    console.log(optionClicked);
    if (SelectPart === "Thématique") {
      console.log("Vous avez choisi un thème");
      setThemeSelected(optionClicked);
    }
    if (SelectPart === "Difficulty") {
      console.log("Difficulté :", optionClicked);
      setDifficultySelected(optionClicked);
    }
    if (SelectPart === "Trier par") {
      console.log("Vous avez choisi une optionsThird");
      setOptionThirdSelected(optionClicked);
    }
  }

  return (
    <OptionsSearchStyled>
      <div className="title">
        <h2>Recherchez un quizz qui vous intéresse !</h2>
      </div>
      <div className="selectsContainer">
        <Select
          options={themes}
          label="Thématique"
          handleSelect={handleSelect}
        />
        <Select
          options={difficulties}
          label="Difficulty"
          handleSelect={handleSelect}
        />
        <Select
          options={optionsThird}
          handleSelect={handleSelect}
          label="Trier par"
        />
      </div>
      <ul>
        {listQuizz
          .filter(
            (theme) =>
              themeSelected === theme.name || themeSelected === "Thématique"
          )
          .map((theme) => {
            const themeOfTheChapter = theme.name;

            return theme.chapters.map((chapter) => {
              return { ...chapter, theme: themeOfTheChapter };
            });
          })
          .flat()
          .sort((chapterA, chapterB) =>
            isBefore(new Date(chapterB.date), new Date(chapterA.date)) ? -1 : 1
          )

          .map(
            (chapter) =>
              (difficultySelected === chapter.difficulty && (
                <OptionsSearchCard chapter={chapter} />
              )) ||
              (difficultySelected === "Difficulty" && (
                <OptionsSearchCard chapter={chapter} />
              ))
          )}
      </ul>
    </OptionsSearchStyled>
  );
};

export default OptionsSearch;

const OptionsSearchStyled = styled.div`
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
  .selectsContainer {
    margin: 20px 0;
    text-align: center;
  }
  select {
    margin: 0 5px;
  }
  ul {
    display: flex;
    flex-direction: column;
    list-style-type: none;
  }
`;
