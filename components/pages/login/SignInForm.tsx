import { useUsernameContext } from "@/components/context/usernameContext";
import { getUser } from "@/firestore/user";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import cookie from "js-cookie";
const SignInForm = () => {
  const router = useRouter();
  const { setUsername } = useUsernameContext();
  const [usernameTyped, setUsernameTyped] = useState("");
  const [passwordTyped, setPasswordTyped] = useState("");
  const [hasFailedToConnect, setHasFailedToConnect] = useState(false);

  useEffect(() => {
    setUsername(null);
  }, []);

  async function handleSubmitConnect(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (await getUser(usernameTyped, passwordTyped)) {
      setUsername(usernameTyped);
      router.push(`menu/${usernameTyped}`);
      cookie.set("username", usernameTyped, { expires: 1 / 24 });
    } else {
      setHasFailedToConnect(true);
    }
  }
  return (
    <form className="login" onSubmit={(e) => handleSubmitConnect(e)}>
      <h1>Connecte-toi !</h1>
      <input
        type="text"
        value={usernameTyped}
        onChange={(e) => setUsernameTyped(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="password"
        value={passwordTyped}
        onChange={(e) => setPasswordTyped(e.target.value)}
        placeholder="Password"
        required
      />
      <button>Se connecter</button>
      {hasFailedToConnect && <p>La connexion a échoué</p>}
    </form>
  );
};

export default SignInForm;
