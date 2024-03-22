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
            question: "Quelle marque à un logo avec 4 anneaux ?",
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
            question: "Quelle est la meilleure moto ?",
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
  {
    name: "Cinéma",
    id: 7,
    played: 23,
    chapters: [
      {
        name: "Cinéma FR",
        questions: [
          {
            choices: [
              "Jean Dujardin",
              "Gérard Depardieu",
              "Dany Boon",
              "Laurent Ruquier",
            ],
            answer: "Jean Dujardin",
            question: "Qui est le meilleur acteur FR?",
          },
          {
            answer: "Laurent Ruquier",
            choices: [
              "Jean Dujardin",
              "Gérard Depardieu",
              "Dany Boon",
              "Laurent Ruquier",
            ],
            question: "Qui est le pire acteur FR?",
          },
        ],
      },
      {
        name: "Cinéma US",
        questions: [
          {
            question: "Quelle est la meilleure moto ?",
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
  {
    name: "France",
    id: 8,
    played: 15,
    chapters: [
      {
        name: "Monument FR",
        questions: [
          {
            choices: [
              "Muraille de Chine",
              "Burj Khalifa",
              "Statue de la liberté",
              "Tour Eiffel",
            ],
            answer: "Tour Eiffel",
            question: "Quel est le monument le plus connu français ?",
          },
          {
            answer: "Paris",
            choices: ["Rennes", "Marseille", "Lyon", "Paris"],
            question: "Où se situe la Tour Eiffel ?",
          },
        ],
      },
      {
        name: "Drapeaux Asie",
        questions: [
          {
            question: "Quelle est la meilleure moto ?",
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
  {
    name: "La langue française",
    id: 9,
    played: 5,
    chapters: [
      {
        name: "Ortographe",
        questions: [
          {
            choices: ["trophée", "trophé", "trophee", "treauphée"],
            answer: "trophée",
            question: "Quel est le bon ortographe ?",
          },
          {
            answer: "Reccette",
            choices: ["Reccette", "Armoire", "Table", "Bouteille"],
            question: "Quel est le mauvais ortographe ?",
          },
        ],
      },
      {
        name: "Grammaire",
        questions: [
          {
            question: "Quel temps n'existe pas ?",
            choices: ["passé", "futur", "présent", "temps"],
            answer: "temps",
          },
          {
            choices: ["passé composé", "futur", "présent", "temps"],
            answer: "passé composé",
            question: "De quel temps est conjugué la question ?",
          },
        ],
      },
    ],
  },
  {
    name: "Code de la route",
    id: 10,
    played: 9,
    chapters: [
      {
        name: "Panneaux",
        questions: [
          {
            choices: ["rouge", "bleu", "jaune", "noir"],
            answer: "rouge",
            question: "De quelle couleur est le panneau Sens Interdit?",
          },
          {
            answer: "noir",
            choices: ["rouge", "bleu", "jaune", "noir"],
            question: "De quelle couleur est écrit le panneau 110 ?",
          },
        ],
      },
      {
        name: "Limitation de vitesse",
        questions: [
          {
            question: "Quelle peut être la vitesse maximum sur autoroute ?",
            choices: ["110", "130", "90", "80"],
            answer: "130",
          },
          {
            choices: ["110", "130", "90", "50"],
            answer: "50",
            question: "Quelle est la vitesse maximum en agglomération ?",
          },
        ],
      },
    ],
  },
  {
    name: "Politique FR",
    id: 11,
    played: 9,
    chapters: [
      {
        name: "Président",
        questions: [
          {
            choices: ["Macron", "Mittérand", "Hollande", "Chirac"],
            answer: "Macron",
            question: "Qui est le président actuel ?",
          },
          {
            answer: "Mittérand",
            choices: ["Macron", "Mittérand", "Hollande", "Chirac"],
            question: "Qui est le plus ancien président des 4 ?",
          },
        ],
      },
      {
        name: "Ministre",
        questions: [
          {
            question: "Qui est le premier ministre actuel?",
            choices: ["Attal", "Bruno Le Maire", "Borne", "Chirac"],
            answer: "Attal",
          },
          {
            choices: ["Attal", "Bruno Le Maire", "Borne", "Chirac"],
            answer: "Bruno Le Maire",
            question: "Qui est le ministre de l'économie ?",
          },
        ],
      },
    ],
  },
  {
    name: "Musique",
    id: 12,
    played: 90,
    chapters: [
      {
        name: "Musique FR",
        questions: [
          {
            choices: ["PNL", "Sexion d'assaut", "Djadja & Dinaz", "MMZ"],
            answer: "Sexion d'assaut",
            question: "Quel est le groupe de RAP FR le plus connu ?",
          },
          {
            answer: "PNL",
            choices: ["PNL", "Sexion d'assaut", "Djadja & Dinaz", "MMZ"],
            question: "Quel duo de groupe de RAP FR sont frères?",
          },
        ],
      },
      {
        name: "Musique US",
        questions: [
          {
            question: "Qui chante Diamonds ?",
            choices: ["Rihanna", "Drake", "Justin Bieber", "Wiz Khalifa"],
            answer: "Rihanna",
          },
          {
            choices: ["Rihanna", "Drake", "Justin Bieber", "Wiz Khalifa"],
            answer: "Justin Bieber",
            question: "Qui chante Love Yourself ?",
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
