import React, { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { authenticateUser } from "@/firestore/user";
const Login = () => {
  //
  const router = useRouter();
  const [username, setUsername] = useState("");
  //
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    authenticateUser(username);
    localStorage.setItem("username", username);
    router.push(`menu/${username}`);
  }
  //
  return (
    <LoginPageStyled>
      <form className="login" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button>Se connecter</button>
      </form>
    </LoginPageStyled>
  );
};

export default Login;
const LoginPageStyled = styled.div`
  background-color: rgb(137, 137, 96);
  height: 100vh;
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;

  .login {
    width: 300px;
    background-color: rgb(107, 86, 159);
    height: 200px;
    display: flex;
    flex-direction: column;
    padding: 2.5rem;
    justify-content: center;
  }
  .login > input {
    margin-bottom: 50px;
    height: 30px;
  }
`;
