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
  const [subjectSelected, setSubjectSelected] = useState<string>("All");
  const [difficultySelected, setDifficultySelected] = useState<string>("All");
  const [optionThirdSelected, setOptionThirdSelected] = useState<string>("All");

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
    if (SelectPart === "SortBy") {
      console.log("Vous avez choisi une optionsThird");
      setOptionThirdSelected(optionClicked);
    }
  }

  return (
    <OptionsSearchStyled>
      <h2>Liste de Quizz</h2>
      <div>
        <Select
          options={subjects}
          label="Thématique"
          handleSelect={handleSelect}
          id="Thématique"
        />
        <Select
          options={difficulties}
          label="Niveaux"
          handleSelect={handleSelect}
          id="difficulty"
        />
        <Select
          options={optionsThird}
          handleSelect={handleSelect}
          id="SortBy"
          label="Trier par"
        />
      </div>
      <ul>
        {filterQuizzByOption(listQuizz, subjectSelected, "name")
          .map((subject) =>
            // subject.chapters
            //   .filter((chapter) => {
            //     if (difficultySelected === "All") {
            //       return chapter;
            //     } else {
            //       return chapter.difficulty === difficultySelected;
            //     }
            //   })
            filterQuizzByOption(
              subject.chapters,
              difficultySelected,
              "difficulty"
            ).map((chapter) => <li key={chapter.name}>{chapter.name}</li>)
          )
          .flat()}
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
