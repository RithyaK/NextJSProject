import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase-config";
import { Theme, UserData } from "@/pages/menu/[username]";
import { userDataAccount } from "@/pages/quizz/[quizzName]";

export const syncUserScore = async (userNewData: userDataAccount) => {
  console.log("userNewData : ", userNewData);
  const docRef = doc(db, "infos", "users");
  const docSnapShot = await getDoc(docRef);

  if (docSnapShot.exists()) {
    const { users } = docSnapShot.data();
    const usersUpdated = users.map((user) =>
      user.username === userNewData.username ? userNewData : user
    );
    console.log("usersUpdated : ", usersUpdated);
    await updateDoc(docRef, {
      users: usersUpdated,
    });
  }
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
