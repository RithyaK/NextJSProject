import { Chapter } from "@/pages/menu/[username]";

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
    <div className="quizzRecommanded">
      <h2>Quizz sur le meme thème : {quizzChosen?.theme}</h2>
      <ul className="cards">
        {themeData?.chapters.map((chapter) => (
          <li key={chapter.name} className="card">
            <h3>{chapter.name}</h3>
            {/* <img src={chapter.image} height="300" width="300" /> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizzRecommanded;
