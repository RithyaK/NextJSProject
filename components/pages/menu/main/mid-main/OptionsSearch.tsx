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
      <h2>Recherchez un quizz qui vous intéresse !</h2>
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
  background-color: #968484;
  color: ${theme.colors.purple};
  .selectsContainer {
    margin: 20px 0;
  }
  select {
    margin: 0 5px;
  }
  ul {
    display: flex;
    flex-direction: column;
    list-style-type: none;
  }
  li {
    border: 1px solid black;
    display: flex;
    align-items: center;
  }
  li .image {
    height: 60px;
    width: 60px;
    background-color: green;
    border-radius: 10px;
    border: 2px solid white;
    margin-right: 12px;
  }
  li .details span {
    margin-right: 10px;
    border: 1px solid black;
  }
`;
