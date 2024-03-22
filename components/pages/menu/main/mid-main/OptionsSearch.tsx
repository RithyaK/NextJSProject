import { Subject } from "@/pages/menu/[username]";
import React from "react";
import Select from "./Select";
type OptionsSearchProps = { listQuizz: Subject[] };

const OptionsSearch = ({ listQuizz }: OptionsSearchProps) => {
  const difficulties = ["All levels", "Facile", "Moyen", "Difficile"];
  const optionsThird = ["Récent", "Popularité"];
  const subjects = listQuizz.map((subject) => subject.name);
  return (
    <div>
      <div>
        <h2>Listed Quizz</h2>
        <div>
          <Select options={subjects} label="Thématique" />
          <Select options={difficulties} label="Niveaux" />
          <Select options={optionsThird} />
        </div>
        {/* <ul>
          {listQuizz
            .map((subject) => subject.chapters.map((chapitre) => chapitre.name))
            .flat()
            .sort(() => Math.random() - 0.5)}
        </ul> */}
      </div>
    </div>
  );
};

export default OptionsSearch;
