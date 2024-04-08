import { average, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase-config";

export const getUser = async (idUser: string) => {
  const docRef = doc(db, "users", idUser);

  const docSnapshot = await getDoc(docRef);
  console.log("resultat", docSnapshot);

  if (docSnapshot.exists()) {
    const userReceived = docSnapshot.data();
    return userReceived;
  }
};

export const createUser = (idUser: string) => {
  const docRef = doc(db, "users", idUser);
  const data = {
    username: idUser,
    accountCreatedAt: new Date(),
    email: `${idUser}@hotmail.fr`,
    history: [],
    average: 0,
    totalCorrectAnswered: 0,
    totalQuestionAnswered: 0,

    // average : number ? 0 ??
  };
  setDoc(docRef, data);
};

export const authenticateUser = async (idUser: string) => {
  const existingUser = await getUser(idUser);

  if (!existingUser) {
    createUser(idUser);
  }
};

export const getUserData = async (idUser: string) => {
  const docRef = doc(db, "users", idUser);

  const docSnapShot = await getDoc(docRef);
  if (docSnapShot.exists()) {
    const { username } = docSnapShot.data();

    return username;
  }
};
