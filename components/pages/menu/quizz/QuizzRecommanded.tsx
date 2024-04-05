import { Chapter } from "@/pages/menu/[username]";
import styled from "styled-components";

type QuizzRecommandedProps = {
  quizzChosen: {
    theme: string;
    played: number;
    name: string;
    difficulty: string;
    date: string;
    image: string;
  };
  themeData: {
    id: number;
    name: string;
    chapters: Chapter[];
  };
};

const QuizzRecommanded = ({
  themeData,
  quizzChosen,
}: QuizzRecommandedProps) => {
  return (
    <QuizzRecommandedStyled>
      <h2>Quizz sur le meme thème : {quizzChosen?.theme}</h2>
      <ul className="cards">
        {themeData?.chapters
          .filter((chapter) => chapter.name !== quizzChosen.name)
          .map((chapter) => (
            <li key={chapter.name} className="card">
              <h3>{chapter.name}</h3>
              {/* <img src={chapter.image} height="300" width="300" /> */}
            </li>
          ))}
      </ul>
    </QuizzRecommandedStyled>
  );
};

export default QuizzRecommanded;

const QuizzRecommandedStyled = styled.div`
  padding: 30px 0px;
  border-top: 1px solid black;

  .cards {
    display: flex;
    list-style-type: none;
    gap: 30px;
  }
  .card {
    border: 1px solid black;
    width: 180px;
    height: 250px;
    text-align: center;
  }
`;
