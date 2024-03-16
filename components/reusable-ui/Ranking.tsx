import React from "react";
import styles from "./../../styles/Ranking.module.css";
import styled from "styled-components";

const Ranking = ({ title }) => {
  return (
    <RankingStyled>
      <h2>{title}</h2>
      <p>TEST</p>
      <p>2</p>
      <p>3</p>
      <p>4</p>
      <p>5</p>
      <p>6</p>
      <p>7</p>
      <p>7</p>
      <p>7</p>
      <p>7</p>
      <p>7</p>
      <p>7</p>
      <p>7</p>
      <p>8</p>
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
    border: 1px solid rgb(33, 31, 31);
    font-size: 20px;
  }
`;
