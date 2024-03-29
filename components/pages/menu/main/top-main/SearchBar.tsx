import { theme } from "@/theme";
import React from "react";
import styled from "styled-components";

const SearchBar = () => {
  return (
    <SearchBarStyled>
      <input placeholder="Cliquez pour chercher un quizz" />
    </SearchBarStyled>
  );
};

export default SearchBar;

const SearchBarStyled = styled.div`
  justify-content: center;
  height: 50px;
  display: flex;
  align-items: center;
  input {
    height: 70%;
    width: 450px;
    text-align: center;
    background-color: ${theme.colors.green};
    border: 1px solid black;
    border-radius: 10px;
  }
  input::placeholder {
    color: black;
  }
`;
