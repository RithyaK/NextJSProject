// import { syncUserScore } from "@/firestore/Data";
// import { useState } from "react";
// // export type UserPoints = {
// //   username: string;
// //   points: number;
// // };
// const useHistory = () => {
//   // const [history, setHistory] = useState();

//   function handleHistoryQuizz(newQuizzAnswered, userData) {
//     // setHistory(historyUpdated);
//     // Pourquoi quand je vais utiliser history => undefined ducoup je suis obligé d'utiliser dans "Mon compte" la database History aulieu de la state History que j'ai pourtant setHistory(historyUpdated)
//     const historyUpdated = [newQuizzAnswered, ...userData.history];
//     const totalCorrectAnswerUpdated = historyUpdated.reduce(
//       (accumulator, quizz) => accumulator + quizz.score,
//       0
//     );

//     const totalQuestionUpdated = historyUpdated.reduce(
//       (accumulator, quizz) => accumulator + quizz.numberOfQuestions,
//       0
//     );
//     const average = Number(
//       ((totalCorrectAnswerUpdated / totalQuestionUpdated) * 100).toFixed(2)
//     );
//     const userDataUpdated = {
//       ...userData,
//       history: historyUpdated,
//       totalCorrectAnswered: totalCorrectAnswerUpdated,
//       totalQuestionAnswered: totalQuestionUpdated,
//       average,
//     };
//     syncUserScore(userDataUpdated);
//   }

//   return {
//     handleHistoryQuizz,
//     // setHistory,
//   };
// };

// export default useHistory;
