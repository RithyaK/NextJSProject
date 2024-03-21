import React, { useState } from "react";
import styled from "styled-components";
import { Subject } from "@/pages/menu/[username]";
import SearchBar from "./top-main/SearchBar";
import BestSubjects from "./top-main/BestSubjects";
import RandomQuizzs from "./top-main/RandomQuizzs";
import Subjects from "./mid-main/Subjects";
import { addQuestionsToData } from "@/firestore/userData";
type MainProps = { listQuizz: Subject[] };

const DATA = [
  {
    name: "histoire",
    id: 1,
    played: 10,
    chapters: [
      {
        name: "WW1",
        questions: [
          {
            choices: ["1914", "1915", "1916", "1917"],
            answer: "1914",
            question: "En quelle année a débuté la Grande Guerre ?",
          },
          {
            answer: "1918",
            choices: ["1918", "1925", "1936", "1940"],
            question: "En quelle année a terminé la Grande Guerre ?",
          },
        ],
      },
      {
        name: "WW2",
        questions: [
          {
            question: "En quelle année a débuté la seconde guerre mondiale ?",
            choices: ["1935", "1939", "1945", "1948"],
            answer: "1939",
          },
          {
            choices: ["1945", "1950", "1960", "1970"],
            answer: "1945",
            question: "En quelle année a terminé la seconde guerre mondiale?",
          },
        ],
      },
    ],
  },
  {
    name: "maths",
    id: 2,
    played: 25,
    chapters: [
      {
        name: "theorème de pythagore",
        questions: [
          {
            question: "Quelle est la formule de pythagore?",
            answer: "d",
            choices: ["a", "b", "c", "d"],
          },
          {
            choices: ["a", "b", "c", "d"],
            answer: "b",
            question: "Qui est pythagore ?",
          },
        ],
      },
      {
        name: "theorème de thales",
        questions: [
          {
            choices: ["a", "b", "c", "d"],
            answer: "a",
            question: "Quelle est la formule de thalès ?",
          },
          {
            answer: "d",
            question: "Qui est thales",
            choices: ["a", "b", "c", "d"],
          },
        ],
      },
    ],
  },
  {
    name: "Géographie",
    id: 3,
    played: 40,
    chapters: [
      {
        name: "Capitals",
        questions: [
          {
            question: "Capital du Turkménistan ?",
            answer: "Achgabat",
            choices: ["Baku", "Douchanbé", "Achgabat", "Harare"],
          },
          {
            question: "Capital du Kenya?",
            answer: "Nairobi",
            choices: ["Kadmendu", "Nairobi", "Addis-Abbeba", "Jérusalem"],
          },
        ],
      },
      {
        name: "Les pays en développement",
        questions: [
          {
            answer: "Burundi",
            choices: ["Inde", "Burundi", "Palestine", "Somalie"],
            question: "Quel est le pays le plus pauvre ?",
          },
          {
            choices: ["Haiti", "Israel", "Corée du Nord", "Afrique"],
            answer: "Afrique",
            question: "Quel est le pays le plus dangereux ?",
          },
        ],
      },
    ],
  },
  {
    name: "sport",
    id: 4,
    played: 20,
    chapters: [
      {
        name: "football",

        questions: [
          {
            answer: "France",
            question: "Qui a gagné la coupe du monde 2018 ?",
            choices: ["Colombie", "Allemagne", "Brésil", "France"],
          },
          {
            answer: "Allemagne",
            choices: ["Colombie", "Allemagne", "Brésil", "France"],
            question: "Qui a gagné la coupe du monde 2014 ?",
          },
        ],
      },
      {
        name: "basket",
        questions: [
          {
            question: "Quelle est la plus grosse league ?",
            answer: "NBA",
            choices: ["Pro A", "NBA", "C", "D"],
          },
          {
            answer: "Pro A",
            question: "Quelle est la league en France?",
            choices: ["Pro A", "NBA", "C", "D"],
          },
        ],
      },
    ],
  },
  {
    name: "Jeux vidéos",
    id: 5,
    played: 15,
    chapters: [
      {
        name: "League of Legends",
        questions: [
          {
            choices: ["SKT", "TSM", "FNATIC", "G2"],
            answer: "SKT",
            question: "Quel est la meilleur équipe du monde ?",
          },
          {
            answer: "Faker",
            choices: ["Faker", "Caps", "Hans Sama", "Perkz"],
            question: "Qui est le meilleur joueur du monde ?",
          },
        ],
      },
      {
        name: "Dofus",
        questions: [
          {
            question: "Quel est le niveau maximum ?",
            choices: ["210", "200", "250", "300"],
            answer: "200",
          },
          {
            choices: ["Enutrof", "Eniripsa", "Osamodas", "Sadida"],
            answer: "Enutrof",
            question: "Quelle Classe à le taux de drop le plus élévé ?",
          },
        ],
      },
    ],
  },
  {
    name: "Automobile",
    id: 6,
    played: 35,
    chapters: [
      {
        name: "Voiture",
        questions: [
          {
            choices: ["Audi", "BMW", "Mercedes", "Volkswagean"],
            answer: "Audi",
            question: "Quel marque à un logo avec 4 anneaux ?",
          },
          {
            answer: "Mercedes",
            choices: ["Audi", "BMW", "Mercedes", "Volkswagean"],
            question: "Quelle marque à le meilleur intérieur ?",
          },
        ],
      },
      {
        name: "Moto",
        questions: [
          {
            question: "Quelle est la meilleur moto ?",
            choices: ["A", "B", "C", "D"],
            answer: "B",
          },
          {
            choices: ["A", "B", "C", "D"],
            answer: "C",
            question: "Quelle est la pire moto?",
          },
        ],
      },
    ],
  },
];

const Main = ({ listQuizz }: MainProps) => {
  // const [quizzs, setQuizzs] = useState(listQuizz);

  return (
    <MainStyled>
      {/* <button onClick={() => addQuestionsToData(DATA)}>X</button> */}
      <BestSubjects listQuizz={listQuizz} />
      <SearchBar />
      <RandomQuizzs listQuizz={listQuizz} />
      <Subjects listQuizz={listQuizz} />
    </MainStyled>
  );
};
export default Main;
const MainStyled = styled.div`
  background-color: #706c6c;
  width: calc(100vw - 230px);
`;
