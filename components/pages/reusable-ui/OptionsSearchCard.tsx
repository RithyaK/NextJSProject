import { Chapter } from "@/pages/menu/[username]";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

type OptionsSearchCardProps = {
  theme: string;
  played: number;
  name: string;
  difficulty: string;
  date: string;
  image: string;
};

const OptionsSearchCard = ({ chapter }: OptionsSearchCardProps) => {
  const router = useRouter();
  return (
    <OptionsSearchCardStyled
      key={chapter.name}
      onClick={() => router.push(`/quizz/${chapter.name}`)}
    >
      {/* <div className="image"></div> */}
      <img src={chapter.image} alt="" height="60" width="60" />
      <span className="quizzName">{chapter.name}</span>
      <div className="details">
        <span>Difficulté : {chapter.difficulty}</span>
        <span>Thème : {chapter.theme}</span>
      </div>
    </OptionsSearchCardStyled>
  );
};

export default OptionsSearchCard;

const OptionsSearchCardStyled = styled.li`
  border-top: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 50px;
  .image {
    height: 60px;
    width: 60px;
    background-color: green;
    border-radius: 10px;
    border: 2px solid white;
    margin-right: 12px;
  }
  .quizzName {
    font-size: 21px;
  }
  .details {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;
