import { useUsernameContext } from "@/components/context/usernameContext";
import { Chapter, Theme } from "@/pages/menu/[username]";
import { theme } from "@/theme";
import Link from "next/link";
import React, { useState } from "react";
import styled from "styled-components";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { Question } from "@/enums/quizzs";
import Questions from "./Questions";
import { syncQuizz } from "@/firestore/Data";
import MenuEditQuizz from "./MenuEditQuizz";
import MenuCreateNewTheme from "./MenuCreateNewTheme";
import MenuCreateNewQuizz from "./MenuCreateNewQuizz";

type MainAdminProps = {
  listQuizzsData: Theme[];
};

const MainAdmin = ({ listQuizzsData }: MainAdminProps) => {
  const { username } = useUsernameContext();
  const [listQuizzs, setListQuizzs] = useState(listQuizzsData);
  const [themeChose, setThemeChose] = useState<Theme | undefined>();

  return (
    <MainAdminStyled>
      <Link href={`/menu/${username}`}>Retourner à l{"'"}accueil</Link>
      <h1>ADMIN PAGE</h1>
      <MenuEditQuizz
        listQuizzs={listQuizzs}
        setListQuizzs={setListQuizzs}
        themeChose={themeChose}
        setThemeChose={setThemeChose}
      />
      <MenuCreateNewTheme
        listQuizzs={listQuizzs}
        setListQuizzs={setListQuizzs}
      />
      <MenuCreateNewQuizz
        listQuizzs={listQuizzs}
        setListQuizzs={setListQuizzs}
        themeChose={themeChose}
        setThemeChose={setThemeChose}
      />
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
