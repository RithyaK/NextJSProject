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
    console.log("test");
    const historyCopy = JSON.parse(JSON.stringify(historyData));
    console.log("historyCopy :", historyCopy);
    console.log("newQuizzAnswered :", newQuizzAnswered);
    const historyUpdated = [newQuizzAnswered, ...historyCopy];
    console.log("historyUpdated :", historyUpdated);

    setHistory(historyUpdated);
    syncDatabase(historyUpdated, username);
  }

  return { handleHistoryQuizz, history, setHistory };
};

export default useHistory;
