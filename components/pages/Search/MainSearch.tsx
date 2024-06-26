import { useUsernameContext } from "@/components/context/usernameContext";
import { theme } from "@/theme";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import SearchCard from "./SearchCard";
import { Theme } from "@/pages/menu/[username]";

type MainSearchProps = {
  listQuizz: Theme[];
};

const MainSearch = ({ listQuizz }: MainSearchProps) => {
  const { username } = useUsernameContext();
  const router = useRouter();
  const { searched } = router.query;
  const chaptersQuizz = listQuizz
    .map((subject) => {
      const themeOfTheChapter = subject.name;
      return subject.chapters.map((chaptersQuizz) => {
        return { ...chaptersQuizz, theme: themeOfTheChapter };
      });
    })
    .flat();

  return (
    <MainSearchStyled>
      <Link href={`/menu/${username}`}>Retourner à l{"'"}accueil</Link>
      <div className="cards">
        {chaptersQuizz
          .filter(
            (chapter) =>
              chapter.name.toLowerCase().includes(searched.toLowerCase()) ||
              chapter.theme.toLowerCase().includes(searched.toLowerCase())
          )
          .map((chapter) => {
            return <SearchCard key={chapter.name} chapter={chapter} />;
          })}
      </div>
    </MainSearchStyled>
  );
};

export default MainSearch;

const MainSearchStyled = styled.div`
  border-top: 1px solid black;
  background-color: ${theme.colors.lightgreen};
  width: calc(100vw - 230px);
  .cards {
    margin: 30px;
    gap: 20px;
    display: grid;
    grid-template-rows: inherit;
    grid-template-columns: repeat(3, auto);
    gap: 20px;
  }
`;
