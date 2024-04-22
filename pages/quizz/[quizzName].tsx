import { db } from "@/firestore/firebase-config";
import { theme } from "@/theme";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Chapter, Theme } from "../menu/[username]";
import Bar from "@/components/pages/reusable-ui/Bar";
import QuizzRecommanded from "@/components/pages/quizz/QuizzRecommanded";
import { userDataAccount } from "../myaccount";
import GameQuizz from "@/components/pages/quizz/GameQuizz";

type QuizzMenuProps = {
  listQuizz: Theme[];
  userData: userDataAccount;
};

const QuizzMenu = ({ listQuizz, userData }: QuizzMenuProps) => {
  const router = useRouter();
  const { quizzName } = router.query;
  const quizzChosen = listQuizz
    .map((theme) => {
      const themeOfTheChapter = theme.name;
      return theme.chapters.map((chapter) => {
        return { ...chapter, theme: themeOfTheChapter };
      });
    })
    .flat()
    .find((chapter) => chapter.name === quizzName);

  const themeData = listQuizz.find(
    (theme) => theme.name === quizzChosen?.theme
  );

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
    <QuizzMenuStyled>
      <button onClick={() => console.log(userData)}>Test</button>
      <Bar list={TopPopularTheme} title="LES THÈMES PRÉFÉRÉS" />
      <Bar list={chapters} title="Quizz que vous pourriez aimer" />
      <GameQuizz quizzChosen={quizzChosen} userData={userData} />
      <QuizzRecommanded themeData={themeData} quizzChosen={quizzChosen} />
    </QuizzMenuStyled>
  );
};

export default QuizzMenu;

const QuizzMenuStyled = styled.div`
  background-color: ${theme.colors.green};
  .quizz-top {
    display: flex;
    justify-content: space-between;
    padding: 0px 20px;
  }
  .quizz-name {
    text-align: center;
    margin-top: 20px;
  }
  .quizzparameters {
    display: flex;
    flex-direction: column;
    text-align: center;
  }

  .image {
    width: 500px;
    height: 500px;
    background-color: green;
  }
  .quizz-maincontainer {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 20px;
    button {
      width: 500px;
    }
  }
  .game {
    width: 500px;
    height: 350px;
    border: 2px solid black;
    background-color: #c79191;
    text-align: center;
  }
  .question {
    margin: 25px 0;
  }
  .choices {
    display: grid;
    justify-content: center;
    grid-template: 60px 60px/ 130px 130px;
    gap: 20px;
  }
  .choices span {
    border: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .choices span:hover {
    background-color: red;
    cursor: pointer;
  }
`;

export const getServerSideProps = async ({ req }) => {
  const quizzDocRef = doc(db, "infos", "quizz");
  const docSnapShotQuizzs = await getDoc(quizzDocRef);

  const usersDocRef = doc(db, "infos", "users");
  const docSnapShotUsers = await getDoc(usersDocRef);

  if (docSnapShotQuizzs.exists() && docSnapShotUsers.exists()) {
    const { quizz } = docSnapShotQuizzs.data();
    const { users } = docSnapShotUsers.data();
    console.log(users);

    const userDataFound = users.find(
      (user) => user.username === req.cookies.username
    );
    return {
      props: {
        listQuizz: quizz,
        userData: userDataFound,
      },
    };
  } else {
    return {
      props: {
        data: null,
      },
    };
  }
};
