import { userDataAccount } from "@/pages/myaccount";
import React, { useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

type MenuStatisticsProps = {
  userDataAccount: userDataAccount;
};
const MenuStatistics = ({ userDataAccount }: MenuStatisticsProps) => {
  const [isVisibleStats, setIsVisibleStats] = useState(false);

  return (
    <div className="statistics-container">
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
  );
};

export default MenuStatistics;
