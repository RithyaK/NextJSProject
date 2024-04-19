import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase-config";
import { Theme } from "@/pages/menu/[username]";
import { userDataAccount } from "@/pages/myaccount";

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
  const docRef = doc(db, "infos", "users");
  const docSnapShot = await getDoc(docRef);
  if (docSnapShot.exists()) {
    const { users } = docSnapShot.data();
    const usersUpdated = users.map((user) =>
      user.username === userId ? { ...user, email: newEmail } : user
    );
    await updateDoc(docRef, {
      users: usersUpdated,
    });
  }
};

export const syncQuizz = async (newQuizz: Theme[]) => {
  const docRef = doc(db, "infos", "quizz");

  await updateDoc(docRef, {
    quizz: newQuizz,
  });
};
