import React from "react";
import styles from "./../../styles/Ranking.module.css";
import styled from "styled-components";

const Ranking = ({ ranks, title }) => {
  return (
    <RankingStyled>
      <h2>{title}</h2>
      <div>
        {ranks
          .sort((a, b) => b.score - a.score)
          .map((rank) => (
            <div className="rankedinfos">
              <p>{rank.username}</p>
              <p>{rank.score}</p>
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
