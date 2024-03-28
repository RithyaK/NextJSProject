import { Chapter } from "@/pages/menu/[username]";
import React from "react";

interface OptionsSearchCardProps extends Chapter {
  theme: string;
}

const OptionsSearchCard = ({ chapter }: OptionsSearchCardProps) => {
  return (
    <li key={chapter.name}>
      <div className="image"></div>
      <div>
        <p>{chapter.name}</p>
        <div className="details">
          <span>Difficulté : {chapter.difficulty}</span>
          <span>{chapter.theme}</span>
        </div>
      </div>
    </li>
  );
};

export default OptionsSearchCard;
