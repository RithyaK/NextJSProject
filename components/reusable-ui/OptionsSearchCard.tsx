import { Subject } from "@/pages/menu/[username]";
import React from "react";

const OptionsSearchCard = ({ chapter, subjectOfTheChapter }) => {
  return (
    <li key={chapter.name}>
      <div className="image"></div>
      <div>
        <p>{chapter.name}</p>
        <div className="details">
          <span>Difficulté : {chapter.difficulty}</span>
          <span>{subjectOfTheChapter}</span>
        </div>
      </div>
    </li>
  );
};

export default OptionsSearchCard;
