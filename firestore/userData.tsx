import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase-config";

export const getUserData = async (idUser: string) => {
  const docRef = doc(db, "users", idUser);

  const docSnapShot = await getDoc(docRef);
  if (docSnapShot.exists()) {
    const { username } = docSnapShot.data();

    return username;
  }
};

export const addQuestionsToData = async (data) => {
  const cachette = doc(db, "infos", "quizz");
  await updateDoc(cachette, {
    quizz: data,
  });
};
