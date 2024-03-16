import { doc, getDoc, setDoc } from "firebase/firestore";
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
  };
  setDoc(docRef, data);
};

export const authenticateUser = async (idUser: string) => {
  const existingUser = await getUser(idUser);

  if (!existingUser) {
    createUser(idUser);
  }
};
