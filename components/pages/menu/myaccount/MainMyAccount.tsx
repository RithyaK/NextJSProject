import { useUsernameContext } from "@/components/context/usernameContext";
import useHistory from "@/hooks/useHistory";
import Link from "next/link";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { FaArrowDown } from "react-icons/fa";
import { HistoryQuizzAnswered } from "./../../../../pages/myaccount/index";
import { FaArrowUp } from "react-icons/fa";
import { theme } from "@/theme";
import { syncEmailDatabase } from "@/firestore/Data";
import { userDataAccount } from "@/pages/quizz/[quizzName]";
type MainMyAccountProps = {
  userDataAccount: userDataAccount;
};
const MainMyAccount = ({ userDataAccount }: MainMyAccountProps) => {
  // const { totalCorrectAnswer , history} = useHistory();
  // console.log(totalCorrectAnswer);
  // PQ HISTORY UNDEFINED (car probleme de render )

  const { username } = useUsernameContext();
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const [isVisibleHistory, setIsVisibleHistory] = useState(false);
  const [isVisibleStats, setIsVisibleStats] = useState(false);
  const [isVisibleAccountInfo, setIsVisibleAccountInfo] = useState(false);
  const [isModifyingEmail, setIsModifyingEmail] = useState(false);
  const [mail, setMail] = useState(userDataAccount.email);
  function handleChangeEmail() {
    setMail(mail);
    syncEmailDatabase(mail, username);
  }
  function handleClickValidateButton() {
    setIsModifyingEmail(false);
    handleChangeEmail();
  }
  return (
    <MainMyAccountStyled>
      <Link href={`/menu/${username}`}>Retourner à l{"'"}accueil</Link>
      <h1>
        {username}
        {"'"}s account
      </h1>
      <div>
        <div
          className="titledropdown history"
          onClick={() => setIsVisibleHistory(!isVisibleHistory)}
        >
          {isVisibleHistory ? <FaArrowUp /> : <FaArrowDown />}
          <h2>Mes derniers tests</h2>
        </div>
        {isVisibleHistory && (
          <ul>
            {userDataAccount.history?.map((quizz) => (
              <li key={quizz.id}>
                <span>{quizz.createdAt}</span>
                <h3>{quizz.name.toUpperCase()}</h3>
                <span>
                  score : {quizz.score}/{quizz.numberOfQuestions}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <div
          className="titledropdown stats"
          onClick={() => {
            setIsVisibleStats(!isVisibleStats);
          }}
        >
          {isVisibleStats ? <FaArrowUp /> : <FaArrowDown />}
          <h2>Mes statistiques</h2>
        </div>
        {isVisibleStats && (
          <ul>
            <li>
              <h4>Average Good Answer :</h4>
              <span>{userDataAccount.average}%</span>
            </li>
            <li>
              <h4>Question(s) répondu :</h4>
              <span>{userDataAccount.totalQuestionAnswered}</span>
            </li>
            <li>
              <h4>Bonne réponse(s) :</h4>
              <span>{userDataAccount.totalCorrectAnswered}</span>
            </li>
          </ul>
        )}
      </div>
      <div>
        <div
          className="titledropdown account-info"
          onClick={() => {
            setIsVisibleAccountInfo(!isVisibleAccountInfo);
          }}
        >
          {isVisibleAccountInfo ? <FaArrowUp /> : <FaArrowDown />}
          <h2>Mes informations</h2>
        </div>
        {isVisibleAccountInfo && (
          <ul>
            <li>
              <h4>Date de création du compte :</h4>
              <span>{userDataAccount.accountCreatedAt}</span>
            </li>
            <li>
              <h4>Mon e-mail :</h4>
              {!isModifyingEmail ? (
                <div>
                  <span>{mail}</span>
                  <button
                    onClick={() => {
                      setIsModifyingEmail(true);
                      // inputEmailRef.current.focus();
                    }}
                  >
                    Modifier
                  </button>
                </div>
              ) : (
                <div>
                  <input
                    type="email"
                    onChange={(e) => setMail(e.target.value)}
                    value={mail}
                    ref={inputEmailRef}
                  />
                  <button onClick={handleClickValidateButton}>Valider</button>
                </div>
              )}
            </li>
            <li>
              <h4>Mon pseudo :</h4>
              <span>{username}</span>
            </li>
          </ul>
        )}
      </div>
    </MainMyAccountStyled>
  );
};

export default MainMyAccount;

const MainMyAccountStyled = styled.div`
  .titledropdown {
    display: flex;
    align-items: center;
    background-color: ${theme.colors.darkgrey};
    gap: 15px;
    cursor: pointer;
    margin: 2px;
  }
  li {
    padding: 10px;
    border-bottom: 1px solid black;
    margin: 0 20px;
    list-style-type: none;
    display: flex;
    align-items: center;
  }
  li > * {
    margin-right: 20px;
  }
`;
