import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase-config";

export const createUser = async (
  idUser: string,
  passwordReceived: string,
  emailReceived: string
) => {
  const docRef = doc(db, "infos", "users");
  const docSnapshot = await getDoc(docRef);
  if (docSnapshot.exists()) {
    const { users } = docSnapshot.data();

    const user = {
      username: idUser,
      password: passwordReceived,
      accountCreatedAt: new Date().toISOString().split("T")[0],
      email: emailReceived,
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

export const getUser = async (
  usernameChecked: string,
  passwordReceived: string
) => {
  const docRef = doc(db, "infos", "users");

  const docSnapshot = await getDoc(docRef);
  if (docSnapshot.exists()) {
    const { users } = docSnapshot.data();

    const userFound = users.find(
      (user) =>
        user.username === usernameChecked && user.password === passwordReceived
    );

    return userFound;
  }
};

export const isUserAlreadyExists = async (usernameChecked: string) => {
  const docRef = doc(db, "infos", "users");

  const docSnapshot = await getDoc(docRef);
  if (docSnapshot.exists()) {
    const { users } = docSnapshot.data();
    const existingUsername = users.some(
      (user) => user.username === usernameChecked
    );
    return existingUsername;
  }
};

export const isEmailAlreadyExists = async (emailChecked: string) => {
  const docRef = doc(db, "infos", "users");

  const docSnapshot = await getDoc(docRef);
  if (docSnapshot.exists()) {
    const { users } = docSnapshot.data();
    const existingEmail = users.some((user) => user.email === emailChecked);
    return existingEmail;
  }
};

// export const authenticateUser = async (
//   idUser: string,
//   passwordReceived: string
// ) => {
//   const existingUser = await getUser(idUser, passwordReceived);

//   if (!existingUser) {
//     createUser(idUser, passwordReceived);
//   }
// };

export const getUserData = async (idUser: string) => {
  const docRef = doc(db, "users", idUser);

  const docSnapShot = await getDoc(docRef);
  if (docSnapShot.exists()) {
    const { username } = docSnapShot.data();

    return username;
  }
};
