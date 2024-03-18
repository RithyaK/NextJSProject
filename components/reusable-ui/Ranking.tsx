import React from "react";
import styles from "./../../styles/Ranking.module.css";
import styled from "styled-components";

type UserData = {
  score: number;
  username: string;
};

type RankingProps = {
  rank: UserData[];
  title: string;
};

const Ranking = ({ rank, title }: RankingProps) => {
  return (
    <RankingStyled>
      <h2>{title}</h2>
      <div>
        {rank
          .sort((a, b) => b.score - a.score)
          .map((user) => (
            <div className="rankedinfos">
              <p>{user.username}</p>
              <p>{user.score}</p>
            </div>
          ))}
      </div>
    </RankingStyled>
  );
};

export default Ranking;

const RankingStyled = styled.div`
  border: 2px solid rgb(0, 0, 0);
  height: 300px;
  overflow-y: auto;
  h2 {
    text-align: center;
  }
  p {
    font-size: 20px;
  }
  .rankedinfos {
    display: flex;
    justify-content: space-between;
  }
`;
