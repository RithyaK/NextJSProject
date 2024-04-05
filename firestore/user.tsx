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
    history: [],
    average: null,
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

export const syncDatabase = async (
  history,
  userId: string,
  average: number
) => {
  const docRef = doc(db, "users", userId);

  await updateDoc(docRef, {
    username: userId,
    history: history,
    average: average,
  });
};
