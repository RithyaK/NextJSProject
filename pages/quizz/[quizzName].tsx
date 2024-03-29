import { db } from "@/firestore/firebase-config";
import { theme } from "@/theme";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Chapter, Theme } from "../menu/[username]";
import PopularSubjects from "@/components/pages/menu/main/top-main/PopularSubjects";
import RandomQuizzs from "@/components/pages/menu/main/top-main/RandomQuizzs";
import Link from "next/link";
import { useUsernameContext } from "@/components/context/usernameContext";
import Image from "next/image";
import { addQuestionsToData } from "@/firestore/userData";
import QuizzRecommanded from "@/components/pages/menu/quizz/quizzRecommanded";

type QuizzMenuProps = {
  listQuizz: Theme[];
};
// const DATA = [
//   {
//     name: "histoire",
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
//         ],
//       },
//     ],
//   },
//   {
//     name: "maths",
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
//         ],
//       },
//       {
//         name: "theorème de pythagore",
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
//         ],
//       },
//       {
//         name: "theorème de thales",
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
//         ],
//       },
//     ],
//   },
//   {
//     name: "sport",
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
//         ],
//       },
//       {
//         played: 53,
//         date: "2024-01-15",
//         difficulty: "Easy",
//         image:
//           "https://img.freepik.com/vecteurs-premium/logo-quiz-icone-bulle-dialogue_149152-811.jpg?w=740",
//         name: "football",
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
//         ],
//       },
//       {
//         name: "basket",
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
//         ],
//       },
//     ],
//   },
//   {
//     name: "La langue française",
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
//             choices: ["Attal", "Bruno Le Maire", "Borne", "Chirac"],
//             answer: "Attal",
//           },
//           {
//             choices: ["Attal", "Bruno Le Maire", "Borne", "Chirac"],
//             answer: "Bruno Le Maire",
//             question: "Qui est le ministre de l'économie ?",
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
//         ],
//       },
//     ],
//   },
// ];

const QuizzMenu = ({ listQuizz }: QuizzMenuProps) => {
  // const { username } = useUsernameContext();
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
  console.log(quizzChosen?.questions);
  return (
    <QuizzMenuStyled>
      {/* <button onClick={() => addQuestionsToData(DATA)}>X</button> */}
      <PopularSubjects listQuizz={listQuizz} />
      <RandomQuizzs listQuizz={listQuizz} />
      <div className="quizzInfos">
        <Link href="/menu">Menu</Link>
        <h1 className="quizzName">Quizz : {quizzChosen.name}</h1>
        <div className="quizzparameters">
          <span>Thème :{quizzChosen?.theme}</span>
          <span>Difficulté : {quizzChosen?.difficulty}</span>
        </div>
      </div>
      <div className="imagecontainer">
        <div className="image"></div>
        <button>COMMENCER LE QUIZZ</button>
      </div>
      <QuizzRecommanded themeData={themeData} quizzChosen={quizzChosen} />
    </QuizzMenuStyled>
  );
};

export default QuizzMenu;

const QuizzMenuStyled = styled.div`
  background-color: ${theme.colors.grey};
  .quizzName {
    text-align: center;
    margin-top: 20px;
  }
  .quizzInfos {
    display: flex;
    justify-content: space-between;
  }
  .quizzparameters {
    display: flex;
    flex-direction: column;
  }
  .imagecontainer {
    margin: 30px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .image {
      width: 600px;
      height: 500px;
      background-color: green;
    }
    button {
      width: 600px;
    }
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
