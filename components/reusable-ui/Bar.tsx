import { theme } from "@/theme";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

type BarProps = {
  list: string[];
  title: string;
};

const Bar = ({ list, title }: BarProps) => {
  const router = useRouter();

  function handleClickItem(item: string) {
    title === "Quizz que vous pourriez aimer"
      ? router.push(`/quizz/${item}`)
      : router.push(`/search/${item}`);
  }
  return (
    <BarStyled>
      <div className="title">
        <h2>{title}</h2>
      </div>
      <ul>
        {list.map((item) => (
          <li key={item} onClick={() => handleClickItem(item)}>
            {item}
          </li>
        ))}
      </ul>
    </BarStyled>
  );
};

export default Bar;

const BarStyled = styled.div`
  margin: 20px 0;
  .title {
    display: flex;
    justify-content: center;
  }
  h2 {
    border: 1px solid black;
    border-radius: 12px;
    text-align: center;
    background-color: ${theme.colors.green};
    width: 370px;
  }
  ul {
    display: flex;
    list-style-type: none;
    background-color: ${theme.colors.lightgreen};
    overflow-x: auto;
  }
  li {
    border: 1px solid grey;
    min-width: 170px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  li:hover {
    cursor: pointer;
    border: 1px solid black;
  }
`;
