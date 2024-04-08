import React, { useState } from "react";
import styled from "styled-components";
import { Theme } from "@/pages/menu/[username]";
import SearchBar from "./top-main/SearchBar";
import Subjects from "./mid-main/Subjects";
import OptionsSearch from "./mid-main/OptionsSearch";
import { theme } from "@/theme";
import Bar from "@/components/reusable-ui/Bar";
type MainProps = { listQuizz: Theme[] };

const Main = ({ listQuizz }: MainProps) => {
  const chapters = listQuizz
    .map((subject) => subject.chapters.map((chapitre) => chapitre.name))
    .flat()
    .sort(() => Math.random() - 0.5);

  const TopPopularTheme = listQuizz
    .map((subject) => {
      const played = subject.chapters.reduce(
        (accumulator, chapter) => accumulator + chapter.played,
        0
      );

      return { ...subject, played };
    })
    .sort((a, b) => b.played - a.played)
    .slice(0, 5)
    .map((subject) => subject.name);

  return (
    <MainStyled>
      <Bar list={TopPopularTheme} title="LES THÈMES PRÉFÉRÉS" />
      <Bar list={chapters} title="Quizz que vous pourriez aimer" />
      <Subjects listQuizz={listQuizz} />
      <OptionsSearch listQuizz={listQuizz} />
    </MainStyled>
  );
};
export default Main;
const MainStyled = styled.div`
  background-color: ${theme.colors.green};
  width: calc(100vw - 230px);
  font-weight: bold;
  box-shadow: #3a965833 0px 8px 20px 8px inset;
`;
