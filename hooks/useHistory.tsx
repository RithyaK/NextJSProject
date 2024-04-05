import { syncDatabase } from "@/firestore/user";
import { useState } from "react";
// type QuizzAnswered = {
//   quiz: string;
//   score: number;
//   image: string;
// };
const useHistory = () => {
  const [history, setHistory] = useState();

  function handleHistoryQuizz(newQuizzAnswered, username, historyData) {
    const historyCopy = JSON.parse(JSON.stringify(historyData));
    const historyUpdated = [newQuizzAnswered, ...historyCopy];
    console.log("historyUpdated :", historyUpdated);

    setHistory(historyUpdated);
    // Pourquoi undefined ducoup je suis obligé d'utiliser dans "Mon compte" la database History aulieu de la State History
    const totalCorrectAnswer = historyUpdated.reduce(
      (accumulator, quizz) => accumulator + quizz.score,
      0
    );
    const totalQuestion = historyUpdated.reduce(
      (accumulator, quizz) => accumulator + quizz.numberOfQuestions,
      0
    );
    const average = Number(
      ((totalCorrectAnswer / totalQuestion) * 100).toFixed(2)
    );

    syncDatabase(historyUpdated, username, average);
  }

  return { handleHistoryQuizz, history, setHistory };
};

export default useHistory;
