import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { theme } from "@/theme";
import SignInForm from "@/components/pages/login/SignInForm";
import SignUpForm from "@/components/pages/login/SignUpForm";
const Login = () => {
  //
  const [isSigningUp, setIsSigningUp] = useState(false);

  //

  //
  return (
    <LoginPageStyled>
      <div className="container-connexion">
        <div className="container-top">
          {isSigningUp ? (
            <span onClick={() => setIsSigningUp(false)}>
              Click here to sign in
            </span>
          ) : (
            <span onClick={() => setIsSigningUp(true)}>
              Click here to sign up
            </span>
          )}
        </div>
        {isSigningUp ? <SignUpForm /> : <SignInForm />}
      </div>
    </LoginPageStyled>
  );
};

export default Login;
const LoginPageStyled = styled.div`
  background-color: ${theme.colors.grey};
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .container-connexion {
    height: 330px;
    width: 350px;
    background-color: red;
  }
  .container-top {
    text-align: center;
  }
  .container-top:hover {
    cursor: pointer;
  }
  .login {
    display: flex;
    flex-direction: column;
    padding: 30px;
  }
  input {
    margin-bottom: 10px;
    height: 30px;
  }
`;
