import { syncDatabase } from "@/firestore/Data";
import { useState } from "react";
// type QuizzAnswered = {
//   quiz: string;
//   score: number;
//   image: string;
// };
export type UserPoints = {
  username: string;
  points: number;
};
const useHistory = () => {
  const [history, setHistory] = useState();
  const [points, setPoints] = useState<UserPoints[]>();
  const [totalCorrectAnswer, setTotalCorrectAnswer] = useState();
  const [totalQuestion, setTotalQuestion] = useState();

  function handleHistoryQuizz(newQuizzAnswered, username, historyData) {
    const historyCopy = JSON.parse(JSON.stringify(historyData));
    const historyUpdated = [newQuizzAnswered, ...historyCopy];

    setHistory(historyUpdated);
    // Pourquoi undefined ducoup je suis obligé d'utiliser dans "Mon compte" la database History aulieu de la State History
    const totalCorrectAnswerUpdated = historyUpdated.reduce(
      (accumulator, quizz) => accumulator + quizz.score,
      0
    );
    setTotalCorrectAnswer(totalCorrectAnswerUpdated);
    const totalQuestionUpdated = historyUpdated.reduce(
      (accumulator, quizz) => accumulator + quizz.numberOfQuestions,
      0
    );
    setTotalQuestion(totalQuestionUpdated);
    const average = Number(
      ((totalCorrectAnswerUpdated / totalQuestionUpdated) * 100).toFixed(2)
    );

    syncDatabase(
      historyUpdated,
      username,
      average,
      totalCorrectAnswerUpdated,
      totalQuestionUpdated
    );
  }

  function handlePointsData(pointsToAdd: Number, username: string) {
    console.log(points);

    // const newUserPointsToAdd = {
    //   points: pointsToAdd,
    //   username: username,
    // };
    // let pointsUpdated = [newUserPointsToAdd, ...points];
    // console.log(pointsUpdated);

    // setPoints(pointsUpdated);
  }

  return {
    handleHistoryQuizz,
    // history,

    setHistory,
    handlePointsData,
    points,
    setPoints,
    // totalCorrectAnswer,
    // totalQuestion,
  };
};

export default useHistory;
