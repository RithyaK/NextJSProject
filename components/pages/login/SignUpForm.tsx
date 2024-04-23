import { useUsernameContext } from "@/components/context/usernameContext";
import {
  createUser,
  isEmailAlreadyExists,
  isUserAlreadyExists,
} from "@/firestore/user";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";
import cookie from "js-cookie";
const SignUpForm = () => {
  const router = useRouter();
  const { setUsername } = useUsernameContext();
  const [usernameTyped, setUsernameTyped] = useState("");
  const [passwordTyped, setPasswordTyped] = useState("");
  const [confirmPasswordTyped, setConfirmPasswordTyped] = useState(false);
  const [emailTyped, setEmailTyped] = useState("");
  const [isEmailAlreadyExist, setIsEmailAlreadyExist] = useState(false);
  const [isUsernameAlreadyExist, setIsUsernameAlreadyExist] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);
  async function handleSubmitCreateAccount(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    if (
      !isUsernameAlreadyExist &&
      !isEmailAlreadyExist &&
      confirmPasswordTyped
    ) {
      await createUser(usernameTyped, passwordTyped, emailTyped);
      setUsername(usernameTyped);
      router.push(`menu/${usernameTyped}`);
      cookie.set("username", usernameTyped, { expires: 1 / 24 });
    } else {
      setHasFailed(true);
    }
  }

  async function handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmailTyped(e.target.value);
    if (await isEmailAlreadyExists(e.target.value)) {
      setIsEmailAlreadyExist(true);
    } else {
      setIsEmailAlreadyExist(false);
    }
  }
  async function handleChangeUsername(e: React.ChangeEvent<HTMLInputElement>) {
    setUsernameTyped(e.target.value);
    if (await isUserAlreadyExists(e.target.value)) {
      setIsUsernameAlreadyExist(true);
    } else {
      setIsUsernameAlreadyExist(false);
    }
  }
  function handleCheckPassword(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value === passwordTyped) {
      setConfirmPasswordTyped(true);
    } else {
      setConfirmPasswordTyped(false);
    }
  }
  return (
    <FormStyled
      className="login"
      onSubmit={(e) => handleSubmitCreateAccount(e)}
    >
      <h1>Crée un compte !</h1>
      <input
        type="email"
        value={emailTyped}
        onChange={(e) => handleChangeEmail(e)}
        placeholder="Email"
        className={isEmailAlreadyExist ? "error" : ""}
        required
      />
      <input
        type="text"
        value={usernameTyped}
        onChange={(e) => handleChangeUsername(e)}
        placeholder="Username"
        className={isUsernameAlreadyExist ? "error" : ""}
        required
      />
      <input
        type="password"
        value={passwordTyped}
        onChange={(e) => setPasswordTyped(e.target.value)}
        placeholder="Password"
        required
      />
      <input
        type="password"
        onChange={(e) => handleCheckPassword(e)}
        placeholder="Confirm password"
        required
        className={confirmPasswordTyped ? "" : "error"}
      />
      <button>Se connecter</button>
      {hasFailed && <p>Failed !</p>}
    </FormStyled>
  );
};

export default SignUpForm;

const FormStyled = styled.form`
  .mailcontainer {
    display: flex;
  }
  .error {
    color: red;
  }
`;
