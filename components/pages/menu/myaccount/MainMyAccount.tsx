import { useUsernameContext } from "@/components/context/usernameContext";
import useHistory from "@/hooks/useHistory";
import Link from "next/link";
import React, { useState } from "react";
import styled from "styled-components";
import { FaArrowDown } from "react-icons/fa";
import { HistoryQuizzAnswered } from "./../../../../pages/myaccount/index";
import { FaArrowUp } from "react-icons/fa";
import { theme } from "@/theme";
type MainMyAccountProps = {
  historyData: HistoryQuizzAnswered[];
};
const MainMyAccount = ({ historyData }: MainMyAccountProps) => {
  // const { history } = useHistory();
  // console.log(history);
  // PQ HISTORY UNDEFINED
  const { username } = useUsernameContext();
  const [isVisible, setIsVisible] = useState(false);
  console.log(historyData);
  return (
    <MainMyAccountStyled>
      <Link href={`/menu/${username}`}>Retourner à l{"'"}accueil</Link>
      <h1>
        {username}
        {"'"}s account
      </h1>
      <div>
        <div className="dropdownTitle" onClick={() => setIsVisible(!isVisible)}>
          <h2>Mes derniers tests</h2>
          {isVisible ? <FaArrowUp /> : <FaArrowDown />}
        </div>
        {isVisible && (
          <ul>
            {historyData.map((quizz) => (
              <li key={quizz.id}>
                <span>{quizz.createdAt}</span>
                <span> score : {quizz.score}/4</span>
                <span>{quizz.name.toUpperCase()}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </MainMyAccountStyled>
  );
};

export default MainMyAccount;

const MainMyAccountStyled = styled.div`
  .dropdownTitle {
    display: flex;
    align-items: center;
    background-color: ${theme.colors.darkgrey};
    gap: 15px;
    cursor: pointer;
  }
  li {
    padding: 10px;
    border-bottom: 1px solid black;
    margin: 0 20px;
    list-style-type: none;
  }
  li > * {
    margin-right: 20px;
  }
`;
