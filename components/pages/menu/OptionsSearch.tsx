import { Theme } from "@/pages/menu/[username]";
import React, { useState } from "react";
import Select from "./Select";
import styled from "styled-components";
import Image from "next/image";
import { theme } from "@/theme";
import { isBefore } from "date-fns";
import Pagination from "./Pagination";
import OptionsSearchCard from "../reusable-ui/OptionsSearchCard";
type OptionsSearchProps = { listQuizz: Theme[] };

const IMAGE_QUIZZ = "./../../../../../public/quizz-img.jpg";

const OptionsSearch = ({ listQuizz }: OptionsSearchProps) => {
  //
  const difficulties = ["Easy", "Medium", "Hard"];
  const optionsThird = ["Récent", "Popularité"];
  const themes = listQuizz.map((theme) => theme.name);
  const [themeSelected, setThemeSelected] = useState<string>("Thématique");
  const [difficultySelected, setDifficultySelected] =
    useState<string>("Difficulté");
  const [optionThirdSelected, setOptionThirdSelected] =
    useState<string>("Popularité");

  const quizzRevealed = listQuizz
    .filter(
      (theme) => themeSelected === theme.name || themeSelected === "Thématique"
    )
    .map((theme) => {
      const themeOfTheChapter = theme.name;

      return theme.chapters.map((chapter) => {
        return { ...chapter, theme: themeOfTheChapter };
      });
    })
    .flat()

    .sort((chapterA, chapterB) =>
      optionThirdSelected === "Récent"
        ? isBefore(new Date(chapterB.date), new Date(chapterA.date))
          ? -1
          : 1
        : chapterB.played - chapterA.played
    );

  const [currentPage, setCurrentPage] = useState(1);
  const quizzPerPage = 8;
  const lastIndex = currentPage * quizzPerPage;
  const firstIndex = lastIndex - quizzPerPage;
  const quizzShowed = quizzRevealed.slice(firstIndex, lastIndex);
  const numberOfPages = Math.ceil(quizzRevealed.length / quizzPerPage);
  const pages = [...Array(numberOfPages + 1).keys()].slice(1);
  //
  function handleSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    const optionClicked = event.target.value;
    const SelectPart = event.target.id;
    if (SelectPart === "Thématique") {
      setThemeSelected(optionClicked);
    }
    if (SelectPart === "Difficulté") {
      setDifficultySelected(optionClicked);
    }
    if (SelectPart === "Trier par") {
      setOptionThirdSelected(optionClicked);
    }
  }
  //
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
          label="Difficulté"
          handleSelect={handleSelect}
        />
        <Select
          options={optionsThird}
          handleSelect={handleSelect}
          label="Trier par"
        />
      </div>
      <Pagination
        pages={pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <ul>
        {quizzShowed.map(
          (chapter) =>
            (difficultySelected === chapter.difficulty && (
              <OptionsSearchCard chapter={chapter} />
            )) ||
            (difficultySelected === "Difficulté" && (
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
    background-color: ${theme.colors.lightgreen};
  }
  ul {
    display: flex;
    flex-direction: column;
    list-style-type: none;
  }
`;
