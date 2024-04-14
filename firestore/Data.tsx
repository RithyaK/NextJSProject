import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase-config";
import { Theme } from "@/pages/menu/[username]";

export const syncUserScore = async (
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

export const syncQuizz = async (newQuizz: Theme[]) => {
  const docRef = doc(db, "infos", "quizz");

  await updateDoc(docRef, {
    quizz: newQuizz,
  });
};
