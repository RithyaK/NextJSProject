import React from "react";
import styles from "./../../styles/Ranking.module.css";
import styled from "styled-components";
import { UserData } from "@/pages/menu/[username]";
import UserRank from "./UserRank";
type RankingProps = {
  ranking: UserData[];
  title: string;
};

const Ranking = ({ ranking, title }: RankingProps) => {
  return (
    <RankingStyled>
      <h2>{title}</h2>
      <div>
        {ranking
          .slice(0, 7)
          .sort((a, b) => b.score - a.score)
          .map((user, index) => (
            <UserRank user={user} key={user.username} index={index} />
          ))}
      </div>
    </RankingStyled>
  );
};

export default Ranking;

const RankingStyled = styled.div`
  border-top: 3px solid black;
  height: 300px;
  overflow-y: auto;
  h2 {
    text-align: center;
  }
  p {
    font-size: 20px;
  }
`;
