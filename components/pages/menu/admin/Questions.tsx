import { Question } from "@/enums/quizz";
import { syncQuizz } from "@/firestore/Data";
import React from "react";

const Questions = ({ quizChose, setQuizChose, listQuizz }) => {
  function handleChangeQuizz(
    e: React.ChangeEvent<HTMLInputElement>,
    indexOfTheQuestion: number,
    indexChoice: number
  ) {
    const questionsCopy = quizChose?.questions;
    let questionBeingModified: Question = questionsCopy?.find(
      (question, index) => index === indexOfTheQuestion
    );
    if (e.target.id === "question") {
      questionBeingModified.question = e.target.value;
    }
    if (e.target.name.includes("choice")) {
      questionBeingModified.choices[indexChoice] = e.target.value;
    }

    if (e.target.id === "answer") {
      questionBeingModified.answer = e.target.value;
    }
    const quizChoseUpdated = {
      ...quizChose,
      questions: questionsCopy,
    };

    setQuizChose(quizChoseUpdated);
    syncQuizz(listQuizz);
  }

  return (
    <ul>
      {quizChose?.questions.map((question, index) => (
        <li className="questioncontainer" key={question.question}>
          <input
            value={question.question}
            id="question"
            onChange={(e) => handleChangeQuizz(e, index)}
          />
          <div className="choices">
            {question.choices.map((choice, indexChoice) => {
              const choiceIndex = "choice" + indexChoice;
              return (
                <input
                  onChange={(e) => handleChangeQuizz(e, index, indexChoice)}
                  className="choice"
                  type="text"
                  key={choiceIndex}
                  name={choiceIndex}
                  value={choice}
                />
              );
            })}
          </div>
          <label htmlFor="answer">Bonne réponse :</label>
          <select id="answer" onChange={(e) => handleChangeQuizz(e, index)}>
            {question.choices.map((choice) => (
              <option value={choice} selected={question.answer === choice}>
                {choice}
              </option>
            ))}
          </select>
        </li>
      ))}
    </ul>
  );
};

export default Questions;
