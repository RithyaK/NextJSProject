import { syncDatabase } from "@/firestore/Data";
import { useState } from "react";
// type QuizzAnswered = {
//   quiz: string;
//   score: number;
//   image: string;
// };
const useHistory = () => {
  const [history, setHistory] = useState();
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

  return {
    handleHistoryQuizz,
    // history,
    setHistory,
    // totalCorrectAnswer,
    // totalQuestion,
  };
};

export default useHistory;
