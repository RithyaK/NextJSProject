import { db } from "@/firestore/firebase-config";
import { theme } from "@/theme";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Chapter, Theme } from "../menu/[username]";
import Link from "next/link";
import { useUsernameContext } from "@/components/context/usernameContext";
import Image from "next/image";
import { addQuestionsToData } from "@/firestore/userData";
import QuizzRecommanded from "@/components/pages/menu/quizz/quizzRecommanded";
import Bar from "@/components/reusable-ui/Bar";

type QuizzMenuProps = {
  listQuizz: Theme[];
};
// const DATA = [
//   {
//     name: "Histoire",
//     id: 1,
//     chapters: [
//       {
//         name: "WW3",
//         played: 10,
//         date: "2022-03-11",
//         difficulty: "Medium",
//         image: "",
//         questions: [
//           {
//             choices: ["A", "B", "C", "D"],
//             answer: "B",
//             question: "Quelle est la bonne réponse ? (B)",
//           },
//           {
//             choices: ["1", "2", "3", "4"],
//             answer: "4",
//             question: "Quelle est la obnne réponse ? (4)",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test3",
//             question: "Quelle est le bon test ? (Test3)",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test2",
//             question: "Quelle est le bon test ? (Test2)",
//           },
//         ],
//       },
//       {
//         name: "WW1",
//         played: 13,
//         date: "2023-01-21",
//         difficulty: "Medium",
//         image:
//           "https://img.freepik.com/vecteurs-premium/logo-quiz-icone-bulle-dialogue_149152-811.jpg?w=740",
//         questions: [
//           {
//             choices: ["1914", "1915", "1916", "1917"],
//             answer: "1914",
//             question: "En quelle année a débuté la Grande Guerre ?",
//           },
//           {
//             answer: "1918",
//             choices: ["1918", "1925", "1936", "1940"],
//             question: "En quelle année a terminé la Grande Guerre ?",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test3",
//             question: "Quelle est le bon test ? (Test3)",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test2",
//             question: "Quelle est le bon test ? (Test2)",
//           },
//         ],
//       },
//       {
//         name: "WW2",
//         played: 15,
//         date: "2024-01-30",
//         difficulty: "Hard",
//         image:
//           "https://img.freepik.com/vecteurs-premium/logo-quiz-icone-bulle-dialogue_149152-811.jpg?w=740",
//         questions: [
//           {
//             question: "En quelle année a débuté la seconde guerre mondiale ?",
//             choices: ["1935", "1939", "1945", "1948"],
//             answer: "1939",
//           },
//           {
//             choices: ["1945", "1950", "1960", "1970"],
//             answer: "1945",
//             question: "En quelle année a terminé la seconde guerre mondiale?",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test3",
//             question: "Quelle est le bon test ? (Test3)",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test2",
//             question: "Quelle est le bon test ? (Test2)",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     name: "Maths",
//     id: 2,
//     chapters: [
//       {
//         name: "Géometrie",
//         played: 10,
//         date: "2022-03-11",
//         difficulty: "Medium",
//         image: "",
//         questions: [
//           {
//             choices: ["A", "B", "C", "D"],
//             answer: "B",
//             question: "Quelle est la bonne réponse ? (B)",
//           },
//           {
//             choices: ["1", "2", "3", "4"],
//             answer: "4",
//             question: "Quelle est la obnne réponse ? (4)",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test3",
//             question: "Quelle est le bon test ? (Test3)",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test2",
//             question: "Quelle est le bon test ? (Test2)",
//           },
//         ],
//       },
//       {
//         name: "Theorème de Pythagore",
//         played: 25,
//         date: "2024-01-15",
//         difficulty: "Easy",
//         image:
//           "https://img.freepik.com/vecteurs-premium/logo-quiz-icone-bulle-dialogue_149152-811.jpg?w=740",
//         questions: [
//           {
//             question: "Quelle est la formule de pythagore?",
//             answer: "d",
//             choices: ["a", "b", "c", "d"],
//           },
//           {
//             choices: ["a", "b", "c", "d"],
//             answer: "b",
//             question: "Qui est pythagore ?",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test3",
//             question: "Quelle est le bon test ? (Test3)",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test2",
//             question: "Quelle est le bon test ? (Test2)",
//           },
//         ],
//       },
//       {
//         name: "Theorème de Thales",
//         played: 35,
//         date: "2024-01-05",
//         difficulty: "Hard",
//         image:
//           "https://img.freepik.com/vecteurs-premium/logo-quiz-icone-bulle-dialogue_149152-811.jpg?w=740",
//         questions: [
//           {
//             choices: ["a", "b", "c", "d"],
//             answer: "a",
//             question: "Quelle est la formule de thalès ?",
//           },
//           {
//             answer: "d",
//             question: "Qui est thales",
//             choices: ["a", "b", "c", "d"],
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test3",
//             question: "Quelle est le bon test ? (Test3)",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test2",
//             question: "Quelle est le bon test ? (Test2)",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     name: "Géographie",
//     id: 3,

//     chapters: [
//       {
//         name: "Les océans",
//         played: 10,
//         date: "2022-03-11",
//         difficulty: "Easy",
//         image: "",
//         questions: [
//           {
//             choices: ["A", "B", "C", "D"],
//             answer: "B",
//             question: "Quelle est la bonne réponse ? (B)",
//           },
//           {
//             choices: ["1", "2", "3", "4"],
//             answer: "4",
//             question: "Quelle est la obnne réponse ? (4)",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test3",
//             question: "Quelle est le bon test ? (Test3)",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test2",
//             question: "Quelle est le bon test ? (Test2)",
//           },
//         ],
//       },
//       {
//         name: "Capitals",
//         played: 10,
//         date: "2024-01-08",
//         difficulty: "Hard",
//         image:
//           "https://img.freepik.com/vecteurs-premium/logo-quiz-icone-bulle-dialogue_149152-811.jpg?w=740",
//         questions: [
//           {
//             question: "Capital du Turkménistan ?",
//             answer: "Achgabat",
//             choices: ["Baku", "Douchanbé", "Achgabat", "Harare"],
//           },
//           {
//             question: "Capital du Kenya?",
//             answer: "Nairobi",
//             choices: ["Kadmendu", "Nairobi", "Addis-Abbeba", "Jérusalem"],
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test3",
//             question: "Quelle est le bon test ? (Test3)",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test2",
//             question: "Quelle est le bon test ? (Test2)",
//           },
//         ],
//       },
//       {
//         name: "Les pays en développement",
//         played: 43,
//         date: "2024-01-15",
//         difficulty: "Medium",
//         image:
//           "https://img.freepik.com/vecteurs-premium/logo-quiz-icone-bulle-dialogue_149152-811.jpg?w=740",
//         questions: [
//           {
//             answer: "Burundi",
//             choices: ["Inde", "Burundi", "Palestine", "Somalie"],
//             question: "Quel est le pays le plus pauvre ?",
//           },
//           {
//             choices: ["Haiti", "Israel", "Corée du Nord", "Afrique"],
//             answer: "Afrique",
//             question: "Quel est le pays le plus dangereux ?",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test3",
//             question: "Quelle est le bon test ? (Test3)",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test2",
//             question: "Quelle est le bon test ? (Test2)",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     name: "Sport",
//     id: 4,

//     chapters: [
//       {
//         name: "Handball",
//         played: 10,
//         date: "2022-03-11",
//         difficulty: "Hard",
//         image: "",
//         questions: [
//           {
//             choices: ["A", "B", "C", "D"],
//             answer: "B",
//             question: "Quelle est la bonne réponse ? (B)",
//           },
//           {
//             choices: ["1", "2", "3", "4"],
//             answer: "4",
//             question: "Quelle est la obnne réponse ? (4)",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test3",
//             question: "Quelle est le bon test ? (Test3)",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test2",
//             question: "Quelle est le bon test ? (Test2)",
//           },
//         ],
//       },
//       {
//         played: 53,
//         date: "2024-01-15",
//         difficulty: "Easy",
//         image:
//           "https://img.freepik.com/vecteurs-premium/logo-quiz-icone-bulle-dialogue_149152-811.jpg?w=740",
//         name: "Football",
//         questions: [
//           {
//             answer: "France",
//             question: "Qui a gagné la coupe du monde 2018 ?",
//             choices: ["Colombie", "Allemagne", "Brésil", "France"],
//           },
//           {
//             answer: "Allemagne",
//             choices: ["Colombie", "Allemagne", "Brésil", "France"],
//             question: "Qui a gagné la coupe du monde 2014 ?",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test3",
//             question: "Quelle est le bon test ? (Test3)",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test2",
//             question: "Quelle est le bon test ? (Test2)",
//           },
//         ],
//       },
//       {
//         name: "Basket",
//         played: 5,
//         date: "2024-01-07",
//         difficulty: "Medium",
//         image:
//           "https://img.freepik.com/vecteurs-premium/logo-quiz-icone-bulle-dialogue_149152-811.jpg?w=740",
//         questions: [
//           {
//             question: "Quelle est la plus grosse league ?",
//             answer: "NBA",
//             choices: ["Pro A", "NBA", "C", "D"],
//           },
//           {
//             answer: "Pro A",
//             question: "Quelle est la league en France?",
//             choices: ["Pro A", "NBA", "C", "D"],
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test3",
//             question: "Quelle est le bon test ? (Test3)",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test2",
//             question: "Quelle est le bon test ? (Test2)",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     name: "Jeux vidéos",
//     id: 5,

//     chapters: [
//       {
//         name: "GTA",
//         played: 10,
//         date: "2022-03-11",
//         difficulty: "Easy",
//         image: "",
//         questions: [
//           {
//             choices: ["A", "B", "C", "D"],
//             answer: "B",
//             question: "Quelle est la bonne réponse ? (B)",
//           },
//           {
//             choices: ["1", "2", "3", "4"],
//             answer: "4",
//             question: "Quelle est la obnne réponse ? (4)",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test3",
//             question: "Quelle est le bon test ? (Test3)",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test2",
//             question: "Quelle est le bon test ? (Test2)",
//           },
//         ],
//       },
//       {
//         name: "League of Legends",
//         played: 58,
//         date: "2023-08-15",
//         difficulty: "Easy",
//         image:
//           "https://img.freepik.com/vecteurs-premium/logo-quiz-icone-bulle-dialogue_149152-811.jpg?w=740",
//         questions: [
//           {
//             choices: ["SKT", "TSM", "FNATIC", "G2"],
//             answer: "SKT",
//             question: "Quel est la meilleur équipe du monde ?",
//           },
//           {
//             answer: "Faker",
//             choices: ["Faker", "Caps", "Hans Sama", "Perkz"],
//             question: "Qui est le meilleur joueur du monde ?",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test3",
//             question: "Quelle est le bon test ? (Test3)",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test2",
//             question: "Quelle est le bon test ? (Test2)",
//           },
//         ],
//       },
//       {
//         name: "Dofus",
//         played: 72,
//         date: "2023-07-05",
//         difficulty: "Easy",
//         image:
//           "https://img.freepik.com/vecteurs-premium/logo-quiz-icone-bulle-dialogue_149152-811.jpg?w=740",
//         questions: [
//           {
//             question: "Quel est le niveau maximum ?",
//             choices: ["210", "200", "250", "300"],
//             answer: "200",
//           },
//           {
//             choices: ["Enutrof", "Eniripsa", "Osamodas", "Sadida"],
//             answer: "Enutrof",
//             question: "Quelle Classe à le taux de drop le plus élévé ?",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test3",
//             question: "Quelle est le bon test ? (Test3)",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test2",
//             question: "Quelle est le bon test ? (Test2)",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     name: "Automobile",
//     id: 6,

//     chapters: [
//       {
//         name: "Formule 1",
//         played: 10,
//         date: "2022-03-11",
//         difficulty: "Hard",
//         image: "",
//         questions: [
//           {
//             choices: ["A", "B", "C", "D"],
//             answer: "B",
//             question: "Quelle est la bonne réponse ? (B)",
//           },
//           {
//             choices: ["1", "2", "3", "4"],
//             answer: "4",
//             question: "Quelle est la obnne réponse ? (4)",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test3",
//             question: "Quelle est le bon test ? (Test3)",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test2",
//             question: "Quelle est le bon test ? (Test2)",
//           },
//         ],
//       },
//       {
//         name: "Voiture",
//         played: 0,
//         date: "2023-10-13",
//         difficulty: "Medium",
//         image:
//           "https://img.freepik.com/vecteurs-premium/logo-quiz-icone-bulle-dialogue_149152-811.jpg?w=740",
//         questions: [
//           {
//             choices: ["Audi", "BMW", "Mercedes", "Volkswagean"],
//             answer: "Audi",
//             question: "Quelle marque à un logo avec 4 anneaux ?",
//           },
//           {
//             answer: "Mercedes",
//             choices: ["Audi", "BMW", "Mercedes", "Volkswagean"],
//             question: "Quelle marque à le meilleur intérieur ?",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test3",
//             question: "Quelle est le bon test ? (Test3)",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test2",
//             question: "Quelle est le bon test ? (Test2)",
//           },
//         ],
//       },
//       {
//         name: "Moto",
//         played: 65,
//         date: "2023-12-20",
//         difficulty: "Hard",
//         image:
//           "https://img.freepik.com/vecteurs-premium/logo-quiz-icone-bulle-dialogue_149152-811.jpg?w=740",
//         questions: [
//           {
//             question: "Quelle est la meilleure moto ?",
//             choices: ["A", "B", "C", "D"],
//             answer: "B",
//           },
//           {
//             choices: ["A", "B", "C", "D"],
//             answer: "C",
//             question: "Quelle est la pire moto?",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test3",
//             question: "Quelle est le bon test ? (Test3)",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test2",
//             question: "Quelle est le bon test ? (Test2)",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     name: "Cinéma",
//     id: 7,

//     chapters: [
//       {
//         name: "Acteurs",
//         played: 10,
//         date: "2022-03-11",
//         difficulty: "Medium",
//         image: "",
//         questions: [
//           {
//             choices: ["A", "B", "C", "D"],
//             answer: "B",
//             question: "Quelle est la bonne réponse ? (B)",
//           },
//           {
//             choices: ["1", "2", "3", "4"],
//             answer: "4",
//             question: "Quelle est la obnne réponse ? (4)",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test3",
//             question: "Quelle est le bon test ? (Test3)",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test2",
//             question: "Quelle est le bon test ? (Test2)",
//           },
//         ],
//       },
//       {
//         name: "Cinéma FR",
//         played: 2,
//         date: "2023-08-27",
//         difficulty: "Medium",
//         image:
//           "https://img.freepik.com/vecteurs-premium/logo-quiz-icone-bulle-dialogue_149152-811.jpg?w=740",
//         questions: [
//           {
//             choices: [
//               "Jean Dujardin",
//               "Gérard Depardieu",
//               "Dany Boon",
//               "Laurent Ruquier",
//             ],
//             answer: "Jean Dujardin",
//             question: "Qui est le meilleur acteur FR?",
//           },
//           {
//             answer: "Laurent Ruquier",
//             choices: [
//               "Jean Dujardin",
//               "Gérard Depardieu",
//               "Dany Boon",
//               "Laurent Ruquier",
//             ],
//             question: "Qui est le pire acteur FR?",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test3",
//             question: "Quelle est le bon test ? (Test3)",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test2",
//             question: "Quelle est le bon test ? (Test2)",
//           },
//         ],
//       },
//       {
//         name: "Cinéma US",
//         played: 3,
//         date: "2021-05-24",
//         difficulty: "Hard",
//         image:
//           "https://img.freepik.com/vecteurs-premium/logo-quiz-icone-bulle-dialogue_149152-811.jpg?w=740",
//         questions: [
//           {
//             question: "Quelle est la meilleure moto ?",
//             choices: ["A", "B", "C", "D"],
//             answer: "B",
//           },
//           {
//             choices: ["A", "B", "C", "D"],
//             answer: "C",
//             question: "Quelle est la pire moto?",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test3",
//             question: "Quelle est le bon test ? (Test3)",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test2",
//             question: "Quelle est le bon test ? (Test2)",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     name: "France",
//     id: 8,

//     chapters: [
//       {
//         name: "Ville française",
//         played: 10,
//         date: "2022-03-11",
//         difficulty: "Medium",
//         image: "",
//         questions: [
//           {
//             choices: ["A", "B", "C", "D"],
//             answer: "B",
//             question: "Quelle est la bonne réponse ? (B)",
//           },
//           {
//             choices: ["1", "2", "3", "4"],
//             answer: "4",
//             question: "Quelle est la obnne réponse ? (4)",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test3",
//             question: "Quelle est le bon test ? (Test3)",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test2",
//             question: "Quelle est le bon test ? (Test2)",
//           },
//         ],
//       },
//       {
//         name: "Monument FR",
//         played: 5,
//         date: "2020-07-12",
//         difficulty: "Hard",
//         image:
//           "https://img.freepik.com/vecteurs-premium/logo-quiz-icone-bulle-dialogue_149152-811.jpg?w=740",
//         questions: [
//           {
//             choices: [
//               "Muraille de Chine",
//               "Burj Khalifa",
//               "Statue de la liberté",
//               "Tour Eiffel",
//             ],
//             answer: "Tour Eiffel",
//             question: "Quel est le monument le plus connu français ?",
//           },
//           {
//             answer: "Paris",
//             choices: ["Rennes", "Marseille", "Lyon", "Paris"],
//             question: "Où se situe la Tour Eiffel ?",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test3",
//             question: "Quelle est le bon test ? (Test3)",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test2",
//             question: "Quelle est le bon test ? (Test2)",
//           },
//         ],
//       },
//       {
//         name: "Montagne française",
//         played: 7,
//         date: "2024-05-07",
//         difficulty: "Medium",
//         image:
//           "https://img.freepik.com/vecteurs-premium/logo-quiz-icone-bulle-dialogue_149152-811.jpg?w=740",
//         questions: [
//           {
//             question: "Quelle est la meilleure moto ?",
//             choices: ["A", "B", "C", "D"],
//             answer: "B",
//           },
//           {
//             choices: ["A", "B", "C", "D"],
//             answer: "C",
//             question: "Quelle est la pire moto?",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test3",
//             question: "Quelle est le bon test ? (Test3)",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test2",
//             question: "Quelle est le bon test ? (Test2)",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     name: "Langue française",
//     id: 9,
//     chapters: [
//       {
//         name: "Figure de style",
//         played: 10,
//         date: "2022-03-11",
//         difficulty: "Medium",
//         image: "",
//         questions: [
//           {
//             choices: ["A", "B", "C", "D"],
//             answer: "B",
//             question: "Quelle est la bonne réponse ? (B)",
//           },
//           {
//             choices: ["1", "2", "3", "4"],
//             answer: "4",
//             question: "Quelle est la obnne réponse ? (4)",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test3",
//             question: "Quelle est le bon test ? (Test3)",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test2",
//             question: "Quelle est le bon test ? (Test2)",
//           },
//         ],
//       },
//       {
//         name: "Ortographe",
//         played: 6,
//         date: "2023-06-24",
//         difficulty: "Easy",
//         image:
//           "https://img.freepik.com/vecteurs-premium/logo-quiz-icone-bulle-dialogue_149152-811.jpg?w=740",
//         questions: [
//           {
//             choices: ["trophée", "trophé", "trophee", "treauphée"],
//             answer: "trophée",
//             question: "Quel est le bon ortographe ?",
//           },
//           {
//             answer: "Reccette",
//             choices: ["Reccette", "Armoire", "Table", "Bouteille"],
//             question: "Quel est le mauvais ortographe ?",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test3",
//             question: "Quelle est le bon test ? (Test3)",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test2",
//             question: "Quelle est le bon test ? (Test2)",
//           },
//         ],
//       },
//       {
//         name: "Grammaire",
//         played: 85,
//         date: "2022-08-28",
//         difficulty: "Hard",
//         image:
//           "https://img.freepik.com/vecteurs-premium/logo-quiz-icone-bulle-dialogue_149152-811.jpg?w=740",
//         questions: [
//           {
//             question: "Quel temps n'existe pas ?",
//             choices: ["passé", "futur", "présent", "temps"],
//             answer: "temps",
//           },
//           {
//             choices: ["passé composé", "futur", "présent", "temps"],
//             answer: "passé composé",
//             question: "De quel temps est conjugué la question ?",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test3",
//             question: "Quelle est le bon test ? (Test3)",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test2",
//             question: "Quelle est le bon test ? (Test2)",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     name: "Code de la route",
//     id: 10,
//     chapters: [
//       {
//         name: "Amende",
//         played: 10,
//         date: "2022-03-11",
//         difficulty: "Medium",
//         image: "",
//         questions: [
//           {
//             choices: ["A", "B", "C", "D"],
//             answer: "B",
//             question: "Quelle est la bonne réponse ? (B)",
//           },
//           {
//             choices: ["1", "2", "3", "4"],
//             answer: "4",
//             question: "Quelle est la obnne réponse ? (4)",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test3",
//             question: "Quelle est le bon test ? (Test3)",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test2",
//             question: "Quelle est le bon test ? (Test2)",
//           },
//         ],
//       },
//       {
//         name: "Panneaux",
//         played: 65,
//         date: "2023-05-15",
//         difficulty: "Hard",
//         image:
//           "https://img.freepik.com/vecteurs-premium/logo-quiz-icone-bulle-dialogue_149152-811.jpg?w=740",
//         questions: [
//           {
//             choices: ["rouge", "bleu", "jaune", "noir"],
//             answer: "rouge",
//             question: "De quelle couleur est le panneau Sens Interdit?",
//           },
//           {
//             answer: "noir",
//             choices: ["rouge", "bleu", "jaune", "noir"],
//             question: "De quelle couleur est écrit le panneau 110 ?",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test3",
//             question: "Quelle est le bon test ? (Test3)",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test2",
//             question: "Quelle est le bon test ? (Test2)",
//           },
//         ],
//       },
//       {
//         name: "Limitation de vitesse",
//         played: 85,
//         date: "2023-01-25",
//         difficulty: "Medium",
//         image:
//           "https://img.freepik.com/vecteurs-premium/logo-quiz-icone-bulle-dialogue_149152-811.jpg?w=740",
//         questions: [
//           {
//             question: "Quelle peut être la vitesse maximum sur autoroute ?",
//             choices: ["110", "130", "90", "80"],
//             answer: "130",
//           },
//           {
//             choices: ["110", "130", "90", "50"],
//             answer: "50",
//             question: "Quelle est la vitesse maximum en agglomération ?",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test3",
//             question: "Quelle est le bon test ? (Test3)",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test2",
//             question: "Quelle est le bon test ? (Test2)",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     name: "Politique FR",
//     id: 11,
//     chapters: [
//       {
//         name: "Les députés",
//         played: 10,
//         date: "2022-03-11",
//         difficulty: "Medium",
//         image: "",
//         questions: [
//           {
//             choices: ["A", "B", "C", "D"],
//             answer: "B",
//             question: "Quelle est la bonne réponse ? (B)",
//           },
//           {
//             choices: ["1", "2", "3", "4"],
//             answer: "4",
//             question: "Quelle est la obnne réponse ? (4)",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test3",
//             question: "Quelle est le bon test ? (Test3)",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test2",
//             question: "Quelle est le bon test ? (Test2)",
//           },
//         ],
//       },
//       {
//         name: "Président",
//         played: 25,
//         date: "2023-09-30",
//         difficulty: "Easy",
//         image:
//           "https://img.freepik.com/vecteurs-premium/logo-quiz-icone-bulle-dialogue_149152-811.jpg?w=740",
//         questions: [
//           {
//             choices: ["Macron", "Mittérand", "Hollande", "Chirac"],
//             answer: "Macron",
//             question: "Qui est le président actuel ?",
//           },
//           {
//             answer: "Mittérand",
//             choices: ["Macron", "Mittérand", "Hollande", "Chirac"],
//             question: "Qui est le plus ancien président des 4 ?",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test3",
//             question: "Quelle est le bon test ? (Test3)",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test2",
//             question: "Quelle est le bon test ? (Test2)",
//           },
//         ],
//       },
//       {
//         name: "Ministre",
//         played: 35,
//         date: "2024-08-25",
//         difficulty: "Medium",
//         image:
//           "https://img.freepik.com/vecteurs-premium/logo-quiz-icone-bulle-dialogue_149152-811.jpg?w=740",
//         questions: [
//           {
//             question: "Qui est le premier ministre actuel?",
//             choices: ["Attal", "Valls", "Borne", "Chirac"],
//             answer: "Attal",
//           },
//           {
//             choices: ["Macron", "Bruno Le Maire", "Toulalan", "Test"],
//             answer: "Bruno Le Maire",
//             question: "Qui est le ministre de l'économie ?",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test3",
//             question: "Quelle est le bon test ? (Test3)",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test2",
//             question: "Quelle est le bon test ? (Test2)",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     name: "Musique",
//     id: 12,

//     chapters: [
//       {
//         name: "Pop urbaine",
//         played: 10,
//         date: "2022-03-11",
//         difficulty: "Medium",
//         image: "",
//         questions: [
//           {
//             choices: ["A", "B", "C", "D"],
//             answer: "B",
//             question: "Quelle est la bonne réponse ? (B)",
//           },
//           {
//             choices: ["1", "2", "3", "4"],
//             answer: "4",
//             question: "Quelle est la obnne réponse ? (4)",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test3",
//             question: "Quelle est le bon test ? (Test3)",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test2",
//             question: "Quelle est le bon test ? (Test2)",
//           },
//         ],
//       },
//       {
//         name: "Musique FR",
//         played: 65,
//         date: "2024-03-15",
//         difficulty: "Hard",
//         image:
//           "https://img.freepik.com/vecteurs-premium/logo-quiz-icone-bulle-dialogue_149152-811.jpg?w=740",
//         questions: [
//           {
//             choices: ["PNL", "Sexion d'assaut", "Djadja & Dinaz", "MMZ"],
//             answer: "Sexion d'assaut",
//             question: "Quel est le groupe de RAP FR le plus connu ?",
//           },
//           {
//             answer: "PNL",
//             choices: ["PNL", "Sexion d'assaut", "Djadja & Dinaz", "MMZ"],
//             question: "Quel duo de groupe de RAP FR sont frères?",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test3",
//             question: "Quelle est le bon test ? (Test3)",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test2",
//             question: "Quelle est le bon test ? (Test2)",
//           },
//         ],
//       },
//       {
//         name: "Musique US",
//         played: 10,
//         date: "2019-08-25",
//         difficulty: "Hard",
//         image:
//           "https://img.freepik.com/vecteurs-premium/logo-quiz-icone-bulle-dialogue_149152-811.jpg?w=740",
//         questions: [
//           {
//             question: "Qui chante Diamonds ?",
//             choices: ["Rihanna", "Drake", "Justin Bieber", "Wiz Khalifa"],
//             answer: "Rihanna",
//           },
//           {
//             choices: ["Rihanna", "Drake", "Justin Bieber", "Wiz Khalifa"],
//             answer: "Justin Bieber",
//             question: "Qui chante Love Yourself ?",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test3",
//             question: "Quelle est le bon test ? (Test3)",
//           },
//           {
//             choices: ["Test", "Test2", "Test3", "Test4"],
//             answer: "Test2",
//             question: "Quelle est le bon test ? (Test2)",
//           },
//         ],
//       },
//     ],
//   },
// ];

const QuizzMenu = ({ listQuizz }: QuizzMenuProps) => {
  const { username } = useUsernameContext();
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

  const [isQuizzStarted, setIsQuizzStarted] = useState(false);
  const [isQuizzFinished, setIsQuizzFinished] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [currentIndexQuestion, setCurrentIndexQuestion] = useState(0);
  const question = quizzChosen?.questions[currentIndexQuestion];

  function handleAnswerClicked(choice: string) {
    setCurrentIndexQuestion(currentIndexQuestion + 1);
    choice === question?.answer && setCorrectAnswer(correctAnswer + 1);

    if (currentIndexQuestion === quizzChosen?.questions.length - 1) {
      console.log("Fin du Quizz");
      setIsQuizzStarted(false);
      setIsQuizzFinished(true);
    }
  }

  return (
    <QuizzMenuStyled>
      <Bar list={TopPopularTheme} title="LES THÈMES PRÉFÉRÉS" />
      <Bar list={chapters} title="Quizz que vous pourriez aimer" />
      <div className="quizzInfos">
        <Link href={`/menu/${username}`}>Retourner à l{"'"}accueil</Link>
        <h1 className="quizzName">Quizz : {quizzChosen.name}</h1>
        <div className="quizzparameters">
          <span>{quizzChosen?.theme}</span>
          <span> {quizzChosen?.difficulty}</span>
        </div>
      </div>
      <div className="quizzContainer">
        <div className="imagecontainer">
          <div className="image"></div>
        </div>
        {isQuizzStarted && (
          <div className="gameContainer">
            <h1>Question n*{currentIndexQuestion + 1}</h1>
            <h2 className="question">{question?.question}</h2>
            <div className="choices">
              {question?.choices.map((choice) => (
                <span key={choice} onClick={() => handleAnswerClicked(choice)}>
                  {choice}
                </span>
              ))}
            </div>
            <span>
              Score actuel : {correctAnswer}/{currentIndexQuestion}
            </span>
          </div>
        )}
        {isQuizzFinished && (
          <h2>
            Score : {correctAnswer}/{currentIndexQuestion}
          </h2>
        )}
        {!isQuizzStarted && !isQuizzFinished && (
          <button onClick={() => setIsQuizzStarted(true)}>
            COMMENCER LE QUIZZ
          </button>
        )}
      </div>
      <QuizzRecommanded themeData={themeData} quizzChosen={quizzChosen} />
    </QuizzMenuStyled>
  );
};

export default QuizzMenu;

const QuizzMenuStyled = styled.div`
  background-color: ${theme.colors.green};
  .quizzName {
    text-align: center;
    margin-top: 20px;
  }
  .quizzInfos {
    display: flex;
    justify-content: space-between;
    padding: 0px 20px;
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
  .quizzContainer {
    background-color: red;
    display: flex;
    justify-content: center;
    flex-direction: column;
    button {
      width: 500px;
    }
  }
  .gameContainer {
    width: 500px;
    height: 350px;
    border: 2px solid black;
    background-color: #c79191;
    text-align: center;
  }
  .scoreContainer {
    display: flex;
    width: 300px;
    height: 300px;
    border: 1px solid black;
    align-items: center;
    justify-content: center;
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
  .quizzRecommanded {
    padding: 30px 0px;
    border: 1px solid black;
  }
  .cards {
    display: flex;
    list-style-type: none;
    gap: 30px;
  }
  .card {
    border: 1px solid black;
    width: 180px;
    height: 250px;
    text-align: center;
  }

  /* .newsQuizz {
    margin-top: 30px 0px;
    border: 1px solid black;
  } */
`;

export const getServerSideProps = async () => {
  const quizzDocRef = doc(db, "infos", "quizz");
  const docSnapShotQuizzs = await getDoc(quizzDocRef);

  if (docSnapShotQuizzs.exists()) {
    const { quizz } = docSnapShotQuizzs.data();
    console.log("[quizzName] :", quizz);

    return {
      props: {
        listQuizz: quizz,
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
