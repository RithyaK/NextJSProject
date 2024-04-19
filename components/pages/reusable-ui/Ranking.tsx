import React from "react";
import styles from "./../../styles/Ranking.module.css";
import styled from "styled-components";
import UserRank from "./UserRank";
import { userDataAccount } from "@/pages/myaccount";

type RankingProps = {
  ranking: userDataAccount[];
  title: string;
};

const Ranking = ({ ranking, title }: RankingProps) => {
  return (
    <RankingStyled>
      <h2>{title}</h2>
      <div>
        {ranking.map((user, index) => (
          <UserRank
            user={user}
            key={user.username}
            index={index}
            data={title === "TOP AVERAGE ANSWER" && `${user.average}%`}
          />
        ))}
      </div>
    </RankingStyled>
  );
};

export default Ranking;

const RankingStyled = styled.div`
  border-top: 3px solid black;
  border-bottom: 3px solid black;
  height: 300px;
  overflow-y: auto;
  h2 {
    text-align: center;
  }
  p {
    font-size: 20px;
  }
`;
