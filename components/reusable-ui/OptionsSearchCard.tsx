import { Chapter } from "@/pages/menu/[username]";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

interface OptionsSearchCardProps extends Chapter {
  theme: string;
}

const OptionsSearchCard = ({ chapter }: OptionsSearchCardProps) => {
  const router = useRouter();
  return (
    <OptionsSearchCardStyled
      key={chapter.name}
      onClick={() => router.push(`/quizz/${chapter.name}`)}
    >
      <div className="image"></div>
      <div>
        <p>{chapter.name}</p>
        <div className="details">
          <span>Difficulté : {chapter.difficulty}</span>
          <span>{chapter.theme}</span>
        </div>
      </div>
    </OptionsSearchCardStyled>
  );
};

export default OptionsSearchCard;

const OptionsSearchCardStyled = styled.li`
  border: 1px solid black;
  display: flex;
  align-items: center;
  .image {
    height: 60px;
    width: 60px;
    background-color: green;
    border-radius: 10px;
    border: 2px solid white;
    margin-right: 12px;
  }
  .details span {
    margin-right: 10px;
    border: 1px solid black;
  }
`;
