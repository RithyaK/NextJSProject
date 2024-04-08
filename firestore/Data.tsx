import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase-config";

export const addQuestionsToData = async (data) => {
  const cachette = doc(db, "infos", "quizz");
  await updateDoc(cachette, {
    quizz: data,
  });
};

export const syncDatabase = async (
  history,
  userId: string,
  average: number,
  totalCorrectAnswered: number,
  totalQuestionAnswered: number
) => {
  const docRef = doc(db, "users", userId);

  await updateDoc(docRef, {
    username: userId,
    history: history,
    average: average,
    totalQuestionAnswered,
    totalCorrectAnswered,
  });
};

export const syncEmailDatabase = async (newEmail: string, userId: string) => {
  const docRef = doc(db, "users", userId);

  await updateDoc(docRef, {
    email: newEmail,
  });
};
