import React from "react";
import styled from "styled-components";

const SearchBar = () => {
  return (
    <SearchBarStyled>
      <input placeholder="Recherchez votre quizz" />
    </SearchBarStyled>
  );
};

export default SearchBar;

const SearchBarStyled = styled.div`
  background-color: #674242;
  justify-content: center;
  height: 50px;
  display: flex;
  align-items: center;
  input {
    height: 70%;
    width: 70%;
    text-align: center;
  }
`;
