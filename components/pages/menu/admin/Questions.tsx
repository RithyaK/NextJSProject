import { EMPTY_QUESTION, Question } from "@/enums/quizz";
import { syncQuizz } from "@/firestore/Data";
import React, { useState } from "react";
import styled from "styled-components";

const Questions = ({
  questions,
  setQuestions,
  quizChose,
  setQuizChose,
  listQuizz,
}) => {
  // State
  const [newQuestion, setNewQuestion] = useState(EMPTY_QUESTION);
  // event
  function handleChangeQuizz(
    e: React.ChangeEvent<HTMLInputElement>,
    indexOfTheQuestion: number,
    indexChoice: number
  ) {
    const questionBeingModified = quizChose?.questions[indexOfTheQuestion];
    if (e.target.id === "question-asked") {
      questionBeingModified.question = e.target.value;
    }
    if (e.target.id.includes("choice")) {
      questionBeingModified.choices[indexChoice] = e.target.value;
    }

    if (e.target.id === "answer") {
      questionBeingModified.answer = e.target.value;
    }
    console.log("listQuizz after modifying a question: ", listQuizz);
    const quizChoseUpdated = {
      ...quizChose,
      questions: questions,
    };

    setQuizChose(quizChoseUpdated);
    syncQuizz(listQuizz);
  }
  function handleChangeNewQuestion(
    e: React.ChangeEvent<HTMLInputElement>,
    indexChoice: number
  ) {
    if (e.target.id === "question-asked") {
      let newQuestionUpdated = { ...newQuestion, question: e.target.value };
      setNewQuestion(newQuestionUpdated);
    }
    if (e.target.id.includes("choice")) {
      let choicesUpdated = [...newQuestion.choices];
      choicesUpdated[indexChoice] = e.target.value;
      setNewQuestion({ ...newQuestion, choices: choicesUpdated });
    }
    if (e.target.id === "answer") {
      setNewQuestion({ ...newQuestion, answer: e.target.value });
    }
  }

  function handleDeleteQuestion(indexOfTheQuestion: number) {
    const questionBeingModified = quizChose?.questions[indexOfTheQuestion];
    console.log("questionBeingModified : ", questionBeingModified);
    questionBeingModified.question = quizChose.questions.filter(
      (question: Question) => question !== questionBeingModified
    );

    setQuestions(questionBeingModified.question);
    syncQuizz(listQuizz);
  }

  function handleSubmitNewQuestion(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    quizChose.questions = [...quizChose.questions, newQuestion];
    setQuestions(quizChose.questions);
    syncQuizz(listQuizz);
  }

  // render
  return (
    <QuestionsStyled>
      <h2> QUIZZ : {quizChose?.name} </h2>

      <ul className="quizz">
        {questions.map((question, index) => (
          <li className="questioncontainer" key={question.question}>
            <input
              placeholder="Question"
              value={question.question}
              id="question-asked"
              onChange={(e) => handleChangeQuizz(e, index)}
            />
            <div className="choices">
              {question.choices.map((choice, indexChoice) => {
                const choiceIndex = "choice" + indexChoice;
                const placeholder = `Réponse ${indexChoice + 1}`;
                return (
                  <input
                    placeholder={placeholder}
                    onChange={(e) => handleChangeQuizz(e, index, indexChoice)}
                    className="choice"
                    type="text"
                    key={choiceIndex}
                    id={choiceIndex}
                    value={choice}
                  />
                );
              })}
            </div>
            <div className="container-bottomquestion">
              <button
                className="delete"
                onClick={() => handleDeleteQuestion(index)}
              >
                Delete this question
              </button>
              <div className="container-selectanswer">
                <label htmlFor="answer">Bonne réponse</label>
                <select
                  id="answer"
                  onChange={(e) => handleChangeQuizz(e, index)}
                >
                  {question.choices.map((choice) => (
                    <option
                      value={choice}
                      selected={question.answer === choice}
                    >
                      {choice}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {quizChose && (
        <div className="container-newquestion">
          <h3>Ajouter une question</h3>
          <form onSubmit={(e) => handleSubmitNewQuestion(e)}>
            <div className="container-inputquestion">
              <input
                id="question-asked"
                placeholder="Question"
                value={newQuestion.question}
                onChange={(e) => handleChangeNewQuestion(e)}
              ></input>
            </div>
            <div className="choices">
              {newQuestion.choices.map((choice, indexChoice) => {
                const choiceIndex = "choice" + indexChoice;
                const placeholder = `Réponse ${indexChoice + 1}`;
                return (
                  <input
                    onChange={(e) => handleChangeNewQuestion(e, indexChoice)}
                    placeholder={placeholder}
                    className="choice"
                    type="text"
                    key={choiceIndex}
                    id={choiceIndex}
                    value={choice}
                  />
                );
              })}
            </div>
            <div className="container-selectanswer">
              <label htmlFor="answer">Bonne réponse</label>
              <select id="answer" onChange={(e) => handleChangeNewQuestion(e)}>
                {newQuestion.choices.map((choice) => {
                  return <option value={choice}>{choice}</option>;
                })}
              </select>
            </div>
            <button>Click to add this question</button>
          </form>
        </div>
      )}
    </QuestionsStyled>
  );
};

export default Questions;

const QuestionsStyled = styled.div`
  h2 {
    padding: 20px;
  }
  .container-newquestion {
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    padding: 10px 0px;
    margin: 30px 0;
    h3 {
      text-align: center;
      margin-bottom: 20px;
    }
  }
  .questioncontainer {
    margin-bottom: 30px;
    list-style-type: none;
  }
  #question,
  #question-asked {
    width: 100%;
    text-align: center;
    height: 30px;
  }
  .choices {
    text-align: center;
    background-color: red;
    display: grid;
    grid-template: 1fr 1fr / 1fr 1fr;
  }
  .choice {
    text-align: center;
  }
  .container-bottomquestion {
    display: flex;
  }
  .delete {
    background-color: red;
    border: 1px solid black;
    color: black;
    padding: 5px;
    margin-right: 100px;
  }
`;
