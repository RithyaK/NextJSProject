import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase-config";

export const getUserData = async (idUser: string) => {
  const docRef = doc(db, "users", idUser);

  const docSnapShot = await getDoc(docRef);
  if (docSnapShot.exists()) {
    const { username } = docSnapShot.data();

    return username;
  }
};
