import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { authenticateUser } from "@/firestore/user";
import { useUsernameContext } from "@/components/context/usernameContext";
import { theme } from "@/theme";
import cookie from "js-cookie";
const Login = () => {
  //
  const { username, setUsername } = useUsernameContext();
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  //
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    authenticateUser(inputValue);
    setUsername(inputValue);
    router.push(`menu/${inputValue}`);
    // document.cookie = `username=${inputValue}`;
    cookie.set("username", inputValue, { expires: 1 / 24 });
  }

  useEffect(() => {
    setUsername(null);
  }, []);
  //
  return (
    <LoginPageStyled>
      <form className="login" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button>Se connecter</button>
      </form>
    </LoginPageStyled>
  );
};

export default Login;
const LoginPageStyled = styled.div`
  background-color: ${theme.colors.grey};
  height: calc(100vh - 50px);
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
