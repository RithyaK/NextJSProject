import { theme } from "@/theme";
import React from "react";
import styled from "styled-components";

const SearchCard = ({ chapter }) => {
  return (
    <SearchCardStyled onClick={() => console.log(chapter)}>
      {chapter.name}
    </SearchCardStyled>
  );
};

export default SearchCard;

const SearchCardStyled = styled.div`
  border: 1px solid black;
  height: 100px;
  min-width: 150px;
  display: flex;
  justify-content: center;
  text-align: center;
  background-color: ${theme.colors.green};

  &:hover {
    cursor: pointer;
    border: 1px solid white;
  }
`;
