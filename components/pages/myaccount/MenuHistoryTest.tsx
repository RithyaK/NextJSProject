import { userDataAccount } from "@/pages/myaccount";
import React, { useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

type MenuHistoryTestProps = {
  userDataAccount: userDataAccount;
};
const MenuHistoryTest = ({ userDataAccount }: MenuHistoryTestProps) => {
  const [isVisibleHistory, setIsVisibleHistory] = useState(false);

  return (
    <div className="historytest-container">
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
  );
};

export default MenuHistoryTest;
