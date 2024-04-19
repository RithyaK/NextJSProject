import { theme } from "@/theme";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";

const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    console.log(inputValue);
    router.push(`/search/${inputValue}`);
  }
  return (
    <SearchBarStyled>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          placeholder="Rechercher un quizz"
          onChange={(e) => setInputValue(e.target.value)}
        />
      </form>
    </SearchBarStyled>
  );
};

export default SearchBar;

const SearchBarStyled = styled.div`
  input {
    background-color: ${theme.colors.green};
    width: 450px;
    height: 25px;
    border-radius: 10px;
    text-align: center;
  }
  input::placeholder {
    color: black;
  }
`;
