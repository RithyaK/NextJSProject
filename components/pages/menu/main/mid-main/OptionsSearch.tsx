import { Subject } from "@/pages/menu/[username]";
import React, { useState } from "react";
import Select from "./Select";
import styled from "styled-components";
import { filterQuizzByOption } from "@/utils/array";
type OptionsSearchProps = { listQuizz: Subject[] };

const OptionsSearch = ({ listQuizz }: OptionsSearchProps) => {
  const difficulties = ["easy", "medium", "hard"];
  const optionsThird = ["Récent", "Popularité"];
  const subjects = listQuizz.map((subject) => subject.name);
  // const [listQuizzUpdated, setListQuizzUpdated] = useState(listQuizz);
  const [subjectSelected, setSubjectSelected] = useState<string>("Thématique");
  const [difficultySelected, setDifficultySelected] =
    useState<string>("difficulty");
  const [optionThirdSelected, setOptionThirdSelected] =
    useState<string>("Trier par");

  function handleSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    const optionClicked = event.target.value;
    const SelectPart = event.target.id;
    console.log(optionClicked);
    if (SelectPart === "Thématique") {
      console.log("Vous avez choisi un thème");
      setSubjectSelected(optionClicked);
    }
    if (SelectPart === "difficulty") {
      console.log("Difficulté :", optionClicked);
      setDifficultySelected(optionClicked);
    }
    if (SelectPart === "Trier par") {
      console.log("Vous avez choisi une optionsThird");
      setOptionThirdSelected(optionClicked);
    }
  }

  // const data = [
  //   { name: "Event 1", date: "2023-01-15" },
  //   { name: "Event 2", date: "2022-12-20" },
  //   { name: "Event 3", date: "2023-03-05" },
  // ];
  // const dataUpdated = data.sort((a, b) => new Date(b.date) - new Date(a.date));
  // console.log("dataUpdated :", dataUpdated);

  return (
    <OptionsSearchStyled>
      <h2>Liste de Quizz</h2>
      <div>
        <Select
          options={subjects}
          label="Thématique"
          handleSelect={handleSelect}
        />
        <Select
          options={difficulties}
          label="difficulty"
          handleSelect={handleSelect}
        />
        <Select
          options={optionsThird}
          handleSelect={handleSelect}
          label="Trier par"
        />
      </div>
      <ul>
        {filterQuizzByOption(listQuizz, subjectSelected, "name", "Thématique")
          .map((subject) =>
            filterQuizzByOption(
              subject.chapters,
              difficultySelected,
              "difficulty",
              "difficulty"
            )
          )
          .flat()
          .sort((a, b) =>
            optionThirdSelected === "Récent"
              ? new Date(b.date) - new Date(a.date)
              : b.played - a.played
          )

          .map((chapter) => (
            <li key={chapter.name}>{chapter.name}</li>
          ))}
      </ul>
    </OptionsSearchStyled>
  );
};

export default OptionsSearch;

const OptionsSearchStyled = styled.div`
  ul {
    display: flex;
    flex-direction: column;
    background-color: red;
    list-style-type: none;
  }
`;
