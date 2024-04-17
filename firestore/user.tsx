import { average, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase-config";

// export const createUser = (idUser: string) => {
//   const docRef = doc(db, "users", idUser);
//   const data = {
//     username: idUser,
//     accountCreatedAt: new Date(),
//     email: `${idUser}@hotmail.fr`,
//     history: [],
//     average: 0,
//     totalCorrectAnswered: 0,
//     totalQuestionAnswered: 0,

//     // average : number ? 0 ??
//   };
//   setDoc(docRef, data);
// };

// export const getUser = async (idUser: string) => {
//   const docRef = doc(db, "users", idUser);

//   const docSnapshot = await getDoc(docRef);
//   console.log("resultat", docSnapshot);

//   if (docSnapshot.exists()) {
//     const userReceived = docSnapshot.data();
//     return userReceived;
//   }
// };

export const createUser = async (idUser: string) => {
  const docRef = doc(db, "infos", "users");
  const docSnapshot = await getDoc(docRef);
  if (docSnapshot.exists()) {
    const { users } = docSnapshot.data();
    const user = {
      username: idUser,
      accountCreatedAt: new Date().toISOString().split("T")[0],
      email: `${idUser}@hotmail.fr`,
      history: [],
      average: 0,
      totalCorrectAnswered: 0,
      totalQuestionAnswered: 0,
    };
    const usersUpdated = [...users, user];

    await updateDoc(docRef, {
      users: usersUpdated,
    });
  }
};

export const getUser = async (idUser: string) => {
  const docRef = doc(db, "infos", "users");

  const docSnapshot = await getDoc(docRef);
  if (docSnapshot.exists()) {
    const { users } = docSnapshot.data();

    const userFound = users.find((user) => user.username === idUser);
    return userFound;
  }
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
